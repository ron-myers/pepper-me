'use client'
import { useId, useState } from 'react'

const OPTIONS = [
  { label: 'Yes, keep going', recommended: true },
  { label: 'Mostly' },
  { label: 'No, start over' },
]

const SUMMARY = [
  ['Goal', 'convert free users to the Pro plan'],
  ['Audience', 'existing free users, not new visitors'],
  ['Done', 'page live, linked from the upgrade banner'],
]

/** A chat window showing the AskUserQuestion approach: the agent reflects back, then asks with clickable options. */
export function ChatWindow() {
  const [picked, setPicked] = useState<string | null>(null)
  const id = useId()

  return (
    <figure className="chatwin" aria-labelledby={`${id}-cap`}>
      <div className="chatbar">
        <span>claude</span>
        <span>AskUserQuestion</span>
      </div>
      <div className="chatbody">
        <p className="chat-you">pepper me. I need a pricing page for the new plan.</p>
        <div className="chat-agent">
          <p className="agent-label">agent&gt;</p>
          <p>Here&apos;s what I think you want:</p>
          <dl>
            {SUMMARY.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <fieldset className="ask">
          <legend>Does this look right?</legend>
          {OPTIONS.map((o) => (
            <label key={o.label} className="opt" data-rec={o.recommended || undefined} data-on={picked === o.label || undefined}>
              <input type="radio" name={`${id}-ask`} checked={picked === o.label} onChange={() => setPicked(o.label)} />
              <span className="opt-label">{o.label}</span>
              {o.recommended && <span className="opt-rec">Recommended</span>}
            </label>
          ))}
        </fieldset>
        <p className="chat-status" role="status" aria-live="polite">
          {picked ? `You chose: ${picked}` : ''}
        </p>
      </div>
      <figcaption id={`${id}-cap`} className="fine">
        Illustrative. Questions arrive as clickable options, with the recommended answer first.
      </figcaption>
    </figure>
  )
}
