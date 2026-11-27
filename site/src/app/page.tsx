import Link from 'next/link'
import { Panel } from '@/components/Panel'
import { Heat } from '@/components/Heat'
import { HeroInstall } from '@/components/HeroInstall'
import { ChatWindow } from '@/components/ChatWindow'
import { Transcript } from '@/components/Transcript'
import { BriefSwitch } from '@/components/BriefSwitch'
import { InstallTabs } from '@/components/InstallTabs'
import { SKILLS, STEPS, WHY } from '@/lib/skills'
import { INSTALL, REPO_URL } from '@/lib/site'

export default function Home() {
  return (
    <>
      {/* 1. Hero: two voices */}
      <section className="page hero" aria-labelledby="h-hero">
        <h1 id="h-hero">
          <span className="voice-you">Agents get the one-line task.</span>
          <span className="voice-pepper">Pepper gives them the kickoff meeting.</span>
        </h1>
        <div className="hero-foot">
          <div className="hero-cta">
            <p className="lede">
              Skills that give your agent the context it needs to do its best work. Install once, then type{' '}
              <code>pepper me</code>.
            </p>
            <HeroInstall text={INSTALL.plugin} />
            <p className="alt">
              <a href={REPO_URL}>See it on GitHub</a>
            </p>
          </div>
          <ChatWindow />
        </div>
      </section>

      {/* 2. The problem */}
      <section className="page problem" aria-labelledby="h-problem">
        <h2 id="h-problem">The kickoff meeting with your best employee</h2>
        <div className="narration">
          <p className="cap">
            Picture the first day on a big project with your best employee. You don&apos;t hand over a one-line ticket and
            walk away. You sit down, explain why the work matters, and let them ask questions until they have what they
            need. Then they go do great work.
          </p>
          <p className="cap">
            Agents get the one-line ticket. They&apos;re capable, but they can only work with the context you remembered
            to give them, so they guess at the rest.
          </p>
          <p className="cap hot">
            A vague request gets a confident, plausible answer to the wrong question. You find out 20 minutes later,
            correct it, and repeat. Every round trip costs you time and the agent&apos;s context window.
          </p>
        </div>
      </section>

      {/* 3. Skills */}
      <section className="page" id="skills" aria-labelledby="h-skills">
        <h2 id="h-skills">Skills</h2>
        <p className="lede">Each skill is a short, structured conversation that makes sure your agent has what it needs before it starts.</p>
        <ul className="grid skills">
          {SKILLS.map((s) => (
            <Panel
              as="li"
              key={s.slug}
              tab={s.status}
              tone={s.slug === 'pepper-me' ? 'yellow' : 'blue'}
              title={s.name}
              summary={s.summary}
              extra={
                <p className="meta">
                  <code>{s.command}</code> <Heat level={s.heat} />
                </p>
              }
              action={{ href: `/skills/${s.slug}`, label: `Read about ${s.name}` }}
            />
          ))}
        </ul>
      </section>

      {/* 4. How it works */}
      <section className="page" aria-labelledby="h-how">
        <h2 id="h-how">How pepper-me works</h2>
        <p className="lede">A good colleague&apos;s 30-minute kickoff, in a few minutes.</p>
        <ol className="grid steps">
          {STEPS.map((s, i) => (
            <Panel as="li" key={s.title} tab={`Step ${i + 1}`} tone={i === 4 ? 'yellow' : 'paper'} title={s.title} summary={s.body} />
          ))}
        </ol>
      </section>

      {/* 5. See it run */}
      <section className="page" aria-labelledby="h-run">
        <h2 id="h-run">See it run</h2>
        <p className="lede">
          Type <code>pepper me. I need a pricing page for the new plan.</code> and this is the conversation.
        </p>
        <Transcript />
      </section>

      {/* 6. Why it works */}
      <section className="page" aria-labelledby="h-why">
        <h2 id="h-why">Why it works</h2>
        <ul className="grid why">
          {WHY.map((w) => (
            <Panel as="li" key={w.title} tab="pepper-me" title={w.title} summary={w.body} />
          ))}
        </ul>
      </section>

      {/* 7. The brief */}
      <section className="page" aria-labelledby="h-brief">
        <h2 id="h-brief">The brief you approve</h2>
        <p className="lede">
          Saved to <code>.pepper/brief.md</code>. YAML frontmatter, versioned, with empty sections dropped. Work begins only
          after you say yes.
        </p>
        <BriefSwitch />
      </section>

      {/* 8. Install */}
      <section className="page" id="install" aria-labelledby="h-install">
        <h2 id="h-install">Install</h2>
        <InstallTabs commands={INSTALL} />
        <p className="lede">
          Then type <code>pepper me</code>. <Link href="/skills/pepper-me">Usage and options</Link>.
        </p>
      </section>
    </>
  )
}
