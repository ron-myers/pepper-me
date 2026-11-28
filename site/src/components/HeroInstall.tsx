import { CopyButton } from './CopyButton'
import { EVENTS } from '@/lib/events'

export function HeroInstall({ text }: { text: string }) {
  return (
    <div className="heroinstall">
      <pre aria-label="Install command">
        <code>{text}</code>
      </pre>
      <CopyButton text={text} label="Copy install" event={EVENTS.copyHeroInstall} />
    </div>
  )
}
