const board = document.querySelector(".board")
const botButton = document.querySelector(".bot-btn")


const blockWidth = 25;
const blockHeight = 25;

const columns = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

const blocks = []
let snake = [
    { x: 1, y: 5 },
    { x: 1, y: 4 },
    { x: 1, y: 3 }
]


let isBotActive = false
let direction = "right";
let food = spawnFood()
let score = 0
let time;
let startTime = Date.now()
// let endingTime;

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        blocks[`${row}-${col}`] = block
    }
}

function render() {
    if(isBotActive) {
        bot()
    }

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("snake")
    })

    blocks[`${food.x}-${food.y}`].classList.add("food")

    let head;

    if (direction == "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 }
    }
    else if (direction == "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 }
    }
    else if (direction == "down") {
        head = { x: snake[0].x + 1, y: snake[0].y }
    }
    else if (direction == "up") {
        head = { x: snake[0].x - 1, y: snake[0].y }
    }

    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= columns) {
        document.querySelector(".modal").style.display = "flex"
        return clearInterval(intervalId)
    }

    if (food.x === head.x && food.y === head.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        food = spawnFood()
        score += 10
        updateScore()
    }
    else {
        snake.pop()
        console.log("selse block")

    }

    snake.unshift(head)

    drawSnake()

    let elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    time = elapsedSeconds
    updateTime()
}

let intervalId = setInterval(() => {
    render()
}, 350)

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        if (direction == "right") return
        direction = "left"
    }
    else if (e.key == "ArrowRight") {
        if (direction == "left") return
        direction = "right"
    }
    else if (e.key == "ArrowUp") {
        if (direction == "down") return
        direction = "up"
    }
    else if (e.key == "ArrowDown") {
        if (direction == "up") return
        direction = "down"
    }
})

document.querySelector(".restart-btn").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none"
    resetGame()
})

function drawSnake() {
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("snake")
    })
}

function updateScore() {
    document.querySelector(".score").innerHTML = score
}

function updateTime() {
    document.querySelector(".time").innerHTML = time
}

function spawnFood() {
    let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns) }
    const overlap = snake.some((segment) => {
        return segment.x == food.x && segment.y == food.y
    })
    if (overlap) {
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns) }
    }
    return food
}

function resetGame() {
    Object.values(blocks).forEach(block => {
        block.classList.remove("snake", "food")
    });

    snake = [
        { x: 1, y: 3 },
        { x: 1, y: 4 },
        { x: 1, y: 5 }
    ]
    direction = "left";
    score = 0;
    startTime = Date.now();

    food = spawnFood();
    blocks[`${food.x}-${food.y}`].classList.add("food");
    updateScore();
    updateTime();

    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(render, 350);
}

function bot() {
    if (snake[0].x < food.x) {
        if (direction == "up") return
        direction = "down"
    }
    else if (snake[0].x > food.x) {
        if (direction == "down") return
        direction = "up"
    }
    else if (snake[0].y < food.y) {
        if (direction == "left") return
        direction = "right"
    }
    else if (snake[0].y > food.y) {
        if (direction == "right") return
        direction = "left"
    }
}

botButton.addEventListener("click", () => {
    if (isBotActive) {
        isBotActive = false
        botButton.innerHTML = "Enable bot"
    }
    else if (!isBotActive) {
        isBotActive = true
        botButton.innerHTML = "Disable bot"
    }
})