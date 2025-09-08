// Theme toggle & year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Matrix Easter Egg via Red / Blue Pills
// Red = enter Matrix (animation then theme)
// Blue = exit Matrix (restore original)
// ESC also exits if active
let matrixActive = false;

function createMatrixCanvas() {
  const canvas = document.createElement("canvas");
  canvas.id = "matrixCanvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = "1000";
  canvas.style.pointerEvents = "none";
  document.body.appendChild(canvas);
  return canvas;
}

function startMatrixEffect() {
  document.body.style.background = "#000";
  document.body.style.color = "#0f0";
  document.querySelectorAll(".card, .header, .footer").forEach((e) => {
    e.style.background = "rgba(0,0,0,0.8)";
    e.style.border = "1px solid #0f0";
    e.style.color = "#0f0";
  });
  document.querySelectorAll("a").forEach((e) => {
    e.style.color = "#0f0";
    e.style.textShadow = "0 0 4px #0f0";
  });
  const canvas = createMatrixCanvas();
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext("2d");
  const letters =
    "アァイィウヴエェオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモヤャユュヨョラリルレロワヲンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const fontSize = 18;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + "px monospace";
    ctx.fillStyle = "#0f0";
    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  window.matrixInterval = setInterval(drawMatrix, 50);
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

function stopMatrixEffect() {
  document.body.style.background = "";
  document.body.style.color = "";
  document.querySelectorAll(".card, .header, .footer").forEach((e) => {
    e.style.background = "";
    e.style.border = "";
    e.style.color = "";
  });
  document.querySelectorAll("a").forEach((e) => {
    e.style.color = "";
    e.style.textShadow = "";
  });
  const canvas = document.getElementById("matrixCanvas");
  if (canvas) canvas.remove();
  clearInterval(window.matrixInterval);
}

function exitMatrix() {
  if (!matrixActive) return;
  document.documentElement.classList.remove("matrix-theme");
  stopMatrixEffect();
  matrixActive = false;
}

function activateMatrix() {
  if (matrixActive) return;
  matrixActive = true;
  startMatrixEffect();
  setTimeout(() => {
    stopMatrixEffect();
    document.documentElement.classList.add("matrix-theme");
  }, 2500);
}

// ESC key to exit
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") exitMatrix();
});

// Pill activations
const redPill = document.getElementById("redPill");
const bluePill = document.getElementById("bluePill");
if (redPill) {
  redPill.addEventListener("click", () => {
    if (!matrixActive) {
      activateMatrix();
      redPill.classList.add("active");
      bluePill?.classList.remove("active");
    }
  });
}
if (bluePill) {
  bluePill.addEventListener("click", () => {
    if (matrixActive) {
      exitMatrix();
      bluePill.classList.add("active");
      redPill?.classList.remove("active");
    }
  });
}
