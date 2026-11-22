const colors = new Map([
  ['Under 10%', '#50CEAE'],
  ['10–25%', '#9279DC'],
  ['25–50%', '#E6A354'],
  ['Over 50%', '#FF6337'],
  ['No idea', '#A4ADB9'],
  ['No answer', '#C7BFAF']
]);

const field = document.querySelector('#field');
const summary = document.querySelector('#summary');
const controls = document.querySelector('#controls');
const modeButtons = [...controls.querySelectorAll('[data-mode]')];
const pauseButton = document.querySelector('#pause');

let cards = [];
let mode = 'auto';
let paused = matchMedia('(prefers-reduced-motion: reduce)').matches;
let clock = 0;

function responseCount(count) {
  return `${count} ${count === 1 ? 'response' : 'responses'}`;
}

async function setup() {
  createCanvas(field.clientWidth, field.clientHeight).parent(field);
  pixelDensity(1);
  textFont('Arial');
  randomSeed(27);

  try {
    const response = await fetch('audience-share-counts.json');
    if (!response.ok) throw new Error(`Survey data returned HTTP ${response.status}`);
    const survey = await response.json();
    cards = survey.bands.map((band) => ({
      ...band,
      color: colors.get(band.label),
      phase: random(TWO_PI),
      drift: random(0.5, 1.4),
      x: null,
      y: null
    }));
    document.querySelector('#question').textContent = survey.question;
    summary.textContent = `${survey.totalResponses} ${survey.unit}`;
    const legend = document.querySelector('#legend');
    for (const card of cards) {
      const item = document.createElement('li');
      const swatch = document.createElement('span');
      swatch.className = 'swatch';
      swatch.style.backgroundColor = card.color;
      item.append(swatch, `${card.label} · ${responseCount(card.count)}`);
      legend.append(item);
    }
    controls.hidden = false;
    document.querySelector('#movement').hidden = false;
    updateControls();
    fitCanvas();
  } catch (error) {
    summary.textContent = location.protocol === 'file:'
      ? 'Run node serve.js and open http://localhost:8080 to load the survey counts.'
      : 'The survey counts could not be loaded.';
    console.error(error);
  }
}

function draw() {
  background('#08090E');
  if (!paused) clock += min(deltaTime / 1000, 0.05);

  // One slow gathering and dispersing cycle every 16 seconds.
  const wave = (1 - cos(TWO_PI * clock / 16)) / 2;
  const gather = wave * wave * (3 - 2 * wave);
  const amount = mode === 'scatter' ? 0 : mode === 'gather' ? 1 : gather;
  const columns = width < 620 ? 2 : 3;
  const rows = ceil(cards.length / columns);
  const cardWidth = min(154, width / columns - 18);
  const cardHeight = 40;
  const gatheredColumnGap = min(width / columns, cardWidth + 24);
  const gatheredRowGap = 60;
  let selected = null;

  noStroke();
  textAlign(CENTER, CENTER);
  for (const [index, card] of cards.entries()) {
    const col = index % columns - (columns - 1) / 2;
    const row = floor(index / columns) - (rows - 1) / 2;
    const targetX = width / 2 + col * lerp(width / columns, gatheredColumnGap, amount);
    const targetY = height / 2 + row * lerp(height / rows, gatheredRowGap, amount);
    const swayX = sin(clock * 0.45 * card.drift + card.phase) * 5;
    const swayY = cos(clock * 0.32 * card.drift + card.phase) * 4;
    card.x = paused || card.x === null ? targetX + swayX : lerp(card.x, targetX + swayX, 0.035);
    card.y = paused || card.y === null ? targetY + swayY : lerp(card.y, targetY + swayY, 0.035);
    if (abs(mouseX - card.x) < cardWidth / 2 && abs(mouseY - card.y) < cardHeight / 2) {
      selected = card;
    }
    fill(card.color);
    rect(card.x - cardWidth / 2, card.y - cardHeight / 2, cardWidth, cardHeight, 4);
    fill('#08090E');
    textSize(13);
    text(card.label, card.x, card.y - 8);
    textSize(11);
    text(responseCount(card.count), card.x, card.y + 8);
  }

  if (selected) drawTooltip(selected);
}

function drawTooltip(card) {
  const label = `${card.label} · ${responseCount(card.count)}`;
  textSize(12);
  const tooltipWidth = textWidth(label) + 20;
  const x = constrain(mouseX + 12, 4, width - tooltipWidth - 4);
  const y = constrain(mouseY - 42, 4, height - 32);
  fill('#F4F1E9');
  rect(x, y, tooltipWidth, 28, 4);
  fill('#111119');
  textAlign(LEFT, CENTER);
  text(label, x + 10, y + 14);
}

function updateControls() {
  for (const button of modeButtons) {
    button.setAttribute('aria-pressed', button.dataset.mode === mode);
  }
  pauseButton.textContent = paused ? 'Resume' : 'Pause';
}

for (const button of modeButtons) {
  button.addEventListener('click', () => {
    mode = button.dataset.mode;
    updateControls();
  });
}

pauseButton.addEventListener('click', () => {
  paused = !paused;
  updateControls();
});

function keyPressed(event) {
  if (controls.hidden || event.repeat) return;
  const button = modeButtons[Number(key) - 1];
  if (button) button.click();
  if (key === ' ' && !(event.target instanceof HTMLButtonElement)) {
    pauseButton.click();
    return false;
  }
}

function fitCanvas() {
  resizeCanvas(field.clientWidth, field.clientHeight, true);
  for (const card of cards) {
    card.x = null;
    card.y = null;
  }
}

function windowResized() {
  fitCanvas();
}
