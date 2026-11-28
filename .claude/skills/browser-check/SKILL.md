---
name: browser-check
description: Check Leaving Together in headless Chrome after a change, for both the local page and the docs/ copy under the Pages path, plus frozen versions and forwarders. Use once before committing a release, and after changes to data or interaction. Skip it for small text or styling edits.
---

# Browser check

Runs the checks CLAUDE.md asks for (counts, quote navigation, keyboard and pointer input, a narrow viewport) with [check.js](check.js), and saves screenshots to look at.

## 1. Update the expected values

Open the `EXPECT` block at the top of `check.js` and make it match the change: response counts, number of quotes and their tags, redactions, framing and non-response text, conclusions, and channel status texts. Every number in it must trace back to the raw survey data (read locally, never written to tracked files).

## 2. Install the test tool outside the project

`puppeteer-core` drives the installed Chrome and is not a project dependency. Install it in the scratchpad (version 19 works with this machine's Node 14):

```sh
T=<scratchpad>/tools
mkdir -p "$T" && (cd "$T" && npm init -y >/dev/null && npm i puppeteer-core@19.11.1 --silent)
```

Skip this if `$T/node_modules/puppeteer-core` already exists.

## 3. Start two servers

- Local page: `node serve.js` from the project root (port 8080). Confirm the raw CSV still returns 404.
- `docs/` under the Pages path. `serve.js` does not serve `docs/`, so link it into a scratch folder:

```sh
mkdir -p <scratchpad>/pages
ln -sfn "$PWD/docs" <scratchpad>/pages/LUCA-byebye_meta
python3 -I -m http.server 8090 --bind 127.0.0.1 --directory <scratchpad>/pages
```

Run both in the background.

## 4. Run the checks

```sh
S=.claude/skills/browser-check/check.js
export NODE_PATH="$T/node_modules"
node $S page http://localhost:8080/leaving-together.html local <scratchpad>/shots
node $S page http://127.0.0.1:8090/LUCA-byebye_meta/ docs <scratchpad>/shots
node $S archive http://127.0.0.1:8090/LUCA-byebye_meta/v0.4.0/ v0.4.0   # each frozen copy
node $S forward http://127.0.0.1:8090/LUCA-byebye_meta/v0.5.0/           # the newest version's forwarder
```

Each line prints PASS or FAIL. The script exits with code 1 if anything fails. A FAIL can come from the script, not the page: switching Puppeteer to `isMobile` reloads the page, so read state fresh after any viewport change. Debug by logging what the page receives before changing the piece.

Also confirm that `docs/` matches local apart from relative URLs: `diff leaving-together.html docs/index.html` should only show the home link, the Earlier versions links and the noscript link, and the JS and CSS should be identical.

## 5. Look at the screenshots

Read the PNGs in `<scratchpad>/shots` (1280 start, open and channel; 360 full, open and channel). Look for overlapping labels on the canvas, text running off the edge, and anything the script cannot judge. Screenshots stay in the scratchpad, never in the project.

## 6. Clean up and report

Stop both servers (`pkill -f "node serve.js"`, `pkill -f "http.server 8090"`). Report the results as yes/no lines with evidence, and say plainly if anything failed or was skipped. After a push, check the live site with `curl` once GitHub Pages has deployed. The full browser check runs locally, so say that the live check covers only the served files.
