// Browser checks for Leaving Together, run in headless Chrome.
//
//   node check.js page    <url> <label> <screenshot-dir>   checks the latest piece
//   node check.js archive <url> <version>                  checks a frozen copy at docs/vX.Y.0/
//   node check.js forward <url>                            checks a forwarding index.html
//
// puppeteer-core is not a project dependency. Install it outside the project and
// point NODE_PATH at it (see SKILL.md).
const puppeteer = require('puppeteer-core');
const fs = require('fs');

// ---- Expected values. Update this block when the piece changes. ----
const EXPECT = {
  counts: '7/10/4/5',
  quotes: 13,
  tags: ['Loss', 'Gain', 'Loss', 'Loss', 'Loss', 'Loss and gain', 'Loss', 'Loss', 'Loss and gain', 'Loss and gain', 'Gain', 'Loss and gain', 'Loss'],
  // Text that must appear in the quotes, and text that must not (redactions).
  quoteMustInclude: ['operating in [four countries]'],
  quoteMustNotMatch: /Belgium|Netherlands|Luxembourg|Finland/,
  framingStart: 'The challenge is not simply whether cultural organisations want to leave Meta',
  silence: '85 organisations were asked. 26 responses came back. About 60 stayed silent, and silence is data too.',
  conclusionsHeading: 'What the survey shows',
  conclusions: [/21 of 26.*5 said no/, /23.*22.*20 of 26/, /15 of 26 responses never pay for ads/, /About 60 of the 85/],
  // Status text per channel button, in button order.
  channels: [
    'Newsletters: 23 of 26 responses already use this channel, including all 10 that would leave if enough others did.',
    'Cultural listings: 22 of 26 responses already use this channel.',
    'Print: 20 of 26 responses already use this channel.'
  ]
};
// ---------------------------------------------------------------------

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const results = [];
const check = (name, ok, detail = '') => results.push(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  — ' + detail : ''}`);

async function checkPage(page, url, label, out) {
  fs.mkdirSync(out, { recursive: true });
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  await page.waitForFunction(() => !document.querySelector('#hold').disabled);
  const text = (sel) => page.$eval(sel, (el) => el.textContent.trim());
  const position = async () => parseInt(await text('#quote-position'));

  const legend = await page.$$eval('#response-key li', (lis) => lis.map((li) => li.children[1].textContent));
  check(`response counts ${EXPECT.counts}`, legend.join('/') === EXPECT.counts, legend.join('/'));
  check('framing line', (await text('.framing')).startsWith(EXPECT.framingStart));
  check('non-response line', (await text('.silence')) === EXPECT.silence);
  check('conclusions hidden before hold', await page.$eval('#conclusions', (el) => el.hidden));
  await page.screenshot({ path: `${out}/${label}-1280-start.png` });

  // Quotes: cycle all with Next, then wrap with Previous.
  const seen = [];
  for (let i = 0; i < EXPECT.quotes; i++) {
    seen.push([await text('#quote-position'), await text('#quote')]);
    await page.click('#next-quote');
  }
  const expectedPositions = EXPECT.tags.map((tag, i) => `${i + 1} / ${EXPECT.quotes} · ${tag}`);
  const positions = seen.map(([p]) => p);
  check(`${EXPECT.quotes} quotes with the expected tags`, positions.join('|') === expectedPositions.join('|'), positions.join(', '));
  check('Next wraps to 1', (await position()) === 1);
  await page.click('#previous-quote');
  check(`Previous wraps to ${EXPECT.quotes}`, (await position()) === EXPECT.quotes);
  const all = seen.map(([, q]) => q).join(' ');
  check('redactions in place', EXPECT.quoteMustInclude.every((t) => all.includes(t)) && !EXPECT.quoteMustNotMatch.test(all));

  // Channels: each button sets its status text, a second click clears it.
  const buttons = await page.$$('#channel-buttons button');
  for (const [i, expected] of EXPECT.channels.entries()) {
    await buttons[i].click();
    const status = await text('#channel-status');
    check(`channel ${i + 1} status`, status === expected, status);
    if (i === 0) {
      await wait(900);
      await page.screenshot({ path: `${out}/${label}-1280-channel.png` });
    }
    await buttons[i].click();
  }

  // Mouse hold.
  const before = await position();
  const box = await (await page.$('#hold')).boundingBox();
  await page.mouse.move(box.x + 10, box.y + 10);
  await page.mouse.down();
  await wait(1600);
  await page.screenshot({ path: `${out}/${label}-1280-open.png` });
  await page.mouse.up();
  const afterMouse = await position();
  check('mouse hold advances one quote', afterMouse === before % EXPECT.quotes + 1, `${before} → ${afterMouse}`);
  check('conclusions shown after hold', !(await page.$eval('#conclusions', (el) => el.hidden)));
  check('conclusions heading', (await text('#conclusions-heading')) === EXPECT.conclusionsHeading);
  const conc = await page.$$eval('#conclusions li', (lis) => lis.map((li) => li.textContent));
  check('conclusions match expected numbers', conc.length === EXPECT.conclusions.length && EXPECT.conclusions.every((re, i) => re.test(conc[i])));
  await wait(1200);
  check('quote stays after release', (await position()) === afterMouse);

  // Keyboard hold.
  await page.focus('#hold');
  await page.keyboard.down('Space');
  await wait(1600);
  await page.keyboard.up('Space');
  const afterKey = await position();
  check('keyboard hold advances one quote', afterKey === afterMouse % EXPECT.quotes + 1, `${afterMouse} → ${afterKey}`);
  await wait(1200);

  // Narrow viewport with touch. Switching to isMobile reloads the page, so wait for
  // the sketch again and read the quote position fresh afterwards.
  await page.setViewport({ width: 360, height: 780, hasTouch: true, isMobile: true });
  await page.waitForFunction(() => !document.querySelector('#hold').disabled);
  await wait(800);
  await page.screenshot({ path: `${out}/${label}-360-full.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal scroll at 360 px', overflow <= 0, `overflow ${overflow}px`);
  const cdp = await page.target().createCDPSession();
  // A touch only lands on what is inside the viewport, so bring the button into view first.
  await page.$eval('#hold', (el) => el.scrollIntoView({ block: 'center' }));
  await wait(300);
  const tb = await (await page.$('#hold')).boundingBox();
  const beforeTouch = await position();
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: tb.x + 10, y: tb.y + 10 }] });
  await wait(1600);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${out}/${label}-360-open.png` });
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const afterTouch = await position();
  check('touch hold advances one quote', afterTouch === beforeTouch % EXPECT.quotes + 1, `${beforeTouch} → ${afterTouch}`);
  await (await page.$$('#channel-buttons button'))[0].click();
  await wait(900);
  await page.screenshot({ path: `${out}/${label}-360-channel.png` });

  check('no page errors', errors.length === 0, errors.join('; '));
}

async function checkArchive(page, url, version) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.setViewport({ width: 360, height: 780 });
  await page.goto(url, { waitUntil: 'networkidle0' });
  const banner = await page.$eval('.archive-banner span', (el) => el.textContent).catch(() => '');
  check('archive banner names the version', banner.includes(version), banner);
  check('old piece runs (canvas present)', !!(await page.$('canvas')));
  await page.evaluate(() => window.scrollTo(0, 400));
  const top = await page.$eval('.archive-banner', (el) => el.getBoundingClientRect().top);
  check('banner stays at the top while scrolling', top === 0, `top ${top}`);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check('no horizontal scroll at 360 px', overflow <= 0, `overflow ${overflow}px`);
  await Promise.all([page.waitForNavigation({ waitUntil: 'networkidle0' }), page.click('.archive-banner a')]);
  check('banner link opens the latest page', !!(await page.$('#conclusions')) && !(await page.$('.archive-banner')), page.url());
  check('no page errors', errors.length === 0, errors.join('; '));
}

async function checkForward(page, url) {
  await page.goto(url, { waitUntil: 'networkidle0' });
  await wait(800);
  check('forwards to the latest page', !!(await page.$('#conclusions')), page.url());
}

(async () => {
  const [mode, url, a, b] = process.argv.slice(2);
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });
  const page = await browser.newPage();
  try {
    if (mode === 'page') await checkPage(page, url, a || 'page', b || '.');
    else if (mode === 'archive') await checkArchive(page, url, a);
    else if (mode === 'forward') await checkForward(page, url);
    else throw new Error('Usage: node check.js page|archive|forward <url> …');
  } catch (error) {
    check('script finished', false, error.message);
  }
  await browser.close();
  console.log(`\n${mode}: ${url}\n` + results.join('\n'));
  process.exitCode = results.some((r) => r.startsWith('FAIL')) ? 1 : 0;
})();
