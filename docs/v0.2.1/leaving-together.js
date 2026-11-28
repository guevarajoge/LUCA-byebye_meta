const groups = [
  { label: 'Yes', count: 7, color: '#aee5d4', shape: 'circle', destination: 1, distance: 0.45 },
  { label: 'Maybe, if enough others did', count: 10, color: '#ff9e78', shape: 'diamond', destination: 0.53, distance: 0.78 },
  { label: 'We are already looking into it', count: 4, color: '#c6a6fa', shape: 'ring', destination: 1, distance: 1.48 },
  { label: 'No', count: 5, color: '#eee3b6', shape: 'square', destination: 0, distance: 0.56 }
];

const field = document.querySelector('#field');
const hold = document.querySelector('#hold');
const legend = document.querySelector('#response-key');
const quote = document.querySelector('#quote');
const firstQuote = quote.textContent;
const secondQuote = '“Maybe we could spend more time figuring how to get to our artistic and cultural point.”';
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

const symbols = { circle: '●', diamond: '◆', ring: '○', square: '■' };

for (const group of groups) {
  const item = document.createElement('li');
  const count = document.createElement('span');
  count.style.setProperty('--mark-color', group.color);
  count.textContent = group.count;
  const symbol = document.createElement('span');
  symbol.setAttribute('aria-hidden', 'true');
  symbol.style.setProperty('--mark-color', group.color);
  symbol.textContent = symbols[group.shape];
  item.append(symbol, count, group.label);
  legend.append(item);
}

let pointer = null;
let keyboard = false;
let toggled = false;
let active = false;

function updateHold() {
  active = pointer !== null || keyboard || toggled;
  hold.setAttribute('aria-pressed', active);
}

hold.addEventListener('pointerdown', (event) => {
  if (event.button !== 0 || pointer !== null) return;
  pointer = event.pointerId;
  hold.setPointerCapture(pointer);
  updateHold();
});

function releasePointer(event) {
  if (event.pointerId !== pointer) return;
  pointer = null;
  updateHold();
}

for (const type of ['pointerup', 'pointercancel', 'lostpointercapture']) {
  hold.addEventListener(type, releasePointer);
}

for (const type of ['keydown', 'keyup']) {
  hold.addEventListener(type, (event) => {
    if (event.key !== ' ' && event.key !== 'Enter') return;
    event.preventDefault();
    keyboard = type === 'keydown';
    updateHold();
  });
}

// Assistive technology can activate the button without holding a key.
hold.addEventListener('click', (event) => {
  if (event.detail !== 0) return;
  toggled = !toggled;
  updateHold();
});

function resetHold() {
  pointer = null;
  keyboard = false;
  toggled = false;
  updateHold();
}

hold.addEventListener('blur', resetHold);
window.addEventListener('blur', resetHold);

if (typeof p5 === 'function') {
  new p5((p) => {
    const marks = [];
    let openness = 0;
    let clock = 0;

    p.setup = () => {
      p.createCanvas(field.clientWidth, field.clientHeight).parent(field);
      p.pixelDensity(Math.min(window.devicePixelRatio, 2));
      p.textFont('monospace');
      p.randomSeed(27);

      for (const group of groups) {
        for (let index = 0; index < group.count; index++) {
          const number = marks.length;
          marks.push({
            group,
            initialAngle: number * 2.39996,
            initialRadius: 0.24 + 0.64 * Math.sqrt((number + 1) / 26),
            targetAngle: p.TWO_PI * index / group.count + p.random(-0.16, 0.16),
            phase: p.random(p.TWO_PI)
          });
        }
      }
      hold.disabled = false;
    };

    p.draw = () => {
      const dt = Math.min(p.deltaTime / 1000, 0.05);
      if (!reducedMotion.matches) clock += dt;
      const target = active ? 1 : 0;
      openness = reducedMotion.matches ? target : p.lerp(openness, target, 1 - Math.exp(-4.6 * dt));
      const shownQuote = openness > 0.72 ? secondQuote : firstQuote;
      if (quote.textContent !== shownQuote) quote.textContent = shownQuote;

      p.background('#111218');
      const unit = Math.min(p.width * 0.14, p.height * 0.33, 115);
      const oldX = p.lerp(p.width * 0.5, p.width * 0.22, openness);
      const nextX = p.width * 0.78;
      const centerY = p.height * 0.45;

      drawField(oldX, centerY, unit, '#645b78', 1, 'META');
      drawField(nextX, centerY, unit, '#aee5d4', openness, 'LOCAL ALTERNATIVE');

      for (const mark of marks) {
        const { group } = mark;
        const initialAngle = mark.initialAngle + 0.07 * clock;
        const targetAngle = mark.targetAngle + (group.shape === 'ring' ? 0.18 : 0.035) * clock;
        const spread = p.lerp(mark.initialRadius, group.distance, openness) * unit;
        const drift = Math.sin(clock * 0.8 + mark.phase) * 2;
        const baseX = p.lerp(oldX, nextX, group.destination * openness);
        const x = baseX + p.lerp(Math.cos(initialAngle), Math.cos(targetAngle), openness) * spread + drift;
        const y = centerY + p.lerp(Math.sin(initialAngle), Math.sin(targetAngle), openness) * spread * 0.8;
        if (group.shape === 'diamond' && openness > 0.03) {
          drawTether(oldX, centerY, x, y, openness);
        }
        drawMark(x, y, group);
      }
    };

    function drawField(x, y, radius, color, visibility, label) {
      if (visibility < 0.02) return;
      const ink = p.color(color);
      p.noFill();
      p.strokeWeight(1);
      for (let ring = 1; ring <= 5; ring++) {
        ink.setAlpha((74 - ring * 7) * visibility);
        p.stroke(ink);
        const diameter = radius * ring * 0.61 + Math.sin(clock + ring) * 3;
        p.ellipse(x, y, diameter, diameter * 0.8);
      }
      p.noStroke();
      ink.setAlpha(255 * visibility);
      p.fill(ink);
      p.circle(x, y, 4);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(p.width < 540 ? 10 : 12);
      p.text(label, x, p.height - 20);
    }

    function drawTether(originX, originY, x, y, visibility) {
      p.noFill();
      p.stroke(255, 158, 120, 100 * visibility);
      p.strokeWeight(1);
      const middle = (originX + x) / 2;
      p.bezier(originX, originY, middle, originY, middle, y, x, y);
    }

    function drawMark(x, y, group) {
      p.push();
      p.translate(x, y);
      p.fill(group.color);
      p.noStroke();
      if (group.shape === 'ring') {
        p.noFill();
        p.stroke(group.color);
        p.strokeWeight(2);
        p.circle(0, 0, 10);
      } else if (group.shape === 'circle') {
        p.circle(0, 0, 9);
      } else {
        p.rectMode(p.CENTER);
        if (group.shape === 'diamond') p.rotate(p.QUARTER_PI);
        p.square(0, 0, 8);
      }
      p.pop();
    }

    new ResizeObserver(() => {
      if (marks.length) p.resizeCanvas(field.clientWidth, field.clientHeight);
    }).observe(field);
  });
} else {
  document.querySelector('#instructions').textContent = 'The sketch could not load. The response counts are listed below.';
}
