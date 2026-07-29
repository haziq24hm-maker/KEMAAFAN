// 1. Fungsi Kesan Emoji Sedih Jatuh (Background)
function createSadEmoji() {
  const emojis = ['😢', '😔', '🥺', '😭'];
  const emoji = document.createElement('div');
  emoji.className = 'emoji-bg';
  emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
  
  // Posisi rawak secara mendatar
  emoji.style.left = Math.random() * 100 + 'vw';
  // Saiz rawak
  emoji.style.fontSize = Math.random() * 20 + 20 + 'px';
  // Kelajuan jatuh rawak (5s ke 10s)
  emoji.style.duration = Math.random() * 5 + 5 + 's';
  // Ketelusan (opacity) rendah supaya nampak macam background
  emoji.style.opacity = Math.random() * 0.3 + 0.1;

  document.body.appendChild(emoji);

  // Buang emoji selepas tamat animasi supaya web tak berat
  setTimeout(() => {
    emoji.remove();
  }, 10000);
}

// Jalankan fungsi emoji setiap 1 saat
setInterval(createSadEmoji, 1000);

// 2. Fungsi Butang Raikan! (Confetti)
const confettiBtn = document.getElementById('confettiBtn');
let isCelebrating = false;
let confettiLoop = null;

function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

confettiBtn.addEventListener('click', () => {
  if (!isCelebrating) {
    // Mula meraikan
    isCelebrating = true;
    confettiBtn.textContent = 'Berhenti';
    fireConfetti();
    confettiLoop = setInterval(fireConfetti, 1000);
  } else {
    // Berhenti
    isCelebrating = false;
    confettiBtn.textContent = 'Raikan!';
    clearInterval(confettiLoop);
  }
});
