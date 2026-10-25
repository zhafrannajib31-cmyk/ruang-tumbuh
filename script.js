// RuangTumbuh - JavaScript sederhana tanpa framework

// Menu navigasi untuk layar kecil (FR-06).
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu navigasi");
}

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi",
  );
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Menutup menu mobile ketika jendela dilebarkan ke ukuran desktop.
window.addEventListener("resize", () => {
  if (window.innerWidth > 760) closeMenu();
});

// Kutipan refleksi yang berganti saat tombol ditekan (FR-03).
const quotes = [
  { text: "Nilai menggambarkan satu ujian, bukan seluruh kemampuanmu.", author: "RuangTumbuh" },
  { text: "Kamu tidak harus selesai hari ini. Kamu hanya perlu memulai satu langkah kecil.", author: "RuangTumbuh" },
  { text: "Belajar bukan tentang tidak pernah bingung, tetapi tentang mau mencari tahu.", author: "RuangTumbuh" },
  { text: "Istirahat bukan kemalasan; itu bagian dari cara otak bekerja.", author: "RuangTumbuh" },
  { text: "Prosesmu tidak akan terlihat seperti proses orang lain, dan itu tidak apa-apa.", author: "RuangTumbuh" },
  { text: "Satu sesi fokus lebih berguna daripada satu jam menunda karena takut salah.", author: "RuangTumbuh" },
  { text: "Kamu boleh lambat. Yang penting arahnya jelas.", author: "RuangTumbuh" },
  { text: "Membandingkan hasil akhir orang lain dengan prosesmu hanya akan menguras energi.", author: "RuangTumbuh" },
  { text: "Minta bantuan bukan tanda gagal, melainkan cara belajar yang cerdas.", author: "RuangTumbuh" },
  { text: "Hari yang berat bukan bukti bahwa kamu tidak mampu.", author: "RuangTumbuh" },
];

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const quoteButton = document.getElementById("quoteButton");
let lastQuoteIndex = 0;

quoteButton.addEventListener("click", () => {
  let nextIndex = lastQuoteIndex;
  while (nextIndex === lastQuoteIndex) {
    nextIndex = Math.floor(Math.random() * quotes.length);
  }
  lastQuoteIndex = nextIndex;

  quoteText.classList.add("fading");
  window.setTimeout(() => {
    quoteText.textContent = quotes[nextIndex].text;
    quoteAuthor.textContent = `— ${quotes[nextIndex].author}`;
    quoteText.classList.remove("fading");
  }, 200);
});

// Filter strategi belajar berdasarkan kategori.
const filterButtons = document.querySelectorAll(".filter-button");
const tipCards = document.querySelectorAll(".tip-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    tipCards.forEach((card) => {
      const matches = filter === "semua" || card.dataset.category === filter;
      card.hidden = !matches;
    });
  });
});

// Timer fokus sederhana: 25 menit fokus atau 5 menit istirahat.
const timerDisplay = document.getElementById("timerDisplay");
const timerToggle = document.getElementById("timerToggle");
const timerReset = document.getElementById("timerReset");
const timerStatus = document.getElementById("timerStatus");
const timerModes = document.querySelectorAll(".timer-mode");

let timerMinutes = 25;
let timerRemaining = timerMinutes * 60;
let timerInterval = null;
let timerRunning = false;

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(timerRemaining);
}

function stopTimer() {
  window.clearInterval(timerInterval);
  timerInterval = null;
  timerRunning = false;
}

function resetTimer(minutes, message) {
  stopTimer();
  timerMinutes = minutes;
  timerRemaining = minutes * 60;
  timerToggle.textContent = "Mulai";
  timerDisplay.classList.remove("finished");
  renderTimer();
  timerStatus.textContent = message;
}

function startTimer() {
  if (timerRunning) return;

  if (timerRemaining <= 0) {
    timerRemaining = timerMinutes * 60;
  }

  timerRunning = true;
  timerToggle.textContent = "Jeda";
  timerDisplay.classList.remove("finished");
  timerStatus.textContent =
    timerMinutes === 25
      ? "Sedang fokus. Satu tugas saja."
      : "Waktunya istirahat sejenak.";

  timerInterval = window.setInterval(() => {
    timerRemaining -= 1;
    renderTimer();

    if (timerRemaining <= 0) {
      stopTimer();
      timerDisplay.classList.add("finished");
      timerToggle.textContent = "Mulai lagi";
      timerStatus.textContent =
        timerMinutes === 25
          ? "Waktu fokus habis. Istirahat 5 menit, lalu lanjut."
          : "Istirahat selesai. Siap fokus lagi?";
    }
  }, 1000);
}

timerToggle.addEventListener("click", () => {
  if (timerRunning) {
    stopTimer();
    timerToggle.textContent = "Lanjutkan";
    timerStatus.textContent = "Timer dijeda.";
    return;
  }

  startTimer();
});

timerReset.addEventListener("click", () => {
  resetTimer(timerMinutes, "Timer diulang. Siap saat kamu siap.");
});

timerModes.forEach((mode) => {
  mode.addEventListener("click", () => {
    const minutes = Number(mode.dataset.minutes);

    timerModes.forEach((item) => {
      const isActive = item === mode;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    resetTimer(
      minutes,
      minutes === 25
        ? "Siap untuk sesi fokus 25 menit."
        : "Siap untuk istirahat 5 menit.",
    );
  });
});

renderTimer();

// Langkah kecil hari ini, tersimpan di browser (FR-04 dan FR-05).
const STEP_STORAGE_KEY = "ruangtumbuh.step.v1";
const stepForm = document.getElementById("stepForm");
const stepInput = document.getElementById("stepInput");
const formError = document.getElementById("formError");
const stepConfirmation = document.getElementById("stepConfirmation");
const stepResult = document.getElementById("stepResult");
const stepDoneNote = document.getElementById("stepDoneNote");
const completeStep = document.getElementById("completeStep");
const resetStep = document.getElementById("resetStep");

let currentStep = "";
let currentStepDone = false;

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
}

function saveStep() {
  try {
    window.localStorage.setItem(
      STEP_STORAGE_KEY,
      JSON.stringify({ date: todayKey(), text: currentStep, done: currentStepDone }),
    );
  } catch {
    // Penyimpanan lokal bisa tidak tersedia; formulir tetap berfungsi.
  }
}

function readSavedStep() {
  try {
    const raw = window.localStorage.getItem(STEP_STORAGE_KEY);
    if (!raw) return null;

    const saved = JSON.parse(raw);
    if (saved.date !== todayKey() || typeof saved.text !== "string") return null;

    return { text: saved.text, done: Boolean(saved.done) };
  } catch {
    return null;
  }
}

function clearSavedStep() {
  try {
    window.localStorage.removeItem(STEP_STORAGE_KEY);
  } catch {
    // Tidak ada yang perlu dilakukan jika penyimpanan tidak tersedia.
  }
}

function renderStep() {
  stepResult.textContent = currentStep;
  stepForm.hidden = true;
  stepConfirmation.hidden = false;
  stepConfirmation.classList.toggle("is-done", currentStepDone);
  completeStep.hidden = currentStepDone;
  stepDoneNote.hidden = !currentStepDone;
}

function renderStepForm(value = "") {
  currentStep = "";
  currentStepDone = false;
  stepConfirmation.hidden = true;
  stepConfirmation.classList.remove("is-done");
  stepForm.hidden = false;
  formError.hidden = true;
  stepInput.value = value;
  stepInput.focus();
}

stepForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = stepInput.value.trim();
  if (value === "") {
    formError.hidden = false;
    stepConfirmation.hidden = true;
    stepInput.focus();
    return;
  }

  formError.hidden = true;
  currentStep = value;
  currentStepDone = false;
  saveStep();
  renderStep();
});

stepInput.addEventListener("input", () => {
  if (stepInput.value.trim() !== "") formError.hidden = true;
});

completeStep.addEventListener("click", () => {
  if (!currentStep) return;

  currentStepDone = true;
  saveStep();
  renderStep();
});

resetStep.addEventListener("click", () => {
  clearSavedStep();
  renderStepForm();
});

// Contoh langkah kecil dapat langsung mengisi formulir.
document.querySelectorAll(".chip[data-step]").forEach((chip) => {
  chip.addEventListener("click", () => {
    renderStepForm(chip.dataset.step);
  });
});

const savedStep = readSavedStep();
if (savedStep) {
  currentStep = savedStep.text;
  currentStepDone = savedStep.done;
  renderStep();
}

// Tahun pada footer diperbarui otomatis (FR-07).
document.getElementById("currentYear").textContent = new Date().getFullYear();
