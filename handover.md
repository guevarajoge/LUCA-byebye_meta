# Bye Bye Meta handover

Updated 2026-11-28. Read this file and [PLAN.md](PLAN.md) before starting work. The plan records the project's decisions and experiments. Its older entries contain commit IDs from before a history rewrite, so use Git tags to locate versions.

## Project

Bye Bye Meta is a LUCA Brussels Master's project about how Brussels cultural institutions reach audiences and what it would take to leave Facebook and Instagram together. The interactive piece uses HTML, CSS, vanilla JavaScript, and p5.js. The user has experience with those tools and wants to learn how to develop with coding agents. Work incrementally, explain important decisions in plain language, and test each change in the browser.

## Start here

- Work in `~/Development/LUCA-dev/bye-bye-meta` on `main`. The sibling `bye-bye-meta-v020` is an older preview pinned to `v0.2.0`.
- Run `node serve.js` from the project root and open [Leaving Together](http://localhost:8080/leaving-together.html). The root `index.html` is the original fictional-label prototype. `survey.html` is the aggregate audience-share experiment, and `leaving-meta.html` is the static chart.
- The [public site](https://guevarajoge.github.io/LUCA-byebye_meta/) is hosted by GitHub Pages from `main` → `/docs`. Its homepage is `docs/index.html`. The local Leaving Together page and the public copy have separate HTML entry points and matching `leaving-together.js` and CSS files. When changing Leaving Together, keep both copies in sync and use relative URLs in `docs` so links work under the repository's Pages path.
- The latest version is `v0.5.0`. Frozen copies of the replaced versions live at `docs/v0.2.1/`, `v0.2.2/`, `v0.3.0/` and `v0.4.0/`. Each has an archive banner linking back to the latest page, which lists them under Earlier versions. `docs/v0.5.0/` only forwards to the latest page until a newer minor version replaces it. The routine is in CLAUDE.md. The branch `backup/pre-version-renaming` preserves the old history locally.

## What works today

Leaving Together shows 26 anonymous marks, one per response to the hypothetical question about leaving Meta if a reliable local alternative existed and other Brussels institutions moved there too. The four responses are 7 yes, 10 maybe if enough others did, 4 already looking into it, and 5 no. Holding **Make space elsewhere** opens the second gathering point. The ten conditional responses stretch between the centers. This is a visual interpretation of the answers, without a numerical threshold or a prediction of who would move.

Each completed hold advances one quote, which stays visible on release. Previous and Next cycle through 13 nonblank, permission-cleared answers to a separate open-ended question. Institution names were bracketed in two answers. The page uses Space Grotesk and IBM Plex Serif. Desktop, narrow layouts, and mouse, keyboard, and simulated touch were previously tested in Chrome.

## Where to pick up

Channel routes shipped in `v0.4.0`. Three buttons below the canvas show newsletters (23), cultural listings (22), and print (20) of 26 responses as one labeled line at a time, leaving the Meta field. Respondents could select multiple channels. The routes stay aggregate and separate from the individual marks. Next, review with viewers whether revealing the routes makes the hold gesture easier to interpret before expanding the scene. Since v0.5.0 the Newsletters route also says that all ten conditional respondents use newsletters (approved 28 Nov). Other cross-tabs still need approval.

## Parked to-dos (28 Nov)

1. **Positioning statement:** why this piece takes its own approach next to the group's four posters, and where the design decisions come from. Write it in two forms: a short chat message for the group, and a longer formal text for the 2 December presentation to the class, the organisations and the teachers.
2. **Open-source angle and README:** add an open-source argument to the concept, plus a practical README that explains how to get the code and build your own version with different data.

**Built in v0.5.0:** the platform labels on both fields, the framing line, the non-response line, the bracketed countries quote, Loss/Gain tags on the quotes, the newsletter cross-tab on the Newsletters route, and the four conclusions after the first hold. Conclusion 3 uses **15 of 26**, matching the group's posters (user's decision, v0.5.1). Only 17 respondents allowed ad answers in totals, so this number includes 9 who did not; see PLAN.md.

Decisions from the 28 Nov review of v0.4 against the group's angle (record; all built in v0.5.0 except the slide and the parked to-dos):
- Label Instagram (25) and Facebook (23) on the Meta field.
- Show non-response: the database lists 92 organisations, 85 were contacted, and 26 responses came back. The raw export shows 25 distinct institution names (exact match), so one organisation answered twice and about 60 of the 85 didn't respond. Spelling variants are not yet checked. Agree on the wording before building.
- Anonymise the quote that names four countries, using brackets like the existing redactions.
- From the group's posters, without changing the concept:
  - Use their central message as the framing line: "The challenge is not simply whether cultural organisations want to leave Meta, but what makes leaving possible."
  - Label the Local alternative field with Mastodon 6 · Bluesky 1, to show that the alternative is still nearly empty.
  - Optional: tag each quote as a loss or a gain, using the doc's themes.
  - Leave to the posters: visibility pressure, spending bands, and the other channels.
- Cross-tabs: single numbers by default. One candidate is still to decide: all 10 "maybe" respondents use newsletters, which could highlight the newsletter route.
- Partial conclusions (draft, single numbers only), for the piece after the hold, the positioning text and the slide:
  1. Leaving is conditional, not refused: 21 of 26 responses are open to leaving, 5 said no.
  2. The alternatives already exist: newsletters 23, listings 22, print 20.
  3. Staying isn't about paid reach: 15 of 26 never pay for ads (from the group's doc; verify against the raw data).
  4. Silence is also data: about 60 of 85 contacted organisations didn't reply.
- Make a presentation slide for 2 December at 14:00, for the combined class slideshow.

Private group material (the chat export and the context brief) belongs only in an ignored `context/` folder. Never quote it in tracked files.

## Working agreements

The standing rules on survey data, publishing, testing and Git are in [CLAUDE.md](CLAUDE.md), which loads automatically each session.
