type Fathom = { trackEvent: (name: string) => void }

// Fathom loads only when NEXT_PUBLIC_FATHOM_SITE_ID is set. No script, no-op.
export function track(name: string) {
  if (typeof window === 'undefined') return
  const f = (window as unknown as { fathom?: Fathom }).fathom
  try {
    f?.trackEvent?.(name)
  } catch {
    // analytics must never break the page
  }
}
