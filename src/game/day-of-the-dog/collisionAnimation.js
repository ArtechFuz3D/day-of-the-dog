// import roll from '/src/assets/roll.mp3';


export class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.image = collisionAnimation;
        this.spriteWidth = 100;
        this.spriteHeight = 90;
        this.sizeModifier = Math.random() + 0.5;
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;
        this.x = x - this.width * 0.5;
        this.y = y - this.height * 0.5;

        this.frameX = 0;
        this.maxFrame = 4;

        // Initialize the Web Audio API

        this.sound = new Audio();
        // this.sound.src = '/roll.mp3'
        this.sound.src = '/roll.mp3'

        this.sound.volume = 0.5;
        this.sound.loop = false;
        this.sound.playbackRate = 1;

        this.markedForDeletion = false;
        this.fps = Math.random() * 10 + 5;
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0;
    }

    draw(context) {
        context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }

    update(deltaTime) {
        if (this.frameX === 0) {
            // console.log('Attempting to play sound');
            this.sound.play().then(() => {
                // console.log('Sound is playing');
            }).catch(error => {
                // console.error('Error playing sound:', error);
            });
        }

        this.x -= this.game.speed;
        if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

        if (this.frameX > this.maxFrame) this.markedForDeletion = true;
    }
}
