const canvas = document.getElementById("arena")
const context = canvas.getContext("2d")
const startBtn = document.querySelector(".start")
startBtn.addEventListener("click", restartGame)

/**
 * Declaration of global variables
 */

let speed = 15
let gridCount = 40
let gridSize = canvas.width / gridCount && canvas.height / gridCount

/**
 * Player starting x and y positions
 */
let player1X = 1 
let player1Y = 3

let player2X = 38 
let player2Y = 36

/**
 * Player stationary before start button pushed
 */
let player1VelocityX = 0
let player1VelocityY = 0

let player2VelocityX = 0
let player2VelocityY = 0

/**
 * Players trails starts with empty arrays
 */

let p1Trail = []
let p2Trail = [] 

/**
 * Player Classes
 */

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

/**
 * Function drawGame initializes game
 * it also stops when game is over
 */
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
  setTimeout(drawGame, 1000 /speed)
  
}

/**
 * Resets global variables to restart game
 */
function restartGame() {
  player1X = 1 
  player1Y = 3

  player2X = 38 
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
  let isDraw = false
  

  if (player1X === player2X && player1Y === player2Y ||
    player1X === gridCount && player2X < 0 
    ) {   
      isDraw = true
      context.fillStyle = "red"
      context.fillRect(
        player1X * gridCount,
        player1Y * gridCount,
        gridSize,
        gridSize)

      gameOver = true
      alert("Draw")   
  }


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
   
    if(!isDraw) {
      // game over when player 1 hits its own trail
      if (p1Trail[i].x === player1X && p1Trail[i].y === player1Y) {
        gameOver = true
        alert("Player 2 wins")
        break
      }
       // game over when player 2 hits player 1 trail
      if (p1Trail[i].x === player2X && p1Trail[i].y === player2Y) {
          gameOver = true
          alert("Player 1 wins")
        break
      }
    }
  }
  
  for (let i = 0; i < p2Trail.length; i++) {
    
    if(!isDraw) {
    // game over when player 2 hits its own trail
    if (p2Trail[i].x === player2X && p2Trail[i].y === player2Y) {
      gameOver = true
      alert("Player 1 wins")
      break
    }
    // game over when player 1 hits player 2 trail
    if (p2Trail[i].x === player1X && p2Trail[i].y === player1Y) {
      
        gameOver = true
        alert("Player 2 wins")
      break
    }
  }
  }
  return gameOver
}


// drawing the arena
function clearScreen() {
  context.fillStyle = "black"
  context.fillRect(0, 0, canvas.width, canvas.height)
}

// drawing player 1 head
function drawPlayer1() {
  context.fillStyle = "rgb(120, 252, 252)"
  context.fillRect(
    player1X * gridCount,
    player1Y * gridCount,
    gridSize,
    gridSize
  )

  // drawing player 1 trail
  context.fillStyle = "lightblue"
  for (let i = 0; i < p1Trail.length; i++) {
    context.fillRect(
      p1Trail[i].x * gridCount,
      p1Trail[i].y * gridCount,
      gridSize,
      gridSize
    )
  }
  p1Trail.push(new player1Trail(player1X, player1Y))
}

// drawing player 2 head
function drawPlayer2() {
  context.fillStyle = "rgb(253, 195, 137)"
  context.fillRect(
    player2X * gridCount,
    player2Y * gridCount,
    gridSize,
    gridSize
  )

  // drawing player 2 trail
  context.fillStyle = "orange"
  for (let i = 0; i < p2Trail.length; i++) {
    context.fillRect(
    p2Trail[i].x * gridCount,
    p2Trail[i].y * gridCount,
    gridSize,
    gridSize
    )
  }
  p2Trail.push(new player2Trail(player2X, player2Y))
}

document.body.addEventListener("keydown", player1KeyDown)
document.body.addEventListener("keydown", player2KeyDown)

//input direction for player 1
function player1KeyDown(event) {
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

//input direction for player 2
function player2KeyDown(e) {
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
