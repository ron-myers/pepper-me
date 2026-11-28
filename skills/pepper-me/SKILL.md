---
name: pepper-me
description: Use when the user says "pepper me", asks to be interviewed before a task, or wants to clarify intent first. Not for "pepper me init" or "pepper init", which belong to the pepper-me-init skill.
---

# Pepper Me

A 30-minute intent session, compressed. Find out what the user wants before doing anything. Ask only what you can't find yourself. Catch conflicts. End with a brief the user approves. Do not start the actual task until the brief is approved.

## 0. Load config and arguments

1. Read `references/shared.md` next to this file now. It holds the shared defaults, tones, session rules, round mechanics and red flags used below.
   - If you are not Claude Code, also read `references/<agent>-tools.md` for your agent (`codex`, `cursor`, `gemini`, `copilot`). It says how to ask questions and what is unavailable.
2. Read `~/.pepper-me/config.json` if it exists. Then read `.pepper/config.json` in the current project and merge it on top (project wins). `config.example.json` next to this file documents every option.
3. If neither exists, use the shared defaults in `references/shared.md` plus these:
   - brief: size auto, save true, path .pepper/brief.md, versioning true, auto_start false
   - after_task.run: null
   - conflict_check.repo_files: README.md, CLAUDE.md, AGENTS.md, docs/, .pepper/brief.md (`PROJECT.md` is always included)
4. Parse arguments after the trigger. Any order, all optional:
   - Preset: `quick`, `standard`, `deep`, `audit` (see Presets in `references/shared.md`)
   - Heat: `mild`, `medium`, `hot`
   - Rigor: `gentle`, `firm`, `relentless`
   - Tone: any tone name from Tones in `references/shared.md`
   - Brief size: `line`, `card`, `page`, `full`
   - `sessions` or `no-sessions` to override other_sessions.enabled for this run
   - `auto` or `no-auto` to override brief.auto_start for this run
   - `after:<name>` or `no-after` to override after_task.run for this run
   Example: `pepper me hot, relentless, candor, full`

   Then resolve every setting once with Presets in `references/shared.md`: defaults, then the preset, then the config files, then these arguments.
5. Resolve auto start once. It is on if `brief.auto_start` is true, or if `auto` was passed. `no-auto` turns it off. Sections 8, 10 and 11 say "auto start is on" for this result.
6. Resolve the follow-up once. It is `<name>` if `after:<name>` was passed, even when `after_task.run` is null. Otherwise it is `after_task.run`. `no-after` clears it, wins if `after:<name>` is also passed, and does nothing when none is set. An empty string in `after_task.run` counts as null. Section 11a says "the follow-up" for this result.

## 1. Gather context silently

Before asking anything, collect what is already known. Record every fact with its source. How far to look depends on `research` (see Research in `references/shared.md`). With `none`, skip the repo, memory and session reads below and use only this session.

- **This session:** everything the user has said so far, attachments, and the task they want done. If the trigger has no task text after it (a bare `pepper me`), follow section 1a.
- **Repo / working folder:** `PROJECT.md` first if it exists (written by pepper-me-init). Treat its settled facts as known: never ask project-level questions it answers, and treat its "Open items" as candidate questions when they bear on this task. Then read at most the files in `conflict_check.repo_files`, plus the README and manifest files (package or config files).
- **Memory:** any stored context about the user, their projects and preferences.
- **Other sessions (only if enabled, or `research` is `deep`):** follow Other sessions in `references/shared.md`.

Never ask a question the context already answers. Build the reflection and ask round 1 from this session, the repo and memory only. Add other-session and past-chat results from round 2 on, if they have arrived.

## 1a. Bare trigger

If the user says only `pepper me` (arguments at most, no task text), the recent chat is the task. If an approved brief already exists for this task, section 11 applies instead.

- Collect the questions, clarifications and options your last messages raised. Drop any the user already answered.
- Make them the first questions of round 1, ahead of your own. Follow Round mechanics in `references/shared.md`: fit options to 2 to 4 with your best guess first, and carry overflow questions to the next round.
- Build the reflection in section 2 from that chat (skip it if `reflect` is `off`).
- If your recent messages raised no questions, use the chat as context and continue as usual.
- If the chat holds no task either, ask one open question about the goal, as in section 2.

## 2. Reflect first

If `reflect` is `off`, skip this section. Show no reflection and no check card, and go to section 3. With `every_round`, also follow Reflect in `references/shared.md` after each round.

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

Heat sets the depth only. Rigor sets the pressure (see Rigor in `references/shared.md`).

- **mild:** 1 round. Intent only plus the single riskiest unknown.
- **medium:** up to 3 rounds. Intent, scope, key constraints.
- **hot:** up to 8 rounds. All five layers, until the stop test passes.

## 4. Ask in rounds

Follow Round mechanics in `references/shared.md`, including answer style, recommend and progress. Always use AskUserQuestion, except for the plain-text questions that `answer_style` calls for.

## 5. Conflict check (after every round)

If `conflict_check.enabled`, compare each new answer against the sources listed in `conflict_check.sources` (default: all of them):

- earlier answers in this run and the reflection
- what the user said earlier in this session
- other sessions (if enabled)
- memory
- repo context: docs, CLAUDE.md, configs, existing briefs, and how the code actually behaves

Classify each conflict:

- **Hard:** both can't be true, or the difference changes the work. Ask a conflict card right away. Quote both sides with sources: "You said launch is for investors. CLAUDE.md says the audience is customers. Which wins?" Options: "New answer wins", "Earlier wins (source)", "Both, I'll explain", "The repo is out of date".
- **Soft:** tension, ambiguity, or a mismatch that does not change the work. Don't interrupt. Log it in the brief under Conflicts.

If `ask_on` is `all`, ask about soft conflicts too. Never silently pick a winner. When the user says the repo is out of date, add a follow-up item to the brief to fix that file.

## 6. Messy answers

- **Vague:** follow Rigor in `references/shared.md`.
- **Skipped:** log as an assumption and move on.
- **"You decide":** make the call, log it as a delegated decision with your reasoning in one line.
- **"go", "enough", "write it":** stop asking immediately and write the brief.

## 7. Stop test

Stop when all of these hold, or the heat limit or `max_questions` is reached:

- every high-risk unknown has an answer or a logged assumption
- no hard conflicts are open
- intent (why, who, done) is settled

Then ask the closing cards (see Closing cards in `references/shared.md`):

- If `ask_what_i_missed` is `end` or `every_round`, ask: "Anything I didn't ask that matters?" Options: "No, write the brief (Recommended)", "Yes" (user types it in Other).
- If rigor is `relentless`, then ask the fail card: "What would make this fail?" Options: "Nothing comes to mind, write the brief (Recommended)", "Something does" (user types it in Other). Log the answer under Risks. It runs at any heat.

## 8. Red flags

Do not start the task until the brief has `status: approved`. The Red flags table in `references/shared.md` applies. The only exception is auto start being on (see section 0 and Approve in section 10).

## 9. Tone

Apply the configured tone from Tones in `references/shared.md` to question wording and the reflection. Tone changes words only, never how hard you press. The brief itself stays plain in every tone.

## 10. The brief

### Size

With `size: auto`, pick from heat:

- mild: **line** or **card**
- medium: **card** or **page**
- hot: **page** or **full**

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

If auto start is on, do not ask. The setting is the approval:

- Write or show the brief as above, with `status: approved` in the frontmatter.
- Show the brief in chat even when it is saved to a file.
- Start the task from the brief right away.
- If a hard conflict is still open (the user said "go" early), start anyway and list it under Conflicts in the brief.

## 11. Mid-task

If the work drifts from the approved brief, or the user runs pepper me again mid-task, run one mild round on the drift only, check conflicts against the brief, and bump the version. If auto start is on, the bumped brief is approved without a card. Show it in chat and continue.

## 11a. After the task

Applies only when a follow-up is set (section 0). With none set, do nothing here.

- When the task is finished, check the result against "Done looks like" in the brief.
- If it passes, run the follow-up skill or command on the result. The setting is the consent, with no extra confirm, even if the follow-up publishes.
- Run it once, at the end of the task. A mid-task brief bump does not run it early.
- Report the outcome in one or two lines.
- If the skill or command is not installed, say so in one line and skip it. Do not guess a substitute.
- If the user stopped or abandoned the task, or the check fails, skip the follow-up and say so in one line.
- It works the same with auto start on or off.

## 12. Fallback

- If AskUserQuestion isn't available, ask in plain text as described in Round mechanics in `references/shared.md`.
- Subagent and session-lookup failures: follow Other sessions in `references/shared.md`.
- If `references/shared.md` can't be read, say so in one line and stop. Do not guess its rules.
