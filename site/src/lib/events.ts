// Every Fathom event name the site can send. Renaming one orphans its history in Fathom.
export const EVENTS = {
  githubHeader: 'github: header',
  githubFooter: 'github: footer',
  githubHero: 'github: hero',
  githubLicense: 'github: license',
  githubContributing: 'github: contributing',
  outboundAuthor: 'outbound: author',
  copyHeroInstall: 'copy: hero install',
  copyCodeBlock: 'copy: code block',
  copyInstall: (tab: string) => `copy: install ${tab}`,
  copyBrief: (size: string) => `copy: brief (${size})`,
  installTab: (tab: string) => `install tab: ${tab}`,
  briefSize: (size: string) => `brief size: ${size}`,
  outbound: (host: string) => `outbound: ${host}`,
} as const
