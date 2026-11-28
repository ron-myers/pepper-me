---
pepper_context: v1
version: 2
created: 2026-11-27
updated: 2026-11-27
heat: medium
status: approved
---

# Pepper

## Purpose
Pepper is a set of agent skills that give an agent context before it works. `pepper-me` runs a kickoff for one task and writes a brief. `pepper-init` interviews the user once and writes `PROJECT.md`. A marketing site in `site/` drives installs.
Winning means adoption by other developers.

## Users
- Developers starting a task with vague intent (`pepper-me`)
- Teams onboarding an agent to an existing repo (`pepper-init`)
- Non-developers using agents, such as PMs and founders

## Stack and commands
The skills are Markdown and JSON only. They have no build, test or lint commands.

| Task | Command |
|---|---|
| Site install | `cd site && npm install` (npm only, current LTS Node, no pin) |
| Site dev | `cd site && npm run dev` |
| Site build | `cd site && npm run build` (static export to `site/out`) |
| Site preview | `cd site && npm start` (serves `out/`; run build first) |

- Skills: `skills/pepper-me/SKILL.md`, `skills/pepper-init/SKILL.md`, each with a `config.example.json`
- Packaging: Claude Code plugin, `.claude-plugin/plugin.json` and `marketplace.json`, version 0.2.0
- Install paths: Claude Code plugin (primary) and skills.sh (`npx skills add ron-myers/pepper-me`)
- Site: Next.js 16 App Router, TypeScript, MDX, static export. Serves `llms.txt`.
- Site deploy: Vercel Git integration deploys on merge to `stable`. `NEXT_PUBLIC_FATHOM_SITE_ID` is set in Vercel. Fathom loads only when it is set.
- Default branch and ship target: `stable` (`.candid/config.json`)

## Conventions
- Commit style: conventional prefixes with PR number, e.g. `feat: add pepper-init (pepper me init) (#2)`
- Keep SKILL.md instructions short and testable. Plain language, short sentences, one behavior per bullet. Every option has a default (CONTRIBUTING.md).
- Adding a config key means updating `config.example.json`, the defaults list in SKILL.md, and the README.
- Each release bumps the version in `plugin.json`, `marketplace.json` and `CHANGELOG.md` together.
- Any `SKILL.md` or `config.example.json` change is a release and bumps the version. Site-only and docs-only PRs don't.
- `CHANGELOG.md` tracks plugin releases only. Site changes do not need an entry.
- Site work follows `PRODUCT.md` (copy and claims) and `DESIGN.md` (visual system). Every site claim must trace to repo files.

## Never do
- Change the `pepper_context` or `pepper_brief` format version.
- Add a config key without updating all three places above.
- Push to `stable` directly. Work on a branch and open a PR.
- Edit any `SKILL.md` without asking first, whatever the task. Skill wording is the product.

## Verification
- Skills: run the changed skill in a real Claude Code session. Paste a short transcript or brief in the PR (CONTRIBUTING.md).
- Site: `cd site && npm run build` passes, then check the changed pages in a browser at 360px and desktop, in light and dark.
- No automated checks or CI exist.

## Working agreements
- Proceed without asking on docs and typo fixes outside `SKILL.md`.
- Always work on a branch and PR into `stable`.
- Run a candid review (`candid-review` or `candid-ship`) on the diff before every PR. Fix the findings first.

## Open items
- [ ] PRODUCT.md says "No analytics, cookies or trackers", but Fathom is intended (#7). Update PRODUCT.md. (open since 2026-11-27, source: PRODUCT.md vs site/src/app/layout.tsx)
- [ ] PRODUCT.md's Open note on skills.sh is stale. skills.sh is now confirmed. (open since 2026-11-27, source: PRODUCT.md)
- [ ] CONTRIBUTING.md step 2 says edit `skills/pepper-me/SKILL.md` only. It predates `pepper-init` and the site. Update it. (open since 2026-11-27, source: CONTRIBUTING.md)
- [ ] PRODUCT.md says "Never edit a SKILL.md". PROJECT.md says ask first. Align the wording. (open since 2026-11-27, source: PRODUCT.md vs answer)
- [ ] `.pepper/config.json` sets `only_projects: ["pepper-me"]`, but SKILL.md doesn't say if project folder matching is exact or partial. Real folders are named like `-Users-ronmyers-conductor-workspaces-pepper-me-zurich-v2`. If matching is exact, no other sessions are read. (open since 2026-11-27, source: .pepper/config.json vs skills/pepper-me/SKILL.md)

## Decisions
| # | Date | Decision | Answer | Source |
|---|------|----------|--------|--------|
| 1 | 2026-11-27 | What winning means | Adoption by other developers | asked |
| 2 | 2026-11-27 | Target platforms | Claude Code | asked |
| 3 | 2026-11-27 | Release versioning | Bump plugin.json, marketplace.json, CHANGELOG together | asked |
| 4 | 2026-11-27 | Verification | Manual session run | asked, CONTRIBUTING.md |
| 5 | 2026-11-27 | Agent habits | Conventional commits, branch + PR to `stable`, ask before skill behavior changes, proceed on docs/typos | asked |
| 6 | 2026-11-27 | Install paths | Claude Code plugin primary, skills.sh supported (changed from #2) | asked |
| 7 | 2026-11-27 | Site analytics | Fathom stays. PRODUCT.md is out of date | asked, conflict |
| 8 | 2026-11-27 | CONTRIBUTING.md scope | Out of date. Logged as a fix | asked |
| 9 | 2026-11-27 | Site deploy | Vercel, auto on merge to `stable` | asked, PRODUCT.md |
| 10 | 2026-11-27 | Site verification | Build passes, browser check at 360px and desktop, light and dark | asked |
| 11 | 2026-11-27 | CHANGELOG scope | Plugin releases only | asked |
| 12 | 2026-11-27 | Constraints | None beyond the repo docs | asked |
| 13 | 2026-11-27 | SKILL.md edits | Always ask first, whatever the task | asked |
| 14 | 2026-11-27 | Pre-PR review | candid review before every PR | asked, .candid/config.json |
| 15 | 2026-11-27 | Node and package manager | npm only, Node unpinned | asked, site/package-lock.json |
| 16 | 2026-11-27 | What triggers a release | Any SKILL.md or config change | asked |
