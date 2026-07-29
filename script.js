// Script: confetti sahaja
const confettiBtn = document.getElementById('confettiBtn');
let confettiInterval = null;

// Confetti (canvas-confetti)
function fireConfetti() {
  confetti({ particleCount: 80, spread: 70, origin: { x: 0.1, y: 0.2 } });
  confetti({ particleCount: 80, spread: 70, origin: { x: 0.9, y: 0.2 } });
  confetti({ particleCount: 60, spread: 100, origin: { x: 0.5, y: 0.0 } });
}

confettiBtn.addEventListener('click', () => {
  if (confettiInterval) {
    clearInterval(confettiInterval);
    confettiInterval = null;
    confettiBtn.textContent = 'Raikan!';
    return;
  }
  fireConfetti();
  confettiBtn.textContent = 'Berhenti';
  confettiInterval = setInterval(fireConfetti, 700);
  setTimeout(() => {
    if (confettiInterval) {
      clearInterval(confettiInterval);
      confettiInterval = null;
      confettiBtn.textContent = 'Raikan!';
    }
  }, 3000);
});

// Accessibility: enable Enter on focused button
confettiBtn.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') confettiBtn.click();
});
