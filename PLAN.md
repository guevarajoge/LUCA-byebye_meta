# Bye Bye Meta Development Plan

**Current milestone:** Review whether the movement helps explain the survey results.

Bye Bye Meta is an interactive visualization for a Master's project at LUCA Brussels. It explores how Brussels cultural institutions use Facebook and Instagram to reach audiences.

## 1. Establish a local baseline

- [x] Inspect the survey exports and the [first p5.js sketch](https://editor.p5js.org/jorgeguevaralarrotta/sketches/oJAYWnE0n).
- [x] Bring the sketch into this folder with a simple HTML entry point and keep its p5.js version for the baseline.
- [x] Run it in a browser and check the animation, hover tooltips, keyboard controls, and resizing.
- [x] Verify a working Git executable. Apple Git 2.39.2 works in Terminal, and VS Code recognizes it.
- [ ] Set up version history in this folder. Ask before committing or discarding changes.

## 2. Build the first survey-backed view

- [x] Check which audience-share responses may be used in anonymous totals, then prepare counts by band. Keep blank answers distinct from “no idea” and label the unit as survey responses.
- [x] Load only the approved aggregate counts in the browser. Keep the raw exports outside any public site files.
- [x] Reuse the gather-and-scatter motion and legend. Show the band and count in each tooltip, and add a static count so viewers can read the distribution with the animation paused.
- [x] Verify the displayed counts against the eligible survey responses. Test on a narrow screen and check that the legend explains what the movement represents.

## 3. Review before expanding

- [ ] Discuss whether the animation helps viewers understand the distribution.
- [ ] Choose one follow-up survey question. Candidate topics include which channels institutions use and whether they would consider leaving Meta.
- [ ] Continue with p5.js and vanilla JavaScript. Revisit Vue or React if several views need shared filters or controls.

## Changes to the plan

When we agree on a change, update the relevant checklist and the current milestone if it has shifted. Add a dated entry here with what changed and why. Mark implementation tasks complete after checking the result.

- **2026-11-22** — Recorded the plan from the read-only review. The local sketch and browser checks are pending.

- **2026-11-22** — Imported the first sketch and verified canvas rendering, animation, hover, keyboard controls, and resize in headless Chrome. The local page keeps p5.js 2.3.4 and drops the unused sound add-on. The survey-backed view is next.

- **2026-11-22** — Prepared [anonymous audience-share counts](audience-share-counts.json) from 17 responses that permit use in totals. The CSV and JSON exports agree, and the saved counts sum to 17. The sketch still uses its dummy data.

- **2026-11-22** — Connected the aggregate data to the sketch, using one card per answer group and a fixed count legend. Start the local preview with `node serve.js` and open [localhost:8080](http://localhost:8080). Headless Chrome verified the counts, controls, hover, and 360 px layout. The local server rejects requests for the raw survey exports.

- **2026-11-22** — Restored the original animated sketch as the [homepage](http://localhost:8080/) and kept the aggregate visualization at [survey.html](http://localhost:8080/survey.html). Verified both pages in Chrome.

- **2026-11-22** — Restored the default Git command and added ignore rules for the raw survey exports. Repository initialization and the first commit are pending.
