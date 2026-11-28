# Devin CLI tool mapping

Both skills are written for Claude Code. On Devin CLI these parts resolve differently.

## Asking questions

Devin CLI has an `ask_user_question` tool, but its docs give no option or multiple-choice schema. Use the plain-text fallback in Round mechanics in `shared.md`: numbered questions, lettered options, recommended option marked. If `ask_user_question` takes options in your session, you may use it with the same options.

## Instructions file

When `pepper-me-init` links `PROJECT.md` from an agent file in `init.agent_files`, on Devin CLI that is `AGENTS.md` at the project root, which is already in the default list.

## Other sessions

The transcript path `~/.claude/projects/*/*.jsonl` is a Claude Code path. It does not exist here. Leave `other_sessions.enabled` false, or say in one line that the lookup is not available and continue with repo and memory only.

## Subagents

Where a skill says "use a subagent", call `run_subagent` with a profile (`subagent_explore` for read-only search) and the prompt, then read the result with `read_subagent`. If you have no subagent tool, follow the fallback in Other sessions in `shared.md`.
