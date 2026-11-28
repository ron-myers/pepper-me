import type { Metadata } from 'next'
import { marked } from 'marked'
import { getChangelog } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Changelog',
  description: 'Every release of Pepper Me, newest first.',
}

export default function Changelog() {
  const html = marked.parse(getChangelog().replace(/^# Changelog\s*/, ''), { async: false }) as string
  return (
    <article className="page doc">
      <h1>Changelog</h1>
      <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  )
}
