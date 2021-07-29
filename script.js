const container = document.getElementById("container")
const context = container.getContext('2d')

container.width = 800
container.height = 500
context.font = "40px Georgia"

let score = 0
let gameFrame = 0
let position = container.getBoundingClientRect()

const mouse = {
    x: container.width/2,
    y: container.height/2,
    click: false
}

container.addEventListener('mousedown', function (event){
    mouse.x = event.x - position.left
    mouse.y = event.y - position.top
    mouse.click = true
})

container.addEventListener('mouseup', function (){
    mouse.click = false
})


const playerLeft = new Image()
playerLeft.src = 'assets/player/fish_swim_left.png'

const playerRight = new Image()
playerRight.src = 'assets/player/fish_swim_right.png'

class Player {
    constructor() {
        this.x = container.width
        this.y = container.height/2
        this.radius = 50
        this.angle = 0
        this.frameX = 0
        this.frameY = 0
        this.frame = 0
        this.spriteWidth = 490
        this.spriteHeight = 330
    }

    update() {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        this.angle = Math.atan2(dy, dx)
        if (mouse.x != this.x) {
            this.x -= dx/30
        }

        if (mouse.y != this.y) {
            this.y -= dy/30
        }
    }

    draw() {
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

const player = new Player()

const bubblesArray = []

const bubbleImg = new Image()
bubbleImg.src = 'assets/bubble/bubble.png'
class Bubble {
    constructor() {
        this.x = Math.random() * container.width
        this.y = container.height + 100
        this.radius = 50
        this.speed = Math.random() * 5 + 1
        this.distance = 0
        this.counted = false
        this.sound = Math.random() <= 0.5 ? 'sound1' : 'sound2'
    } 

    update() {
        this.y -= this.speed
        const dx = this.x - player.x
        const dy = this.y - player.y
        this.distance = Math.sqrt(dx*dx + dy*dy)
    }

    draw() {
        context.fillStyle = "rgb(121, 245, 245)"
        context.beginPath()
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        context.fill()
        context.closePath()
        context.stroke()
        context.drawImage(bubbleImg, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth/4, this.spriteHeight/4)
    }
}

const bubblePob1 = document.createElement('audio')
bubblePob1.src = 'assets/sounds/sound1.mp3'

const bubblePob2 = document.createElement('audio')
bubblePob2.src = 'assets/sounds/sound2.mp3'

function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble())
    }

    for (let i = 0; i < bubblesArray.length; i++) {
        bubblesArray[i].update()
        bubblesArray[i].draw()
        if (bubblesArray[i].y < 0 - bubblesArray[i].radius * 2) {
            bubblesArray.splice(i, 1)
        }
        if (bubblesArray[i] && bubblesArray[i].distance < bubblesArray[i].radius + player.radius) {
            if (!bubblesArray[i].counted) {
                if (bubblesArray[i].sound == 'sound1') bubblePob1.play()
                else bubblePob2.play()
                score++
                bubblesArray[i].counted = true
                bubblesArray.splice(i, 1)
            }
        }
    }
}

function animate() {
    context.clearRect(0, 0, container.width, container.height)
    handleBubbles()
    player.update()
    player.draw()
    context.fillStyle = "red"
    context.fillText('score : '+ score, 10, 50)
    gameFrame++ 
    requestAnimationFrame(animate)
}

animate()