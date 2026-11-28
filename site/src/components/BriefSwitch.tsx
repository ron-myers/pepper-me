'use client'
import { useId, useState } from 'react'
import { SIZES, briefFor, toMarkdown, type Size } from '@/lib/brief'
import { CopyButton } from './CopyButton'
import { EVENTS } from '@/lib/events'
import { track } from '@/lib/track'

export function BriefSwitch() {
  const [size, setSize] = useState<Size>('card')
  const id = useId()
  const b = briefFor(size)
  const info = SIZES.find((s) => s.id === size)!
  const md = toMarkdown(size)

  return (
    <div className="briefswitch">
      <div role="radiogroup" aria-label="Brief size" className="sizes">
        {SIZES.map((s) => (
          <button
            key={s.id}
            type="button"
            role="radio"
            aria-checked={size === s.id}
            className="size"
            onClick={() => {
              if (s.id === size) return
              setSize(s.id)
              track(EVENTS.briefSize(s.id))
            }}
          >
            {s.id}
          </button>
        ))}
      </div>
      <p className="contains" id={`${id}-c`}>
        <code>{size}</code>: {info.contains}.
      </p>
      <div className="duo" aria-describedby={`${id}-c`}>
        <article className="sheetcard" aria-label="Rendered brief">
          <h3>{b.title}</h3>
          {size === 'line' ? (
            <p>{b.line}</p>
          ) : (
            <>
              <dl>
                {b.lead.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {b.sections.map((s) => (
                <section key={s.heading} data-empty={s.empty || undefined}>
                  <h4>{s.heading}</h4>
                  {s.empty ? (
                    <p className="dim">Filled in when the task has them.</p>
                  ) : (
                    <ul>
                      {s.items!.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </>
          )}
        </article>
        <div className="code">
          <div className="codebar">
            <span>.pepper/brief.md</span>
            <CopyButton text={md} event={EVENTS.copyBrief(size)} />
          </div>
          <pre tabIndex={0}>
            <code>{md}</code>
          </pre>
        </div>
      </div>
      <p className="fine">Illustrative. Sample task from the README; empty sections are dropped in a real brief.</p>
    </div>
  )
}
