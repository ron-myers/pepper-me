import type { Metadata } from 'next'
import { Panel } from '@/components/Panel'
import { SKILLS } from '@/lib/skills'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <section className="page hero lost" aria-labelledby="h-lost">
      <h1 id="h-lost">
        <span className="voice-you">404. No such page.</span>
        <span className="voice-pepper">That one never made it into the brief.</span>
      </h1>
      <div className="hero-foot">
        <div className="agentreply">
          <p className="agent-label">Pepper Me</p>
          <p>I looked. Nothing lives at this address.</p>
          <p>The link may be old, or mistyped. Pick where you want to go and I&apos;ll take it from there.</p>
        </div>
        <ul className="grid lost-grid">
          <Panel
            as="li"
            tab="Start"
            title="Home"
            summary="The kickoff meeting, and how to install it."
            action={{ href: '/', label: 'Go home' }}
          />
          {SKILLS.map((s) => (
            <Panel
              as="li"
              key={s.slug}
              tab={s.command}
              title={s.name}
              summary={s.summary}
              action={{ href: `/skills/${s.slug}`, label: 'Read the skill' }}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
