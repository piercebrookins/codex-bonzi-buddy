const buddy = document.querySelector("#buddy");
const pet = document.querySelector("#pet");
const bubble = document.querySelector("#bubble");
const menu = document.querySelector("#menu");
const log = document.querySelector("#log");

const lines = [
  "I indexed your vibes and found one unresolved TODO.",
  "It looks like you're writing code. Want me to hover judgmentally?",
  "I can refactor that, but I reserve the right to sigh first.",
  "Local-first. Pixel-friendly. Zero toolbars from 1999.",
  "Ask me for a patch and I will pretend this was your idea.",
  "Codex Buddy is watching the stack trace so you do not have to.",
];

const jokes = [
  "Why did the function cross the module boundary? To get to the side effect.",
  "I told the linter a joke. It said the punchline had trailing whitespace.",
  "A race condition walks into a bar. The bartender asks what it wants. It already left.",
  "My favorite design pattern is finishing the task.",
];

let drag = null;
let bubbleTimer = null;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function appendLog(message) {
  const timestamp = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  log.textContent = `${log.textContent}\n[${timestamp}] ${message}`;
}

function say(message) {
  bubble.hidden = false;
  bubble.textContent = message;
  appendLog(message);
  clearTimeout(bubbleTimer);
  bubbleTimer = window.setTimeout(() => {
    bubble.hidden = true;
  }, 6500);
}

function pick(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function dance() {
  buddy.classList.remove("nap");
  buddy.classList.add("dance");
  say("Running choreographed diagnostics.");
  window.setTimeout(() => buddy.classList.remove("dance"), 4200);
}

function nap() {
  buddy.classList.toggle("nap");
  buddy.classList.remove("dance");
  say(buddy.classList.contains("nap") ? "Power saving. Wake me if production catches fire." : "Back online.");
}

function runAction(action) {
  menu.classList.remove("open");

  if (action === "talk") say(pick(lines));
  if (action === "joke") say(pick(jokes));
  if (action === "dance") dance();
  if (action === "nap") nap();
  if (action === "hide") bubble.hidden = true;
}

buddy.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  buddy.setPointerCapture(event.pointerId);
  const rect = buddy.getBoundingClientRect();
  drag = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
  buddy.classList.add("dragging");
  menu.classList.remove("open");
});

buddy.addEventListener("pointermove", (event) => {
  if (!drag) return;
  const nextLeft = clamp(event.clientX - drag.x, 8, window.innerWidth - buddy.offsetWidth - 8);
  const nextTop = clamp(event.clientY - drag.y, 8, window.innerHeight - buddy.offsetHeight - 8);
  buddy.style.left = `${nextLeft}px`;
  buddy.style.top = `${nextTop}px`;
});

buddy.addEventListener("pointerup", () => {
  drag = null;
  buddy.classList.remove("dragging");
});

buddy.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  const left = clamp(event.clientX, 8, window.innerWidth - 210);
  const top = clamp(event.clientY, 8, window.innerHeight - 190);
  menu.style.left = `${left}px`;
  menu.style.top = `${top}px`;
  menu.classList.add("open");
});

document.addEventListener("click", (event) => {
  if (!menu.contains(event.target)) menu.classList.remove("open");
});

document.querySelectorAll("[data-action]").forEach((button) => {
  button.addEventListener("click", () => runAction(button.dataset.action));
});

document.querySelector("#talk").addEventListener("click", () => runAction("talk"));
document.querySelector("#joke").addEventListener("click", () => runAction("joke"));
document.querySelector("#dance").addEventListener("click", () => runAction("dance"));
document.querySelector("#nap").addEventListener("click", () => runAction("nap"));

pet.addEventListener("dblclick", () => say("Double-click accepted. No installer bundled. You are safe."));

window.setInterval(() => {
  if (!document.hidden && Math.random() > 0.64 && !buddy.classList.contains("nap")) {
    say(pick(lines));
  }
}, 11000);

say("Codex Buddy loaded. Drag me around or right-click for Bonzi-era chaos.");
