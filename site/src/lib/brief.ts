// Source: README.md "The brief". The card is the README's sample. Page and full
// reuse the same sample's facts; section names come from the README size table.
export type Size = 'line' | 'card' | 'page' | 'full'

export const SIZES: { id: Size; contains: string }[] = [
  { id: 'line', contains: 'Goal and what done looks like, in one sentence' },
  { id: 'card', contains: 'Goal, audience, done, constraints, assumptions' },
  { id: 'page', contains: 'Card plus out of scope, conflicts, open questions' },
  { id: 'full', contains: 'Page plus risks, decision log, stakeholders, milestones, follow-ups' },
]

export type Section = { heading: string; items?: string[]; empty?: boolean }

export function briefFor(size: Size) {
  const front = [
    'pepper_brief: v1',
    'version: 1',
    'created: 2026-11-27',
    'heat: medium',
    `size: ${size}`,
    'task: Pricing page for the Pro plan',
    'status: approved',
  ]
  if (size === 'line') {
    const sentence = 'Convert free users to Pro: page live and linked from the upgrade banner.'
    return { front, title: 'Brief: Pricing page for the Pro plan', lead: [], line: sentence, sections: [] as Section[] }
  }
  const lead = [
    ['Goal', 'Convert free users to Pro.'],
    ['Audience', 'Existing free users arriving from the upgrade banner.'],
    ['Done looks like', 'Page live and linked from the banner.'],
  ]
  const sections: Section[] = [
    { heading: 'Constraints', items: ['Monthly pricing only at launch', 'No discount messaging'] },
    { heading: 'Assumptions', items: ['Reuse the current marketing layout (low-risk)'] },
  ]
  if (size === 'page' || size === 'full') {
    sections.push(
      { heading: 'Conflicts', items: ['README.md says "20% off annual"; you said "no discount messaging"'] },
      { heading: 'Open questions', items: ['Annual pricing: README.md says "annual in Q2"'] },
    )
  }
  if (size === 'full') {
    for (const h of ['Risks', 'Decision log', 'Stakeholders', 'Milestones', 'Follow-ups']) {
      sections.push({ heading: h, empty: true })
    }
  }
  return { front, title: 'Brief: Pricing page for the Pro plan', lead, line: '', sections }
}

export function toMarkdown(size: Size): string {
  const b = briefFor(size)
  const out: string[] = ['---', ...b.front, '---', '', `# ${b.title}`, '']
  if (size === 'line') {
    out.push(b.line)
    return out.join('\n')
  }
  for (const [k, v] of b.lead) out.push(`**${k}:** ${v}`)
  for (const s of b.sections) {
    out.push('', `## ${s.heading}`)
    if (s.empty) out.push('- …')
    else for (const i of s.items ?? []) out.push(`- ${i}`)
  }
  return out.join('\n')
}
