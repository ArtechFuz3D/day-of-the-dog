const canvas = document.getElementById("canvas-constellation");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, "red");
gradient.addColorStop(0.5, "green");
gradient.addColorStop(1, "red");
ctx.fillStyle = gradient;
ctx.strokeStyle = "white";

class Particle {
  constructor(effect) {
    this.effect = effect;

    // this.radius = Math.random() * 7 + 2;
    // this.radius = 2;
    this.radius = Math.floor(Math.random() * 8 +4);
    this.x =
      this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y =
      this.radius + Math.random() * (this.effect.height - this.radius * 2);

    this.vx = Math.random() * 1 - 0.5;
    this.vy = Math.random() * 1 - 0.5;
    this.pushX = 0
    this.pushY = 0
    this.friction = 0.75
  }
  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fill(); // disable for hollow particle
    // context.stroke(); // disable for perf
  }
  update() {
    if (this.effect.mouse.pressed){
      const dx = this.x - this.effect.mouse.x
      const dy = this.y - this.effect.mouse.y
      const distance = Math.hypot(dx, dy);
      const force = (this.effect.mouse.radius / distance)
      if (distance < this.effect.mouse.radius){
        const angle = Math.atan2(dx, dy)
        this.pushX += Math.cos(angle) * force
        this.pushY += Math.sin(angle) * force
      }
    }

    this.x += (this.pushX *= this.friction) + this.vx;
    this.y += (this.pushY *= this.friction) + this.vy;

    if (this.x < this.radius){
      this.x = this.radius
      this.vx *= -1
    } else if (this.x > this.effect.width - this.radius){
      this.x = this.effect.width - this.radius
      this.vx *= -1
    }
    if (this.y < this.radius){
      this.y = this.radius
      this.vy *= -1
    } else if (this.y > this.effect.height - this.radius){
      this.y = this.effect.height - this.radius
      this.vy *= -1
    }

    // this.x += (this.pushX *= this.friction) + this.vx;
    // this.y += (this.pushY *= this.friction) + this.vy;
  }
  reset(){
    this.x =
    this.radius + Math.random() * (this.effect.width - this.radius * 2);
  this.y =
    this.radius + Math.random() * (this.effect.height - this.radius * 2);
  }
}

class Effect {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = [];
    this.numberOfParticles = 100;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false,
      radius: 300

    }

    window.addEventListener("resize", (e) => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight);
    });
    window.addEventListener('mousemove', e => {
      // console.log(e)
      // console.log(e.x, e.y)
      if (this.mouse.pressed){
        this.mouse.x = e.x
        this.mouse.y = e.y
        // console.log(thios.mouse.x, this.mouse.y)
      }

    })
    window.addEventListener('mousemove', e => {
      this.mouse.pressed = true
      this.mouse.x = e.x
      this.mouse.y = e.y
    })

    // window.addEventListener('mousedown', e => {
    //   this.mouse.pressed = true
    //   this.mouse.x = e.x
    //   this.mouse.y = e.y
    // })
    // window.addEventListener('mouseup', e => {
    //   this.mouse.pressed = false
    // })

  }
  createParticles() {
    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push(new Particle(this));
    }
  }
  handleParticles(context) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    });
  }
  connectParticles(context) {
    const maxDistance = 100;
    for (let a = 0; a < this.particles.length; a++) {
      for (let b = a; b < this.particles.length; b++) {
        // Pythagorean
        const dx = this.particles[a].x - this.particles[b].x;
        const dy = this.particles[a].y - this.particles[b].y;
        const distance = Math.hypot(dx, dy);
        if (distance < maxDistance) {
          const opacity = 1 - distance / maxDistance;
          context.save();
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[a].x, this.particles[a].y);
          context.lineTo(this.particles[b].x, this.particles[b].y);
          context.stroke();
          context.restore();
        }
      }
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
    const gradient = this.context.createLinearGradient(
      0,
      0,
      width,
      height,
    );
    gradient.addColorStop(0, "red");
    gradient.addColorStop(0.5, "green");
    gradient.addColorStop(1, "red");
    this.context.fillStyle = gradient;
    this.context.strokeStyle = "white";

    this.particles.forEach(particle => {
      particle.reset()
    })
  }
}
const effect = new Effect(canvas, ctx);

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame(animate);
}
animate();
