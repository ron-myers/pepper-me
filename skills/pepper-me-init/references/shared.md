# Shared rules

Rules used by both `pepper-me` and `pepper-me-init`. This file is copied into each skill at `references/shared.md`. Edit both copies together.

## Shared config keys

These keys behave the same in both skills: `preset`, `default_heat`, `default_rigor`, `tone`, `questions_per_round`, `max_questions`, `answer_style`, `recommend`, `research`, `reflect`, `ask_what_i_missed`, `show_progress`, `other_sessions`, `conflict_check`.

Defaults when no config file or preset sets them:

- preset: null
- default_heat: medium (depth only: how many rounds and layers)
- default_rigor: firm (pressure: how hard you press on each answer)
- tone: direct (wording only)
- questions_per_round: 4 (a number from 1 to 4, or `auto`)
- max_questions: null (no cap)
- answer_style: choice
- recommend: always
- research: light
- reflect: start
- ask_what_i_missed: end (`true` means `end`, `false` means `off`)
- show_progress: true
- other_sessions.enabled: false (lookback_hours 24, max_sessions 10, include_past_chats true)
- conflict_check.enabled: true, ask_on: hard, log_soft: true

## Presets

A preset sets several keys at once. It sets only the keys it lists. Every other key keeps its default.

| Key | quick | standard | deep | audit |
|---|---|---|---|---|
| default_heat | mild | medium | hot | hot |
| default_rigor | gentle | firm | firm | relentless |
| research | light | light | deep | deep |
| reflect | off | start | every_round | every_round |
| ask_what_i_missed | off | end | end | every_round |
| answer_style | choice | choice | mixed | mixed |
| recommend | always | always | always | sourced |

Presets do not set `tone`, `questions_per_round`, `max_questions` or `show_progress`.

`deep` as an argument is the preset. To set only the research level, use the `research` key.

Resolve every setting once. There are two cases, each listed lowest to highest.

**The preset comes from the `preset` key in a config file:**

1. defaults
2. the preset
3. keys in `~/.pepper-me/config.json`
4. keys in `.pepper/config.json`
5. arguments typed after the trigger

**The preset comes from an argument** (it replaces any `preset` key):

1. defaults
2. keys in `~/.pepper-me/config.json`
3. keys in `.pepper/config.json`
4. the preset
5. other arguments typed after the trigger, such as `gentle`

So `pepper me deep` always runs deep, and `pepper me deep gentle` runs deep with gentle rigor.

- A config key counts only if the user wrote it. `config.example.json` lists every key with its default so you can see them. Tell the user to delete the keys they don't want to pin, or a copied file will override every preset and will pin `other_sessions.enabled` to false.
- An unknown preset name: say so in one line and use `standard`.
- An unknown or invalid value for any other key (for example `default_rigor: strict` or `questions_per_round: 7`): say so in one line and use that key's default.

## Rigor

Rigor sets how hard you press on each answer. Heat does not do this. Heat only sets how many rounds and layers you run.

- **gentle:** take each answer as given. A vague answer is logged as an assumption with your best reading. Never ask the same thing twice. Hard conflicts still get a card, because `conflict_check` owns that.
- **firm:** a vague answer gets one rephrase with sharper options. If it is still vague, log an assumption.
- **relentless:**
  - In round 1, include one question that tests the goal itself: "Is this the right problem to solve?"
  - When a success criterion or a claim is vague, ask for a number, an example or evidence. Ask it as plain text, even when `answer_style` is `choice`.
  - For each high-risk decision, ask "What would make this the wrong call?"
  - A vague answer gets up to 3 re-asks. Make each one sharper than the last. Then log an assumption.
  - Ask the fail card at the end (see Closing cards).

An answer is vague when it picks no option and gives no fact you could check.

A re-ask or rephrase goes in the next round's card. It counts as a question and uses up rounds from the heat limit and `max_questions`. It never extends either. If no round or question budget is left, log the assumption at once.

At every level, "you decide", "go", "enough" and "write it" end the pressure at once. "You decide" settles that question. The other three stop the interview.

## Tones

Tone changes wording only. It never changes how often you follow up. Rigor does that. Apply the configured tone to question wording and the reflection. The written file stays plain in every tone.

- **direct:** shortest wording, no warm-up. "Who reads this?"
- **candor:** radical candor. Cares, and says the weak spot out loud. "This goal is vague. What does winning look like in numbers?"
- **friendly:** warm and relaxed. "Quick one, who's this for?"
- **coach:** Socratic. Helps the user think. "What would you tell a founder who asked you this?"
- **exec:** board-meeting style. Decisions and tradeoffs only. "Speed or polish? Pick one."
- **skeptic:** devil's advocate voice. Words each question as a doubt. "Why would anyone pay for this?"
- **consultant:** structured and thorough. "Audience first, then scope, then risks."
- **playful:** light and quick, for creative work. "Gut call, bold or safe?"

## Research

`research` sets how far you look before the first question.

- **none:** use only what the user has said this session. Read no repo files (`PROJECT.md` and `conflict_check.repo_files` included) and no memory. Look up no other sessions, unless the user passed `sessions`. Conflict checks compare only this session and the answers so far.
- **light:** this session, the repo and memory. Other sessions only if `other_sessions.enabled` is true.
- **deep:** everything in light, plus:
  - the last 30 commit subjects from `git log`
  - issues and pull requests linked in the task text (`pepper-me`) or in the README or the agent file (both skills). Use `gh` if it is installed, otherwise skip with one line.
  - other sessions, using the other `other_sessions` settings. This is skipped when a config file explicitly sets `other_sessions.enabled` to `false`, or when `no-sessions` is passed. Your own opt-out always wins over a preset. When it runs, say so in one line first: "Reading other sessions (research: deep)."

## Other sessions

Only when `other_sessions.enabled` is true, or `research` is `deep` and no config file explicitly sets `other_sessions.enabled` to `false` (and `no-sessions` was not passed).

- Claude Code: transcripts under `~/.claude/projects/*/*.jsonl` modified within `lookback_hours`. Skip the current session. Respect `only_projects` and `skip_projects`. Each entry matches if it appears anywhere in the project folder name (substring, case-sensitive). For example, `pepper-me` matches `-Users-name-conductor-workspaces-pepper-me-zurich-v2`. An empty `only_projects` reads all projects. A folder that matches both lists is skipped. An empty string entry is ignored. Cap at `max_sessions`, newest first.
- Read **user messages only**, never assistant messages. You want answers the user gave, not suggestions Claude made.
- Claude app: if `include_past_chats` is true and past-chat search tools exist, search them with a few content keywords from the task or project.
- Use a subagent for the transcript search when one is available so raw transcripts stay out of the main context.
- If there is no subagent tool, read at most 3 transcripts yourself (or `max_sessions` if lower), user messages only.
- If the session lookup fails or returns nothing, say so in one line. Then continue with repo and memory only.

## Round mechanics

Use AskUserQuestion, except where `answer_style` or relentless rigor calls for plain text. Each call holds up to `questions_per_round` questions (tool max is 4). Conflict cards always use AskUserQuestion.

- `questions_per_round` is a number from 1 to 4, or `auto`. With `auto`, count the unknowns that don't depend on each other and ask that many, at least 1 and at most 4.
- `max_questions`, when set, caps the questions you ask across all rounds. Count every re-ask and every plain-text question. Do not count the reflection check, conflict cards, closing cards or the approve card. A value below 1 or not a number counts as null.
  - If fewer slots remain than the round has questions, ask the top-scored ones.
  - A small cap wins over carried-over questions (a bare `pepper me`) and over the relentless goal test.
  - When the cap is reached, stop asking and log each remaining high-risk unknown as an assumption (an Open item in `pepper-me-init`). A hard conflict still gets its card.
- Group questions that don't depend on each other. Hold dependent questions for the next round.
- Each card question gets 2 to 4 options. Order and label them by `recommend` (see below).
- Plain-text questions count toward `max_questions`, not toward `questions_per_round`.
- After each round, in this order: conflict cards, the reflection restatement (`every_round`), the catch-all card (`every_round`, not after the last round), then the next round's progress line and questions.
- When the best guess came from another source, say so in the option description: "From your last session, 2h ago" or "From README.md". The user still confirms it. Never accept it silently.
- Offer "You decide" as an option when a wrong answer can be changed in one edit.
- Headers 12 characters max. Each question must make sense on its own.
- Use multiSelect when several answers can apply.
- No acknowledgment filler between rounds. The next card is the acknowledgment.
- After each round, recompute what's unlocked and ask the next round.

### Answer style

- **choice:** every question is a card with options.
- **open:** ask every question as plain chat text, numbered, with no options. A rephrase is plain text too. You may put your best guess in the question: "I think it's for existing customers. Right?" The user answers in their own words.
- **mixed:** ask the round's cards as in choice. Then ask the hardest unknown of that round as one plain-text open question and wait for the reply before the next round.

### Recommend

`recommend` applies to interview questions only. Fixed cards (reflection check, approve, closing cards) keep their labels.

- **always:** put your best guess first and add "(Recommended)" to its label.
- **sourced:** when the guess comes from a file, memory or past session, put it first, add "(Recommended)" and cite the source in the option description. Otherwise add no marker and do not order options by your guess.
- **never:** add no marker, and do not order options by your guess.

### Reflect

- **start:** reflect once at the start, as the skill describes.
- **every_round:** reflect at the start. After each later round, give a 1 to 2 line plain-text restatement of what is settled and what is still open. No card.
- **off:** skip the reflection and its check card. Go straight to the questions.

### Progress

If `show_progress` is true, write one plain-text line before each round, round 1 included: "Round 2 of up to 3." The number after "up to" is the heat limit named in the skill. When the limit is 1, write "Round 1 of 1." If `max_questions` is set, add " 7 of 12 questions asked so far." Write no line after the last round.

### Closing cards

Closing cards come after the stop test. They never count toward `max_questions`. If the user said "go", "enough" or "write it", skip every closing card.

- `ask_what_i_missed` is `end` or `every_round`: ask the catch-all card once at the end. With `every_round`, also ask it after each round except the last: "Anything I didn't ask that matters?" with options "No, keep going (Recommended)" and "Yes" (the user types it in Other).
- `off`: skip the catch-all.
- `default_rigor` is `relentless`: ask the fail card, after the catch-all. It runs at any heat.

If AskUserQuestion isn't available, ask in plain text: numbered questions, lettered options, recommended option marked, up to 4 per message. The user can reply "1a 2c 3b".

## Red flags

Do not start the task until the file has `status: approved`. For `pepper-me` that file is the brief. For `pepper-me-init` it is `PROJECT.md`.

| Thought | Reality |
|---|---|
| "The task is small, skip the interview." | Task size does not decide whether to ask. Run a mild round. |
| "Memory already answers this." | Memory is a source, not an answer. Cite it in an option and let the user confirm. |
| "The user sounds impatient, I'll start." | Only "go", "enough" or "write it" stops the questions. |
| "The file is obvious, skip approval." | No approval, no task. Ask the approve card. Only auto start in `pepper-me` (`brief.auto_start: true` or the `auto` argument) replaces the card. |
| "This conflict is minor, I'll pick one." | Hard conflicts get a card. Soft ones get logged. Never pick silently. |
| "They said 'you decide', so I'll keep pressing." | "You decide" settles that question at every rigor level. Make the call and log it. |
