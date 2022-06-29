const canvas = document.getElementById("arena")
const context = canvas.getContext("2d")
const startBtn = document.querySelector(".start")
startBtn.addEventListener("click", startGame)

let speed = 10
let gridCount = 40
let gridSize = canvas.width / gridCount && canvas.height / gridCount

let player1X = 1 // player 1 starting position
let player1Y = 3

let player2X = 38 // player 2 starting position
let player2Y = 36

let player1VelocityX = 0
let player1VelocityY = 0

let player2VelocityX = 0
let player2VelocityY = 0

let p1Trail = []
let p2Trail = []

class player1Trail {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

class player2Trail {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

let player1Lives = 5
let player2Lives = 5

// game loop
function drawGame() {
  changeP1Direction()
  changeP2Direction()
  let result = isGameOver()
  if (result) {
    return
  }
  clearScreen()
  drawPlayer1()
  drawPlayer2()
  setTimeout(drawGame, 1000 / speed)
  setTimeout(bothDie, 100)
}

function startGame() {
  player1X = 1 // player 1 starting position
  player1Y = 3

  player2X = 38 // player 2 starting position
  player2Y = 36

  p1Trail = []
  p2Trail = []

  player1VelocityX = 1
  player2VelocityX = -1
  player1VelocityY = 0
  player2VelocityY = 0
  drawGame()
}

function changeP1Direction() {
  player1X = player1X + player1VelocityX
  player1Y = player1Y + player1VelocityY
}

function changeP2Direction() {
  player2X = player2X + player2VelocityX
  player2Y = player2Y + player2VelocityY
}

function isGameOver() {
  let gameOver = false

  // prevents game over during start of game
  if (player1VelocityX === 0 && player1VelocityY === 0) {
    return false
  }

  if (player2VelocityX === 0 && player2VelocityY === 0) {
    return false
  }

  // game over when player 1 hits wall
  if (
    player1X < 0 ||
    player1X === gridCount ||
    player1Y < 0 ||
    player1Y === gridCount
  ) {
    gameOver = true
    alert("Player 2 wins")
  }

  // game over when player 2 hits wall
  if (
    player2X < 0 ||
    player2X === gridCount ||
    player2Y < 0 ||
    player2Y === gridCount
  ) {
    gameOver = true
    alert("Player 1 wins")
  }

  for (let i = 0; i < p1Trail.length; i++) {
    let trail1 = p1Trail[i]
    // game over when player 1 hits its own trail
    if (trail1.x === player1X && trail1.y === player1Y) {
      gameOver = true
      alert("Player 2 wins")
      break
    }
    // game over when player 2 hits player 1 trail
    if (trail1.x === player2X && trail1.y === player2Y) {
      gameOver = true
      alert("Player 1 wins")
      break
    }
  }
  
  for (let i = 0; i < p2Trail.length; i++) {
    let trail2 = p2Trail[i]
    // game over when player 2 hits its own trail
    if (trail2.x === player2X && trail2.y === player2Y) {
      gameOver = true
      alert("Player 1 wins")
      break
    }
    // game over when player 1 hits player 2 trail
    if (trail2.x === player1X && trail2.y === player1Y) {
      gameOver = true
      alert("Player 2 wins")
      break
    }
  }
  return gameOver
}

function bothDie () {
    if (player1X === player2X && player1Y === player2Y) {
        gameOver = true
        alert("Draw")
        
      }
      return
}

function clearScreen() {
  // drawing the arena
  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)
}

function drawPlayer1() {
  // drawing the player 1
  context.fillStyle = "red"
  context.fillRect(
    player1X * gridCount,
    player1Y * gridCount,
    gridSize,
    gridSize
  )

  // drawing player 1 trail
  context.fillStyle = "lightblue"
  for (let i = 0; i < p1Trail.length; i++) {
    let trail1 = p1Trail[i]
    context.fillRect(
      trail1.x * gridCount,
      trail1.y * gridCount,
      gridSize,
      gridSize
    )
  }
  p1Trail.push(new player1Trail(player1X, player1Y))
}

function drawPlayer2() {
  // drawing the player 2
  context.fillStyle = "purple"
  context.fillRect(
    player2X * gridCount,
    player2Y * gridCount,
    gridSize,
    gridSize
  )

  // drawing player 2 trail
  context.fillStyle = "orange"
  for (let i = 0; i < p2Trail.length; i++) {
    let trail2 = p2Trail[i]
    context.fillRect(
      trail2.x * gridCount,
      trail2.y * gridCount,
      gridSize,
      gridSize
    )
  }
  p2Trail.push(new player2Trail(player2X, player2Y))
}

document.body.addEventListener("keydown", player1KeyDown)
document.body.addEventListener("keydown", player2KeyDown)

function player1KeyDown(event) {
  //input direction for player 1
  if (event.keyCode == 87 && player1VelocityY != 1) {
    player1VelocityX = 0
    player1VelocityY = -1
  } else if (event.keyCode == 83 && player1VelocityY != -1) {
    player1VelocityX = 0
    player1VelocityY = 1
  } else if (event.keyCode == 65 && player1VelocityX != 1) {
    player1VelocityX = -1
    player1VelocityY = 0
  } else if (event.keyCode == 68 && player1VelocityX != -1) {
    player1VelocityX = 1
    player1VelocityY = 0
  }
}

function player2KeyDown(e) {
  //input direction for player 2
  if (e.code === "ArrowUp" && player2VelocityY != 1) {
    player2VelocityX = 0
    player2VelocityY = -1
  } else if (e.code === "ArrowDown" && player2VelocityY != -1) {
    player2VelocityX = 0
    player2VelocityY = 1
  } else if (e.code === "ArrowLeft" && player2VelocityX != 1) {
    player2VelocityX = -1
    player2VelocityY = 0
  } else if (e.code === "ArrowRight" && player2VelocityX != -1) {
    player2VelocityX = 1
    player2VelocityY = 0
  }
}

drawGame()
