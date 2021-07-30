const container = document.getElementById("container")
const finalScoreContainer = document.getElementById("final_score")

const context = container.getContext('2d')
const finalScoreContext = finalScoreContainer.getContext('2d')

container.width = 800
container.height = 500
context.font = "25px Georgia"
finalScoreContext.font = "35px Georgia bold"

let score = 0
let highScore = 0
let gameFrame = 0
let position = container.getBoundingClientRect()
let status = "START"
let isDead = false

let bubblesArray = []
let obstacleArray = []

const bubblePob1 = document.createElement('audio')
bubblePob1.src = 'assets/sounds/sound1.mp3'

const bubblePob2 = document.createElement('audio')
bubblePob2.src = 'assets/sounds/sound2.mp3'

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

const player = new Player(container, mouse, context)

function handleBubbles() {
    if (gameFrame % 50 == 0) {
        bubblesArray.push(new Bubble(container, context, player))
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

function handleObstacles() {
    if (gameFrame % 150 == 0) {
        obstacleArray.push(new Obstacle(container, context, player))
    }

    for (let i = 0; i < obstacleArray.length; i++) {
        obstacleArray[i].update()
        obstacleArray[i].draw()
        if (obstacleArray[i].y < 0 - obstacleArray[i].radius * 2) {
            obstacleArray.splice(i, 1)
        }
        if (obstacleArray[i] && obstacleArray[i].distance < obstacleArray[i].radius + player.radius) {
            isDead = true
            endGame()
            alert("Game End. you lost!")
        }
    }
}

function animate() {
    context.clearRect(0, 0, container.width, container.height)
    player.update()
    player.draw()
    context.fillStyle = "red"
    context.fillText('Score : '+ score, 10, 50)
    context.fillText('High Score : '+ highScore, 600, 50)
    if (status == "PLAYING" && !isDead) {
        handleBubbles()
        handleObstacles()
        gameFrame++ 
    }
    requestAnimationFrame(animate)
}

function startGame() {
    finalScoreContext.clearRect(0, 0 , finalScoreContainer.width, finalScoreContainer.height)
    if (status == "START") {
        status = "PLAYING"
        initialState()
    }
}

function restartGame() {
    status = "PLAYING"
    initialState()
    finalScoreContext.clearRect(0, 0 , finalScoreContainer.width, finalScoreContainer.height)
}

function endGame() {
    if (status == "PLAYING") {
        status = "START"
        finalScoreContext.fillStyle = "red"
        finalScoreContext.fillText('Your Final Score : '+ score, 0, 60)
        if (score > highScore) highScore = score
        score = 0
        isDead = false
        initialState()
    }
}

function initialState() {
    player.x = container.width
    player.y = container.height/2
    player.angle = 0
    mouse.x = container.width/2,
    mouse.y = container.height/2,
    mouse.click = false
    bubblesArray = []
    gameFrame = 0
    score = 0
    isDead = false
}

animate()