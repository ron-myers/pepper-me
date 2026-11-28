export type Skill = {
  slug: string
  name: string
  command: string
  summary: string
  status: 'Available'
  heat: 1 | 2 | 3
}

// Source: README.md "Skills" table. Add a skill here and the grid takes it.
export const SKILLS: Skill[] = [
  {
    slug: 'pepper-me',
    name: 'pepper-me',
    command: 'pepper me',
    summary: 'A kickoff meeting before any task. Your agent asks, you answer, you approve a brief.',
    status: 'Available',
    heat: 2,
  },
  {
    slug: 'pepper-me-init',
    name: 'pepper-me-init',
    command: 'pepper me init',
    summary:
      'The same idea for a whole project. Interviews you once and writes PROJECT.md, the context file your agent reads every session.',
    status: 'Available',
    heat: 2,
  },
]

// Source: README.md "The fix" for pepper-me.
export const STEPS = [
  {
    title: 'Reads the room',
    body: "Your session, repo docs, memory and (optionally) your other recent sessions. It never asks what's already been said.",
  },
  {
    title: 'Reflects back',
    body: '"Here\'s what I think you want." You correct a draft instead of starting from a blank page.',
  },
  {
    title: 'Asks what\'s missing',
    body: 'Why this matters, who it\'s for, what done looks like, what could go wrong. Intent before details.',
  },
  {
    title: 'Checks for conflicts',
    body: 'If an answer contradicts what you said earlier, or what the repo says, it shows you both quotes and asks.',
  },
  {
    title: 'Writes a brief',
    body: 'One page you approve. Then, and only then, work begins.',
  },
]

// Source: README.md "Why it works" for pepper-me.
export const WHY = [
  { title: 'Recommended answer first', body: "Most of the time the agent's guess is right, so most answers are one tap." },
  {
    title: 'Ranked by risk',
    body: 'Each unknown is scored by cost of a wrong guess times how unsure the agent is. High scores become questions. Low scores become stated assumptions you can veto in the brief.',
  },
  { title: 'Batched questions', body: 'Up to 4 clickable questions per card, grouped so none depend on each other.' },
  {
    title: 'Handles messy answers',
    body: 'Vague, skipped, "you decide" and "go" each have defined behavior. Say go at any point to jump to the brief.',
  },
  {
    title: 'Clear finish line',
    body: 'It stops when every high-risk unknown has an answer or a logged assumption, then asks one last thing: "What didn\'t I ask?"',
  },
  {
    title: 'Answers travel',
    body: 'With other-session lookup on, answers you gave in other sessions appear as one-tap recommendations labelled with their source. You still confirm each one.',
  },
  {
    title: 'Check-ins mid-task',
    body: 'Run it again when the work drifts. The brief bumps a version and the decision log keeps the history.',
  },
]

// Source: README.md "What it looks like".
export type Beat =
  | { from: 'you'; text: string }
  | { from: 'agent'; lines: string[]; chips?: { label: string; recommended?: boolean }[]; note?: string }

export const TRANSCRIPT: Beat[] = [
  { from: 'you', text: 'pepper me. I need a pricing page for the new plan.' },
  {
    from: 'agent',
    lines: [
      "Here's what I think you want:",
      'Goal: convert free users to the Pro plan',
      'Audience: existing free users, not new visitors',
      'Done: page live, linked from the upgrade banner',
      'Biggest unknown: whether annual pricing ships at launch',
    ],
    chips: [{ label: 'Yes, keep going', recommended: true }, { label: 'Mostly' }, { label: 'No, start over' }],
  },
  {
    from: 'agent',
    lines: ['Annual pricing at launch?'],
    chips: [{ label: 'Monthly only', recommended: true }, { label: 'Both' }, { label: 'You decide' }],
    note: 'From README.md: "annual in Q2"',
  },
  {
    from: 'agent',
    lines: ['Conflict. Earlier you said "no discount messaging".', 'README.md says "20% off annual".'],
    chips: [{ label: 'Skip discounts' }, { label: 'README is out of date' }],
  },
  { from: 'agent', lines: ['Brief saved to .pepper/brief.md. Approve to start?'] },
]
