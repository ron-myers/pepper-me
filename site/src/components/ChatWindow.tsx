'use client'
import { useEffect, useId, useRef, useState } from 'react'

type Q = {
  kind: string // the type of question, named after the README
  why: string // what that type is for
  ask: string
  context?: string
  options: { label: string; recommended?: boolean }[]
}

// Sample session from the README (pricing page). Answers are illustrative.
const SUMMARY = [
  ['Goal', 'convert free users to the Pro plan'],
  ['Audience', 'existing free users, not new visitors'],
  ['Done', 'page live, linked from the upgrade banner'],
]

const QUESTIONS: Q[] = [
  {
    kind: 'Reflect back',
    why: 'You correct a draft instead of starting from a blank page.',
    ask: 'Does this look right?',
    options: [{ label: 'Yes, keep going', recommended: true }, { label: 'Mostly' }, { label: 'No, start over' }],
  },
  {
    kind: 'Biggest unknown',
    why: 'Ranked by risk: a costly wrong guess becomes a question, not an assumption.',
    ask: 'Annual pricing at launch?',
    context: 'From README.md: "annual in Q2"',
    options: [{ label: 'Monthly only', recommended: true }, { label: 'Both' }, { label: 'You decide' }],
  },
  {
    kind: 'Conflict check',
    why: 'When two sources disagree, it shows you both quotes.',
    ask: 'Earlier you said "no discount messaging". README.md says "20% off annual".',
    options: [{ label: 'Skip discounts', recommended: true }, { label: 'README is out of date' }],
  },
  {
    kind: 'What could go wrong',
    why: 'Intent before details: why it matters, who it is for, what done looks like, what could go wrong.',
    ask: 'What would make this page a failure?',
    options: [
      { label: 'Free users cannot find it', recommended: true },
      { label: 'Pricing is unclear' },
      { label: 'Something else' },
    ],
  },
  {
    kind: 'Last call',
    why: 'It stops when every high-risk unknown has an answer or a logged assumption, then asks one more thing.',
    ask: "What didn't I ask?",
    options: [{ label: 'Nothing, write the brief', recommended: true }, { label: 'One more thing' }],
  },
]

/** A chat window showing the AskUserQuestion approach, with five questions that show the kinds pepper me asks. */
export function ChatWindow() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [picked, setPicked] = useState<string | null>(null)
  const id = useId()
  const box = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const first = useRef(true)
  const done = step >= QUESTIONS.length
  const q = QUESTIONS[step]

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    box.current?.focus({ preventScroll: true })
  }, [step])

  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), [])

  function choose(label: string) {
    if (picked) return
    setPicked(label)
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    timer.current = setTimeout(
      () => {
        setAnswers((a) => [...a, label])
        setPicked(null)
        setStep((s) => s + 1)
      },
      reduced ? 0 : 450,
    )
  }

  function restart() {
    setStep(0)
    setAnswers([])
    setPicked(null)
  }

  return (
    <figure className="chatwin" aria-labelledby={`${id}-cap`}>
      <div className="chatbar">
        <span>claude</span>
        <span>AskUserQuestion</span>
      </div>
      <div className="chatbody">
        <p className="chat-you">pepper me. I need a pricing page for the new plan.</p>
        {step === 0 && (
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
        )}
        {answers.length > 0 && (
          <ol className="asked" aria-label="Answered so far">
            {answers.map((a, i) => (
              <li key={i}>
                <span className="asked-kind">{QUESTIONS[i].kind}</span>
                <span className="asked-q">{QUESTIONS[i].ask}</span>
                <span className="asked-a">{a}</span>
              </li>
            ))}
          </ol>
        )}

        <div ref={box} tabIndex={-1} className="askbox">
          {!done ? (
            <>
              <p className="ask-meta">
                <span className="ask-kind">{q.kind}</span>
                <span className="ask-count">
                  Question {step + 1} of {QUESTIONS.length}
                </span>
              </p>
              <p className="ask-why">{q.why}</p>
              <fieldset className="ask" key={step}>
                <legend>{q.ask}</legend>
                {q.context && <p className="ask-ctx">{q.context}</p>}
                {q.options.map((o) => (
                  <label key={o.label} className="opt" data-rec={o.recommended || undefined} data-on={picked === o.label || undefined}>
                    <input
                      type="radio"
                      name={`${id}-q${step}`}
                      checked={picked === o.label}
                      onChange={() => choose(o.label)}
                    />
                    <span className="opt-label">{o.label}</span>
                    {o.recommended && <span className="opt-rec">Recommended</span>}
                  </label>
                ))}
              </fieldset>
            </>
          ) : (
            <div className="chat-agent">
              <p className="agent-label">agent&gt;</p>
              <p>Brief saved to .pepper/brief.md. Approve to start?</p>
              <p className="ask-why">
                Five kinds of question: reflect back, biggest unknown, conflict check, what could go
                wrong, last call.
              </p>
              <button type="button" className="replay" onClick={restart}>
                Try again
              </button>
            </div>
          )}
        </div>
        <p className="sr-only" role="status" aria-live="polite">
          {done ? 'All five questions answered. Brief saved.' : `Question ${step + 1} of ${QUESTIONS.length}: ${q.ask}`}
        </p>
      </div>
      <figcaption id={`${id}-cap`} className="fine">
        Illustrative. Sample task from the README. Questions arrive as clickable options, recommended answer first.
      </figcaption>
    </figure>
  )
}
