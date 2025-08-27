let board;          //board
let boardWidth=500;
let boardHeight=500;
let context;


let playerWidth=10;
let playerHeight=50;
let playerVelocityY=0

let player1 = {
    x: 10,
    y: boardHeight/2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
};
let player2 = {
    x: boardWidth - playerWidth - 10,
    y: boardHeight / 2,
    width: playerWidth,
    height: playerHeight,
    velocityY: playerVelocityY
};
let ballWidth=10;
let ballHeight=10;
let ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: 1,
    velocityY: 2
};
let player1Score=0;
let player2Score=0;

window.onload = function() {
    board = document.getElementById("board");
    board.width = boardWidth;
    board.height = boardHeight;
    context = board.getContext("2d");  

    document.addEventListener("keydown", movePlayer);
    document.addEventListener("keyup", stopPlayer);

    requestAnimationFrame(update);
}

function update() {
    requestAnimationFrame(update);

    context.clearRect(0, 0, boardWidth, boardHeight); //clear the board

    // Player 1
    player1.y += player1.velocityY;
    if (player1.y < 0) player1.y = 0; // top bound
    if (player1.y + player1.height > boardHeight) player1.y = boardHeight - player1.height; // bottom bound

    context.fillStyle = "skyblue";
    context.fillRect(player1.x, player1.y, player1.width, player1.height);

    // Player 2
    player2.y += player2.velocityY;
    if (player2.y < 0) player2.y = 0;
    if (player2.y + player2.height > boardHeight) player2.y = boardHeight - player2.height;

    context.fillStyle = "red";
    context.fillRect(player2.x, player2.y, player2.width, player2.height);
    context.fillStyle = "white";      //ball
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    context.fillRect(ball.x, ball.y, ball.width, ball.height);   //ball touches top oe bottom of board
    if(ball.y<=0 ||(ball.y+ball.height>=boardHeight)){
    ball.velocityY *= -1;
    }
    //bounce the ball back
    if(detectCollision(ball, player1)){
        if(ball.x<=player1.x +player1.width){
            //left side of the ball touches right side of the player1
            ball.velocityX *= -1;   //flip x-direction

        }
    }

else if(detectCollision(ball, player2)){
    if(ball.x + ball.width >= player2.x){
        //right side of the ball touches left side of the player2
        ball.velocityX *= -1;   //flip x-direction
    }
}        //game over
if(ball.x<0){
    // Player 2 scores a point
    player2Score++;
    resetGame(1);
}
else if(ball.x + ball.width > boardWidth){
    // Player 1 scores a point
    player1Score++;
    resetGame(-1);
}
context.font="45px sans-serif";
context.fillText(player1Score, boardWidth/5, 45);
context.fillText(player2Score, boardWidth*4/5-45,45);
//dotted line
for(let i=0;i<boardHeight;i+=25){
    context.fillRect(boardWidth/2-10,i,5,5); //x position is boardWidth/2-10 and y is i
}
}

function movePlayer(e) {
    if (e.code === "KeyW") {
        player1.velocityY = -3;
    } else if (e.code === "KeyS") {
        player1.velocityY = 3;
    }
    if (e.code === "ArrowUp") {
        player2.velocityY = -3;
    } else if (e.code === "ArrowDown") {
        player2.velocityY = 3;
    }
}

function stopPlayer(e) {
    if (e.code === "KeyW" || e.code === "KeyS") {
        player1.velocityY = 0;
    }
    if (e.code === "ArrowUp" || e.code === "ArrowDown") {
        player2.velocityY = 0;
    }
}
function detectCollision(a,b){
    return a.x < b.x + b.width &&    //a's top left corner does not reach top right corner of b
           a.x + a.width > b.x &&     //a's top right corner passes b top left corner
           a.y < b.y + b.height &&    //a's top left corner does not reach bottom left corner of b
           a.y + a.height > b.y;      //a's bottom left corner passes b top left corner
}
function resetGame(direction){
    ball = {
    x: boardWidth / 2,
    y: boardHeight / 2,
    width: ballWidth,
    height: ballHeight,
    velocityX: direction,
    velocityY: 2
};

}