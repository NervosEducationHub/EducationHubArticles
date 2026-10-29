import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { checkArticleSlugs } from './check-slugs.mjs'

const script = fileURLToPath(new URL('./check-slugs.mjs', import.meta.url))

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'nervos-slug-check-'))
  t.after(() => fs.rmSync(root, { recursive: true, force: true }))
  return root
}

function write(root, relative, content = '# Article\n') {
  const filename = path.join(root, relative)
  fs.mkdirSync(path.dirname(filename), { recursive: true })
  fs.writeFileSync(filename, content)
  return filename
}

function run(root, args = [], executable = script) {
  const result = spawnSync(process.execPath, [executable, ...args], {
    cwd: root,
    encoding: 'utf8',
    timeout: 5_000,
  })
  assert.ifError(result.error)
  assert.equal(result.signal, null)
  return result
}

// Do not follow symlinks. Capture file bytes and modification times so a passing
// check cannot silently rewrite content, rename folders, or regenerate metadata.
function snapshot(root) {
  const entries = []
  function visit(relative) {
    const filename = path.join(root, relative)
    const stat = fs.lstatSync(filename)
    const entry = { relative, mode: stat.mode, mtimeMs: stat.mtimeMs }
    if (stat.isSymbolicLink()) entry.link = fs.readlinkSync(filename)
    else if (stat.isFile()) entry.content = fs.readFileSync(filename).toString('base64')
    entries.push(entry)
    if (stat.isDirectory()) {
      for (const name of fs.readdirSync(filename).sort()) visit(path.join(relative, name))
    }
  }
  visit('')
  return entries
}

test('accepts lowercase ASCII words, digits, and single underscores', t => {
  const root = fixture(t)
  const slugs = ['ckb', '123', 'layer_1', 'layer2_2026', 'what_is_ckb']
  for (const slug of slugs) write(root, `${slug}/index.md`)
  assert.deepEqual(checkArticleSlugs(root), { articleCount: slugs.length, invalidSlugs: [] })
})

test('counts one article per folder, including translation-only folders and supported index casing', t => {
  const root = fixture(t)
  for (const filename of ['index.md', 'index_zh.md', 'index-es.md', 'INDEX_PT-BR.MD']) {
    write(root, `many_languages/${filename}`)
  }
  write(root, 'translation_only/index_zh.md')
  write(root, 'regional_translation/index_zh-Hans.md')
  assert.deepEqual(checkArticleSlugs(root), { articleCount: 3, invalidSlugs: [] })
})

test('ignores root files, nonarticle metadata and scripts, and nested or nonmatching index files', t => {
  const root = fixture(t)
  write(root, 'README.md')
  write(root, 'index.md')
  write(root, 'metadata/catalog.json', '{"articles":[]}\n')
  write(root, 'scripts/check.mjs', 'export {}\n')
  write(root, 'Old-Archive/child/index.md')
  write(root, 'Not-an-Article/index.md.bak')
  write(root, 'Not-an-Article/index_zh_cn.md')
  write(root, 'Not-an-Article/index_.md')
  write(root, 'Not-an-Article/README.md')
  write(root, 'actual_article/index.md')
  assert.deepEqual(checkArticleSlugs(root), { articleCount: 1, invalidSlugs: [] })
})

const invalidNames = [
  'Uppercase_title',
  'article with spaces',
  'hyphenated-article',
  'repeated__underscores',
  '_leading_underscore',
  'trailing_underscore_',
  'contains.terminal',
  '文章标题',
  'encoded%20space',
  'encoded%2Fslash',
]

for (const name of invalidNames) {
  test(`rejects noncanonical article folder ${JSON.stringify(name)}`, t => {
    const root = fixture(t)
    write(root, `${name}/index.md`)
    assert.deepEqual(checkArticleSlugs(root), { articleCount: 1, invalidSlugs: [name] })
  })
}

test('reports every invalid folder alongside valid articles without changing files', t => {
  const root = fixture(t)
  write(root, 'valid_article/index.md', '# Original\n\nOriginal content.\n')
  write(root, 'Another-article/index_es.md')
  write(root, 'bad__slug/index.md')
  write(root, 'metadata/catalog.json', '{"unchanged":true}\n')
  const before = snapshot(root)
  const result = checkArticleSlugs(root)
  assert.equal(result.articleCount, 3)
  assert.deepEqual(new Set(result.invalidSlugs), new Set(['Another-article', 'bad__slug']))
  assert.deepEqual(snapshot(root), before)
  const cli = run(root, [root])
  assert.equal(cli.status, 1)
  assert.match(cli.stderr, /Another-article/)
  assert.match(cli.stderr, /bad__slug/)
  assert.match(cli.stderr, /lowercase.*single underscores/i)
  assert.match(cli.stderr, /approved redirect.*coordinated release/i)
  assert.deepEqual(snapshot(root), before)
})

test('CLI accepts an explicit content root and is read-only on success', t => {
  const root = fixture(t)
  write(root, 'content/first_article/index.md')
  write(root, 'content/second_article/index_es.md')
  const before = snapshot(root)
  const result = run(root, ['content'])
  assert.equal(result.status, 0, result.stderr)
  assert.equal(result.stderr, '')
  assert.match(result.stdout, /passed.*2 folders/i)
  assert.match(result.stdout, /No files changed/i)
  assert.deepEqual(snapshot(root), before)
})

test('CLI default root is the script parent, independent of the working directory', t => {
  const root = fixture(t)
  write(root, 'content/example_article/index.md')
  const copiedScript = write(root, 'content/scripts/check-slugs.mjs', fs.readFileSync(script))
  write(root, 'elsewhere/bad-slug/index.md')
  const before = snapshot(root)
  const result = run(path.join(root, 'elsewhere'), [], copiedScript)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /passed.*1 folders/i)
  assert.deepEqual(snapshot(root), before)
})

test('CLI rejects empty roots rather than reporting a misleading pass', t => {
  const root = fixture(t)
  write(root, 'metadata/catalog.json', '{}\n')
  const result = run(root, [root])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /No article folders found/i)
  assert.doesNotMatch(result.stdout, /passed/i)
})

test('CLI reports missing roots and file roots as errors', t => {
  const root = fixture(t)
  const filename = write(root, 'not_a_directory.md')
  for (const target of [path.join(root, 'missing'), filename]) {
    const result = run(root, [target])
    assert.equal(result.status, 1)
    assert.match(result.stderr, /ENOENT|real directory/i)
    assert.doesNotMatch(result.stdout, /passed/i)
  }
})

test('CLI rejects unsupported flags and extra arguments with usage guidance', t => {
  const root = fixture(t)
  write(root, 'valid_article/index.md')
  for (const args of [[root, 'unexpected'], ['--fix'], ['--help']]) {
    const result = run(root, args)
    assert.equal(result.status, 1)
    assert.match(result.stderr, /Usage:.*check-slugs\.mjs.*content-root/i)
    assert.doesNotMatch(result.stdout, /passed/i)
  }
})

test('rejects a symlink content root and never follows it', t => {
  const root = fixture(t)
  write(root, 'real_content/valid_article/index.md')
  const linkedRoot = path.join(root, 'linked_content')
  fs.symlinkSync(path.join(root, 'real_content'), linkedRoot, 'dir')
  const before = snapshot(root)
  assert.throws(() => checkArticleSlugs(linkedRoot), /symlink/i)
  const result = run(root, [linkedRoot])
  assert.equal(result.status, 1)
  assert.match(result.stderr, /symlink/i)
  assert.deepEqual(snapshot(root), before)
})

test('rejects child directory and file symlinks instead of following or silently ignoring them', t => {
  const root = fixture(t)
  write(root, 'outside/article/index.md')
  const outsideFile = write(root, 'outside/README.md')
  for (const [target, type] of [
    [path.join(root, 'outside/article'), 'dir'],
    [outsideFile, 'file'],
  ]) {
    const content = fs.mkdtempSync(path.join(root, 'content-'))
    write(content, 'valid_article/index.md')
    fs.symlinkSync(target, path.join(content, 'linked_entry'), type)
    const before = snapshot(root)
    assert.throws(() => checkArticleSlugs(content), /symlink.*linked_entry/i)
    assert.deepEqual(snapshot(root), before)
  }
})

test('ignores the .git entry even when it is a symlink', t => {
  const root = fixture(t)
  write(root, 'valid_article/index.md')
  fs.symlinkSync(path.join(root, 'nonexistent_git_target'), path.join(root, '.git'))
  const before = snapshot(root)
  assert.deepEqual(checkArticleSlugs(root), { articleCount: 1, invalidSlugs: [] })
  assert.deepEqual(snapshot(root), before)
})

test('rejects article index symlinks and directories rather than treating them as article files', t => {
  const root = fixture(t)
  const outsideFile = write(root, 'outside.md')
  for (const kind of ['symlink', 'directory']) {
    const content = fs.mkdtempSync(path.join(root, 'content-'))
    const article = path.join(content, 'valid_article')
    fs.mkdirSync(article)
    if (kind === 'symlink') fs.symlinkSync(outsideFile, path.join(article, 'index.md'))
    else fs.mkdirSync(path.join(article, 'index.md'))
    const before = snapshot(root)
    assert.throws(() => checkArticleSlugs(content), /index must be a regular file/i)
    assert.deepEqual(snapshot(root), before)
  }
})
