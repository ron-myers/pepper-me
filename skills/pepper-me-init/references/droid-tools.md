# Factory Droid tool mapping

Both skills are written for Claude Code. On Factory Droid these parts resolve differently.

## Asking questions

Droid has an `AskUser` tool, but its docs give no option or multiple-choice schema. Use the plain-text fallback in Round mechanics in `shared.md`: numbered questions, lettered options, recommended option marked. If `AskUser` takes options in your session, you may use it with the same options. Subagents cannot use it.

## Instructions file

When `pepper-me-init` links `PROJECT.md` from an agent file in `init.agent_files`, on Droid that is `AGENTS.md`, which is already in the default list.

## Other sessions

The transcript path `~/.claude/projects/*/*.jsonl` is a Claude Code path. It does not exist here. Leave `other_sessions.enabled` false, or say in one line that the lookup is not available and continue with repo and memory only.

## Subagents

Where a skill says "use a subagent", call the `Task` tool with `subagent_type: "explorer"` (or `"worker"` if it must write), a description and the prompt. Read the result with `TaskOutput`. If you have no subagent tool, follow the fallback in Other sessions in `shared.md`.
