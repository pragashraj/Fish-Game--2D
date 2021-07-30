let random = Math. round(Math.random())

const playerLeft = new Image()
playerLeft.src = random % 2 == 0 ? 'assets/player/fish_001_left.png' : 'assets/player/fish_002_left.png'

const playerRight = new Image()
playerRight.src = random % 2 == 0 ? 'assets/player/fish_001_right.png' : 'assets/player/fish_002_right.png'

class Player {
    constructor(container, mouse, context) {
        this.x = container.width
        this.y = container.height/2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 490
        this.spriteHeight = 330
        this.mouse = mouse
        this.context = context
    }

    update() {
        const dx = this.x - this.mouse.x
        const dy = this.y - this.mouse.y
        this.angle = Math.atan2(dy, dx)

        if (this.mouse.x != this.x) this.x -= dx/30
        if (this.mouse.y != this.y) this.y -= dy/30
    }

    draw() {
        let context = this.context
        let mouse = this.mouse
        if (mouse.click) {
            context.lineWidth = 0.2
            context.beginPath()
            context.moveTo(this.x, this.y)
            context.lineTo(mouse.x, mouse.y)
            context.stroke()
        }
        context.fillStyle = "transparent"
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
        context.fillRect(this.x, this.y, this.radius, 10)

        context.save()
        context.translate(this.x, this.y)
        context.rotate(this.angle)
        if (this.x >= mouse.x)
        context.drawImage(playerLeft, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth/4, this.spriteHeight/4)
        else
        context.drawImage(playerRight, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0 - 60, 0 - 45, this.spriteWidth/4, this.spriteHeight/4)

        context.restore()
    }
}