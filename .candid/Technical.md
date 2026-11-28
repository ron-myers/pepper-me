# Technical Standards: Pepper Me

Standards for this repo. Generated 2026-11-27 by candid-init (medium). Context: `PROJECT.md`, `PRODUCT.md`, `DESIGN.md`, `CONTRIBUTING.md`.

Analysis summary:
- Two Markdown skills (`skills/pepper-me/`, `skills/pepper-me-init/`), packaged as a Claude Code plugin (`.claude-plugin/`).
- One Next.js 16 static-export marketing site in `site/` (React 19, TypeScript strict, MDX). 1,117 lines across 19 source files.
- No linter, formatter, test runner or CI exists. Rules below cover what no tool checks.

Tags: `[observed N/M]` = convention followed in N of M relevant files. `[recommended]` = not yet present, see Gaps. Reviews flag only NEW violations of `[observed]` rules and treat `[recommended]` as suggestions.

---

## 1. Release and Packaging (highest priority)

- Any change to a `SKILL.md` or `config.example.json` is a release. Bump `version` in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json` and add a top entry to `CHANGELOG.md` in the same PR. [observed 3/3: all at 0.2.4]
- Site-only and docs-only changes (`site/`, `README.md`, `CONTRIBUTING.md`) do not bump the version and do not get a `CHANGELOG.md` entry.
- `CHANGELOG.md` entries use `## <version> - <YYYY-MM-DD>` followed by plain-language bullets. [observed 5/5 of recent entries]
- Never edit a `SKILL.md` without the user's explicit approval, whatever the task. Skill wording is the product (`PROJECT.md` "Never do").
- Never change the `pepper_context` or `pepper_brief` format version.
- Adding a config key updates three places together: `skills/<skill>/config.example.json`, the defaults list in that `SKILL.md`, and `README.md`.
- Never push to `stable`. Work on a branch, PR into `stable`. Commit subjects use conventional prefixes with PR number, e.g. `feat: add failure-mode lines (#13)`.

## 2. Skill Authoring (`skills/*/SKILL.md`)

- Frontmatter has exactly `name` and `description`. `name` equals the directory name. [observed 2/2]
- `description` contains only trigger conditions ("Use when ..."), never a workflow summary (release 0.2.1).
- One behavior per bullet. Every option has a stated default (`CONTRIBUTING.md` Style).
- Replace judgment words ("nuance", "if appropriate") with conditions an agent can observe (release 0.2.3).
- `pepper-me` and `pepper-me-init` must route away from each other: `pepper-me` description says "Not for 'pepper me init'". Keep both trigger lists disjoint.
- Skill reads are bounded: state the exact files and counts (e.g. at most 3 transcripts). No open-ended "read the repo".
- Verification is manual: run the changed skill in a real Claude Code session and paste a transcript or brief in the PR. No automated check exists.

## 3. Site Architecture (`site/`)

Layout (observed):
```
site/src/app/          routes, layout.tsx, globals.css, llms.txt/route.ts, opengraph-image.tsx
site/src/components/   9 presentational + interactive components
site/src/lib/          site.ts (repo/version reads), skills.ts (content data), brief.ts (brief data)
```

- `lib/` imports nothing from `components/` or `app/`. `components/` may import from `@/lib/*` only, never from `@/app/*`. [observed, 0 violations]
- Use the `@/` alias (`tsconfig.json` `paths`) for cross-directory imports, not `../../`. [observed in `app/layout.tsx`, `app/llms.txt/route.ts`]
- Site content (skill names, commands, summaries, install commands) lives in `lib/skills.ts` and `lib/site.ts`, not inline in components. When copy changes, edit there. `lib/skills.ts` carries "Source: README.md" comments: keep them accurate.
- Every site claim must trace to repo files (`PRODUCT.md`). Version shown on the site comes from `.claude-plugin/plugin.json` via `getVersion()` in `lib/site.ts`. Never hardcode a version string.
- `site/next.config.mjs` sets `output: 'export'`. No route may require a server at runtime: no `cookies()`, `headers()`, route handlers without `export const dynamic = 'force-static'`, or `next/image` optimization. [observed: `llms.txt/route.ts` sets `force-static`; `images.unoptimized: true`]
- `site/src/lib/site.ts` reads `../CHANGELOG.md` and `../.claude-plugin/plugin.json` via `process.cwd()`. Build and dev must run from `site/`.
- Environment variables: `NEXT_PUBLIC_FATHOM_SITE_ID` (analytics, loaded only when set) and `NEXT_PUBLIC_SITE_URL` (default `https://www.pepperme.dev`). Any new variable needs a default and a line in `PROJECT.md`.

## 4. React and TypeScript

- Components are named exports, never default exports. Only Next.js route files (`page`, `layout`, `not-found`, `opengraph-image`) use `export default`. [observed 9/9 components, 0 default exports in `components/` and `lib/`]
- `'use client'` appears only on components using state, effects or event handlers. Currently: `BriefSwitch`, `ChatWindow`, `CopyButton`, `InstallTabs`, `Transcript`. Server components: `Heat`, `HeroInstall`, `Panel`, `mdx-code`. [observed 9/9 consistent]
- `tsconfig.json` has `strict: true`. Never weaken it. No `any`: [observed 0 uses in `site/src`]. Use `unknown` and narrow.
- Props are typed inline on the function signature for single-use components (see `CopyButton.tsx`) and as exported `type` aliases for shared data shapes (`Skill` in `lib/skills.ts`). Use `type`, not `interface`. [observed, no `interface` in `site/src`]
- Interactive controls that change visible state announce it: `CopyButton.tsx` pairs the button with an `aria-live="polite"` `sr-only` status. Copy that pattern for any new transient state.
- Every `<button>` outside a `<form>` sets `type="button"`. [observed 4/5 files with buttons] Known exceptions: `site/src/components/InstallTabs.tsx:33` (tab buttons; add the attribute when next touched).
- `dangerouslySetInnerHTML` is allowed only for build-time HTML from repo-owned Markdown (`app/changelog/page.tsx`, via `marked` on `CHANGELOG.md`). Never pass user input, query strings or env values into it. Known exception: `app/changelog/page.tsx`.

## 5. Styling and Design

- Styling is plain CSS in `site/src/app/globals.css` with CSS variables (`--hair`, `--cell`, `--font-display`, `--font-body`, `--font-mono`). No CSS-in-JS or Tailwind is installed; do not add either.
- Fonts load only through `next/font/google` in `app/layout.tsx` (Anton, Hanken Grotesk, JetBrains Mono). Do not add `<link>` font tags.
- Visual changes follow `DESIGN.md`. Copy changes follow `PRODUCT.md`.
- Every page must work at 360px width and desktop, in light and dark (`color-scheme: light dark` in `viewport`). Verify in a browser before PR.
- Allow long inline code and install commands to wrap (`overflow-wrap: anywhere`, `pre-wrap` under the mobile media query in `globals.css`). Never introduce horizontal scroll at 360px.

## 6. Error Handling and Logging

- The site has no runtime server logic and no logging. Fail at build time: `lib/site.ts` uses `fs.readFileSync` and `JSON.parse` without try/catch so a missing or malformed `plugin.json` or `CHANGELOG.md` breaks `npm run build`. Keep it that way. Do not add silent fallbacks for repo files.
- Browser-only calls that can legitimately fail are wrapped in `try/catch` and degrade quietly (`navigator.clipboard.writeText` in `CopyButton.tsx`). Do not log or rethrow there.
- No `console.log` in committed code. [observed 0 uses in `site/src`]

## 7. Testing and Verification

No test runner exists. Verification per change type:

| Change | Required before PR |
|---|---|
| `SKILL.md` / `config.example.json` | Run in a real Claude Code session; paste transcript or brief in PR |
| `site/` | `cd site && npm run build` passes; check changed pages at 360px and desktop, light and dark |
| `plugin.json` / `marketplace.json` | Versions match each other and `CHANGELOG.md` top entry |
| Docs only | Links resolve; no stale claims |

Run `candid-review` or `candid-ship` on the diff before every PR and fix findings first (`PROJECT.md` working agreements).

## 8. Security

- No secrets in the repo. `.gitignore` excludes `.pepper/*` (except `.pepper/config.json`), `.conductor/`, `.candid/last-review.json`. Do not commit `.pepper/brief.md` or `.candid/last-review.json`.
- `.pepper/config.json` is committed and must contain no personal data, tokens or absolute user paths.
- Analytics: Fathom loads only when `NEXT_PUBLIC_FATHOM_SITE_ID` is set, via `next/script` in `app/layout.tsx`. No other third-party scripts, trackers or cookies.
- Install commands shown on the site (`INSTALL` in `lib/site.ts`) must match `README.md` exactly: `/plugin marketplace add ron-myers/pepper-me`, `/plugin install pepper-me@pepper-me`, `npx skills add ron-myers/pepper-me`.
- Skills that read other sessions' transcripts (`pepper-me` `other_sessions`) stay opt-in: `other_sessions.enabled` defaults to `false`. Never flip that default.
- In `.tsx` files, links to this repo use `REPO_URL` from `lib/site.ts`, not literals. [observed 2/2 repo links in `app/layout.tsx`] Known exceptions: `site/src/app/skills/pepper-me/page.mdx:136`, `site/src/app/skills/pepper-me-init/page.mdx:74` (hardcoded `blob/stable/...` URLs in MDX). `target="_blank"` links need `rel="noopener noreferrer"` (none exist today).

## 9. Dependencies

- npm only (`site/package-lock.json`). No yarn or pnpm lockfiles. Node unpinned (current LTS).
- Runtime dependencies in `site/package.json` stay at or below 10 (currently 8). Current runtime deps: `next`, `react`, `react-dom`, `@next/mdx`, `@mdx-js/*`, `marked`, `remark-gfm`. Adding a runtime dependency needs a reason in the PR.
- Skills have no dependencies. Never add a script or binary requirement to a `SKILL.md`.

---

## Gaps vs Best Practices

| Area | Current State | Recommended | Priority |
|---|---|---|---|
| CI | None. Builds only verified manually | GitHub Action running `cd site && npm ci && npm run build` on PRs [recommended] | High |
| Release consistency | Three-file version sync is by hand | Script or CI check that `plugin.json`, `marketplace.json`, `CHANGELOG.md` agree [recommended] | High |
| Docs drift | `CONTRIBUTING.md` step 2 names only `pepper-me`; `PRODUCT.md` says "No analytics" but Fathom ships; `PRODUCT.md` skills.sh note stale; "Never edit a SKILL.md" wording differs from `PROJECT.md` (see `PROJECT.md` Open items) | Fix all four | High |
| Lint/format | No ESLint, Prettier or Biome | Add `next lint`/ESLint with `eslint-config-next` [recommended] | Medium |
| Type check | Only `next build` type-checks | `tsc --noEmit` script in `site/package.json` [recommended] | Low |
| Cwd coupling | `lib/site.ts` resolves repo root via `process.cwd()/..`; breaks if run from repo root | Resolve from `import.meta.url` or document [recommended] | Low |
| Changelog render | `dangerouslySetInnerHTML` on `marked` output | Safe today (repo-owned input). Sanitize if input source ever changes | Low |
| Exclude patterns | `.candid/config.json` excludes `site/.next/*` and `site/out/*`, neither exists until a build | None needed | Info |
| Skill tests | No fixtures or golden transcripts | Store 1-2 example transcripts per skill under `skills/<skill>/examples/` [recommended] | Medium |

## Appendix: File Reference

- `skills/pepper-me/SKILL.md`, `skills/pepper-me-init/SKILL.md`, `skills/*/config.example.json`
- `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `CHANGELOG.md`
- `PROJECT.md` (commands, conventions, open items), `PRODUCT.md`, `DESIGN.md`, `CONTRIBUTING.md`
- `site/next.config.mjs`, `site/tsconfig.json`, `site/src/lib/site.ts`, `site/src/lib/skills.ts`
- `site/src/app/layout.tsx`, `site/src/app/llms.txt/route.ts`, `site/src/app/changelog/page.tsx`
- `site/src/components/CopyButton.tsx` (reference client component)

*Generated by candid-init. Run `/candid-validate-standards` to check rule quality.*
