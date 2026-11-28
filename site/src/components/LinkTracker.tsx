'use client'
import { useEffect } from 'react'
import { track } from '@/lib/track'

// One delegated listener. Links opt in with data-track="event name".
// Other external links are tracked as "outbound: <host>".
export function LinkTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as Element | null)?.closest?.('a')
      if (!a) return
      const named = a.getAttribute('data-track')
      if (named) {
        track(named)
        return
      }
      try {
        const url = new URL(a.getAttribute('href') ?? '', window.location.href)
        if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
          track(`outbound: ${url.hostname}`)
        }
      } catch {}
    }
    function onAux(e: MouseEvent) {
      if (e.button === 1) onClick(e)
    }
    document.addEventListener('click', onClick)
    document.addEventListener('auxclick', onAux)
    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('auxclick', onAux)
    }
  }, [])
  return null
}
