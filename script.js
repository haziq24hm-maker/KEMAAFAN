// Script: audio control, confetti, copy link, WhatsApp share (Bahasa Melayu)
const playBtn = document.getElementById('playBtn');
const confettiBtn = document.getElementById('confettiBtn');
const copyBtn = document.getElementById('copyBtn');
const waBtn = document.getElementById('waBtn');
const audio = document.getElementById('bgAudio');

let isPlaying = false;
let confettiInterval = null;

function toggleAudio() {
  if (!isPlaying) {
    // Memastikan pautan lagu dimuatkan semula untuk Safari iOS
    audio.src = encodeURI("Maafkanlah.mp3");
    audio.load();
    
    // Panggil play dalam interaksi terus pengguna
    var playPromise = audio.play();

    if (playPromise !== undefined) {
      playPromise.then(function() {
        playBtn.textContent = 'Berhenti Muzik';
        playBtn.setAttribute('aria-pressed', 'true');
        isPlaying = true;
      }).catch(function(error) {
        console.log("Ralat main audio di iPhone:", error);
        alert("Sila pastikan iPhone tidak dalam Silent Mode / Mute.");
      });
    }
  } else {
    audio.pause();
    playBtn.textContent = 'Main Muzik';
    playBtn.setAttribute('aria-pressed', 'false');
    isPlaying = false;
  }
}

playBtn.addEventListener('click', toggleAudio);

// Confetti (canvas-confetti)
function fireConfetti() {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.1, y: 0.2 }
  });
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { x: 0.9, y: 0.2 }
  });
  confetti({
    particleCount: 60,
    spread: 100,
    origin: { x: 0.5, y: 0.0 }
  });
}

confettiBtn.addEventListener('click', () => {
  // Toggle a short confetti shower
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

// Copy link
copyBtn.addEventListener('click', async () => {
  const url = window.location.href;
  try {
    await navigator.clipboard.writeText(url);
    copyBtn.textContent = 'Disalin!';
    setTimeout(()=> copyBtn.textContent = 'Salin Pautan', 2000);
  } catch (err) {
    // fallback
    const fallback = prompt('Salin pautan ini:', url);
    if (fallback !== null) {
      copyBtn.textContent = 'Disalin!';
      setTimeout(()=> copyBtn.textContent = 'Salin Pautan', 2000);
    }
  }
});

// WhatsApp share
function updateWhatsAppLink() {
  const message = encodeURIComponent('Selamat Hari Lahir INSYIRAH! 🎉 TERIMALAH KEMAAFAN DARI ABANG\n\nLihat pautan ini: ' + window.location.href);
  waBtn.href = 'https://wa.me/?text=' + message;
}
waBtn.addEventListener('click', updateWhatsAppLink);
updateWhatsAppLink();

// Accessibility: enable Enter on focused buttons
[playBtn, confettiBtn, copyBtn].forEach(b => {
  b.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') b.click();
  });
});
