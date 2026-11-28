# Contributing

Thanks for helping make pepper me better.

## Ideas that fit

- New tones
- Better question layers for specific kinds of work
- Brief templates for common jobs (PRDs, client briefs, investment memos)
- Smarter conflict detection

## How to contribute

1. Fork the repo and create a branch.
2. Edit `skills/pepper-me/SKILL.md`. Keep instructions short and testable.
3. If you add a config option, add it to `config.example.json`, the defaults list (in `SKILL.md`, or in both `references/shared.md` copies if the key is shared) and the README.
4. Try your change in a real session. Paste a short transcript or brief in the pull request.
5. Add a line to `CHANGELOG.md`.

`skills/pepper-me/references/shared.md` and `skills/pepper-me-init/references/shared.md` must stay identical. Edit both in the same change.

## Style

- Plain language, short sentences
- One behavior per bullet
- Every option has a default
