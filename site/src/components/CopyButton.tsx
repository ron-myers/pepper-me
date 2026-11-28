'use client'
import { useRef, useState } from 'react'
import { track } from '@/lib/track'

export function CopyButton({ text, label = 'Copy', event = 'copy' }: { text: string; label?: string; event?: string }) {
  const [done, setDone] = useState(false)
  const t = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setDone(true)
      track(event)
      if (t.current) clearTimeout(t.current)
      t.current = setTimeout(() => setDone(false), 2000)
    } catch {
      setDone(false)
    }
  }

  return (
    <>
      <button type="button" className="copy" data-done={done || undefined} onClick={copy}>
        {done ? 'Copied' : label}
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {done ? 'Copied to clipboard' : ''}
      </span>
    </>
  )
}
