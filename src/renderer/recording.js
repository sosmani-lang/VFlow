/* eslint-disable no-undef */
let paused = false;

const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const noteBtn = document.getElementById('note-btn');
const countEl = document.getElementById('rec-count');
const keysEl = document.getElementById('rec-keys');

window.vflow.onStatus((s) => {
  if (typeof s.stepCount === 'number') countEl.textContent = `${s.stepCount} step${s.stepCount === 1 ? '' : 's'}`;
  if (typeof s.captureKeystrokes === 'boolean') keysEl.classList.toggle('hidden', !s.captureKeystrokes);
  if (typeof s.paused === 'boolean') {
    paused = s.paused;
    pauseBtn.textContent = paused ? '▶' : '⏸';
  }
});

pauseBtn.addEventListener('click', async () => {
  if (paused) await window.vflow.resumeRecording();
  else await window.vflow.pauseRecording();
});

stopBtn.addEventListener('click', () => window.vflow.stopRecording());

noteBtn.addEventListener('click', async () => {
  const text = prompt('Add note:');
  if (text) await window.vflow.addNote(text);
});

// Allow dragging the frameless toolbar
document.getElementById('toolbar').style.webkitAppRegion = 'drag';
[pauseBtn, stopBtn, noteBtn].forEach(b => b.style.webkitAppRegion = 'no-drag');
