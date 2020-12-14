var edges;
var ball,playerPaddle,computerPaddle
var gameState,compScore,playerScore

function setup(){
  //create the ball, playerPaddle and computerPaddle as sprite   object
  
  ball = createSprite(200,200,10,10);

  playerPaddle = createSprite(360,200,10,70);

  computerPaddle = createSprite(30,200,10,70);


//variable to store different state of game
  gameState = "serve";

//variables to keep the score
  compScore = 0;
  playerScore = 0;

}

function draw() {
  //clear the screen
  background("white");
  
  
  

  


  
  //place info ext in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  //computerPaddle.y = ball.y;
  
  if(keyWentDown("up")){
    computerPaddle.velocityY = -3;
  }
  
  if(keyWentUp("up")){
    computerPaddle.velocityY = 0;
  }
  
  if(keyWentDown("down")){
    computerPaddle.velocityY =  3;
  }  
  
  if(keyWentUp("down")){
    computerPaddle.velocityY = 0;
  }
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
  
 
  
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  edges = createEdgeSprites();
  
 
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  computerPaddle.bounceOff(edges);
  computerPaddle.y = ball.y
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}
