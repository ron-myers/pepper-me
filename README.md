# Pepper Me

**Skills that give your agent the context it needs to do its best work.**

Picture the first day on a big project with your best employee. You don't hand over a one-line ticket and walk away. You sit down, explain why the work matters, and let them ask questions until they have what they need. Then they go do great work.

Agents get the one-line ticket. They're capable, but they can only work with the context you remembered to give them, so they guess at the rest. Pepper Me fixes that. Each skill in this repo is a short, structured conversation that makes sure your agent has what it needs before it starts.

## Skills

| Skill | What it does | Status |
|---|---|---|
| [`pepper-me`](#pepper-me) | A kickoff meeting before any task. Your agent asks, you answer, you approve a brief. | Available |
| [`pepper-me-init`](#pepper-me-init) | The same idea for a whole project. Interviews you once and writes `PROJECT.md`, the context file your agent reads every session. | Available |

## Install

**Claude Code plugin** (installs every skill in the repo)

```
/plugin marketplace add ron-myers/pepper-me
/plugin install pepper-me@pepper-me
```

**skills.sh**

```
npx skills add ron-myers/pepper-me
```

**Manual:** copy any folder from `skills/` into `~/.claude/skills/`.

### Other agents

The skills are the same on every agent. Most agents have their own manifest at the repo root, and each has a tool-mapping note in `skills/*/references/`.

| Agent | Install | Notes |
|---|---|---|
| Gemini CLI | `gemini extensions install https://github.com/ron-myers/pepper-me` | [`gemini-tools.md`](skills/pepper-me/references/gemini-tools.md). Uses `ask_user` for questions. |
| GitHub Copilot CLI | `copilot plugin marketplace add ron-myers/pepper-me`, then `copilot plugin install pepper-me@pepper-me` | [`copilot-tools.md`](skills/pepper-me/references/copilot-tools.md) |
| Codex | `npx skills add ron-myers/pepper-me`, or copy a folder from `skills/` into `~/.agents/skills/` | [`codex-tools.md`](skills/pepper-me/references/codex-tools.md). Manifest: `.codex-plugin/plugin.json`. |
| Cursor | `npx skills add ron-myers/pepper-me` | [`cursor-tools.md`](skills/pepper-me/references/cursor-tools.md). Manifest: `.cursor-plugin/plugin.json`. |

Other-session lookup reads Claude Code transcripts, so it only works in Claude Code. On other agents leave `other_sessions.enabled` false. More agents are tracked in the issues.

---

## pepper-me

> Type `pepper me`. Your agent runs the kickoff meeting. By default, work starts only after you say yes.

### The problem

A vague request gets a confident, plausible answer to the wrong question. You find out 20 minutes later, correct it, and repeat. Every round trip costs you time and the agent's context window.

### The fix

`pepper me` does what a good colleague does in a 30-minute kickoff, in a few minutes:

1. **Reads the room.** Your session, repo docs, memory and (optionally) your other recent sessions. It never asks what's already been said.
2. **Reflects back.** "Here's what I think you want." You correct a draft instead of starting from a blank page.
3. **Asks what's missing.** Why this matters, who it's for, what done looks like, what could go wrong. Intent before details.
4. **Checks for conflicts.** If an answer contradicts what you said earlier, or what the repo says, it shows you both quotes and asks.
5. **Writes a brief.** One page you approve. By default, work begins only after you approve it.

### What it looks like

```
You:     pepper me. I need a pricing page for the new plan.

Agent:   Here's what I think you want:
         - Goal: convert free users to the Pro plan
         - Audience: existing free users, not new visitors
         - Done: page live, linked from the upgrade banner
         - Biggest unknown: whether annual pricing ships at launch
         [ Yes, keep going (Recommended) ]  [ Mostly ]  [ No, start over ]

Agent:   Annual pricing at launch?
         [ Monthly only (Recommended) ]   From README.md: "annual in Q2"
         [ Both ]
         [ You decide ]

Agent:   Conflict. Earlier you said "no discount messaging".
         README.md says "20% off annual".
         [ Skip discounts ]  [ README is out of date ]

Agent:   Brief saved to .pepper/brief.md. Approve to start?
```

### Why it works

- **Recommended answer first.** Most of the time the agent's guess is right, so most answers are one tap.
- **Ranked by risk.** Each unknown is scored by cost of a wrong guess times how unsure the agent is. High scores become questions. Low scores become stated assumptions you can veto in the brief.
- **Batched questions.** Up to 4 clickable questions per card, grouped so none depend on each other.
- **Handles messy answers.** Vague, skipped, "you decide" and "go" each have defined behavior. Say `go` at any point to jump to the brief.
- **Clear finish line.** It stops when every high-risk unknown has an answer or a logged assumption, then asks one last thing: "What didn't I ask?" With `relentless` rigor it also asks "What would make this fail?"
- **Answers travel.** With other-session lookup on, answers you gave in other sessions appear as one-tap recommendations labelled with their source. You still confirm each one.
- **Check-ins mid-task.** Run it again when the work drifts. The brief bumps a version and the decision log keeps the history.

### Usage

```
pepper me
pepper me mild
pepper me hot, candor
pepper me hot, relentless
pepper me audit
pepper me hot, skeptic, full
pepper me sessions
```

Arguments go in any order. All are optional.

A bare `pepper me` after your agent asked you questions turns those questions into round 1.

| Argument | Values | Default |
|---|---|---|
| Preset | `quick`, `standard`, `deep`, `audit` | none |
| Heat | `mild` one round, `medium` up to three, `hot` the full session. Depth only. | `medium` |
| Rigor | `gentle`, `firm`, `relentless`. How hard it presses on each answer. | `firm` |
| Tone | `direct`, `candor`, `friendly`, `coach`, `exec`, `skeptic`, `consultant`, `playful`. Wording only. | `direct` |
| Brief size | `line`, `card`, `page`, `full` | sized automatically |
| Sessions | `sessions`, `no-sessions` | off |
| Auto start | `auto`, `no-auto` | off |
| After task | `after:<name>`, `no-after` | off |

### Heat, rigor and tone

Three settings, three jobs:

- **Heat** is how long the interview runs: rounds and layers.
- **Rigor** is how hard it presses on each answer.
  - `gentle` takes answers as given and logs gaps as assumptions.
  - `firm` rephrases a vague answer once, then logs an assumption.
  - `relentless` tests the goal in round 1, asks for numbers or evidence, asks "What would make this the wrong call?", re-asks a vague answer up to 3 times, and ends with "What would make this fail?" at any heat.
- **Tone** is the wording. It never changes how often it follows up.

"You decide", `go`, `enough` and `write it` end the pressure at every level.

### Presets

A preset sets several keys at once. Keys you set yourself override it.

| Key | `quick` | `standard` | `deep` | `audit` |
|---|---|---|---|---|
| `default_heat` | `mild` | `medium` | `hot` | `hot` |
| `default_rigor` | `gentle` | `firm` | `firm` | `relentless` |
| `research` | `light` | `light` | `deep` | `deep` |
| `reflect` | `off` | `start` | `every_round` | `every_round` |
| `ask_what_i_missed` | `off` | `end` | `end` | `every_round` |
| `answer_style` | `choice` | `choice` | `mixed` | `mixed` |
| `recommend` | `always` | `always` | `always` | `sourced` |

Order, lowest to highest: defaults, preset, `~/.pepper-me/config.json`, `.pepper/config.json`, arguments. A preset typed as an argument beats config keys, so `pepper me deep` always runs deep.

### Interview settings

| Key | Values | Default |
|---|---|---|
| `preset` | `null`, `quick`, `standard`, `deep`, `audit` | `null` |
| `default_heat` | `mild`, `medium`, `hot` | `medium` |
| `default_rigor` | `gentle`, `firm`, `relentless` | `firm` |
| `tone` | any tone name | `direct` |
| `questions_per_round` | `1` to `4`, or `auto` (one per independent unknown) | `4` |
| `max_questions` | `null`, or a number. A hard cap across all rounds. | `null` |
| `answer_style` | `choice` cards, `open` plain text, `mixed` cards plus one open question per round | `choice` |
| `recommend` | `always`, `sourced` (only when the guess cites a file, memory or session), `never` | `always` |
| `research` | `none`, `light` (repo and memory), `deep` (adds git history, linked issues and other sessions) | `light` |
| `reflect` | `off`, `start`, `every_round` | `start` |
| `ask_what_i_missed` | `off`, `end`, `every_round`. `true` means `end`, `false` means `off`. | `end` |
| `show_progress` | `true`, `false`. Prints "Round 2 of up to 3." | `true` |

### The brief

Saved to `.pepper/brief.md`. YAML frontmatter, versioned, with empty sections dropped.

| Size | Contains |
|---|---|
| `line` | Goal and what done looks like, in one sentence |
| `card` | Goal, audience, done, constraints, assumptions |
| `page` | Card plus out of scope, conflicts, open questions |
| `full` | Page plus risks, decision log, stakeholders, milestones, follow-ups |

A `card` looks like this:

```markdown
---
pepper_brief: v1
version: 1
created: 2026-11-27
heat: medium
size: card
task: Pricing page for the Pro plan
status: approved
---

# Brief: Pricing page for the Pro plan

**Goal:** Convert free users to Pro.
**Audience:** Existing free users arriving from the upgrade banner.
**Done looks like:** Page live and linked from the banner.

## Constraints
- Monthly pricing only at launch
- No discount messaging

## Assumptions
- Reuse the current marketing layout (low-risk)
```

### Configuration

Copy `skills/pepper-me/config.example.json` to `~/.pepper-me/config.json` and edit. A `.pepper/config.json` in a project overrides your global settings for that project.

```json
{
  "preset": null,
  "default_heat": "medium",
  "default_rigor": "firm",
  "tone": "direct",
  "questions_per_round": 4,
  "max_questions": null,
  "answer_style": "choice",
  "recommend": "always",
  "research": "light",
  "reflect": "start",
  "ask_what_i_missed": "end",
  "show_progress": true,
  "other_sessions": {
    "enabled": false,
    "lookback_hours": 24,
    "max_sessions": 10,
    "only_projects": [],
    "skip_projects": [],
    "include_past_chats": true
  },
  "conflict_check": {
    "enabled": true,
    "sources": ["this_session", "other_sessions", "memory", "repo"],
    "repo_files": ["README.md", "CLAUDE.md", "AGENTS.md", "docs/", ".pepper/brief.md"],
    "ask_on": "hard",
    "log_soft": true
  },
  "brief": {
    "size": "auto",
    "save": true,
    "path": ".pepper/brief.md",
    "template": null,
    "versioning": true,
    "auto_start": false
  },
  "after_task": {
    "run": null
  }
}
```

### Privacy

Other-session lookup is **off by default**. When on, pepper me reads Claude Code transcripts in `~/.claude/projects/` changed within `lookback_hours`. It reads **your messages only**, never Claude's replies. Everything stays on your machine. Use `skip_projects` to keep client or private work out. Each `only_projects` and `skip_projects` entry matches if it appears anywhere in the project folder name (substring, case-sensitive). An empty `only_projects` reads all projects. A folder that matches both lists is skipped. An empty string entry is ignored.

### Auto start

By default you approve the brief before work begins. Set `brief.auto_start` to `true` to skip that card. The setting is the approval: the brief is shown in chat, saved with `status: approved`, and the task starts. A mid-task check-in also skips the card. Pass `auto` or `no-auto` to override the setting for one run. If you say `go` while a hard conflict is open, the task starts and the conflict is listed in the brief.

### After the task

Set `after_task.run` to the name of a skill or slash command, such as `"candid-review"`, to run it once the task is done. It is a single string. The default is `null`, which changes nothing. The setting is the consent: the agent checks the result against "Done looks like", runs the follow-up without asking, and reports the outcome in a line or two. **`candid-ship` publishes.** It opens a pull request and can auto-merge, so set it only if you want that every time. If the skill or command is not installed, the agent says so in one line and skips it. If you stop the task or it fails the check, the follow-up does not run. A mid-task check-in does not run it early. Pass `after:<name>` to run a different follow-up for one run, or `no-after` to skip it.

### Conflict check

`ask_on: "hard"` interrupts only when two things can't both be true. `ask_on: "all"` asks about every mismatch. Soft conflicts go in the brief. Choosing "The repo is out of date" adds a follow-up to fix it.

### FAQ

**How is this different from plan mode?** Plan mode designs the solution. Pepper me captures the intent that a plan should be built on. Use it first.

**How is this different from grill-me?** [grill-me](https://github.com/mattpocock/skills) stress-tests a plan you already have. Pepper me works earlier, when you have a goal but no plan yet. They pair well.

**Isn't this more work for me?** For a mild session, it's one card of taps. A wrong guess costs far more.

**Does it work without AskUserQuestion?** Yes. It falls back to plain-text questions with the same structure.

---

## pepper-me-init

> Type `pepper me init`. Your agent reads your repo, asks only what it can't find, and writes `PROJECT.md`. Every future session starts with that context.

### The problem

Every new session starts cold. The agent re-learns your commands, guesses your conventions, and breaks the rule you explained last week. A hand-written CLAUDE.md helps, but nobody writes the whole thing, and nobody keeps it current.

### The fix

`pepper me init` is the first-day-on-the-project conversation, done once and saved:

1. **Reads the repo.** README, manifests, CI, lint and test config, recent commits, existing agent files. Every fact keeps its source.
2. **Reflects back.** "Here's what I read about this project." You correct a draft.
3. **Asks only the gaps.** Purpose, users, constraints, conventions, how work is verified. Questions cite your own files: "CI runs `pnpm test` but package.json has no `test` script. Which is right?"
4. **Checks for conflicts.** README says Jest, package.json says Vitest. You see both and choose.
5. **Writes `PROJECT.md`.** You approve a preview first. Unknowns are marked open, never guessed.
6. **Links it.** With your OK, it appends a three-line pointer to `CLAUDE.md` or `AGENTS.md` so agents read the file. It touches nothing else in them.

### Re-running

Run it again when the project changes. It parses the existing file, treats settled decisions as settled, and asks only about what changed or is still open. Earlier decisions are never rewritten. A changed answer is logged as a new row. If nothing changed, it says so and stops.

### Works with pepper me

`pepper me` reads `PROJECT.md` first. It never asks what the file already answers, and it brings up open items when they matter to the task.

### Usage

```
pepper me init
pepper me init mild
pepper me init hot, candor
pepper me init audit
pepper me init refresh
```

Same preset, heat, rigor, tone and `sessions` arguments as `pepper me`. `refresh` forces update mode.

### What `PROJECT.md` contains

Purpose, users, stack and commands, conventions, constraints, never-do list, verification, working agreements, unconfirmed scan facts, open items, and a decision log. Empty sections are dropped. It stays under about 150 lines.

### Configuration

The `init` block in the same config files as `pepper me`. See `skills/pepper-me-init/config.example.json`.

```json
{
  "init": {
    "path": "PROJECT.md",
    "scan": true,
    "link_agent_files": "ask",
    "agent_files": ["CLAUDE.md", "AGENTS.md"]
  }
}
```

`link_agent_files` is `ask`, `auto` or `never`.

---

## Contributing

Issues and pull requests welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. Built by [Ron Myers](https://github.com/ron-myers) at Fritter Factory.
