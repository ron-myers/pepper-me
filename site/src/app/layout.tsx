import type { Metadata, Viewport } from 'next'
import { Anton, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import Link from 'next/link'
import Script from 'next/script'
import { LinkTracker } from '@/components/LinkTracker'
import { getVersion, REPO_URL, SITE_URL } from '@/lib/site'
import './globals.css'

const display = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display', display: 'swap' })
const body = Hanken_Grotesk({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Pepper Me: skills that give your agent context', template: '%s | Pepper Me' },
  description:
    'Pepper Me is a set of agent skills. Each one is a short, structured conversation that makes sure your agent has the context it needs before it starts.',
  openGraph: {
    type: 'website',
    siteName: 'Pepper Me',
    title: 'Pepper Me: skills that give your agent context',
    description: 'Agents get the one-line task. Pepper Me gives them the kickoff meeting.',
  },
  twitter: { card: 'summary_large_image' },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafaf7' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0b0c' },
  ],
}

const FATHOM_SITE_ID = process.env.NEXT_PUBLIC_FATHOM_SITE_ID

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const version = getVersion()
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {FATHOM_SITE_ID && (
          <>
            <Script src="https://cdn.usefathom.com/script.js" data-site={FATHOM_SITE_ID} strategy="afterInteractive" />
            <LinkTracker />
          </>
        )}
        <a className="skip" href="#main">
          Skip to content
        </a>
        <header className="top">
          <Link href="/" className="mark" aria-label="Pepper Me, home">
            Pepper Me
          </Link>
          <nav aria-label="Main">
            <Link href="/#skills">Skills</Link>
            <Link href="/skills/pepper-me">pepper-me</Link>
            <Link href="/skills/pepper-me-init">pepper-me-init</Link>
            <Link href="/changelog">Changelog</Link>
            <a href={REPO_URL} data-track="github: header">
              GitHub
            </a>
          </nav>
        </header>
        <main id="main">{children}</main>
        <footer className="foot">
          <div className="foot-in">
            <p className="foot-mark">Pepper Me</p>
            <ul>
              <li>
                <a href={REPO_URL} data-track="github: footer">
                  Repo
                </a>
              </li>
              <li>
                <a href={`${REPO_URL}/blob/stable/LICENSE`} data-track="github: license">
                  MIT license
                </a>
              </li>
              <li>
                <Link href="/changelog">Changelog</Link>
              </li>
              <li>
                <a href={`${REPO_URL}/blob/stable/CONTRIBUTING.md`} data-track="github: contributing">
                  Contributing
                </a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
              <li>
                <a href="https://www.candid.tools">Intelligent code reviews</a>
              </li>
            </ul>
            <p className="fine">
              Version {version}. Built by <a href="https://github.com/ron-myers" data-track="outbound: author">
                Ron Myers
              </a> at Fritter Factory.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
