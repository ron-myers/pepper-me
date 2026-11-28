# Gemini CLI tool mapping

Both skills are written for Claude Code. On Gemini CLI these parts resolve differently.

## Asking questions

Use `ask_user`. It poses structured questions with text, single-select or multi-select answers, so it takes the place of AskUserQuestion. Keep the same options, ordered and labelled per `recommend`.

## Instructions file

When `pepper-me-init` links `PROJECT.md` from an agent file in `init.agent_files`, on Gemini CLI that is `GEMINI.md`. The extension loads it for you. `init.agent_files` does not list it by default, so treat `GEMINI.md` as an agent file for this run and add it to the list. Otherwise `PROJECT.md` is never linked.

## Other sessions

The transcript path `~/.claude/projects/*/*.jsonl` is a Claude Code path. It does not exist here. Leave `other_sessions.enabled` false, or say in one line that the lookup is not available and continue with repo and memory only.

## Subagents

Where a skill says "use a subagent", call `invoke_agent` with `agent_name: "generalist"` and the prompt. If you have no subagent tool, follow the fallback in Other sessions in `shared.md`.
