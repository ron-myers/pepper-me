# Shared rules

Rules used by both `pepper-me` and `pepper-me-init`. This file is copied into each skill at `references/shared.md`. Edit both copies together.

## Shared config keys

These keys behave the same in both skills: `default_heat`, `tone`, `questions_per_round`, `ask_what_i_missed`, `other_sessions`, `conflict_check`.

Defaults when no config file sets them:

- default_heat: medium
- tone: direct
- questions_per_round: 4
- ask_what_i_missed: true
- other_sessions.enabled: false (lookback_hours 24, max_sessions 10, include_past_chats true)
- conflict_check.enabled: true, ask_on: hard, log_soft: true

## Tones

Apply the configured tone to question wording and the reflection. The written file stays plain in every tone.

- **direct:** shortest wording, no warm-up. "Who reads this?"
- **candor:** radical candor. Cares, but names weak spots. "This goal is vague. What does winning look like in numbers?"
- **friendly:** warm and relaxed. "Quick one, who's this for?"
- **coach:** Socratic. Helps the user think. "What would you tell a founder who asked you this?"
- **exec:** board-meeting style. Decisions and tradeoffs only. "Speed or polish? Pick one."
- **skeptic:** devil's advocate. Tests assumptions. "Why would anyone pay for this?"
- **consultant:** structured and thorough. "Audience first, then scope, then risks."
- **playful:** light and quick, for creative work. "Gut call, bold or safe?"

## Other sessions

Only when `other_sessions.enabled` is true.

- Claude Code: transcripts under `~/.claude/projects/*/*.jsonl` modified within `lookback_hours`. Skip the current session. Respect `only_projects` and `skip_projects`. Each entry matches if it appears anywhere in the project folder name (substring, case-sensitive). For example, `pepper-me` matches `-Users-name-conductor-workspaces-pepper-me-zurich-v2`. An empty `only_projects` reads all projects. A folder that matches both lists is skipped. An empty string entry is ignored. Cap at `max_sessions`, newest first.
- Read **user messages only**, never assistant messages. You want answers the user gave, not suggestions Claude made.
- Claude app: if `include_past_chats` is true and past-chat search tools exist, search them with a few content keywords from the task or project.
- Use a subagent for the transcript search when one is available so raw transcripts stay out of the main context.
- If there is no subagent tool, read at most 3 transcripts yourself (or `max_sessions` if lower), user messages only.
- If the session lookup fails or returns nothing, say so in one line. Then continue with repo and memory only.

## Round mechanics

Always use AskUserQuestion. Each call holds up to `questions_per_round` questions (tool max is 4).

- Group questions that don't depend on each other. Hold dependent questions for the next round.
- Each question gets 2 to 4 options. Put your best guess first and add "(Recommended)" to its label.
- When the best guess came from another source, say so in the option description: "From your last session, 2h ago" or "From README.md". The user still confirms it. Never accept it silently.
- Offer "You decide" as an option when a wrong answer can be changed in one edit.
- Headers 12 characters max. Each question must make sense on its own.
- Use multiSelect when several answers can apply.
- No acknowledgment filler between rounds. The next card is the acknowledgment.
- After each round, recompute what's unlocked and ask the next round.

If AskUserQuestion isn't available, ask in plain text: numbered questions, lettered options, recommended option marked, up to 4 per message. The user can reply "1a 2c 3b".

## Red flags

Do not start the task until the file has `status: approved`. For `pepper-me` that file is the brief. For `pepper-me-init` it is `PROJECT.md`.

| Thought | Reality |
|---|---|
| "The task is small, skip the interview." | Task size does not decide whether to ask. Run a mild round. |
| "Memory already answers this." | Memory is a source, not an answer. Cite it in an option and let the user confirm. |
| "The user sounds impatient, I'll start." | Only "go", "enough" or "write it" stops the questions. |
| "The file is obvious, skip approval." | No approval, no task. Ask the approve card. |
| "This conflict is minor, I'll pick one." | Hard conflicts get a card. Soft ones get logged. Never pick silently. |
