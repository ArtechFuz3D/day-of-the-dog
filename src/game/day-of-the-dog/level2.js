import { InputHandler } from "./input";
import { UI } from "./UI";

import { Background } from "./background";
import { Player } from "./player2";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemieslvl2";

window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none";

  const canvas = document.getElementById("canvas2");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;
  // canvas.width = window.innerWidth;
  // canvas.height = window.innerHeight;

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.groundMargin = 78;
      this.speed = 0;
      this.maxSpeed = 4;
      this.background = new Background(this);
      this.player = new Player(this);
      this.input = new InputHandler(this);
      this.UI = new UI(this);
      // this.enemies = [new FlyingEnemy(this), new ClimbingEnemy(this), new GroundEnemy(this)]
      this.enemies = [];
      this.particles = [];
      this.collisions = [];
      // Floating message
      this.floatingMessages = [];
      this.maxParticles = 30;
      this.enemyTimer = 0;
      this.enemyInterval = 1000 * 0.7;

      // Score
      this.score = 0;
      this.winningScore = 350;
      this.fontColor = "black";

      // Timer
      this.time = 0;
      this.maxTime = 180000;
      // gameover
      this.gameOver = false;

      // Player Lives
      this.lives = 6;

      this.player.currentState = this.player.states[0];
      this.player.currentState.enter();
      // debug
      this.debug = false;
    }
    update(deltaTime) {
      this.time += deltaTime;
      if (this.time > this.maxTime) this.gameOver = true;
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      //handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((enemy) => {
        enemy.update(deltaTime);
        // if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
      });
      // Handle Messages
      this.floatingMessages.forEach((message) => {
        message.update();
      });
      //handle particles
      this.particles.forEach((particle, index) => {
        particle.update();
      });
      if (this.particles.length > this.maxParticles) {
        this.particles.length = this.maxParticles;
      } // console.log(this.particles)

      // handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime);
      });
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.particles = this.particles.filter(
        (particle) => !particle.markedForDeletion
      );
      this.collisions = this.collisions.filter(
        (collision) => !collision.markedForDeletion
      );
      this.floatingMessages = this.floatingMessages.filter(
        (message) => !message.markedForDeletion
      );
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((enemy) => {
        enemy.draw(context);
      });
      this.particles.forEach((particle) => {
        particle.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
      this.floatingMessages.forEach((message) => {
        message.draw(context);
      });
      this.UI.draw(context);
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < 0.5)
        this.enemies.push(new GroundEnemy(this));
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
      this.enemies.push(new FlyingEnemy(this));
      // console.log(this.enemies)
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // console.log(game);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(deltaTime);
    game.draw(ctx);
    if (!game.gameOver) requestAnimationFrame(animate);
  }
  animate(0);
});
