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
// Each answer is tagged by what it names: a loss, a gain, or both.
const quotes = [
  { tag: 'Loss', text: "I think it would be a shame to lose the audience we've built up; if we no longer have those social media platforms, I wouldn't know how to build a new, loyal audience." },
  { tag: 'Gain', text: "If Facebook and Instagram disappeared tomorrow, we could create a new way to connect to each other, we would save time not trying to have visivility. Maybe we could spend more time figuring how to get to our artistic and cultural point. And we could certainly be more ethical." },
  { tag: 'Loss', text: "As communicators, we need to be where people are. People are on META. As long as they are there, so will we. We are open to being on other more responsible social media as well. But leaving META now when a lot of people use it seems not smart." },
  { tag: 'Loss', text: "As an organisation operating in [four countries], it would be difficult for us to only use a platform that was local, considering the platforms the artists and partners we collaborate with use as well as our audiences. Perhaps, rather than an alternative it would be an addition." },
  { tag: 'Loss', text: "It bothers me that partners or similar institutions still rely on Meta, even more so: boosted their activity on its channels." },
  { tag: 'Loss and gain', text: "Lose: a lot of audience we built during the last years. 'Gain' (between brackets because I am convinced that time will have to be used for other (digital) platforms): more time to also put in direct communication to our peer audience (flyering, afficheren...)" },
  { tag: 'Loss', text: "We are staying on Instagram because we want to remain a voice for inclusion and connection, reaching people in our community who may not find us through other channels. We also want to bring our Facebook and Instagram followers along as we explore new spaces, online and offline, so everyone feels welcome to join us." },
  { tag: 'Loss', text: "Si plus Fb ou Ig : perte audience, perte partenaires et contact." },
  { tag: 'Loss and gain', text: "Lose: Reaching new audiences, speaking to younger audiences, a direct link to our international community of artists/partners/pros, general image of the organisation, a visibility for artists internationally (+for partners), a visibility for our photos and videos / Gain: more staff time for other communication actions that could be redirected to local communities, closer alignment with our values" },
  { tag: 'Loss and gain', text: "We would lose one of our most crucial communication channels where we stay informed about what's happening at the museums: openings or extension of exhibition, closure of opening of museums ([named museums]), museums' news & updates are also regularly updated and published in clear and concise ways. Besides losing touch with our network, this would also endanger our connection with our audience (locals in Brussels, people visiting Brussels from Flanders/Wallonia/foreign countries), and lastly, our communication to all our direct audiences (museums, partner institutions, and museum visitors, and everyone else) and our own visibility. But we would also gain independence from a corporation with which we strongly disagree with regarding our core values (local, durable, ethical). We are looking forward to re-imagining new communication channels where we can reach our audiences in a more impactful way that is ethical and more meaningful." },
  { tag: 'Gain', text: "J'aime encore travailler sur des supports web, pour du montage par ex. Ne plus faire de réseaux me permettrait de travailler d'avantage sur notre site internet, soigner les pages spectacle par ex.Ce serait aussi le retour a plus de print." },
  { tag: 'Loss and gain', text: "We would gain more integrity and maybe lost some visibility for our events like launching books, but not so much for our daily frequentation (printing slots)" },
  { tag: 'Loss', text: "I previously took part to the GT Bye Bye Meta when I was working at [an institution]. At [that institution] we were considering leaving all the Platforms. We stopped using TikTok for exemple. In the end the only reason why we stayed on Instagram/Facebook is the artist's visibility. Many of them do not have a website and have an Instagram acount. If institutions such as [two named institutions] close their Instagram acounts with more than 20k followers, that would mean way less visibility for artists. But we are super open to work on other Platforms as we perfectly know Meta is problematic." }
];
const quotePosition = document.querySelector('#quote-position');
const conclusions = document.querySelector('#conclusions');
let quoteIndex = 0;
let advancedDuringHold = false;

function showQuote(index) {
  quoteIndex = (index + quotes.length) % quotes.length;
  quote.textContent = `“${quotes[quoteIndex].text}”`;
  quotePosition.textContent = `${quoteIndex + 1} / ${quotes.length} · ${quotes[quoteIndex].tag}`;
}

document.querySelector('#previous-quote').addEventListener('click', () => showQuote(quoteIndex - 1));
document.querySelector('#next-quote').addEventListener('click', () => showQuote(quoteIndex + 1));
showQuote(0);
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

// Aggregate counts from the 26 submissions. Respondents could choose several
// channels, so the counts overlap. They are not linked to individual marks.
const RESPONSES = 26;
const channels = [
  // Approved cross-tab: all 10 'maybe, if enough others did' responses use newsletters.
  { label: 'Newsletters', count: 23, end: [0, 0.13], note: 'including all 10 that would leave if enough others did' },
  { label: 'Cultural listings', count: 22, end: [0, 0.44] },
  { label: 'Print', count: 20, end: [0, 0.76] }
];
const channelButtons = document.querySelector('#channel-buttons');
const channelStatus = document.querySelector('#channel-status');
const channelHint = `Select one to see how many of the ${RESPONSES} responses use it. Respondents could choose more than one.`;
let selectedChannel = null;

function selectChannel(channel) {
  selectedChannel = selectedChannel === channel ? null : channel;
  for (const button of channelButtons.children) {
    button.setAttribute('aria-pressed', button.dataset.label === selectedChannel?.label);
  }
  channelStatus.textContent = selectedChannel
    ? `${selectedChannel.label}: ${selectedChannel.count} of ${RESPONSES} responses already use this channel${selectedChannel.note ? `, ${selectedChannel.note}` : ''}.`
    : channelHint;
}

for (const channel of channels) {
  const button = document.createElement('button');
  button.type = 'button';
  button.dataset.label = channel.label;
  button.setAttribute('aria-pressed', 'false');
  button.textContent = `${channel.label} · ${channel.count}`;
  button.addEventListener('click', () => selectChannel(channel));
  channelButtons.append(button);
}
channelStatus.textContent = channelHint;

let pointer = null;
let keyboard = false;
let toggled = false;
let active = false;

function updateHold() {
  const held = pointer !== null || keyboard || toggled;
  if (held && !active) advancedDuringHold = false;
  active = held;
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
    let shownChannel = null;
    let routeVisibility = 0;

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
      if (active && openness > 0.72 && !advancedDuringHold) {
        advancedDuringHold = true;
        showQuote(quoteIndex + 1);
        conclusions.hidden = false;
      }

      p.background('#111218');
      const unit = Math.min(p.width * 0.14, p.height * 0.33, 115);
      const oldX = p.lerp(p.width * 0.5, p.width * 0.22, openness);
      const nextX = p.width * 0.78;
      const centerY = p.height * 0.45;

      drawField(oldX, centerY, unit, '#645b78', 1, 'META', 'INSTAGRAM 25 · FACEBOOK 23');
      drawField(nextX, centerY, unit, '#aee5d4', openness, 'LOCAL ALTERNATIVE', 'MASTODON 6 · BLUESKY 1');

      // Fade the current route out before switching, and while the hold opens the field.
      if (shownChannel !== selectedChannel && routeVisibility < 0.02) shownChannel = selectedChannel;
      const routeTarget = shownChannel && shownChannel === selectedChannel ? 1 - openness : 0;
      routeVisibility = reducedMotion.matches ? routeTarget : p.lerp(routeVisibility, routeTarget, 1 - Math.exp(-6 * dt));
      if (reducedMotion.matches) shownChannel = selectedChannel;
      if (shownChannel) drawRoute(oldX, centerY, shownChannel, routeVisibility);

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

    function drawField(x, y, radius, color, visibility, label, platforms) {
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
      const small = p.width < 540;
      p.textSize(small ? 10 : 12);
      p.text(label, x, p.height - (small ? 34 : 38));
      // Responses that use each platform, out of 26.
      p.textSize(small ? 9 : 11);
      p.text(platforms, x, p.height - 18);
    }

    function drawRoute(originX, originY, channel, visibility) {
      if (visibility < 0.02) return;
      const endX = channel.end[0] * p.width;
      const endY = channel.end[1] * p.height;
      const bendX = (originX + endX) / 2;
      const point = (t, a, b, c, d) => {
        const u = 1 - t;
        return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
      };
      // The line grows outward from the field as it appears.
      const steps = 48;
      p.noFill();
      p.stroke(243, 237, 223, 150 * visibility);
      p.strokeWeight(1 + 5 * channel.count / RESPONSES);
      p.beginShape();
      for (let step = 0; step <= steps; step++) {
        const t = visibility * step / steps;
        p.vertex(point(t, originX, bendX, bendX, endX), point(t, originY, originY, endY, endY));
      }
      p.endShape();
      p.noStroke();
      p.fill(243, 237, 223, 255 * visibility);
      // Put the label on the side of the line facing away from the field, so the curve never crosses it.
      const above = endY <= originY;
      p.textAlign(p.LEFT, above ? p.BOTTOM : p.TOP);
      p.textSize(p.width < 540 ? 10 : 12);
      const labelY = above ? endY - 8 : endY + 8;
      p.text(`${channel.label.toUpperCase()} · ${channel.count} OF ${RESPONSES}`, 12, labelY);
      if (channel.note) {
        p.textSize(p.width < 540 ? 9 : 11);
        p.text('INCL. ALL 10 “MAYBE” RESPONSES', 12, above ? labelY - 16 : labelY + 16);
      }
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
