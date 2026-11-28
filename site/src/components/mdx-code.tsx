import { CopyButton } from './CopyButton'
import { EVENTS } from '@/lib/events'

export function Pre({ children }: { children?: React.ReactNode }) {
  // children is <code className="language-x">text</code>
  const el = children as React.ReactElement<{ children?: string; className?: string }>
  const text = typeof el?.props?.children === 'string' ? el.props.children.replace(/\n$/, '') : ''
  const lang = (el?.props?.className ?? '').replace('language-', '') || 'text'
  return (
    <div className="code">
      <div className="codebar">
        <span>{lang}</span>
        <CopyButton text={text} event={EVENTS.copyCodeBlock} />
      </div>
      <pre tabIndex={0}>{children}</pre>
    </div>
  )
}
