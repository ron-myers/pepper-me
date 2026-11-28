---
name: pepper-me
description: Use when the user says "pepper me", asks to be interviewed before a task, or wants to clarify intent first. Not for "pepper me init" or "pepper init", which belong to the pepper-me-init skill.
---

# Pepper Me

A 30-minute intent session, compressed. Find out what the user wants before doing anything. Ask only what you can't find yourself. Catch conflicts. End with a brief the user approves. Do not start the actual task until the brief is approved.

## 0. Load config and arguments

1. Read `~/.pepper-me/config.json` if it exists. Then read `.pepper/config.json` in the current project and merge it on top (project wins). `config.example.json` next to this file documents every option.
2. If neither exists, use these defaults:
   - default_heat: medium
   - tone: direct
   - questions_per_round: 4
   - ask_what_i_missed: true
   - other_sessions.enabled: false (lookback_hours 24, max_sessions 10, include_past_chats true)
   - conflict_check.enabled: true, ask_on: hard, log_soft: true
   - brief: size auto, save true, path .pepper/brief.md, versioning true
3. Parse arguments after the trigger. Any order, all optional:
   - Heat: `mild`, `medium`, `hot`
   - Tone: any tone name from section 9
   - Brief size: `line`, `card`, `page`, `full`
   - `sessions` or `no-sessions` to override other_sessions.enabled for this run
   Example: `pepper me hot, candor, full`

## 1. Gather context silently

Before asking anything, collect what is already known. Record every fact with its source.

- **This session:** everything the user has said so far, attachments, and the task they want done.
- **Repo / working folder:** `PROJECT.md` first if it exists (written by pepper-me-init). Treat its settled facts as known: never ask project-level questions it answers, and treat its "Open items" as candidate questions when they bear on this task. Then README, CLAUDE.md, AGENTS.md, docs/, package or config files, and any existing `.pepper/brief.md`. Use the `conflict_check.repo_files` list when set, and always include `PROJECT.md`. Skim, don't read everything.
- **Memory:** any stored context about the user, their projects and preferences.
- **Other sessions (only if enabled):**
  - Claude Code: transcripts under `~/.claude/projects/*/*.jsonl` modified within `lookback_hours`. Skip the current session. Respect `only_projects` and `skip_projects` (match on the project folder name). Cap at `max_sessions`, newest first.
  - Read **user messages only**, never assistant messages. You want answers the user gave, not suggestions Claude made.
  - Claude app: if `include_past_chats` is true and past-chat search tools exist, search them with a few content keywords from the task.
  - Use a subagent for the transcript search when one is available so raw transcripts stay out of the main context.

Never ask a question the context already answers. Don't block on slow lookups. Ask questions that don't depend on them first.

## 2. Reflect first

Open with 3 to 4 lines: "Here's what I think you want", covering goal, audience, what done looks like, and the biggest unknown. Then ask with AskUserQuestion:

- "Is this read right?" Options: "Yes, keep going (Recommended)", "Mostly, fix it in the questions", "No, start over".

If "No", ask one open question about the goal before continuing.

## 3. Build the question list

Work in layers. Finish intent before moving to details.

1. **Intent:** why this matters, who it's for, what done looks like.
2. **Scope:** what's in, what's out, what form the output takes.
3. **Constraints:** time, budget, tools, style, people involved.
4. **Risks:** what would make this fail, what's been tried.
5. **Preferences:** tone, format, level of polish.

Score each unknown by cost of a wrong guess times how unsure you are. Ask the high scorers. Turn low scorers into stated assumptions instead of questions.

Heat sets the depth:

- **mild:** 1 round. Intent only plus the single riskiest unknown.
- **medium:** up to 3 rounds. Intent, scope, key constraints.
- **hot:** up to 8 rounds. All five layers, until the stop test passes.

## 4. Ask in rounds

Always use AskUserQuestion. Each call holds up to `questions_per_round` questions (tool max is 4).

- Group questions that don't depend on each other. Hold dependent questions for the next round.
- Each question gets 2 to 4 options. Put your best guess first and add "(Recommended)" to its label.
- When the best guess came from another source, say so in the option description: "From your Paytic session, 2h ago" or "From README.md". The user still confirms it. Never accept it silently.
- Offer "You decide" as an option where the call is low stakes.
- Headers 12 characters max. Each question must make sense on its own.
- Use multiSelect when several answers can apply.
- No acknowledgment filler between rounds. The next card is the acknowledgment.
- After each round, recompute what's unlocked and ask the next round.

## 5. Conflict check (after every round)

If `conflict_check.enabled`, compare each new answer against the sources listed in `conflict_check.sources` (default: all of them):

- earlier answers in this run and the reflection
- what the user said earlier in this session
- other sessions (if enabled)
- memory
- repo context: docs, CLAUDE.md, configs, existing briefs, and how the code actually behaves

Classify each conflict:

- **Hard:** both can't be true, or the difference changes the work. Ask a conflict card right away. Quote both sides with sources: "You said launch is for investors. CLAUDE.md says the audience is customers. Which wins?" Options: "New answer wins", "Earlier wins (source)", "Both, I'll explain", "The repo is out of date".
- **Soft:** tension, ambiguity, or a minor mismatch. Don't interrupt. Log it in the brief under Conflicts.

If `ask_on` is `all`, ask about soft conflicts too. Never silently pick a winner. When the user says the repo is out of date, add a follow-up item to the brief to fix that file.

## 6. Messy answers

- **Vague:** rephrase once with sharper options. If still vague, log your best reading as an assumption.
- **Skipped:** log as an assumption and move on.
- **"You decide":** make the call, log it as a delegated decision with your reasoning in one line.
- **"go", "enough", "write it":** stop asking immediately and write the brief.

## 7. Stop test

Stop when all of these hold, or the heat limit is reached:

- every high-risk unknown has an answer or a logged assumption
- no hard conflicts are open
- intent (why, who, done) is settled

If `ask_what_i_missed` is true, ask one final card: "Anything I didn't ask that matters?" Options: "No, write the brief (Recommended)", "Yes" (user types it in Other). On hot, also ask "What would make this fail?"

## 8. Red flags

Do not start the task until the brief has `status: approved`.

| Thought | Reality |
|---|---|
| "The task is small, skip the interview." | Size sets the brief size, not whether to ask. Run a mild round. |
| "Memory already answers this." | Memory is a source, not an answer. Cite it in an option and let the user confirm. |
| "The user sounds impatient, I'll start." | Only "go", "enough" or "write it" stops the questions. |
| "The brief is obvious, skip approval." | No approval, no task. Ask the approve card. |
| "This conflict is minor, I'll pick one." | Hard conflicts get a card. Soft ones get logged. Never pick silently. |

## 9. Tone

Apply the configured tone to question wording and the reflection. The brief itself stays plain in every tone.

- **direct:** shortest wording, no warm-up. "Who reads this?"
- **candor:** radical candor. Cares, but names weak spots. "This goal is vague. What does winning look like in numbers?"
- **friendly:** warm and relaxed. "Quick one, who's this for?"
- **coach:** Socratic. Helps the user think. "What would you tell a founder who asked you this?"
- **exec:** board-meeting style. Decisions and tradeoffs only. "Speed or polish? Pick one."
- **skeptic:** devil's advocate. Tests assumptions. "Why would anyone pay for this?"
- **consultant:** structured and thorough. "Audience first, then scope, then risks."
- **playful:** light and quick, for creative work. "Gut call, bold or safe?"

## 10. The brief

### Size

With `size: auto`, pick from heat and task size:

- mild, or a small task: **line** or **card**
- medium: **card** or **page**
- hot, or a multi-part project: **page** or **full**

Sizes:

- **line:** one sentence. Goal plus done looks like.
- **card:** goal, audience, done looks like, constraints, assumptions.
- **page:** card plus out of scope, conflicts, open questions.
- **full:** page plus risks, decision log, stakeholders, milestones, follow-ups.

Drop any section with nothing in it. Never show empty headings.

### Format

```markdown
---
pepper_brief: v1
version: 1
created: <ISO date>
heat: <mild|medium|hot>
size: <line|card|page|full>
task: <one line>
status: draft
---

# Brief: <task>

**Goal:** ...
**Audience:** ...
**Done looks like:** ...

## Constraints
- ...

## Out of scope
- ...

## Assumptions
- <assumption> (skipped | delegated | low-risk)

## Conflicts
- <conflict>: resolved as <choice> (sources)
- <soft conflict>: open

## Open questions
- ...

## Risks
- ...

## Decision log
| # | Decision | Answer | Source |
|---|----------|--------|--------|

## Stakeholders
- ...

## Milestones
- ...

## Follow-ups
- ...
```

If `brief.template` points to a file, use its sections instead and keep the frontmatter.

### Save and version

- If `brief.save` is true and the folder is writable, save to `brief.path`. Otherwise show the brief in chat.
- If a brief already exists and `versioning` is true, increment `version` (2, 3). `pepper_brief` is the format version. Never change it. Keep the old decision log and append new entries. Never overwrite earlier decisions without logging the change.

### Approve

Show the brief, then ask with AskUserQuestion: "Approve and start (Recommended)", "Edit something", "Pepper me more". Set `status: approved` in the frontmatter on approval, then start the task from the brief.

## 11. Mid-task

If the work drifts from the approved brief, or the user runs pepper me again mid-task, run one mild round on the drift only, check conflicts against the brief, and bump the version.

## 12. Fallback

If AskUserQuestion isn't available, ask in plain text: numbered questions, lettered options, recommended option marked, up to 4 per message. The user can reply "1a 2c 3b".
