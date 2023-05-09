const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0;

const particalsArray = [];


window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

const mouse = {
    x: undefined,
    y: undefined,
}


canvas.addEventListener('mousemove', event => {
    mouse.x = event.x;
    mouse.y = event.y;
    for (let i = 0; i < 5; i++) {
        particalsArray.push(new Partical());
    }
})

class Partical {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;

        this.size = Math.random() * 10 + 1;
        this.speedx = Math.random() * 3 - 1.5;
        this.speedy = Math.random() * 3 - 1.5;
        this.color = `hsl(${hue}, 100%, 50%)`;
    }
    update() {
        this.x += this.speedx;
        this.y += this.speedy;
        if (this.size > 0.2) this.size -= 0.1
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill(); 
    }
}

function handleParticals() {
    for (let i = 0; i < particalsArray.length; i++) {
        particalsArray[i].update();
        particalsArray[i].draw();
        for (let y = i; y < particalsArray.length; y++) {
            const dx = particalsArray[i].x - particalsArray[y].x;
            const dy = particalsArray[i].y - particalsArray[y].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = particalsArray[i].color;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particalsArray[i].x, particalsArray[i].y);
                ctx.lineTo(particalsArray[y].x, particalsArray[y].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particalsArray[i].size <= 0.3) {
            particalsArray.splice(i, 1);
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = "rgba(0,0,0,0.1)";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticals();
    hue+=3;
    requestAnimationFrame(animate);
}
animate();
console.log(ctx);