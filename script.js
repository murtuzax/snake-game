const board = document.querySelector(".board")

const blockWidth = 50;
const blockHeight = 50;

const columns = Math.floor(board.clientWidth / blockWidth)
const rows = Math.floor(board.clientHeight / blockHeight)

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns) }
let score = 0

const blocks = []
const snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 },
    { x: 1, y: 5 }]


let direction = "left";

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const block = document.createElement("div")
        block.classList.add("block")
        board.appendChild(block)
        blocks[`${row}-${col}`] = block
    }
}

function render() {
    console.log(snake)
    blocks[`${food.x}-${food.y}`].classList.add("food")

    let head;

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("snake")
    })


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
        window.alert("Game Over!")
        return clearInterval(intervalId)
    }

    if (food.x === head.x && food.y === head.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food")
        snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y })
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * columns) }
        score += 10
    }
    
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("snake")
    })
    
    snake.pop()
    snake.unshift(head)
    
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("snake")
    })
}

const intervalId = setInterval(() => {
    render()
}, 500)

document.addEventListener("keydown", (e) => {
    if (e.key == "ArrowLeft") {
        if(direction == "right") return
        direction = "left"
    }
    else if (e.key == "ArrowRight") {
        if(direction == "left") return
        direction = "right"
    }
    else if (e.key == "ArrowUp") {
        if(direction == "down") return
        direction = "up"
    }
    else if (e.key == "ArrowDown") {
        if(direction == "up") return
        direction = "down"
    }
})