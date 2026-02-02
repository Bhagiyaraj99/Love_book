// 1) Put your photos here (in pairs: left page + right page).
// If you have an odd number of images, the last right page will show a placeholder.
const pages = [
  {
    left:  { img: "photos/1.jpg", cap: "Manny, you’re my favorite person… and my favorite problem 😌💗" },
    right: { img: "photos/2.jpg", cap: "If cuteness was a job, you’d be the CEO (and I’d apply daily)." }
  },
  {
    left:  { img: "photos/3.jpg", cap: "This is my “I’m lucky” face. Also my “don’t leave” face 😄" },
    right: { img: "photos/4.jpg", cap: "Us together = 10/10. No feedback needed. Approved ✅" }
  },
  {
    left:  { img: "photos/5.jpg", cap: "You + me + food + laughs = my kind of perfect plan 😋💞" },
    right: { img: "photos/6.jpg", cap: "Reminder: you’re stuck with me. (Respectfully.) 😌💘" }
  },
  {
    left:  { img: "photos/7.jpg", cap: "I love you more than I love sleeping… and that’s serious." },
    right: { img: "photos/8.jpg", cap: "You make my heart do backflips. My brain? Completely offline 🥹💗" }
  },
  {
    left:  { img: "photos/9.jpg", cap: "Every time I’m with you, Manny, life gets softer and happier." },
    right: { img: "photos/10.jpg", cap: "Forever is a long time… good thing I like you A LOT 😄💕" }
  }
];

const notes = [
  "Manny, you’re my favorite notification 💌",
  "I love you more than I love Wi-Fi… and you know that’s huge 😤💗",
  "If I had 3 wishes, I’d use all 3 on more moments with you ✨",
  "You’re my peace, my chaos, and my happiness — all in one cute package 😄💞",
  "I’m proud of you. Also obsessed. Respectfully 😌💖",
  "You + me = my best decision (don’t let it get to your head 😄)",
  "If love was a class, I’d fail everything else just to sit next to you 🥹💗"
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
