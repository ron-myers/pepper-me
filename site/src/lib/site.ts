import fs from 'node:fs'
import path from 'node:path'

const repoRoot = path.resolve(process.cwd(), '..')

export const REPO_URL = 'https://github.com/ron-myers/pepper-me'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.pepperme.dev'

export function getVersion(): string {
  const raw = fs.readFileSync(path.join(repoRoot, '.claude-plugin/plugin.json'), 'utf8')
  return JSON.parse(raw).version as string
}

export function getChangelog(): string {
  return fs.readFileSync(path.join(repoRoot, 'CHANGELOG.md'), 'utf8')
}

export const INSTALL = {
  plugin: `/plugin marketplace add ron-myers/pepper-me
/plugin install pepper-me@pepper-me`,
  skills: `npx skills add ron-myers/pepper-me`,
  gemini: `gemini extensions install ${REPO_URL}`,
  copilot: `copilot plugin marketplace add ron-myers/pepper-me
copilot plugin install pepper-me@pepper-me`,
  codex: `npx skills add ron-myers/pepper-me`,
  cursor: `npx skills add ron-myers/pepper-me`,
  antigravity: `agy plugin install ${REPO_URL}`,
  devin: `devin plugins install ron-myers/pepper-me`,
  droid: `droid plugin marketplace add ron-myers/pepper-me
droid plugin install pepper-me@pepper-me`,
  manual: `# copy any folder from skills/ into ~/.claude/skills/
git clone ${REPO_URL}.git
cp -r pepper-me/skills/pepper-me ~/.claude/skills/`,
}
