# Bye Bye Meta

A LUCA Brussels Master's project built with HTML, CSS, vanilla JavaScript and p5.js. The user knows these tools and is learning to develop with coding agents.

At the start of a session, read [handover.md](handover.md) for where work left off and [PLAN.md](PLAN.md) for decisions and progress.

## Survey data

- Never commit, publish or serve the raw survey CSV and JSON exports. They are gitignored and hold individual responses.
- Publish only approved aggregate counts and quotes with permission. Keep the existing bracketed redactions.
- Ask before showing any new cross-tab or finding that links answers.

## Running and publishing

- Run `node serve.js` and open http://localhost:8080/leaving-together.html.
- GitHub Pages serves `main` → `/docs`. Leaving Together has a local copy and a `docs/` copy. Change both together and use relative URLs in `docs/`.
- Use Git tags (`v0.1.0` onward) to find versions. Commit IDs in older PLAN.md entries predate a history rewrite.

## How we work

- Work in small steps and explain important decisions in plain language.
- Check each change in the browser: the counts, quote navigation, keyboard and pointer input, and a narrow viewport.
- After verifying a change, add a dated entry to PLAN.md.
- Keep PNGs, PDFs and other heavy files (images, video, audio, design files, archives) out of commits. `.gitignore` covers the common types. If the public site needs an asset, ask first.
- Write commit subjects as `vX.Y.Z: <concrete change>`, for example `v0.3.0: Add navigation for 13 survey quotes`. Name what changed, not just "update" or "fixes". Add an annotated tag for the same version, with the subject text as its message. Bump the minor version for new features in the piece and the patch version for fixes, styling, tooling and docs.
- Check `git status` first and keep any uncommitted work. Ask before committing, discarding, pushing or publishing.
