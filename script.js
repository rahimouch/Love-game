/* script.js */
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");
const loveLetter = document.getElementById("loveLetter");
let score = 0;

class Heart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 30;
        this.speed = Math.random() * 2 + 1;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x - 10, this.y, 10, Math.PI, 0);
        ctx.arc(this.x + 10, this.y, 10, Math.PI, 0);
        ctx.lineTo(this.x, this.y + 20);
        ctx.fill();
    }

    fall() {
        this.y += this.speed;
    }
}

let hearts = [];

function spawnHeart() {
    let x = Math.random() * (canvas.width - 30) + 15;
    hearts.push(new Heart(x, 0));
}

function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, index) => {
        heart.fall();
        heart.draw();
        if (heart.y > canvas.height) hearts.splice(index, 1);
    });
}

canvas.addEventListener("click", (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    hearts.forEach((heart, index) => {
        if (
            mouseX > heart.x - 15 &&
            mouseX < heart.x + 15 &&
            mouseY > heart.y - 15 &&
            mouseY < heart.y + 15
        ) {
            hearts.splice(index, 1);
            score++;
            scoreDisplay.innerText = score;
            createSparkleEffect(heart.x, heart.y);
            
            if (score >= 10) {
                loveLetter.style.display = "block";
            }
        }
    });
});

function createSparkleEffect(x, y) {
    const sparkle = document.createElement("div");
    sparkle.style.position = "absolute";
    sparkle.style.left = `${x + canvas.offsetLeft}px`;
    sparkle.style.top = `${y + canvas.offsetTop}px`;
    sparkle.style.width = "20px";
    sparkle.style.height = "20px";
    sparkle.style.background = "yellow";
    sparkle.style.borderRadius = "50%";
    sparkle.style.opacity = "0.8";
    sparkle.style.animation = "sparkle 0.5s ease-in-out";
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 500);
}

setInterval(spawnHeart, 1000);
setInterval(update, 20);
