//Setting up the battle zone arena
const blockSize = 10
const rows = 50
const cols = 100

// ready player 1 starting position
let player1X = blockSize * 4
let player1Y = blockSize * 24

// player 1 initial movement
let player1VelocityX = 0
let player1VelocityY = 0

// ready player 2 starting position
let player2X = blockSize * 95
let player2Y = blockSize * 24

let player2VelocityX = 0
let player2VelocityY = 0

window.onload = function() {
  arena = document.getElementById("arena");
  arena.height = rows * blockSize;
  arena.width = cols * blockSize;
  context = arena.getContext("2d"); // to draw on the screen

  document.addEventListener("keydown", P1ChangeDirection) // when player1 press the keys
  document.addEventListener("keydown", P2ChangeDirection) // when player2 press the keys
//   update()
setInterval(update, 1000/25)
}

function update() {
  context.fillStyle = "black" // arena background color
  context.fillRect(0, 0, arena.width, arena.height)

  context.fillStyle = "lightblue" // player 1 color
  player1X += player1VelocityX * blockSize
  player1Y += player1VelocityY * blockSize
  context.fillRect(player1X, player1Y, blockSize, blockSize)

  context.fillStyle = "orange" // player 2 color
  player2X += player2VelocityX * blockSize
  player2Y += player2VelocityY * blockSize
  context.fillRect(player2X, player2Y, blockSize, blockSize)
}

function P1ChangeDirection(event) {
    if(event.keyCode == 87) { 
        player1VelocityX = 0
        player1VelocityY = -1
    }
     else if (event.keyCode == 83) {
        player1VelocityX = 0
        player1VelocityY = 1
    }
    else if (event.keyCode == 65) {
        player1VelocityX = -1
        player1VelocityY = 0
    }
    else if (event.keyCode == 68) {
        player1VelocityX = 1
        player1VelocityY = 0
    }
}


function P2ChangeDirection(e) { //input direction for player 2
    if (e.code === "ArrowUp") {
        player2VelocityX = 0
        player2VelocityY = -1
    }
     else if (e.code === "ArrowDown") {
        player2VelocityX = 0
        player2VelocityY = 1
    }
    else if (e.code === "ArrowLeft") {
        player2VelocityX = -1
        player2VelocityY = 0
    }
    else if (e.code === "ArrowRight") {
        player2VelocityX = 1
        player2VelocityY = 0
    }
}