/* ============================================================
   Dear Jones ❤️ — A Little Birthday Story
   ============================================================ */

/* ---------------- CONFIGURATION ---------------- */
const birthdayConfig = {
  name: "Dear Jones",
  senderName: "YOUR NAME",
  secretCode: "1523",
  music: "music/birthday-song.mp3",

  memories: [
    { image: "images/memory1.jpg", number: "01", title: "The Beginning", date: "01 January 2025", description: "Every beautiful story has a beginning." },
    { image: "images/memory2.jpg", number: "02", title: "That Day", date: "15 February 2025", description: "One of those moments worth remembering." },
    { image: "images/memory3.jpg", number: "03", title: "That Smile", date: "20 March 2025", description: "A moment that still makes me smile." },
    { image: "images/memory4.jpg", number: "04", title: "Crazy Moments", date: "10 April 2025", description: "Because normal was never our thing." },
    { image: "images/memory5.jpg", number: "05", title: "A Beautiful Day", date: "25 May 2025", description: "One more memory to keep." },
    { image: "images/memory6.jpg", number: "06", title: "That Moment", date: "15 June 2025", description: "Some moments don't need an explanation." },
    { image: "images/memory7.jpg", number: "07", title: "Another Chapter", date: "20 July 2025", description: "And the story continues." },
    { image: "images/memory8.jpg", number: "08", title: "Forever Memory", date: "A day to remember", description: "A memory worth keeping forever." }
  ],

  loveList: [
    "Your Smile 😊", "Your Laugh 😂", "Your Random Conversations 💬",
    "Your Crazy Moments ✨", "The Little Things You Do ❤️",
    "The Memories We Create 📸", "Simply Being You 🌙"
  ],

  letter: `Dear {name},

I don't know if words can perfectly describe
how special you are, but I wanted to try.

We've shared little moments,
random conversations,
crazy laughs,
and memories that deserve to be remembered.

Some moments may look ordinary
to everyone else...

but somehow,
they become special when they belong to our story.

On your birthday,
I just want to wish you happiness,
beautiful moments,
peace,
laughter,
and everything your heart deserves.

Keep smiling.
Keep being yourself.
And keep creating beautiful memories.

Happy Birthday, {name}. ❤️

Here's to more laughter,
more memories,
and many more chapters.

With love,
{sender}`,

  onemoreLines: [
    "Before you go...",
    "Thank you for being you.",
    "Thank you for the memories.",
    "Thank you for all the little moments.",
    "Some people become memories...",
    "...and some people become a part of your story. ❤️",
    "There is just one more surprise..."
  ]
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Ensure initialization runs after DOM content is loaded */
document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  /* ---------------- FILL NAME PLACEHOLDERS ---------------- */
  document.querySelectorAll(".name-fill").forEach(el => { el.textContent = birthdayConfig.name; });

  /* ---------------- PARTICLES ---------------- */
  initParticles();

  /* ---------------- CUSTOM CURSOR ---------------- */
  initCustomCursor();

  /* ---------------- BUTTON RIPPLE ---------------- */
  initRippleEffect();

  /* ---------------- PIN SCREEN ---------------- */
  initPinScreen();
}

/* ============================================================
   PARTICLES (lightweight canvas background)
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, particlesArr = [];
  const symbols = ["♥", "♡", "✨"];

  function resize(){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  window.addEventListener("resize", resize);
  resize();

  const count = window.innerWidth < 720 ? 16 : 30;
  for (let i = 0; i < count; i++){
    particlesArr.push({
      x: Math.random() * w,
      y: Math.random() * h,
      size: 8 + Math.random() * 12,
      speed: 0.15 + Math.random() * 0.35,
      drift: (Math.random() - 0.5) * 0.3,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      opacity: 0.08 + Math.random() * 0.22
    });
  }

  function tick(){
    ctx.clearRect(0, 0, w, h);
    particlesArr.forEach(p => {
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.size}px sans-serif`;
      ctx.fillStyle = "#ffffff";
      ctx.fillText(p.symbol, p.x, p.y);
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -20) { p.y = h + 20; p.x = Math.random() * w; }
    });
    ctx.globalAlpha = 1;
    if (!prefersReducedMotion) requestAnimationFrame(tick);
  }
  tick();
}

/* ============================================================
   CUSTOM CURSOR (desktop)
   ============================================================ */
function initCustomCursor() {
  const cursorEl = document.getElementById("customCursor");
  if (!cursorEl || window.matchMedia("(pointer:coarse)").matches) return;
  window.addEventListener("mousemove", e => {
    cursorEl.style.left = e.clientX + "px";
    cursorEl.style.top = e.clientY + "px";
  });
  document.addEventListener("mouseover", e => {
    if (e.target.closest("button, .memory-card, .envelope, input, a")) cursorEl.classList.add("hover");
  });
  document.addEventListener("mouseout", e => {
    if (e.target.closest("button, .memory-card, .envelope, input, a")) cursorEl.classList.remove("hover");
  });
}

/* ============================================================
   RIPPLE EFFECT ON BUTTONS
   ============================================================ */
function initRippleEffect() {
  document.addEventListener("click", e => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 650);
  });
}

/* ============================================================
   PIN / SECURITY SCREEN
   ============================================================ */
function initPinScreen() {
  const SECRET_CODE = birthdayConfig.secretCode;
  const boxes = Array.from(document.querySelectorAll(".pin-box"));
  const boxesWrap = document.getElementById("pinBoxes");
  const unlockBtn = document.getElementById("unlockBtn");
  const message = document.getElementById("pinMessage");
  const pinScreenEl = document.getElementById("pinScreen");
  const pinCard = document.querySelector(".pin-card");

  if (!boxes.length) return;
  boxes[0].focus();

  function currentValue(){ return boxes.map(b => b.value).join(""); }

  function updateUnlockState(){
    const filled = boxes.every(b => b.value.length === 1);
    unlockBtn.disabled = !filled;
    if (filled) attemptUnlock();
  }

  boxes.forEach((box, i) => {
    box.addEventListener("input", () => {
      box.value = box.value.replace(/[^0-9]/g, "").slice(0, 1);
      box.classList.toggle("filled", box.value.length === 1);
      box.classList.remove("wrong");
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      updateUnlockState();
    });

    box.addEventListener("keydown", e => {
      if (e.key === "Backspace" && !box.value && i > 0) {
        boxes[i - 1].focus();
      }
      if (e.key === "ArrowLeft" && i > 0) boxes[i - 1].focus();
      if (e.key === "ArrowRight" && i < boxes.length - 1) boxes[i + 1].focus();
      if (e.key === "Enter") attemptUnlock();
    });

    box.addEventListener("paste", e => {
      e.preventDefault();
      const pasted = (e.clipboardData.getData("text") || "").replace(/[^0-9]/g, "").slice(0, 4);
      if (!pasted) return;
      pasted.split("").forEach((digit, idx) => {
        if (boxes[idx]) { boxes[idx].value = digit; boxes[idx].classList.add("filled"); }
      });
      const nextEmpty = boxes.find(b => !b.value);
      (nextEmpty || boxes[boxes.length - 1]).focus();
      updateUnlockState();
    });
  });

  unlockBtn.addEventListener("click", () => attemptUnlock());

  let attempting = false;
  function attemptUnlock(){
    if (attempting) return;
    const filled = boxes.every(b => b.value.length === 1);
    if (!filled) return;
    attempting = true;

    if (currentValue() === SECRET_CODE) {
      message.textContent = "Unlocked ✨";
      message.classList.add("success");
      boxes.forEach(b => b.blur());
      setTimeout(() => unlockSuccess(), 350);
    } else {
      wrongCode();
      attempting = false;
    }
  }

  function wrongCode(){
    boxesWrap.classList.add("shake");
    boxes.forEach(b => b.classList.add("wrong"));
    message.textContent = "Hmm… that's not the code ❤️  Try again.";
    message.classList.remove("success");

    setTimeout(() => {
      boxesWrap.classList.remove("shake");
      boxes.forEach(b => { b.value = ""; b.classList.remove("filled", "wrong"); });
      unlockBtn.disabled = true;
      message.textContent = "\u00A0";
      boxes[0].focus();
    }, 650);
  }

  function unlockSuccess(){
    pinCard.classList.add("unlocked-pop");
    pinScreenEl.classList.add("unlocking");
    burstStarsAndHearts();

    setTimeout(() => {
      pinScreenEl.classList.add("hidden");
      runLoader();
    }, 1100);
  }

  function burstStarsAndHearts(){
    const symbols = ["✦", "❤", "✨"];
    for (let i = 0; i < 18; i++){
      const el = document.createElement("div");
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.position = "fixed";
      el.style.left = "50%"; el.style.top = "50%";
      el.style.zIndex = "150";
      el.style.fontSize = (12 + Math.random() * 16) + "px";
      el.style.color = i % 2 === 0 ? "#FF4F81" : "#FFD166";
      el.style.pointerEvents = "none";
      el.style.transition = "transform 1s cubic-bezier(.22,.9,.34,1), opacity 1s ease";
      document.body.appendChild(el);
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 260;
      requestAnimationFrame(() => {
        el.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(1.4)`;
        el.style.opacity = "0";
      });
      setTimeout(() => el.remove(), 1050);
    }
  }
}

/* ============================================================
   LOADER -> REVEAL APP
   ============================================================ */
function runLoader(){
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  loader.classList.remove("hidden");
  let progress = 0;
  const interval = setInterval(() => {
    progress += 8 + Math.random() * 14;
    if (progress >= 100) {
      progress = 100;
      fill.style.width = "100%";
      clearInterval(interval);
      setTimeout(() => {
        loader.classList.add("hidden");
        startBirthdayExperience();
      }, 380);
    } else {
      fill.style.width = progress + "%";
    }
  }, 140);
}

/* ============================================================
   BIRTHDAY EXPERIENCE
   ============================================================ */
function startBirthdayExperience(){
  const app = document.getElementById("app");
  app.classList.remove("hidden");

  buildGallery();
  buildLoveGrid();
  buildLetter();
  buildOnemoreLines();

  initSlideNav();
  initEnvelope();
  initOnemore();
  initFinalSlide();
  initMusic();

  setActiveSlide(0, true);
}

/* ---------------- SLIDE NAVIGATION ---------------- */
let currentSlide = 0;
const totalSlides = 7;

function initSlideNav(){
  const slidesWrap = document.getElementById("slides");
  const dots = document.querySelectorAll(".dot");

  dots.forEach(dot => {
    dot.addEventListener("click", () => goToSlide(parseInt(dot.dataset.target, 10)));
  });

  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => goToSlide(currentSlide + 1));
  });

  const openSurpriseBtn = document.getElementById("openSurpriseBtn");
  if (openSurpriseBtn) {
    openSurpriseBtn.addEventListener("click", () => goToSlide(1));
  }

  function navBlocked(){
    return document.getElementById("app").classList.contains("hidden") ||
           !document.getElementById("memoryModal").classList.contains("hidden");
  }

  // wheel navigation (debounced)
  let wheelLock = false;
  window.addEventListener("wheel", e => {
    if (navBlocked()) return;
    if (wheelLock) return;
    if (Math.abs(e.deltaY) < 24) return;
    wheelLock = true;
    if (e.deltaY > 0) goToSlide(currentSlide + 1);
    else goToSlide(currentSlide - 1);
    setTimeout(() => { wheelLock = false; }, 900);
  }, { passive: true });

  // keyboard
  window.addEventListener("keydown", e => {
    if (navBlocked()) return;
    if (["ArrowRight", "ArrowDown", " "].includes(e.key)) { e.preventDefault(); goToSlide(currentSlide + 1); }
    if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); goToSlide(currentSlide - 1); }
  });

  // touch swipe
  let touchStartY = null;
  window.addEventListener("touchstart", e => {
    if (navBlocked()) return;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener("touchend", e => {
    if (touchStartY === null || navBlocked()) { touchStartY = null; return; }
    const diff = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goToSlide(currentSlide + 1);
      else goToSlide(currentSlide - 1);
    }
    touchStartY = null;
  }, { passive: true });

  function goToSlide(index){
    if (index < 0 || index >= totalSlides || index === currentSlide) return;
    setActiveSlide(index);
  }
  window.__goToSlide = goToSlide;
}

function setActiveSlide(index, instant){
  currentSlide = index;
  const slidesWrap = document.getElementById("slides");
  slidesWrap.style.transform = `translateY(-${index * 100}vh)`;

  document.querySelectorAll(".slide").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
  document.querySelectorAll(".dot").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });
  const fill = document.getElementById("mobileProgressFill");
  if (fill) fill.style.width = ((index + 1) / totalSlides * 100) + "%";

  if (index === 5) triggerOnemoreSequence();
}

/* Shared fallback for any memory photo that hasn't been added yet */
function handleImgError(imgEl, fallbackText){
  imgEl.style.display = "none";
  if (imgEl.dataset.fallbackApplied) return;
  imgEl.dataset.fallbackApplied = "true";
  const badge = document.createElement("span");
  badge.className = "img-fallback";
  badge.textContent = fallbackText;
  imgEl.parentElement.appendChild(badge);
}

/* ---------------- SLIDE 3: GALLERY ---------------- */
function buildGallery(){
  const gallery = document.getElementById("gallery");
  if (!gallery) return;
  gallery.innerHTML = "";
  birthdayConfig.memories.forEach((mem, i) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open memory: ${mem.title}`);

    const imgWrap = document.createElement("div");
    imgWrap.className = "memory-img-wrap";
    const img = document.createElement("img");
    img.src = mem.image;
    img.alt = mem.title;
    img.loading = "lazy";
    img.addEventListener("error", () => handleImgError(img, mem.number));
    imgWrap.appendChild(img);

    const num = document.createElement("span");
    num.className = "memory-num";
    num.textContent = mem.number;

    const title = document.createElement("h3");
    title.textContent = mem.title;

    const date = document.createElement("p");
    date.className = "memory-date";
    date.textContent = mem.date;

    card.append(imgWrap, num, title, date);
    card.addEventListener("click", () => openModal(i));
    card.addEventListener("keydown", e => { if (e.key === "Enter") openModal(i); });
    gallery.appendChild(card);
  });
}

let modalIndex = 0;
function openModal(i){
  modalIndex = i;
  renderModal();
  document.getElementById("memoryModal").classList.remove("hidden");
}
function renderModal(){
  const mem = birthdayConfig.memories[modalIndex];
  const modalImg = document.getElementById("modalImg");
  modalImg.style.display = "";
  modalImg.src = mem.image;
  modalImg.alt = mem.title;
  modalImg.onerror = function(){ this.style.display = "none"; };
  document.getElementById("modalNumber").textContent = mem.number;
  document.getElementById("modalTitle").textContent = mem.title;
  document.getElementById("modalDate").textContent = mem.date;
  document.getElementById("modalDesc").textContent = mem.description;
}
function closeModal(){ document.getElementById("memoryModal").classList.add("hidden"); }

document.getElementById("modalClose").addEventListener("click", closeModal);
document.getElementById("modalBackdrop").addEventListener("click", closeModal);
document.getElementById("modalPrev").addEventListener("click", () => {
  modalIndex = (modalIndex - 1 + birthdayConfig.memories.length) % birthdayConfig.memories.length;
  renderModal();
});
document.getElementById("modalNext").addEventListener("click", () => {
  modalIndex = (modalIndex + 1) % birthdayConfig.memories.length;
  renderModal();
});
window.addEventListener("keydown", e => {
  if (document.getElementById("memoryModal").classList.contains("hidden")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") document.getElementById("modalNext").click();
  if (e.key === "ArrowLeft") document.getElementById("modalPrev").click();
});

/* ---------------- SLIDE 4: LOVE GRID ---------------- */
function buildLoveGrid(){
  const grid = document.getElementById("loveGrid");
  if (!grid) return;
  grid.innerHTML = "";
  birthdayConfig.loveList.forEach((text, i) => {
    const card = document.createElement("div");
    card.className = "love-card";
    card.style.transitionDelay = (i * 0.08) + "s";
    card.textContent = text;
    grid.appendChild(card);
  });
}

/* ---------------- SLIDE 5: LETTER + ENVELOPE ---------------- */
function buildLetter(){
  const text = birthdayConfig.letter
    .replace(/{name}/g, birthdayConfig.name)
    .replace(/{sender}/g, birthdayConfig.senderName);
  const letterEl = document.getElementById("letterText");
  if (letterEl) letterEl.textContent = text;
}

function initEnvelope(){
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openLetterBtn");
  const envelopeStage = document.getElementById("envelopeStage");
  const letterStage = document.getElementById("letterStage");

  function openLetter(){
    envelope.classList.add("opened");
    setTimeout(() => {
      envelopeStage.classList.add("hidden");
      letterStage.classList.remove("hidden");
    }, 600);
  }
  if (envelope) envelope.addEventListener("click", openLetter);
  if (openBtn) openBtn.addEventListener("click", openLetter);
}

/* ---------------- SLIDE 6: SEQUENTIAL REVEAL ---------------- */
function buildOnemoreLines(){
  const wrap = document.getElementById("onemoreLines");
  if (!wrap) return;
  wrap.innerHTML = "";
  birthdayConfig.onemoreLines.forEach(line => {
    const p = document.createElement("p");
    p.className = "onemore-line";
    p.textContent = line;
    wrap.appendChild(p);
  });
}

let onemoreTriggered = false;
function triggerOnemoreSequence(){
  if (onemoreTriggered) return;
  onemoreTriggered = true;
  const lines = document.querySelectorAll(".onemore-line");
  const btn = document.getElementById("finalSurpriseBtn");
  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add("show"), i * 900);
  });
  if (btn) {
    setTimeout(() => btn.classList.remove("hidden"), lines.length * 900 + 300);
  }
}
function initOnemore(){
  const finalBtn = document.getElementById("finalSurpriseBtn");
  if (finalBtn) {
    finalBtn.addEventListener("click", () => window.__goToSlide(6));
  }
}

/* ---------------- SLIDE 7: FINAL WISH ---------------- */
function initFinalSlide(){
  const makeWishBtn = document.getElementById("makeWishBtn");
  const wishCandle = document.getElementById("wishCandle");
  const finalIntro = document.getElementById("finalIntro");
  const finalOutro = document.getElementById("finalOutro");

  if (makeWishBtn) {
    makeWishBtn.addEventListener("click", () => {
      if (wishCandle) wishCandle.classList.add("blown");
      setTimeout(() => {
        launchConfettiAndHearts();
        if (finalIntro) finalIntro.classList.add("hidden");
        if (finalOutro) finalOutro.classList.remove("hidden");
      }, 500);
    });
  }
}

function launchConfettiAndHearts(){
  const colors = ["#FF4F81", "#A855F7", "#FFD166", "#ffffff"];
  const count = prefersReducedMotion ? 0 : 42;
  for (let i = 0; i < count; i++){
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = 6 + Math.random() * 6;
    piece.style.width = size + "px";
    piece.style.height = (size * 0.4) + "px";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = (2.6 + Math.random() * 1.8) + "s";
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 4600);
  }
  const heartCount = prefersReducedMotion ? 0 : 16;
  for (let i = 0; i < heartCount; i++){
    const heart = document.createElement("div");
    heart.className = "float-heart";
    heart.textContent = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (14 + Math.random() * 16) + "px";
    heart.style.color = Math.random() > 0.5 ? "#FF4F81" : "#A855F7";
    heart.style.animationDuration = (3.5 + Math.random() * 2) + "s";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
  }
}

/* ============================================================
   MUSIC
   ============================================================ */
function initMusic(){
  const btn = document.getElementById("musicBtn");
  const audio = document.getElementById("bgAudio");
  const note = document.getElementById("musicNote");
  if (!btn || !audio) return;
  audio.src = birthdayConfig.music;
  let playing = false;

  btn.addEventListener("click", () => {
    if (playing) {
      audio.pause();
      playing = false;
      btn.classList.remove("playing");
      return;
    }
    audio.play().then(() => {
      playing = true;
      btn.classList.add("playing");
      if (note) note.classList.add("hidden");
    }).catch(() => {
      if (note) {
        note.classList.remove("hidden");
        setTimeout(() => note.classList.add("hidden"), 2600);
      }
    });
  });

  audio.addEventListener("error", () => {
    if (!audio.paused) return;
  }, true);
}
