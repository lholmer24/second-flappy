// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(950, 450, Phaser.AUTO, 'game', stateActions);
var player;
var score = 0;
var labelScore;
var pipes = [];
var highscore = 0;
var rotation = 0;
//set variables for the game


//Loads all resources for the game and gives them names.
function preload() {
    game.load.image("backgroundImg", "../assets/bg2.jpg");
    game.load.image("flappy", "../assets/flappy-cropped.png");
    game.load.image("pipeBlock","../assets/pipe2-body.png");
    game.load.image("pipeEnd","../assets/pipe2-end.png");

}

//Initialises the game. This function is only called once.

function create() {
    var backgroundSprite = game.add.tileSprite(0, 0, 950, 450, "backgroundImg");
    backgroundSprite.autoScroll( -100, 0);

    //add the background
    player = game.add.sprite(40, 20, "flappy");
    //add the bird

    labelScore = game.add.text(20, 20, "0");
    //add the score
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //start physics
    game.physics.arcade.enable(player);
    //add physics to the player
    splashDisplay = game.add.text(200,200, "Press ENTER to start, SPACEBAR to jump");

    //create a loop to generate pipes on the timer
    player.anchor.setTo(0.5, 0.5);
    game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);

}

//This function updates the scene. It is called for every new frame.
function start(){
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(function(){player.body.velocity.y = -220});
      //cause the player to jump
  //take input
  player.body.gravity.y = 350;
  //add gravity
  generatePipe();
  //generate the pipes
  var pipeInterval = 1.5 * Phaser.Timer.SECOND;
  //set a timer
  game.time.events.loop(pipeInterval, generatePipe);
  splashDisplay.destroy();

  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.remove(start);
}


function update() {


  player.rotation = Math.atan(player.body.velocity.y / 200);

  player.angle += rotation;

  for(var i = pipes.length - 1; i >= 0; i--) {
      if(pipes[i].body.x < -52){
        pipes[i].destroy();
        pipes.splice(i, 1);
      }
  }

  game.physics.arcade.overlap(player, pipes, gameOver);
  //detect collision

  if(player.y > 450){
      gameOver()
  //detect falling down the bottom
  }

  else if(player.y < -50){
    gameOver()
  //detect flying to high
  }

}


function changeScore() {
    score++;
    labelScore.setText("Score = " + score.toString());
    //increment the score and update the counter
}



function generatePipe() {
    var gaplength = game.rnd.integerInRange(100, 350);
    var gapStart = game.rnd.integerInRange(25, 375 - gaplength);
    //select where the gap starts
    for(var i=0; i<425; i++){
        if(i + 24 < gapStart || i > gapStart + gaplength - 1){
            addPipeBlock(950, i);

        }
    }
    addPipeTop(948, gapStart - 12);
    addPipeBottom(948, gapStart + gaplength);
    //loop for the creation of the pipe, calls the functions
    changeScore();
}

function addPipeBlock(x, y) {
    // create a new pipe block
    var block = game.add.sprite(x,y,"pipeBlock");
    // insert it in the 'pipes' array
    pipes.push(block);
    game.physics.arcade.enable(block);
    block.body.velocity.x = -200;
    //enable physics and move the pipe
}

function addPipeTop(x, y) {
    // create a new pipe block
    var pipeTop = game.add.sprite(x, y, "pipeEnd");
    // insert it in the 'pipes' array
    pipes.push(pipeTop);
    game.physics.arcade.enable(pipeTop);
    pipeTop.body.velocity.x = -200;
    //enable physics and move the pipe
}

function addPipeBottom(x, y) {
    // create a new pipe block
    var pipeBottom = game.add.sprite(x, y, "pipeEnd");
    // insert it in the 'pipes' array
    pipes.push(pipeBottom);
    game.physics.arcade.enable(pipeBottom);
    pipeBottom.body.velocity.x = -200;
    //enable physics and move the pipe
}

function gameOver(){
    game.state.restart();
    if(score > highscore){
        highscore = score;
    }
    registerScore(highscore);
    score = 0;
    if(mostRecent == 1){
      jQuery("#content").empty();
      jQuery("#content").append(
      "<div>" + "Highscore: " + highscore + "</div>"
      );
    }
    //reset the game when the loss function is called
}
