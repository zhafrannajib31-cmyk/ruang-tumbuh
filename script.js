// EduSpace - JavaScript sederhana tanpa framework

// Mengubah tema terang dan gelap.
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("eduspace-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
  themeToggle.textContent = "☀";
  themeToggle.setAttribute("aria-label", "Aktifkan mode terang");
}

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  themeToggle.textContent = isDark ? "☀" : "☾";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap",
  );
  localStorage.setItem("eduspace-theme", isDark ? "dark" : "light");
});

// Tombol untuk menampilkan atau menyembunyikan penjelasan materi.
document.querySelectorAll(".details-button").forEach((button) => {
  button.addEventListener("click", () => {
    const extraContent = button.previousElementSibling;
    const isHidden = extraContent.hidden;

    extraContent.hidden = !isHidden;
    button.setAttribute("aria-expanded", String(isHidden));
    button.innerHTML = isHidden
      ? "Tutup penjelasan <span>↑</span>"
      : "Baca selengkapnya <span>→</span>";
  });
});

// Pencarian materi berdasarkan judul, kategori, atau deskripsi.
const searchInput = document.getElementById("searchInput");
const materialCards = [...document.querySelectorAll(".material-card")];
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-button");
let activeFilter = "semua";

function filterMaterials() {
  const keyword = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  materialCards.forEach((card) => {
    const searchableText =
      `${card.dataset.title} ${card.dataset.category} ${card.innerText}`.toLowerCase();
    const matchesKeyword = searchableText.includes(keyword);
    const matchesCategory =
      activeFilter === "semua" || card.dataset.category === activeFilter;
    const isVisible = matchesKeyword && matchesCategory;

    card.hidden = !isVisible;
    if (isVisible) visibleCount++;
  });

  emptyState.hidden = visibleCount !== 0;
}

searchInput.addEventListener("input", filterMaterials);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) =>
      item.classList.toggle("active", item === button),
    );
    filterMaterials();
  });
});

// Menu navigasi untuk layar kecil.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Tahun footer diperbarui secara otomatis.
document.getElementById("currentYear").textContent = new Date().getFullYear();
