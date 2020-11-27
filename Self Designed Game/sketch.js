var backgroundImage;
var player;
var player_running;
var ground,groundImage;
var obstacle1,obstacle1Img;
var invisibleGround;
var obstaclesGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var backGround;

function preload() {
  backgroundImage=loadImage("background.jpg");
  player_running=loadAnimation("images/player1.png","images/player2.png","images/player3.png","images/player4.png","images/player5.png"
  ,"images/player6.png","images/player7.png","images/player8.png","images/player9.png","images/player10.png","images/player11.png",
  "images/player12.png");
  groundImage=loadImage("images/ground.png");
  obstacle1Img=loadImage("images/cactus.png");

  jumpSound=loadSound("sounds/jump.mp3");
}

function setup() {
  createCanvas(800,400);

  backGround=createSprite(400,200,800,400);
  backGround.addImage(backgroundImage);

  ground=createSprite(400,450,800,100);
  ground.addImage(groundImage);
  ground.scale=0.3;
  
  ground.x=400;

  invisibleGround=createSprite(400,380,800,20);
  invisibleGround.visible=false;

  player=createSprite(400, 300, 50, 50);
  player.addAnimation("running",player_running);
  player.x=100;

  obstaclesGroup= new Group();

  //obstacle1=createSprite()
}

function draw() {
  
  background(0)

  

  if(gameState===PLAY){
    ground.velocityX=-5;

    score=score + Math.round(getFrameRate()/45);

    //create a infinity ground
    if(ground.x<200){
      ground.x = 400;
    }

    //move the player
    if(keyDown("RIGHT_ARROW")){
      player.x=player.x+10;
    }

    if(keyDown("space") && player.y>200){
      player.velocityY=-10;
    }

    player.velocityY=player.velocityY+0.8;

    spawnObstacles();

    if(player.isTouching(obstaclesGroup)){
      gameState=END;
    }

  }else if(gameState===END){
    ground.velocityX=0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }

  

  player.collide(invisibleGround);

  
  
  drawSprites();
  textSize(30);
  fill("white")
  text("Score: "+score ,650,50);
  
}

function spawnObstacles(){
  if(frameCount % 200===0){
    obstacle1=createSprite(800,320,50,50);
    obstacle1.addImage(obstacle1Img);
    obstacle1.scale=0.5;
    obstacle1.velocityX=-(5+score/50);
    obstacle1.lifetime=200;

    obstaclesGroup.add(obstacle1);
  }
  
}