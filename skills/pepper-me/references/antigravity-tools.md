# Antigravity tool mapping

Both skills are written for Claude Code. On Antigravity these parts resolve differently.

## Asking questions

The Antigravity SDK docs list an `ask_question` tool ("Prompt user for input"), but no option or multiple-choice schema is documented. Use the plain-text fallback in Round mechanics in `shared.md`: numbered questions, lettered options, recommended option marked. If your session exposes `ask_question` or another structured question tool with options, you may use it with the same options.

## Instructions file

When `pepper-me-init` links `PROJECT.md` from an agent file in `init.agent_files`, on Antigravity that is `AGENTS.md` in the workspace, which is already in the default list.

## Other sessions

The transcript path `~/.claude/projects/*/*.jsonl` is a Claude Code path. It does not exist here. Leave `other_sessions.enabled` false, or say in one line that the lookup is not available and continue with repo and memory only.

## Subagents

Where a skill says "use a subagent", call `invoke_subagent` with the prompt. If you have no subagent tool, follow the fallback in Other sessions in `shared.md`.
