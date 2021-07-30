const obstacleImg = new Image()
obstacleImg.src = 'assets/obstacle/mines.png'

class Obstacle {
    constructor(container, context, player) {
        this.x = Math.random() * container.width
        this.y = container.height + 100
        this.radius = 30
        this.speed = Math.random() * 5 + 1
        this.distance = 0
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
        this.context = context
        this.player = player
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 200
        this.spriteHeight = 200
    }

    update() {
        let player = this.player

        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }

    draw() {
        let context = this.context

        context.fillStyle = "transparent"
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
        context.stroke()
        context.drawImage(obstacleImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x-40, this.y-37, this.spriteWidth *0.4, this.spriteHeight*0.4)
    }
}