import { CopyButton } from './CopyButton'

export function HeroInstall({ text }: { text: string }) {
  return (
    <div className="heroinstall">
      <pre aria-label="Install command">
        <code>{text}</code>
      </pre>
      <CopyButton text={text} label="Copy install" event="copy: hero install" />
    </div>
  )
}
