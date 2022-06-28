//Defining battle zone arena size
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

// player 2 initial movement
let player2VelocityX = 0
let player2VelocityY = 0

// both player's light cycle trails
let player1Trail = []
let player2Trail = []

// game over 
let gameOver = false

//initialise game battle with all functions
window.onload = function() {
  arena = document.getElementById("arena")
  arena.height = rows * blockSize // setting up arena
  arena.width = cols * blockSize // setting up arena
  context = arena.getContext("2d") // to draw on the screen

  document.addEventListener("keydown", P1ChangeDirection) // when player1 press the keys
  document.addEventListener("keydown", P2ChangeDirection) // when player2 press the keys
  // update()
setInterval(update, 5000)
}

function update() {
    if (gameOver) {
        // if (confirm("Press ok to restart")) { // to refresh the game
        //     window.location = '/'
        // }
        return
    }
    context.fillStyle = "black" // arena background color
    context.fillRect(0, 0, arena.width, arena.height)
    drawPlayer1()
    drawPlayer2()
    isGameOver()
    console.log(player1Trail);
}
 
  //--------player 1---------
function drawPlayer1(){
  context.fillStyle = "lightblue" // player 1 color
  player1X = player1X + player1VelocityX * blockSize
  player1Y = player1Y + player1VelocityY * blockSize
  context.fillRect(player1X, player1Y, blockSize, blockSize)


  //adding light cycle trails for player 1
  for (let i = 0; i < player1Trail.length; i++){
    context.fillRect(player1Trail[i][0], player1Trail[i][1], blockSize, blockSize)
  }
  for (let i = player1Trail.length - 1; i > 0; i--) {
    player1Trail[i] = player1Trail[i-1]
  }
  if (player1Trail.length) {
    player1Trail[0] = [player1X, player1Y]
  }
  player1Trail.push(player1X, player1Y)
}




  
//--------player 2---------
function drawPlayer2(){
  context.fillStyle = "orange" // player 2 color
  player2X = player2X + player2VelocityX * blockSize
  player2Y = player2Y + player2VelocityY * blockSize
  context.fillRect(player2X, player2Y, blockSize, blockSize)

//adding light cycle trails for player 2
  for (let i = 0; i < player2Trail.length; i++){
    context.fillRect(player2Trail[i][0], player2Trail[i][1], blockSize, blockSize)
  }
  for (let i = player2Trail.length - 1; i > 0; i--) {
    player2Trail[i] = player2Trail[i-1]
  }
  if (player2Trail.length) {
    player2Trail[0] = [player2X, player2Y]
  }
  player2Trail.push(player2X, player2Y)
}


// Game over conditions when either player hits arena wall
function isGameOver(){
if (player1X < 0 || player1X > cols*blockSize || player1Y < 0 || player1Y > rows*blockSize ) {
    gameOver = true
    alert("Game Over Player 2 wins!")
}

if (player2X < 0 || player2X > cols*blockSize || player2Y < 0 || player2Y > rows*blockSize) {
    gameOver = true
    alert("Game Over Player 1 wins!")
}
}


// Game over conditions when either player hits trails
for (let i = 0; i < player1Trail.length; i++) {
    if (player1X == player1Trail[i][0] && player1Y == player1Trail[i][1]) {
        gameOver = true
        alert("Game Over Player 2 Wins")
    }
}




// for(let i = 0; i < player1Trail.length; i++) {
//     let trail = player1Trail[i]
//     if(player1X === trail.x && player1Y === trail.y) {
//         gameOver = true
//         break
//     }
// }





function P1ChangeDirection(event) {
    if(event.keyCode == 87 && player1VelocityY != 1) { 
        player1VelocityX = 0
        player1VelocityY = -1
    }
     else if (event.keyCode == 83 && player1VelocityY != -1) {
        player1VelocityX = 0
        player1VelocityY = 1
    }
    else if (event.keyCode == 65 && player1VelocityX != 1) {
        player1VelocityX = -1
        player1VelocityY = 0
    }
    else if (event.keyCode == 68 && player1VelocityX != -1) {
        player1VelocityX = 1
        player1VelocityY = 0
    }
}


function P2ChangeDirection(e) { //input direction for player 2
    if (e.code === "ArrowUp" && player2VelocityY != 1) {
        player2VelocityX = 0
        player2VelocityY = -1
    }
     else if (e.code === "ArrowDown" && player2VelocityY != -1) {
        player2VelocityX = 0
        player2VelocityY = 1
    }
    else if (e.code === "ArrowLeft" && player2VelocityX != 1) {
        player2VelocityX = -1
        player2VelocityY = 0
    }
    else if (e.code === "ArrowRight" && player2VelocityX != -1) {
        player2VelocityX = 1
        player2VelocityY = 0
    }
}


