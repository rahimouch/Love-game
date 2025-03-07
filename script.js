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
        this.size = 40;
        this.speed = Math.random() * 1.5 + 0.5; // Slower hearts
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
            mouseX > heart.x - 20 &&
            mouseX < heart.x + 20 &&
            mouseY > heart.y - 20 &&
            mouseY < heart.y + 20
        ) {
            hearts.splice(index, 1);
            score++;
            scoreDisplay.innerText = score;
            
            if (score === 20) {
                loveLetter.style.display = "block";
            }
        }
    });
});

setInterval(spawnHeart, 1000);
setInterval(update, 20);
