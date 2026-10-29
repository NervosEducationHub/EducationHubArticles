import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const articleFile = /^index(?:[_-][A-Za-z0-9-]+)?\.md$/i
const validSlug = /^[a-z0-9]+(?:_[a-z0-9]+)*$/

// Inspect source folders, not the generated catalog: this must catch a new
// article before anyone prepares its metadata. Never rename content here.
export function checkArticleSlugs(root) {
  const stat = fs.lstatSync(root)
  if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw new Error('The content root must be a real directory, not a symlink.')
  }
  let articleCount = 0
  const invalidSlugs = []
  for (const entry of fs.readdirSync(root, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (entry.name === '.git') continue
    if (entry.isSymbolicLink()) throw new Error(`Refusing to follow a symlink: ${JSON.stringify(entry.name)}`)
    if (!entry.isDirectory()) continue
    const files = fs.readdirSync(path.join(root, entry.name), { withFileTypes: true })
    const indexes = files.filter(file => articleFile.test(file.name))
    if (!indexes.length) continue
    if (indexes.some(file => !file.isFile())) {
      throw new Error(`Article index must be a regular file: ${JSON.stringify(entry.name)}`)
    }
    articleCount++
    if (!validSlug.test(entry.name)) invalidSlugs.push(entry.name)
  }
  return { articleCount, invalidSlugs }
}

const filename = fileURLToPath(import.meta.url)
let entrypoint
try {
  // Node resolves import.meta.url through symlinked parents (e.g. macOS /tmp).
  if (process.argv[1]) entrypoint = fs.realpathSync(process.argv[1])
} catch {
  // An importer need not expose a filesystem entrypoint.
}
if (entrypoint === filename) {
  try {
    const args = process.argv.slice(2)
    if (args.length > 1 || args[0]?.startsWith('-')) {
      throw new Error('Usage: node scripts/check-slugs.mjs [content-root]')
    }
    const root = args.length ? path.resolve(args[0]) : path.resolve(path.dirname(filename), '..')
    const { articleCount, invalidSlugs } = checkArticleSlugs(root)
    if (!articleCount) throw new Error('No article folders found. Check the content root and checkout.')
    if (invalidSlugs.length) {
      throw new Error(
        `Invalid article folder names:\n${invalidSlugs.map(slug => `  ${JSON.stringify(slug)}`).join('\n')}\n` +
          'Use lowercase ASCII letters and numbers, with single underscores between words. ' +
          'Do not rename an already published article without an approved redirect and coordinated release.',
      )
    }
    console.log(`Article slug check passed: ${articleCount} folders. No files changed.`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
