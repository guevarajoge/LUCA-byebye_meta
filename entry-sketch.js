// BYE BYE META — animated labels (dummy survey data)
// Paste into sketch.js at https://editor.p5js.org/

const N = 260;
const BANDS = [
  { label: 'Under 10%', color: '#50CEAE', weight: 0.11, pull: 0.02 },
  { label: '10–25%',    color: '#9279DC', weight: 0.19, pull: 0.05 },
  { label: '25–50%',    color: '#E6A354', weight: 0.27, pull: 0.62 },
  { label: 'Over 50%',  color: '#FF6337', weight: 0.33, pull: 1.00 },
  { label: 'No idea',   color: '#A4ADB9', weight: 0.10, pull: 0.00 }
];

const PREFIX = ['Studio', 'Theatre', 'Atelier', 'Collective', 'Forum', 'Gallery',
  'Festival', 'Archive', 'Platform', 'Lab', 'Cinema', 'House', 'Space', 'Centre'];
const SUFFIX = ['Echo', 'Orbit', 'Signal', 'Transit', 'Mosaic', 'Common', 'Fold',
  'Kite', 'Pulse', 'Offset', 'North', 'River', 'Assembly', 'Loop', 'Frame',
  'Light', 'Matter', 'Field', 'Window', 'Soft', 'Corner', 'Atlas', 'Night', 'Open'];
const TYPES = ['Performing arts', 'Museum / exhibition', 'Artist-run',
  'Cultural centre', 'Festival', 'Other'];

let institutions = [];
let mode = 'auto';     // auto / scatter / gather
let paused = false;
let clock = 0;
let selected = null;

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  textFont('Arial');
  randomSeed(27);

  for (let i = 0; i < N; i++) {
    const band = pickBand();
    const name = PREFIX[i % PREFIX.length] + ' ' + SUFFIX[floor(i / PREFIX.length)];
    const sx = random(0.04, 0.96);
    const sy = random(0.15, 0.94);
    // A compressed horizontal cloud, like the animated reference.
    const cx = constrain(randomGaussian(0.52, 0.14), 0.08, 0.92);
    const cy = constrain(randomGaussian(0.52, 0.19), 0.15, 0.90);
    institutions.push({
      name, band, type: random(TYPES),
      sx, sy, cx, cy, x: sx * width, y: sy * height,
      phase: random(TWO_PI), drift: random(0.5, 1.4)
    });
  }
}

function draw() {
  background('#08090E');
  if (!paused) clock += min(deltaTime / 1000, 0.05);

  // One slow gathering / dispersing cycle every 16 seconds.
  const wave = (1 - cos(TWO_PI * clock / 16)) / 2;
  const gather = wave * wave * (3 - 2 * wave); // smoothstep
  const amount = mode === 'scatter' ? 0 : mode === 'gather' ? 1 : gather;
  const fontSize = constrain(width / 125, 8, 10);
  textSize(fontSize);
  textAlign(CENTER, CENTER);
  noStroke();
  selected = null;

  // Update positions; movement responds to the data field.
  for (const p of institutions) {
    const influence = amount * p.band.pull;
    const targetX = lerp(p.sx, p.cx, influence) * width;
    const targetY = lerp(p.sy, p.cy, influence) * height;
    const swayX = sin(clock * 0.45 * p.drift + p.phase) * 7;
    const swayY = cos(clock * 0.32 * p.drift + p.phase) * 5;
    p.x = lerp(p.x, targetX + swayX, 0.035);
    p.y = lerp(p.y, targetY + swayY, 0.035);
    p.w = textWidth(p.name) + 12;
    p.h = fontSize + 6;
  }

  // Draw cards and highlight a label under the mouse.
  for (const p of institutions) {
    const hovered = abs(mouseX - p.x) < p.w / 2 &&
                    abs(mouseY - p.y) < p.h / 2;
    if (hovered) selected = p;
    fill(p.band.color);
    rect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, 2);
    fill('#08090E');
    text(p.name, p.x, p.y - 0.5);
  }

  drawHeader(amount);
  drawLegend();
  if (selected) drawTooltip(selected);
}

function pickBand() {
  const r = random();
  let total = 0;
  for (const b of BANDS) {
    total += b.weight;
    if (r <= total) return b;
  }
  return BANDS[BANDS.length - 1];
}

function drawHeader(amount) {
  // Small fixed header, separate from the moving data field.
  noStroke();
  fill('#08090E');
  rect(0, 0, width, 78);
  textAlign(LEFT, BASELINE);
  fill('#F0F0F0');
  textSize(18);
  textStyle(BOLD);
  text('BYE BYE META', 22, 30);
  textStyle(NORMAL);
  fill('#A0A3AD');
  textSize(11);
  text('Dummy institutions  ·  Estimated audience via Facebook / Instagram  ·  2025', 22, 49);
  text('1 Auto    2 Scatter    3 Gather    Space Pause', 22, 66);
  if (width > 670) {
    textAlign(RIGHT, BASELINE);
    text(`${N} institutions  ·  Gathering ${round(amount * 100)}%`, width - 22, 30);
  }
}

function drawLegend() {
  const x = 22;
  const y = height - 24;
  noStroke();
  fill('#08090E');
  rect(0, height - 42, width, 42);
  textAlign(LEFT, CENTER);
  textSize(10);
  let offset = x;
  for (const b of BANDS) {
    fill(b.color);
    rect(offset, y - 5, 9, 9, 2);
    fill('#CDD0D7');
    text(b.label, offset + 14, y);
    offset += textWidth(b.label) + 35;
  }
}

function drawTooltip(p) {
  const w = 225;
  const h = 77;
  const x = constrain(mouseX + 14, 8, width - w - 8);
  const y = constrain(mouseY - h - 12, 82, height - h - 40);
  fill('#F4F1E9');
  rect(x, y, w, h, 4);
  fill('#111119');
  textAlign(LEFT, BASELINE);
  textSize(12);
  textStyle(BOLD);
  text(p.name, x + 12, y + 21);
  textStyle(NORMAL);
  textSize(10);
  text(p.type, x + 12, y + 42);
  text(`Audience via Meta (estimate): ${p.band.label}`, x + 12, y + 60);
}

function keyPressed() {
  if (key === '1') mode = 'auto';
  if (key === '2') mode = 'scatter';
  if (key === '3') mode = 'gather';
  if (key === ' ') {
    paused = !paused;
    return false; // Prevent the page scrolling when space is pressed.
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  for (const p of institutions) {
    p.x = p.sx * width;
    p.y = p.sy * height;
  }
}
