export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 42
        this.fontFamily = 'Creepster'
        this.playerLives = playerLife
    }
    draw(context){
        context.save()
        // remove this shadow and use duplicate text if perf suffers
        context.shadowOffsetX = 2
        context.shadowOffsetY = 2
        context.shadowColor = 'chartreuse'
        context.shadowBlur = 5
        context.font = this.fontSize + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        // Score
        context.fillText('Score: ' + this.game.score, 20, 45)
        // Timer
        context.font = this.fontSize * 0.6 + 'px ' + this.fontFamily
        context.fillText('Time: ' + (this.game.time * 0.001).toFixed(1) , 20, 82)
        // PLayer Lives
        for (let i = 0; i < this.game.lives; i++){
            context.drawImage(this.playerLives, 25 * i + 20, 95, 25, 25)
        }
        
        // Game Over Messages
        if (this.game.gameOver){
            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            if (this.game.score > this.game.winningScore){
                context.fillText('Oh My!', this.game.width * 0.5, this.game.height * 0.5 -20)
                context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
                context.fillText('What are the ghouls of the night afraid of? YOU!', this.game.width * 0.5, this.game.height * 0.5 + 30)
            } else {
                context.fillText('Arachnaphobic?', this.game.width * 0.5, this.game.height * 0.5 -20)
                context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
                context.fillText("Or are you just afraid of the keyboard?", this.game.width * 0.5, this.game.height * 0.5 + 30)
            }

        }
        context.restore()
    }
}