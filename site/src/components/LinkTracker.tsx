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
      if (named) return track(named)
      try {
        const url = new URL(a.href, window.location.href)
        if (url.origin !== window.location.origin && /^https?:$/.test(url.protocol)) {
          track(`outbound: ${url.hostname}`)
        }
      } catch {}
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
