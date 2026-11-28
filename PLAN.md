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
