# Pepper

**Skills that give your agent the context it needs to do its best work.**

Picture the first day on a big project with your best employee. You don't hand over a one-line ticket and walk away. You sit down, explain why the work matters, and let them ask questions until they have what they need. Then they go do great work.

Agents get the one-line ticket. They're capable, but they can only work with the context you remembered to give them, so they guess at the rest. Pepper fixes that. Each skill in this repo is a short, structured conversation that makes sure your agent has what it needs before it starts.

## Skills

| Skill | What it does | Status |
|---|---|---|
| [`pepper-me`](#pepper-me) | A kickoff meeting before any task. Your agent asks, you answer, you approve a brief. | Available |
| `pepper-init` | The same idea for a new project. Interviews you once and sets up the context files your agent reads every session. | Planned |

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

---

## pepper-me

> Type `pepper me`. Your agent runs the kickoff meeting. Work starts only after you say yes.

### The problem

A vague request gets a confident, plausible answer to the wrong question. You find out 20 minutes later, correct it, and repeat. Every round trip costs you time and the agent's context window.

### The fix

`pepper me` does what a good colleague does in a 30-minute kickoff, in a few minutes:

1. **Reads the room.** Your session, repo docs, memory and (optionally) your other recent sessions. It never asks what's already been said.
2. **Reflects back.** "Here's what I think you want." You correct a draft instead of starting from a blank page.
3. **Asks what's missing.** Why this matters, who it's for, what done looks like, what could go wrong. Intent before details.
4. **Checks for conflicts.** If an answer contradicts what you said earlier, or what the repo says, it shows you both quotes and asks.
5. **Writes a brief.** One page you approve. Then, and only then, work begins.

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
- **Clear finish line.** It stops when every high-risk unknown has an answer or a logged assumption, then asks one last thing: "What didn't I ask?"
- **Answers travel.** With other-session lookup on, answers you gave in other sessions appear as one-tap recommendations labelled with their source. You still confirm each one.
- **Check-ins mid-task.** Run it again when the work drifts. The brief bumps a version and the decision log keeps the history.

### Usage

```
pepper me
pepper me mild
pepper me hot, candor
pepper me hot, skeptic, full
pepper me sessions
```

Arguments go in any order. All are optional.

| Argument | Values | Default |
|---|---|---|
| Heat | `mild` one round, `medium` up to three, `hot` the full session | `medium` |
| Tone | `direct`, `candor`, `friendly`, `coach`, `exec`, `skeptic`, `consultant`, `playful` | `direct` |
| Brief size | `line`, `card`, `page`, `full` | sized automatically |
| Sessions | `sessions`, `no-sessions` | off |

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
  "default_heat": "medium",
  "tone": "direct",
  "questions_per_round": 4,
  "ask_what_i_missed": true,
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
    "versioning": true
  }
}
```

### Privacy

Other-session lookup is **off by default**. When on, pepper me reads Claude Code transcripts in `~/.claude/projects/` changed within `lookback_hours`. It reads **your messages only**, never Claude's replies. Everything stays on your machine. Use `skip_projects` to keep client or private work out.

### Conflict check

`ask_on: "hard"` interrupts only when two things can't both be true. `ask_on: "all"` asks about every mismatch. Soft conflicts go in the brief. Choosing "The repo is out of date" adds a follow-up to fix it.

### FAQ

**How is this different from plan mode?** Plan mode designs the solution. Pepper me captures the intent that a plan should be built on. Use it first.

**How is this different from grill-me?** [grill-me](https://github.com/mattpocock/skills) stress-tests a plan you already have. Pepper me works earlier, when you have a goal but no plan yet. They pair well.

**Isn't this more work for me?** For a mild session, it's one card of taps. A wrong guess costs far more.

**Does it work without AskUserQuestion?** Yes. It falls back to plain-text questions with the same structure.

---

## Contributing

Issues and pull requests welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. Built by [Ron Myers](https://github.com/ron-myers) at Fritter Factory.
