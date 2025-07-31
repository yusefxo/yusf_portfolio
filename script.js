// Starry background animation
const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function createStars() {
  stars = [];
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.2,
      speed: Math.random() * 0.3 + 0.1,
    });
  }
}
createStars();

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(star => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fill();
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// Fade-in on scroll
const faders = document.querySelectorAll(".fade-in");

function showOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;
  faders.forEach(fade => {
    const boxTop = fade.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      fade.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", showOnScroll);
window.addEventListener("load", showOnScroll);

// Contact form submission using fetch
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const form = this;
  const successMsg = document.getElementById("success");

  fetch(form.action, {
    method: "POST",
    body: new FormData(form),
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      successMsg.style.display = "block";
      form.reset();
      window.scrollTo({ top: successMsg.offsetTop - 100, behavior: "smooth" });
    } else {
      alert("Oops! There was a problem submitting your form.");
    }
  }).catch(() => {
    alert("Oops! There was a problem submitting your form.");
  });
});


