// ===== Year in footer =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Your links =====
const LINKEDIN = "https://www.linkedin.com/in/nada-althebani-959194335";
const GITHUB = "https://github.com/althebaninada";

// Contact links (only if elements exist)
const linkedinLink = document.getElementById("linkedinLink");
if (linkedinLink) linkedinLink.href = LINKEDIN;

const liLink = document.getElementById("liLink");
if (liLink) liLink.href = LINKEDIN;

const githubLink = document.getElementById("githubLink");
if (githubLink) githubLink.href = GITHUB;

const ghPlaceholder = document.getElementById("ghPlaceholder");
if (ghPlaceholder) {
  ghPlaceholder.innerHTML = `<a href="${GITHUB}" target="_blank" rel="noopener">github.com/althebaninada</a>`;
}

// ===== Slider (works for StudyMate; ignores ParkNGo if no slider) =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider").forEach((slider) => {
    const track = slider.querySelector(".slider__track");
    const slides = slider.querySelectorAll(".slider__track img");
    const prev = slider.querySelector(".slider__btn--left");
    const next = slider.querySelector(".slider__btn--right");
    const dotsWrap = slider.querySelector(".slider__dots");

    if (!track || slides.length === 0) return;

    let index = 0;

    // If only one slide, hide controls
    if (slides.length <= 1) {
      if (prev) prev.style.display = "none";
      if (next) next.style.display = "none";
      if (dotsWrap) dotsWrap.style.display = "none";
      return;
    }

    // Build dots
    let dots = [];
    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, i) => {
        const b = document.createElement("button");
        b.type = "button";
        b.addEventListener("click", () => go(i));
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    function render() {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (dots.length) {
        dots.forEach((d, i) => d.classList.toggle("is-active", i === index));
      }
    }

    function go(i) {
      index = (i + slides.length) % slides.length;
      render();
    }

    if (prev) prev.addEventListener("click", () => go(index - 1));
    if (next) next.addEventListener("click", () => go(index + 1));

    render();
  });
});

// ===== Optional: disable links if href="#" (ONLY for existing IDs) =====
function disableIfHash(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (el.getAttribute("href") === "#") {
    el.style.opacity = "0.55";
    el.style.pointerEvents = "none";
  }
}

// عدلي القائمة حسب اللي موجود عندك فعلاً في HTML
["studymateLink"].forEach(disableIfHash);