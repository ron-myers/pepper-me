---
pepper_context: v1
version: 1
created: 2026-11-27
updated: 2026-11-27
heat: medium
status: approved
---

# Pepper

## Purpose
Pepper is a set of agent skills that give an agent context before it works. `pepper-me` runs a kickoff for one task and writes a brief. `pepper-init` interviews the user once and writes `PROJECT.md`.
Winning means adoption by other developers.

## Users
- Developers starting a task with vague intent (`pepper-me`)
- Teams onboarding an agent to an existing repo (`pepper-init`)
- Non-developers using agents, such as PMs and founders

## Stack and commands
The skills are Markdown and JSON only. The marketing site lives in `site/` (Next.js, static export; `cd site && npm run build`). Skills have no build, test or lint commands.

- Skills: `skills/pepper-me/SKILL.md`, `skills/pepper-init/SKILL.md`, each with a `config.example.json`
- Packaging: Claude Code plugin, `.claude-plugin/plugin.json` and `marketplace.json`, version 0.2.0
- Default branch and ship target: `stable` (`.candid/config.json`)

## Conventions
- Commit style: conventional prefixes with PR number, e.g. `feat: add pepper-init (pepper me init) (#2)`
- Keep SKILL.md instructions short and testable. Plain language, short sentences, one behavior per bullet. Every option has a default (CONTRIBUTING.md).
- Adding a config key means updating `config.example.json`, the defaults list in SKILL.md, and the README.
- Each release bumps the version in `plugin.json`, `marketplace.json` and `CHANGELOG.md` together.

## Never do
- Change the `pepper_context` or `pepper_brief` format version.
- Add a config key without updating all three places above.
- Push to `stable` directly. Work on a branch and open a PR.

## Verification
Run the changed skill in a real Claude Code session. Paste a short transcript or brief in the PR (CONTRIBUTING.md). No automated checks exist.

## Working agreements
- Ask before changing skill behavior. Skill wording is the product.
- Proceed without asking on docs and typo fixes.
- Always work on a branch and PR into `stable`.

## Open items
- [ ] README lists skills.sh install (`npx skills add`), but target platform was confirmed as Claude Code only. Decide whether skills.sh is supported. (open since 2026-11-27, source: README.md vs answer)
- [ ] CONTRIBUTING.md says to edit `skills/pepper-me/SKILL.md` only. It predates `pepper-init`. (open since 2026-11-27, source: CONTRIBUTING.md)
- [ ] Constraints and deadlines were not stated beyond the repo's docs. (open since 2026-11-27, source: asked, none given)

## Decisions
| # | Date | Decision | Answer | Source |
|---|------|----------|--------|--------|
| 1 | 2026-11-27 | What winning means | Adoption by other developers | asked |
| 2 | 2026-11-27 | Target platforms | Claude Code | asked |
| 3 | 2026-11-27 | Release versioning | Bump plugin.json, marketplace.json, CHANGELOG together | asked |
| 4 | 2026-11-27 | Verification | Manual session run | asked, CONTRIBUTING.md |
| 5 | 2026-11-27 | Agent habits | Conventional commits, branch + PR to `stable`, ask before skill behavior changes, proceed on docs/typos | asked |
