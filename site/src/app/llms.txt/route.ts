import { getVersion, REPO_URL, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const body = `# Pepper

> Skills that give your agent the context it needs to do its best work. Agents get the one-line task; Pepper gives them the kickoff meeting. Current version: ${getVersion()}.

Pepper is a set of agent skills for Claude Code. Each skill is a short, structured conversation that makes sure your agent has what it needs before it starts.

## Skills

- [pepper-me](${SITE_URL}/skills/pepper-me): Type \`pepper me\`. A kickoff meeting before any task. The agent reads the room, reflects back, asks what's missing, checks for conflicts, and writes a brief you approve. Work starts only after you say yes.
- [pepper-init](${SITE_URL}/skills/pepper-init): Type \`pepper me init\`. Reads your repo, asks only what it can't find, and writes PROJECT.md.

## Install

Claude Code plugin:

\`\`\`
/plugin marketplace add ron-myers/pepper-me
/plugin install pepper-me@pepper-me
\`\`\`

## Links

- [Changelog](${SITE_URL}/changelog)
- [Source and README](${REPO_URL})
- [Skill source: pepper-me](${REPO_URL}/blob/stable/skills/pepper-me/SKILL.md)
- [Skill source: pepper-init](${REPO_URL}/blob/stable/skills/pepper-init/SKILL.md)
- [Contributing](${REPO_URL}/blob/stable/CONTRIBUTING.md)

License: MIT.
`
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
