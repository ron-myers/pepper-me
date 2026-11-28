'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { TRANSCRIPT } from '@/lib/skills'

export function Transcript() {
  const [shown, setShown] = useState(TRANSCRIPT.length) // SSR + no-JS: full transcript
  const [reduced, setReduced] = useState(true)
  const ref = useRef<HTMLDivElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const play = useCallback(() => {
    clear()
    setShown(0)
    TRANSCRIPT.forEach((_, i) => {
      timers.current.push(setTimeout(() => setShown(i + 1), 500 + i * 1500))
    })
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    if (mq.matches) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          io.disconnect()
          play()
        }
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      clear()
    }
  }, [play])

  return (
    <div className="transcript" ref={ref}>
      <ol className="beats" aria-label="Sample pepper me session">
        {TRANSCRIPT.map((b, i) => {
          const visible = i < shown
          return (
            <li key={i} className={`beat ${b.from}`} data-visible={visible || undefined} aria-hidden={visible ? undefined : true}>
              <span className="who">{b.from === 'you' ? 'You' : 'Agent'}</span>
              {b.from === 'you' ? (
                <p className="bubble">{b.text}</p>
              ) : (
                <div className="bubble">
                  {b.lines.map((l, j) => (
                    <p key={j}>{l}</p>
                  ))}
                  {b.note && <p className="note">{b.note}</p>}
                  {b.chips && (
                    <ul className="chips" aria-label="Answer options">
                      {b.chips.map((c) => (
                        <li key={c.label} className="chip" data-rec={c.recommended || undefined}>
                          {c.label}
                          {c.recommended && <span className="rec"> (Recommended)</span>}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </li>
          )
        })}
      </ol>
      {!reduced && (
        <button type="button" className="replay" onClick={play}>
          Replay
        </button>
      )}
    </div>
  )
}
