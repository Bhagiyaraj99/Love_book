// 1) Put your photos here (in pairs: left page + right page).
// If you have an odd number of images, the last right page will show a placeholder.
const pages = [
  {
    left:  { img: "photos/1.jpg", cap: "Somewhere along the way, you became my favorite part of the day." },
    right: { img: "photos/2.jpg", cap: "With you, everything just feels easy." }
  },
  {
    left:  { img: "photos/3.jpg", cap: "I love how we can be serious and silly in the same minute." },
    right: { img: "photos/4.jpg", cap: "You make normal days feel special." }
  },
  {
    left:  { img: "photos/5.jpg", cap: "You understand me in ways I don’t always explain." },
    right: { img: "photos/6.jpg", cap: "It’s the small moments with you that matter most." }
  },
  {
    left:  { img: "photos/7.jpg", cap: "I admire your strength more than you know." },
    right: { img: "photos/8.jpg", cap: "You bring peace into my chaos." }
  },
  {
    left:  { img: "photos/9.jpg", cap: "Life feels better when it’s with you." },
    right: { img: "photos/10.jpg", cap: "I just know I want you in my future." }
  }
];


const notes = [
  "I’m really grateful for you.",
  "Thank you for being patient with me.",
  "You make my life better in ways you probably don’t even notice.",
  "I feel lucky to do life with you.",
  "You matter to me. A lot.",
  "I don’t always say it, but I appreciate you deeply.",
  "You’re someone I genuinely respect — not just love."
];




const frontScreen = document.getElementById("frontScreen");
const bookScreen  = document.getElementById("bookScreen");

const openBtn = document.getElementById("openBtn");
const backBtn = document.getElementById("backBtn");

const leftImg = document.getElementById("leftImg");
const rightImg = document.getElementById("rightImg");
const leftCap = document.getElementById("leftCap");
const rightCap = document.getElementById("rightCap");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");

const modal = document.getElementById("modal");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");
const surpriseBtn = document.getElementById("surpriseBtn");

const frontPeekBtn = document.getElementById("frontPeekBtn");
if (frontPeekBtn) frontPeekBtn.addEventListener("click", openBook);

// Open modal
surpriseBtn.addEventListener("click", () => {
  const pick = notes[Math.floor(Math.random() * notes.length)];
  modalText.textContent = pick;
  modal.classList.remove("hidden");
});

// Close modal (button)
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal (click outside box)
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});


let idx = 0;

function safeSetImage(imgEl, src){
  imgEl.src = src;
  imgEl.onerror = () => {
    imgEl.onerror = null;
    imgEl.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
      <svg xmlns='http://www.w3.org/2000/svg' width='1200' height='800'>
        <defs>
          <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
            <stop stop-color='#ff8fc7' stop-opacity='0.25'/>
            <stop offset='1' stop-color='#7aa7ff' stop-opacity='0.15'/>
          </linearGradient>
        </defs>
        <rect width='100%' height='100%' fill='url(#g)'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle'
          font-family='Arial' font-size='44' fill='rgba(255,255,255,0.8)'>
          Add your photo in /photos
        </text>
      </svg>
    `);
  };
}

function render(){
  const p = pages[idx];

  safeSetImage(leftImg, p.left?.img || "");
  safeSetImage(rightImg, p.right?.img || "");

  leftCap.textContent  = p.left?.cap  || "";
  rightCap.textContent = p.right?.cap || "";

  pageIndicator.textContent = `${idx + 1} / ${pages.length}`;

  prevBtn.disabled = idx === 0;
  nextBtn.disabled = idx === pages.length - 1;

  prevBtn.style.opacity = prevBtn.disabled ? 0.5 : 1;
  nextBtn.style.opacity = nextBtn.disabled ? 0.5 : 1;
}

function openBook(){
  frontScreen.classList.add("hidden");
  bookScreen.classList.remove("hidden");
  render();
}

function goBack(){
  bookScreen.classList.add("hidden");
  frontScreen.classList.remove("hidden");
}

openBtn.addEventListener("click", openBook);
backBtn.addEventListener("click", goBack);

prevBtn.addEventListener("click", () => {
  if (idx > 0) { idx--; render(); }
});
nextBtn.addEventListener("click", () => {
  if (idx < pages.length - 1) { idx++; render(); }
});

// Keyboard navigation (desktop)
window.addEventListener("keydown", (e) => {
  if (bookScreen.classList.contains("hidden")) return;
  if (e.key === "ArrowLeft") prevBtn.click();
  if (e.key === "ArrowRight") nextBtn.click();
  if (e.key === "Escape") goBack();
});

// Surprise modal
surpriseBtn.addEventListener("click", () => {
  const pick = notes[Math.floor(Math.random() * notes.length)];
  modalText.textContent = pick;
  modal.classList.remove("hidden");
});
closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// ===== Valentine buttons (robust) =====
document.addEventListener("DOMContentLoaded", () => {
  const valYes = document.getElementById("valYes");
  const valNo = document.getElementById("valNo");

function teleportNoButton() {
  if (!valNo) return;

  const actions = document.querySelector(".val-actions");
  if (!actions) return;

  const pad = 8;

  // Make sure it's positioned relative to the actions row (inside the card)
  valNo.style.position = "absolute";
  valNo.style.zIndex = "9999";

  const box = actions.getBoundingClientRect();
  const btnW = valNo.offsetWidth || 110;
  const btnH = valNo.offsetHeight || 44;

  const maxX = Math.max(pad, box.width - btnW - pad);
  const maxY = Math.max(pad, box.height - btnH - pad);

  const x = Math.random() * (maxX - pad) + pad;
  const y = 0; // keep it aligned in the row (looks nicer)

  valNo.style.left = `${x}px`;
  valNo.style.top = `${y}px`;
}


  // NO dodges
  if (valNo) {
    valNo.addEventListener("click", (e) => { e.preventDefault(); teleportNoButton(); });
    valNo.addEventListener("mouseenter", teleportNoButton);
    valNo.addEventListener("touchstart", (e) => { e.preventDefault(); teleportNoButton(); }, { passive: false });
    teleportNoButton();
  }

  // YES works

  if (valYes) {
    valYes.addEventListener("click", () => {
      const modal = document.getElementById("modal");
      const modalText = document.getElementById("modalText");
      const valBox = document.getElementById("valentine");

      if (modal && modalText) {
        modalText.textContent =
          "YAYYY 💖 Manny said YES! Now you’re officially my Valentine 😄💘";
        modal.classList.remove("hidden");
      } else {
        alert("YAYYY 💖 Manny said YES! Now you’re officially my Valentine 😄💘");
      }

      if (valBox) valBox.style.display = "none";
    });
  }

  // NO button (still runs away)
  if (valNo) {
    valNo.addEventListener("mouseenter", teleportNoButton);
    valNo.addEventListener("click", (e) => {
      e.preventDefault();
      teleportNoButton();
    });
  }
});









