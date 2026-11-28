# Bye Bye Meta handover

Updated 2026-11-28. Read this file and [PLAN.md](PLAN.md) before starting work. The plan records the project's decisions and experiments. Its older entries contain commit IDs from before a history rewrite, so use Git tags to locate versions.

## Project

Bye Bye Meta is a LUCA Brussels Master's project about how Brussels cultural institutions reach audiences and what it would take to leave Facebook and Instagram together. The interactive piece uses HTML, CSS, vanilla JavaScript, and p5.js. The user has experience with those tools and wants to learn how to develop with coding agents. Work incrementally, explain important decisions in plain language, and test each change in the browser.

## Start here

- Work in `~/Development/LUCA-dev/bye-bye-meta` on `main`. The sibling `bye-bye-meta-v020` is an older preview pinned to `v0.2.0`.
- Run `node serve.js` from the project root and open [Leaving Together](http://localhost:8080/leaving-together.html). The root `index.html` is the original fictional-label prototype. `survey.html` is the aggregate audience-share experiment, and `leaving-meta.html` is the static chart.
- The [public site](https://guevarajoge.github.io/LUCA-byebye_meta/) is hosted by GitHub Pages from `main` → `/docs`. Its homepage is `docs/index.html`. The local Leaving Together page and the public copy have separate HTML entry points and matching `leaving-together.js` and CSS files. When changing Leaving Together, keep both copies in sync and use relative URLs in `docs` so links work under the repository's Pages path.
- The current published version is `v0.3.0` (`084df96`). Version tags run from `v0.1.0` through `v0.3.0`. The branch `backup/pre-version-renaming` preserves the old history locally.

## What works today

Leaving Together shows 26 anonymous marks, one per response to the hypothetical question about leaving Meta if a reliable local alternative existed and other Brussels institutions moved there too. The four responses are 7 yes, 10 maybe if enough others did, 4 already looking into it, and 5 no. Holding **Make space elsewhere** opens the second gathering point. The ten conditional responses stretch between the centers. This is a visual interpretation of the answers, without a numerical threshold or a prediction of who would move.

Each completed hold advances one quote, which stays visible on release. Previous and Next cycle through 13 nonblank, permission-cleared answers to a separate open-ended question. Institution names were bracketed in two answers. The page uses Space Grotesk and IBM Plex Serif. Desktop, narrow layouts, and mouse, keyboard, and simulated touch were previously tested in Chrome.

## Where to pick up

The next proposed experiment is to show the channels respondents already use before the viewer makes space elsewhere. Try three selectable routes in the existing p5.js scene using aggregate counts from the 26 submissions: newsletters (23), cultural listings (22), and print (20). Respondents could select multiple channels. Keep these aggregates separate from individual marks, and check whether revealing the routes makes the hold gesture easier to interpret before expanding the scene. The finding that all ten conditional respondents reported using newsletters is a candidate for discussion before public use.

## Working agreements

The standing rules on survey data, publishing, testing and Git are in [CLAUDE.md](CLAUDE.md), which loads automatically each session.
