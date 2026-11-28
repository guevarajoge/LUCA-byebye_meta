# Bye Bye Meta Development Plan

**Current milestone:** Decide which survey findings tell the Bye Bye Meta story before choosing a visual format.

Bye Bye Meta is an interactive visualization for a Master's project at LUCA Brussels. It explores how Brussels cultural institutions use Facebook and Instagram to reach audiences.

## 1. Establish a local baseline

- [x] Inspect the survey exports and the [first p5.js sketch](https://editor.p5js.org/jorgeguevaralarrotta/sketches/oJAYWnE0n).
- [x] Bring the sketch into this folder with a simple HTML entry point and keep its p5.js version for the baseline.
- [x] Run it in a browser and check the animation, hover tooltips, keyboard controls, and resizing.
- [x] Verify a working Git executable. Apple Git 2.39.2 works in Terminal, and VS Code recognizes it.
- [x] Set up version history in this folder. Ask before committing or discarding changes.

## 2. Build the first survey-backed view

- [x] Check which audience-share responses may be used in anonymous totals, then prepare counts by band. Keep blank answers distinct from “no idea” and label the unit as survey responses.
- [x] Load only the approved aggregate counts in the browser. Keep the raw exports outside any public site files.
- [x] Reuse the gather-and-scatter motion and legend. Show the band and count in each tooltip, and add a static count so viewers can read the distribution with the animation paused.
- [x] Verify the displayed counts against the eligible survey responses. Test on a narrow screen and check that the legend explains what the movement represents.

## 3. Review before expanding

- [ ] Agree on the storyline and the survey questions that support it.
- [ ] Compare a simple chart and a quote-led layout before deciding what role animation should play.
- [ ] Continue with p5.js and vanilla JavaScript. Revisit Vue or React if several views need shared filters or controls.

## Changes to the plan

When we agree on a change, update the relevant checklist and the current milestone if it has shifted. Add a dated entry here with what changed and why. Mark implementation tasks complete after checking the result.

- **2026-11-22** — Recorded the plan from the read-only review. The local sketch and browser checks are pending.

- **2026-11-22** — Imported the first sketch and verified canvas rendering, animation, hover, keyboard controls, and resize in headless Chrome. The local page keeps p5.js 2.3.4 and drops the unused sound add-on. The survey-backed view is next.

- **2026-11-22** — Prepared [anonymous audience-share counts](audience-share-counts.json) from 17 responses that permit use in totals. The CSV and JSON exports agree, and the saved counts sum to 17. The sketch still uses its dummy data.

- **2026-11-22** — Connected the aggregate data to the sketch, using one card per answer group and a fixed count legend. Start the local preview with `node serve.js` and open [localhost:8080](http://localhost:8080). Headless Chrome verified the counts, controls, hover, and 360 px layout. The local server rejects requests for the raw survey exports.

- **2026-11-22** — Restored the original animated sketch as the [homepage](http://localhost:8080/) and kept the aggregate visualization at [survey.html](http://localhost:8080/survey.html). Verified both pages in Chrome.

- **2026-11-22** — Restored the default Git command and added ignore rules for the raw survey exports. Repository initialization and the first commit are pending.

- **2026-11-22** — Saved the first prototype as commit `a8a4845`. The local `main` branch tracks `origin/main`. Both raw survey exports remain outside Git history.

- **2026-11-22** — Shifted the design review to the story and the evidence. Proposed starting with channels in use, the conditions under which respondents might leave Meta, and what they say is at stake. Audience-share estimates are a possible supporting detail.

- **2026-11-22** — Built a [Would you leave Meta? prototype](http://localhost:8080/leaving-meta.html) with a static four-answer chart and two permission-cleared excerpts. Verified the counts and excerpts against the survey and checked the page at desktop and mobile widths. The storyline and visual format are open for review.

- **2026-11-22** — The static chart felt too generic. Proposed a p5.js study using 26 anonymous marks and a second gathering point to stage the question of leaving together. The movement will interpret the four observed answers while the counts stay fixed. Test the interaction before choosing whether to add shader or 3D work.

- **2026-11-22** — Built the [Leaving Together p5.js study](http://localhost:8080/leaving-together.html). Verified the four survey counts and both quote permissions, then tested mouse, keyboard, touch, and the narrow layout in Chrome. Review whether the tethered marks communicate the conditional response before expanding the story.

- **2026-11-22** — Proposed three beats for the p5.js story: channels already in use, leaving together, and what respondents might lose or gain. Prototype the channel layer next using aggregate counts. The survey shows that all ten respondents who might leave if others did already use a newsletter, a finding to review before deciding whether to show a cross-tab publicly.

- **2026-11-22** — Paused narrative development before building the channel routes. The immediate priority is a shareable online preview of the current p5.js study. Resume with newsletters, cultural listings, and print as aggregate routes once hosting is settled.

- **2026-11-22** — Published [Leaving Together on GitHub Pages](https://guevarajoge.github.io/LUCA-byebye_meta/) from `main` → `/docs` in commit `0fdd8a0`. Verified the public page and its assets, and tested mouse, keyboard, touch, and the narrow layout in Chrome.

- **2026-11-22** — Applied the approved Space Grotesk and IBM Plex Serif pairing to Leaving Together locally and in the GitHub Pages source. Verified both web fonts and the existing gesture in Chrome. The typography update awaits a commit and push.

- **2026-11-22** — Published the approved typography in commit `97b5b38` and verified that GitHub Pages serves the updated HTML and CSS.

- **2026-11-22** — Added all 13 nonblank answers with permission to quote. Each completed hold advances one answer and keeps it visible on release. Added numbered Previous and Next controls and bracketed institution names in two answers. Verified the full cycle and gesture in Chrome. The GitHub Pages source is prepared locally.

- **2026-11-22** — Published the 13-response update in commit `e57d623`. Verified the deployed files and tested all 13 responses, Previous and Next, and the hold gesture on the live page in Chrome.

- **2026-11-28** — Added three selectable channel routes to Leaving Together: newsletters (23), cultural listings (22), and print (20) of 26 responses. One route shows at a time as a labeled line leaving the Meta field, with line weight set by the count, and it fades while the viewer holds **Make space elsewhere**. A live text line repeats the selection for screen readers. The routes use aggregate counts only and are not linked to marks or answer groups. The newsletter cross-tab stays private. Verified mouse, keyboard, touch, the hold gesture, the four response counts, all 13 quotes, and 360 px in headless Chrome for the local page and the `docs/` copy. Review whether the routes make the hold gesture easier to read.

- **2026-11-28** — Put earlier versions online. Frozen copies of v0.2.1, v0.2.2, v0.3.0 and v0.4.0 were extracted unchanged from their Git tags into `docs/vX.Y.Z/`, and a Versions line on the latest page links to them. Tooling-only patches (v0.3.1, v0.3.2) are skipped because they look the same as v0.3.0. Verified that every snapshot matches its tag byte for byte, that each link opens the right version under the Pages path (v0.4.0 with routes, v0.3.0 with quotes only, v0.2.2 without quote navigation, v0.2.1 in Arial), and that the latest page still passes all checks, including at 360 px. The release routine is in CLAUDE.md.

- **2026-11-28** — Made the version status clear. Each frozen copy now has a mint archive banner, pinned to the top as the viewer scrolls, that says "You are viewing vX.Y.Z, an earlier version" and links back with "Go to the latest version →". This banner is the only addition to the frozen copies. The latest page now says "You are viewing the latest version. Earlier versions: …". Verified at 1280 and 360 px for all four versions: the banner shows, stays at the top while scrolling, the old piece still runs, there is no horizontal scroll, and the link returns to the latest page. The latest page still passes all 14 checks.

- **2026-11-28** — Removed the frozen v0.4.0 copy, because labeling the newest piece as "an earlier version" was confusing. Only replaced versions get a frozen copy now. `/v0.4.0/` forwards to the latest page until v0.5.0 is released, when v0.4.0 gets frozen. The Earlier versions line lists v0.3.0, v0.2.2 and v0.2.1. The routine in CLAUDE.md is updated.

- **2026-11-28** — Built v0.5.0 from the 28 Nov review. The Meta field now reads Instagram 25 · Facebook 23 and the Local alternative field Mastodon 6 · Bluesky 1 (with a screen-reader text version). The group's framing line sits under the question, and a non-response line says 85 organisations were asked, 26 responses came back and about 60 stayed silent. The quote naming four countries now reads "[four countries]". Each of the 13 quotes is tagged Loss, Gain or Loss and gain (answers about staying count as Loss). With the user's approval, the Newsletters route adds the cross-tab "including all 10 that would leave if enough others did". Four partial conclusions appear after the first completed hold. Every number was rechecked against the raw CSV. Conclusion 3 uses 11 of 17, not the group's 15 of 26, because only 17 respondents allowed their ad answers in totals. v0.4.0 is now frozen at `docs/v0.4.0/` with its banner, and `docs/v0.5.0/` forwards to the latest page. Verified the local page and the `docs/` copy (served under the Pages path) in headless Chrome: counts, all 13 quotes and tags, Previous/Next wrap, mouse, keyboard and touch holds, the channel texts, the conclusions, and 1280 and 360 px with no overlap or horizontal scroll. The frozen v0.4.0 runs, shows its banner and links back.

- **2026-11-28** — Changed conclusion 3 to "15 of 26 responses never pay for ads", the number on the group's posters, at the user's decision. Note: only 17 of the 26 respondents allowed their ad answers to be used in totals (11 of those 17 never pay), so 15 of 26 also counts answers from 9 respondents who did not give that permission. Saved the browser check as the `browser-check` skill in `.claude/skills/`, with expected values in one block at the top of its script. It found and fixed a false touch failure: switching Puppeteer to a mobile viewport reloads the page. All 20 checks pass for the local page and the `docs/` copy.

- **2026-11-28** — Added a README with an open-source argument (shared tools for leaving together, no platform lock-in, a method open to checking, data that stays local) and a practical guide: running the piece, the file layout, where each kind of data lives in the JS and HTML (including the hardcoded 26 and the "MAYBE" canvas note), publishing a fork on GitHub Pages, and survey-data care rules. Added an MIT LICENSE for the code at the user's choice. The survey counts, quotes and conclusions are explicitly excluded, because respondents agreed only to this project. Parked to-do 2 is done. The open-source argument can feed the positioning statement.

- **2026-11-28** — Added one footer line under the versions line on both copies of the page: "Open source: the code is free to reuse under the MIT license. Make your own version →", linking to the README section on GitHub. It is styled like the versions line, so it stays secondary to the piece. It ships as a patch, because it adds no feature to the piece. A short on-page "Why open source" block or an About page can follow once the positioning statement is written. Verified in headless Chrome: all 20 checks pass for the local page and the `docs/` copy, the frozen versions and the v0.5.0 forwarder still work, and the line wraps cleanly at 360 px with no horizontal scroll. `docs/` matches local apart from the three relative-URL lines.

- **2026-11-28** — Expanded the footer note into a short "Why open source" statement (text A, chosen by the user): "Leaving a platform is easier when you don't do it alone. The same goes for the tools: this piece runs on plain HTML, CSS and JavaScript, with no accounts, tracking or platform behind it. The code is free to reuse under the MIT license, so other sectors and cities can map who would leave with them." It still links to the README. Because it extends the piece's argument, it ships as v0.6.0, not as the patch planned in the previous entry. Froze v0.5.0 at `docs/v0.5.0/` from its tag, with only the four top-level files, so older version folders aren't nested, plus the banner. v0.5.0 is the first frozen copy with its own "Earlier versions" line, which would contradict the banner and whose relative links break in a subfolder. At the user's choice, the banner block now also holds a style rule that hides it, and the page content stays byte-identical to the tag. Updated the freeze routine in CLAUDE.md for both points. `docs/v0.6.0/` forwards to the latest page. Verified: 20/20 checks for the local page and the `docs/` copy, all five frozen copies (banner, piece runs, sticky, 360 px, link back, no errors), the v0.6.0 forwarder, the hidden line in v0.5.0, the new Earlier versions link, and the statement wrapping at 360 px.

- **2026-11-28** — v0.6.1: Added context and credits. A small line above the title reads "LUCA School of Arts, Brussels · MIND Master · Studio Practice #3". A footer line after the open-source statement credits Datalicious, a sub-group of the MIND Master class, with all six members' full names (group credit, user's choice; the user confirmed the classmates agreed to public full names). The README intro and a new Credits section say the same. Also changed the working rules in CLAUDE.md and the `browser-check` skill: small edits skip the browser check, the full check runs once before committing, and PLAN.md gets one entry per release. Verified before commit: 20/20 checks for the local page and the `docs/` copy, all five frozen copies and the v0.6.0 forwarder, the raw CSV still 404, and both new lines in Space Grotesk with no horizontal scroll at 1280 and 360 px.
