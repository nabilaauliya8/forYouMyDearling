const openEnvelopeButton = document.getElementById("openEnvelope");
const letterSection = document.getElementById("letterSection");
const cake = document.getElementById("cake");
const blowCandlesButton = document.getElementById("blowCandles");
const cakeMessage = document.getElementById("cakeMessage");
const secretButton = document.getElementById("secretButton");
const secretMessage = document.getElementById("secretMessage");
const confettiButton = document.getElementById("confettiButton");
const confettiLayer = document.getElementById("confettiLayer");
const toast = document.getElementById("toast");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const musicUpload = document.getElementById("musicUpload");
const backgroundMusic = document.getElementById("backgroundMusic");
const photoUpload = document.getElementById("photoUpload");
const gallery = document.getElementById("gallery");

let toastTimer;
let musicObjectUrl = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

openEnvelopeButton.addEventListener("click", () => {
  letterSection.scrollIntoView({ behavior: "smooth", block: "start" });
  createConfetti(65);
  showToast("Mission dimulai! Ada pesan spesial buat kamu 💚");
});

blowCandlesButton.addEventListener("click", () => {
  const blown = cake.classList.toggle("blown");
  if (blown) {
    cakeMessage.textContent = "Lilin berhasil ditiup! Semoga semua harapan baikmu terkabul. 🎉";
    blowCandlesButton.textContent = "✨ NYALAKAN LILIN LAGI";
    createConfetti(100);
  } else {
    cakeMessage.textContent = "Silakan buat harapan baru, lalu tiup lilinnya!";
    blowCandlesButton.textContent = "🌬 TIUP LILIN";
  }
});

secretButton.addEventListener("click", () => {
  const isHidden = secretMessage.hidden;
  secretMessage.hidden = !isHidden;
  secretButton.textContent = isHidden ? "TUTUP PESAN RAHASIA" : "BUKA PESAN RAHASIA";
  document.querySelector(".lock-icon").textContent = isHidden ? "🔓" : "🔒";
  if (isHidden) {
    secretMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    createConfetti(45);
  }
});

confettiButton.addEventListener("click", () => {
  createConfetti(130);
  showToast("Birthday mission: SUCCESS! 🎉");
});

function createConfetti(amount = 60) {
  const colors = ["#d6b66b", "#aab69a", "#f3ecd9", "#66764a", "#d9d9ae"];
  for (let i = 0; i < amount; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 0.9}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiLayer.appendChild(piece);
    piece.addEventListener("animationend", () => piece.remove(), { once: true });
  }
}

musicToggle.addEventListener("click", async () => {
  if (!backgroundMusic.src) {
    musicUpload.click();
    return;
  }
  if (backgroundMusic.paused) {
    try {
      await backgroundMusic.play();
      musicLabel.textContent = "Musik: ON";
      musicToggle.setAttribute("aria-label", "Jeda musik");
    } catch {
      showToast("Browser tidak bisa memutar audio. Coba pilih file musik lagi.");
    }
  } else {
    backgroundMusic.pause();
    musicLabel.textContent = "Musik: OFF";
    musicToggle.setAttribute("aria-label", "Putar musik");
  }
});

musicUpload.addEventListener("change", async () => {
  const file = musicUpload.files && musicUpload.files[0];
  if (!file) return;
  if (musicObjectUrl) URL.revokeObjectURL(musicObjectUrl);
  musicObjectUrl = URL.createObjectURL(file);
  backgroundMusic.src = musicObjectUrl;
  try {
    await backgroundMusic.play();
    musicLabel.textContent = "Musik: ON";
    showToast(`Memutar: ${file.name}`);
  } catch {
    musicLabel.textContent = "Musik: OFF";
    showToast("File dipilih. Tekan tombol musik sekali lagi untuk memutar.");
  }
});

photoUpload.addEventListener("change", () => {
  const files = Array.from(photoUpload.files || []).filter(file => file.type.startsWith("image/"));
  if (!files.length) return;

  // Hapus kartu contoh saat pengguna mulai menambahkan foto sendiri.
  gallery.querySelectorAll(".placeholder").forEach(card => card.remove());

  files.forEach((file, index) => {
    const card = document.createElement("article");
    card.className = "memory-card";
    const image = document.createElement("img");
    image.alt = `Foto kenangan ${index + 1}`;
    image.src = URL.createObjectURL(file);
    image.onload = () => URL.revokeObjectURL(image.src);

    const title = document.createElement("p");
    title.textContent = "OUR MEMORY";
    const caption = document.createElement("small");
    caption.textContent = file.name;

    card.append(image, title, caption);
    gallery.appendChild(card);
  });
  showToast(`${files.length} foto ditambahkan ke galeri.`);
});

// Efek kecil saat halaman pertama dibuka.
window.addEventListener("load", () => {
  setTimeout(() => createConfetti(28), 500);
});
