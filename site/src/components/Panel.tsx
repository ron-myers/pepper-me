import Link from 'next/link'
import type { ReactNode } from 'react'

/** One card anatomy for the whole site: tab label, title, one-line summary, action. */
export function Panel({
  tab,
  title,
  summary,
  action,
  tone = 'paper',
  extra,
  as: Tag = 'article',
}: {
  tab: ReactNode
  title: string
  summary: ReactNode
  action?: { href: string; label: string }
  tone?: 'paper' | 'blue' | 'yellow' | 'red'
  extra?: ReactNode
  as?: 'article' | 'li'
}) {
  return (
    <Tag className="panel" data-tone={tone}>
      <span className="tab">{tab}</span>
      <h3>{title}</h3>
      <p>{summary}</p>
      {extra}
      {action && (
        <Link className="act" href={action.href}>
          {action.label}
        </Link>
      )}
    </Tag>
  )
}
