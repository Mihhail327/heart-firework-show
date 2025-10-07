// 💖 Универсальный генератор сердечек
function spawnHeart(x, y, size = 20, z = 1) {
  const heart = document.createElement("img");
  heart.src = "assets/heart.svg";
  heart.className = "heart";
  heart.style.width = `${size}px`;
  heart.style.height = `${size * 0.94}px`;
  heart.style.left = `${x - size / 2}px`;
  heart.style.top = `${y - size / 2}px`;
  heart.style.zIndex = z;
  heart.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
  heart.style.transform = `rotate(${Math.random() * 360}deg) scale(1)`;
  document.getElementById("container").appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

// 🎆 Обычный фейерверк (маленькие сердечки)
function launchFirework() {
  const x = Math.random() * window.innerWidth;
  const y = window.innerHeight * 0.5;

  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = `${x}px`;
  rocket.style.bottom = "0px";
  document.getElementById("container").appendChild(rocket);

  setTimeout(() => {
    rocket.remove();

    const flash = document.createElement("div");
    flash.className = "flash";
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    document.getElementById("container").appendChild(flash);
    setTimeout(() => flash.remove(), 300);

    for (let i = 0; i < 6; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 50 + Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      spawnHeart(x + dx, y + dy, 20, 1);
    }
  }, 600);
}

// 💥 Центральный салют (большое сердце + конфетти)
function launchMegaFirework() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const rocket = document.createElement("div");
  rocket.className = "rocket";
  rocket.style.left = `${centerX}px`;
  rocket.style.bottom = "0px";
  document.getElementById("container").appendChild(rocket);

  setTimeout(() => {
    rocket.remove();

    spawnHeart(centerX, centerY, 80, 2); // большое сердце

    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = 60 + Math.random() * 100;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;
      spawnHeart(centerX + dx, centerY + dy, 16, 2); // конфетти
    }
  }, 800);
}

// ❤️ Рисование большого сердца на фоне
function drawBackgroundHeart() {
  const container = document.getElementById("container");
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  let delay = 0;
  for (let t = 0; t < Math.PI * 2; t += 0.15) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);

    setTimeout(() => {
      const heart = document.createElement("img");
      heart.src = "assets/heart.svg";
      heart.className = "background-heart";
      heart.style.left = `${centerX + x * 10}px`;
      heart.style.top = `${centerY - y * 10}px`;
      heart.style.zIndex = "0";
      document.getElementById("container").appendChild(heart);
    }, delay);

    delay += 100;
  }
}

// 🚀 Автоматический запуск
window.addEventListener("load", () => {
  drawBackgroundHeart();
  setInterval(launchFirework, 1000);
  setInterval(launchMegaFirework, 5000);
});