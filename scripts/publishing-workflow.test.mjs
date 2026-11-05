import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { test } from 'node:test'

const workflow = fs.readFileSync(new URL('../.github/workflows/deploy.yaml', import.meta.url), 'utf8')
const deploymentJob = workflow.split(/^  request-production-deployment:/m)[1]
const runBlock = deploymentJob.match(/        run: \|\n([\s\S]*)$/)
assert.ok(runBlock, 'The deployment step must contain an inspectable script.')
const deploymentScript = runBlock[1].split('\n').map(line => line.slice(10)).join('\n')
const fakeHook = 'https://api.vercel.com/v1/integrations/deploy/prj_test/test-hook'

function requestDeployment(t, hook = fakeHook, curlStatus = 0, httpStatus = '201') {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'nervos-publishing-workflow-'))
  t.after(() => fs.rmSync(temporary, { recursive: true, force: true }))
  const summary = path.join(temporary, 'summary.md')
  const capture = path.join(temporary, 'curl.json')
  const mockCurl = path.join(temporary, 'curl')
  fs.writeFileSync(mockCurl, `#!${process.execPath}\n` +
    `const fs = require('node:fs');\n` +
    `const args = process.argv.slice(2);\n` +
    `fs.writeFileSync(process.env.CURL_CAPTURE_PATH, JSON.stringify({ args: args.slice(0, -1), hook: args.at(-1) }));\n` +
    `process.stdout.write(process.env.CURL_HTTP_STATUS);\n` +
    `if (process.env.CURL_EXIT_STATUS !== '0') console.error('Mocked deployment request failure.');\n` +
    `process.exit(Number(process.env.CURL_EXIT_STATUS));\n`, { mode: 0o755 })
  const result = spawnSync('/bin/bash', ['-e', '-o', 'pipefail', '-c', deploymentScript], {
    encoding: 'utf8',
    env: {
      PATH: [temporary, path.dirname(process.execPath), '/usr/bin', '/bin'].join(path.delimiter),
      DEPLOYMENT_WEBHOOK: hook,
      GITHUB_STEP_SUMMARY: summary,
      CURL_CAPTURE_PATH: capture,
      CURL_EXIT_STATUS: String(curlStatus),
      CURL_HTTP_STATUS: httpStatus,
    },
    timeout: 5_000,
  })
  assert.ifError(result.error)
  assert.equal(result.signal, null)
  return {
    ...result,
    summary: fs.existsSync(summary) ? fs.readFileSync(summary, 'utf8') : '',
    request: fs.existsSync(capture) ? JSON.parse(fs.readFileSync(capture, 'utf8')) : null,
  }
}

test('official publishing is enabled without a new variable, supports explicit pause, and needs no cross-repository write token', () => {
  assert.match(workflow, /^name: Nervos Official Production Deployment$/m)
  assert.match(workflow, /permissions:\n  contents: read/)
  assert.equal((workflow.match(/vars\.KB_PUBLISHING_ENABLED != 'false'/g) ?? []).length, 2)
  assert.doesNotMatch(workflow, /vars\.KB_PUBLISHING_ENABLED == 'true'/)
  assert.equal((workflow.match(/github\.repository == 'NervosEducationHub\/EducationHubArticles'/g) ?? []).length, 2)
  assert.equal((workflow.match(/secrets\.NERVOS_ORG_DEPLOYMENT_WEBHOOK/g) ?? []).length, 1)
  assert.doesNotMatch(workflow, /create-github-app-token|repository_dispatch|KB_PUBLISHER_APP|contents: write|pull-requests: write/)
  assert.match(workflow, /pull_request:\n    branches:\n      - main/)
})

test('source validation uses trusted website main without publishing credentials', () => {
  const validation = workflow.split(/^  validate-content:/m)[1].split(/^  request-production-deployment:/m)[0]
  assert.match(validation, /repository: nervosnetwork\/nervos-official-website\n          ref: main/)
  assert.equal((validation.match(/persist-credentials: false/g) ?? []).length, 2)
  assert.match(validation, /ref: \$\{\{ github\.event_name == 'pull_request' && github\.ref \|\| 'main' \}\}/)
  assert.match(validation, /yarn install --immutable --mode=skip-build/)
  assert.match(validation, /node scripts\/validate-kb-sources\.mjs \.\.\/articles/)
  assert.doesNotMatch(validation, /secrets\.|GH_TOKEN|DEPLOYMENT_WEBHOOK/)
})

test('deployment waits for validation and only accepts official main push or manual events', () => {
  assert.match(deploymentJob, /needs: validate-content/)
  assert.match(deploymentJob, /github\.ref == 'refs\/heads\/main'/)
  assert.match(deploymentJob, /github\.event_name == 'push' \|\| github\.event_name == 'workflow_dispatch'/)
  assert.doesNotMatch(deploymentJob, /actions\/checkout|scripts\/.*\.mjs|pull_request_target/)
  assert.match(deploymentJob, /DEPLOYMENT_WEBHOOK: \$\{\{ secrets\.NERVOS_ORG_DEPLOYMENT_WEBHOOK \}\}/)
})

test('POSTs the existing hook with failure checking and suppresses its response body', t => {
  const result = requestDeployment(t)
  assert.equal(result.status, 0, result.stderr)
  assert.deepEqual(result.request, {
    args: [
      '--fail', '--show-error', '--silent', '--proto', '=https', '--tlsv1.2',
      '--connect-timeout', '10', '--max-time', '30', '--request', 'POST', '--output', '/dev/null', '--write-out', '%{http_code}',
    ],
    hook: fakeHook,
  })
  assert.match(result.summary, /Production build requested/)
  assert.match(result.summary, /not confirmation that the build or production deployment succeeded/)
  assert.doesNotMatch(result.stdout + result.stderr + result.summary, /test-hook/)
})

for (const hook of [
  '',
  'not a URL',
  'http://api.vercel.com/v1/integrations/deploy/prj_test/test-hook',
  'https://example.com/v1/integrations/deploy/prj_test/test-hook',
  'https://api.vercel.com:444/v1/integrations/deploy/prj_test/test-hook',
  'https://user:password@api.vercel.com/v1/integrations/deploy/prj_test/test-hook',
  'https://api.vercel.com/v1/integrations/deploy/prj_test/test-hook#fragment',
  'https://api.vercel.com/v1/projects/prj_test',
]) {
  test(`rejects a missing or invalid hook before invoking curl: ${JSON.stringify(hook)}`, t => {
    const result = requestDeployment(t, hook)
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /production deployment hook/)
    assert.equal(result.request, null)
    assert.equal(result.summary, '')
    if (hook.includes('test-hook')) assert.doesNotMatch(result.stdout + result.stderr, /test-hook/)
  })
}

test('a failed hook request fails the job and never claims success', t => {
  const result = requestDeployment(t, fakeHook, 22)
  assert.equal(result.status, 22)
  assert.ok(result.request)
  assert.equal(result.summary, '')
  assert.doesNotMatch(result.stdout + result.stderr, /test-hook/)
})

test('a redirected or otherwise non-2xx hook never counts as an accepted build', t => {
  for (const status of ['301', '307', '400', '500', '000']) {
    const result = requestDeployment(t, fakeHook, 0, status)
    assert.equal(result.status, 1)
    assert.ok(result.request)
    assert.match(result.stderr, /did not return a successful HTTP status/)
    assert.equal(result.summary, '')
  }
})
