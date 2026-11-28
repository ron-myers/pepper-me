'use client'
import { useId, useRef, useState } from 'react'
import { CopyButton } from './CopyButton'
import { EVENTS } from '@/lib/events'
import { track } from '@/lib/track'

const TABS = [
  { id: 'plugin', label: 'Claude Code plugin', note: 'Installs every skill in the repo.' },
  { id: 'gemini', label: 'Gemini CLI', note: 'Tool notes: skills/*/references/gemini-tools.md. Uses ask_user for questions.' },
  { id: 'copilot', label: 'GitHub Copilot CLI', note: 'Tool notes: skills/*/references/copilot-tools.md.' },
  { id: 'codex', label: 'Codex', note: 'Or copy a folder from skills/ into ~/.agents/skills/. Tool notes: skills/*/references/codex-tools.md.' },
  { id: 'cursor', label: 'Cursor', note: 'Tool notes: skills/*/references/cursor-tools.md.' },
  { id: 'skills', label: 'skills.sh', note: 'Uses the skills.sh CLI.' },
  { id: 'manual', label: 'Manual', note: 'Copy any folder from skills/ into ~/.claude/skills/ for Claude Code, or ~/.agents/skills/ for Codex.' },
] as const

export function InstallTabs({ commands }: { commands: Record<string, string> }) {
  const [active, setActive] = useState<(typeof TABS)[number]['id']>('plugin')
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  function pick(id: (typeof TABS)[number]['id']) {
    if (id === active) return
    setActive(id)
    track(EVENTS.installTab(id))
  }

  function onKey(e: React.KeyboardEvent, i: number) {
    let n = i
    if (e.key === 'ArrowRight') n = (i + 1) % TABS.length
    else if (e.key === 'ArrowLeft') n = (i - 1 + TABS.length) % TABS.length
    else if (e.key === 'Home') n = 0
    else if (e.key === 'End') n = TABS.length - 1
    else return
    e.preventDefault()
    pick(TABS[n].id)
    refs.current[n]?.focus()
  }

  const cur = TABS.find((t) => t.id === active)!
  return (
    <div className="install">
      <div role="tablist" aria-label="Install method" className="tabs">
        {TABS.map((t, i) => (
          <button
            key={t.id}
            ref={(el) => {
              refs.current[i] = el
            }}
            role="tab"
            id={`${base}-t-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`${base}-p`}
            tabIndex={active === t.id ? 0 : -1}
            onClick={() => pick(t.id)}
            onKeyDown={(e) => onKey(e, i)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-p`} aria-labelledby={`${base}-t-${active}`} className="tabpanel">
        <p className="note">{cur.note}</p>
        <div className="code">
          <div className="codebar">
            <span>{active === 'manual' ? 'shell' : 'terminal'}</span>
            <CopyButton text={commands[active]} event={EVENTS.copyInstall(active)} />
          </div>
          <pre tabIndex={0}>
            <code>{commands[active]}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
