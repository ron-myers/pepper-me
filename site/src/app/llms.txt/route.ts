import { getVersion, REPO_URL, SITE_URL } from '@/lib/site'

export const dynamic = 'force-static'

export function GET() {
  const body = `# Pepper Me

> Skills that give your agent the context it needs to do its best work. Agents get the one-line task; Pepper Me gives them the kickoff meeting. Current version: ${getVersion()}.

Pepper Me is a set of agent skills. It works in Claude Code, Gemini CLI, GitHub Copilot CLI, Codex, Cursor, Antigravity and Devin CLI. Each skill is a short, structured conversation that makes sure your agent has what it needs before it starts.

## Skills

- [pepper-me](${SITE_URL}/skills/pepper-me): Type \`pepper me\`. A kickoff meeting before any task. The agent reads the room, reflects back, asks what's missing, checks for conflicts, and writes a brief you approve. By default, work starts only after you say yes.
- [pepper-me-init](${SITE_URL}/skills/pepper-me-init): Type \`pepper me init\`. Reads your repo, asks only what it can't find, and writes PROJECT.md.

## Install

Claude Code plugin:

\`\`\`
/plugin marketplace add ron-myers/pepper-me
/plugin install pepper-me@pepper-me
\`\`\`

Gemini CLI:

\`\`\`
gemini extensions install ${REPO_URL}
\`\`\`

GitHub Copilot CLI:

\`\`\`
copilot plugin marketplace add ron-myers/pepper-me
copilot plugin install pepper-me@pepper-me
\`\`\`

Antigravity:

\`\`\`
agy plugin install ${REPO_URL}
\`\`\`

Devin CLI:

\`\`\`
devin plugins install ron-myers/pepper-me
\`\`\`

Codex and Cursor (skills.sh):

\`\`\`
npx skills add ron-myers/pepper-me
\`\`\`

Manual: copy a folder from \`skills/\` into \`~/.claude/skills/\` (Claude Code) or \`~/.agents/skills/\` (Codex).

Each agent has a tool-mapping note in \`skills/*/references/<agent>-tools.md\`. Other-session lookup reads Claude Code transcripts, so it works only in Claude Code.

## Links

- [Changelog](${SITE_URL}/changelog)
- [Source and README](${REPO_URL})
- [Skill source: pepper-me](${REPO_URL}/blob/stable/skills/pepper-me/SKILL.md)
- [Skill source: pepper-me-init](${REPO_URL}/blob/stable/skills/pepper-me-init/SKILL.md)
- [Contributing](${REPO_URL}/blob/stable/CONTRIBUTING.md)

License: MIT.
`
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } })
}
