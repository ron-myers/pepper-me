---
name: pepper-me-init
description: Use when the user says "pepper me init" or "pepper init", asks to set up project context, or wants to refresh PROJECT.md after the project changed.
---

# Pepper Me Init

The first-day-on-the-project conversation, done once, saved to a file. Read the repo first. Ask only what the repo can't answer. Write `PROJECT.md` so every future session starts with the context a new teammate would need. Do not start any other task until the file is approved.

The Red flags table in `references/shared.md` applies here, with `PROJECT.md` approval as the gate.

Pepper Me init records what is true and what is unknown. It does not invent conventions, pick a stack, or design anything.

## 0. Load config and arguments

1. Read `references/shared.md` next to this file now. It holds the shared defaults, tones, session rules, round mechanics and red flags used below.
   - If you are not Claude Code, also read `references/<agent>-tools.md` for your agent (`codex`, `cursor`, `gemini`, `copilot`). It says how to ask questions and what is unavailable.
2. Read `~/.pepper-me/config.json` if it exists, then `.pepper/config.json` in the project on top (project wins). `config.example.json` next to this file documents the `init` block. Shared keys (`preset`, `default_heat`, `default_rigor`, `tone`, `questions_per_round`, `max_questions`, `answer_style`, `recommend`, `research`, `reflect`, `ask_what_i_missed`, `show_progress`, `other_sessions`, `conflict_check`) are described in `references/shared.md`.
3. If neither exists, use the shared defaults in `references/shared.md` plus these:
   - init.path: PROJECT.md
   - init.scan: true
   - init.link_agent_files: ask
   - init.agent_files: ["CLAUDE.md", "AGENTS.md"]
4. Parse arguments after the trigger, any order, all optional:
   - Preset: `quick`, `standard`, `deep`, `audit` (see Presets in `references/shared.md`)
   - Heat: `mild`, `medium`, `hot`
   - Rigor: `gentle`, `firm`, `relentless`
   - Tone: any tone name from Tones in `references/shared.md` (`direct`, `candor`, `friendly`, `coach`, `exec`, `skeptic`, `consultant`, `playful`)
   - `sessions` or `no-sessions` to override other_sessions.enabled for this run
   - `refresh` to force update mode (see section 2)
   Example: `pepper me init hot, relentless, candor`

   Then resolve every setting once with Presets in `references/shared.md`: defaults, then the preset, then the config files, then these arguments.

## 1. Scan silently

Skip this section if `init.scan` is false or `research` is `none`. Otherwise read before asking. With `research: deep`, also follow Research in `references/shared.md`. Record every fact with its source file, and keep it as a candidate, not as truth.

Look for:

- **Purpose and users:** README, docs/, landing copy, package description, marketing pages.
- **Stack and commands:** package.json scripts, Makefile, pyproject, Cargo.toml, go.mod, Gemfile, composer.json, lock files, Dockerfile, `.tool-versions`. Capture the exact install, dev, build, test, and lint commands.
- **Conventions:** lint and format configs, tsconfig, editorconfig, directory layout, naming patterns visible in the code, commit style in `git log`.
- **Verification:** test runner and where tests live, CI config, pre-commit hooks, type checking.
- **Existing agent context:** CLAUDE.md, AGENTS.md, `.cursor/rules`, `.github/copilot-instructions.md`, `.pepper/brief.md`, memory.
- **Other sessions (only if enabled, or `research` is `deep`):** follow Other sessions in `references/shared.md`. Use a few project keywords for any past-chat search.

Read only the sources listed above. Read nothing else unless the user names it. For a monorepo, scan the root and each package manifest, and ask which scope this file covers.

Tell the user in one line what you read ("Read README, package.json, CI config, 40 recent commits") so they know the basis.

## 2. Choose the mode

- **Create:** no `PROJECT.md` at `init.path`. Run the full flow.
- **Update:** the file exists, or the user passed `refresh`. Parse it, including every Decisions row and every item under Open items. Then:
  - Treat every settled answer as settled. Do not ask it again.
  - Re-check scan facts against the file. If the repo now disagrees (new test runner, renamed script), that is a conflict card, not a silent edit.
  - Ask first about Open items, then about anything the user says changed, then about gaps in sections that are empty.
  - If nothing changed and nothing is open, say so and stop. Do not manufacture questions.

## 3. Reflect

If `reflect` is `off`, skip this section. Show no reflection and no check card, and go to section 4. With `every_round`, also follow Reflect in `references/shared.md` after each round.

Open with 4 to 6 lines: "Here's what I read about this project". Cover purpose, users, stack, and the biggest unknown. Then ask with AskUserQuestion:

- "Is this read right?" Options: "Yes, keep going (Recommended)", "Mostly, fix it in the questions", "No, start over".

If "No", ask one open question about what the project is and who it's for, then continue.

## 4. Build the question list

Ask in this order. Finish a layer before starting the next. Skip any layer the scan already settled with high confidence, and turn it into a "confirmed from <source>" line in the file instead.

1. **Purpose:** what this project is for, and what winning looks like.
2. **Users:** who uses it, in what situation, and who the agent's work ultimately serves.
3. **Constraints:** deadlines, budget, compliance, supported platforms, things that cannot change.
4. **Conventions and "never do":** the rules a new teammate would break on day one. Files not to touch, patterns to follow, commands never to run, anything generated.
5. **Verification:** what "it works" means here. Which command proves it, and what reviewers look for.
6. **Working agreements:** how the user wants the agent to behave: when to ask versus proceed, scope of changes, commit and PR habits.

Score each unknown by cost of a wrong guess times how unsure you are. Ask the high scorers. Turn the rest into entries under Open items or stated assumptions.

Heat sets depth only. Rigor sets the pressure (see Rigor in `references/shared.md`).

- **mild:** 1 round. Purpose, users, and the single riskiest unknown.
- **medium:** up to 3 rounds. Layers 1 to 5.
- **hot:** up to 6 rounds. All six layers until the stop test passes.

## 5. Ask in rounds

Follow Round mechanics in `references/shared.md`, including answer style, recommend and progress. Always use AskUserQuestion, except for the plain-text questions that `answer_style` calls for. When the guess came from a file, cite it in the option description: "From package.json scripts", "From CI config".

Questions must be about this project, never generic. "Your CI runs `pnpm test` but package.json has no `test` script. Which is right?" beats "What's your test command?"

## 6. Conflict check (after every round)

If `conflict_check.enabled`, compare each new answer and each scan fact against: earlier answers, existing agent context files, memory, and the repo's actual behavior.

- **Hard:** both can't be true. Ask a conflict card right away, quoting both sides with sources. Options: "New answer wins", "Earlier wins (source)", "Both, I'll explain", "The repo is out of date".
- **Soft:** log it under Open items as `open`, with both sources. Do not interrupt.

Never silently pick a winner. When the user says the repo is out of date, add an Open item to fix that file.

## 7. Messy answers

- **Vague:** follow Rigor in `references/shared.md`. Log assumptions under Unconfirmed or Open items.
- **Skipped:** record under Open items.
- **"You decide":** make the call, record it in Decisions as delegated, with one line of reasoning.
- **"go", "enough", "write it":** stop asking and write the file.

## 8. Stop test

Stop when all hold, or the heat limit or `max_questions` is reached:

- purpose and users are settled
- every high-risk unknown has an answer or an Open item
- no hard conflicts are open
- the build, test, and run commands are confirmed or listed as open

Then ask the closing cards (see Closing cards in `references/shared.md`):

- If `ask_what_i_missed` is `end` or `every_round`, ask: "Anything I didn't ask that a new teammate should know?" Options: "No, write it (Recommended)", "Yes".
- If rigor is `relentless`, then ask the fail card: "What's the mistake people make here most often?" Options: "Nothing comes to mind, write it (Recommended)", "Something does" (user types it in Other). Log the answer under Never do or Open items. It runs at any heat.

## 9. Write PROJECT.md

### Rules

- Plain, factual, short. Short sentences. No marketing voice, no filler. The tone setting affects questions only, never the file.
- Every section is for a reader who is an agent starting cold. Prefer exact commands, paths and names over description.
- Drop any section with nothing in it. Never show empty headings.
- Facts the user confirmed are written as fact. Facts only the scan found and the user never confirmed go under "Unconfirmed". Facts nobody knows go under Open items. Never present a guess as a fact.
- The file should stay under about 150 lines. Link to docs instead of copying them.

### Format

```markdown
---
pepper_context: v1
version: 1
created: <ISO date>
updated: <ISO date>
heat: <mild|medium|hot>
status: draft
---

# <Project name>

## Purpose
<What this is for and what winning looks like, in 2 to 4 lines.>

## Users
- <Who, and in what situation>

## Stack and commands
| Task | Command |
|---|---|
| Install | `...` |
| Dev | `...` |
| Build | `...` |
| Test | `...` |
| Lint | `...` |

<One line per major technology. Versions only when a manifest or lockfile pins one.>

## Conventions
- <Rule a new teammate would otherwise break>

## Constraints
- <Hard limit, with the reason>

## Never do
- <Thing agents must not do, with the reason>

## Verification
<What "done" means here. Which command proves it. What reviewers look at.>

## Working agreements
- <How to behave: when to ask, scope of changes, commit and PR habits>

## Unconfirmed
- <Fact found by scan, not confirmed> (source: <file>)

## Open items
- [ ] <Unknown or conflict> (open since <date>, source: <file or "asked, skipped">)

## Decisions
| # | Date | Decision | Answer | Source |
|---|------|----------|--------|--------|
```

### Save and version

- Write to `init.path` after approval. If the folder isn't writable, show the file in chat.
- In update mode, increment `version`, set `updated`, and append to Decisions. Never delete or rewrite an earlier Decisions row. If an answer changes, add a new row that says "changed from #N".
- Resolved Open items become Decisions rows and the checkbox line is removed. Items the user wants to keep unresolved stay marked.
- `pepper_context` is the format version. Never change it.

### Approve

Show the file (in update mode, show a diff-style summary of what changes). Then ask with AskUserQuestion: "Approve and write (Recommended)", "Edit something", "Pepper me more". On approval set `status: approved` and write it.

## 10. Link the agent files

After writing, make sure agents actually read `PROJECT.md`. Follow `init.link_agent_files`:

- `ask` (default): if any file in `init.agent_files` exists and doesn't already contain the block below, ask with AskUserQuestion: "Add a pointer to PROJECT.md in <file>? (Recommended)", "No, I'll do it", "Never ask again" (set `link_agent_files` to `never` in `.pepper/config.json`).
- `auto`: add it without asking.
- `never`: skip.

If none of the files exist, ask whether to create `AGENTS.md` containing only the block. Never create CLAUDE.md or AGENTS.md without asking.

The block is the only thing you ever add to those files. Append it at the end. Never edit or reformat anything else in them.

```markdown
<!-- pepper-me-init:start -->
Read `PROJECT.md` before starting work. It holds this project's purpose, commands, conventions and open questions. Items under "Open items" are unresolved: ask the user instead of guessing.
<!-- pepper-me-init:end -->
```

If the markers already exist, replace only what is between them.

## 11. Finish

End with 3 lines at most:

- the path written and its version
- the number of Open items, if any
- one suggested next step: `pepper me` for the first task, or "fix the stale README line" if a conflict resolved as out of date

Then stop. Do not begin work.

## 12. Fallback

- If AskUserQuestion isn't available, ask in plain text as described in Round mechanics in `references/shared.md`.
- Subagent and session-lookup failures: follow Other sessions in `references/shared.md`.
- If `references/shared.md` can't be read, say so in one line and stop. Do not guess its rules.
