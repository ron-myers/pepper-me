# Codex tool mapping

Both skills are written for Claude Code. On Codex these parts resolve differently.

## Asking questions

Use the plain-text fallback in Round mechanics in `shared.md`: numbered questions, lettered options, recommended option marked. If your session exposes a structured question tool, you may use it with the same options.

## Instructions file

When `pepper-me-init` links `PROJECT.md` from an agent file in `init.agent_files`, on Codex that is `AGENTS.md`.

## Other sessions

The transcript path `~/.claude/projects/*/*.jsonl` is a Claude Code path. It does not exist here. Leave `other_sessions.enabled` false, or say in one line that the lookup is not available and continue with repo and memory only.

## Subagents

Where a skill says "use a subagent", use your multi-agent tools if they are enabled in your Codex config. If you have no subagent tool, follow the fallback in Other sessions in `shared.md`.
