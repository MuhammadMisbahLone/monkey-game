var PLAY=1;
var END=0;
var gameState=1;
var monkey, monkey_running;
var ground, invisibleGround, groundImage;
var banana, bananaImage;
var obstacle, obstacleImage;
var edges;
var bananaGroup;
var obstacleGroup;

var score=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
 
}
function setup() {
   createCanvas(600, 200);
  
  edges = createEdgeSprites();
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  monkey = createSprite(30,100,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  
  
  
  ground = createSprite(300,200,600,20);
 
  invisibleGround = createSprite(300,180,600,20);
  invisibleGround.visible = false;
  
  bananaGroup = createGroup();
  obstacleGroup = createGroup();
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
  
}
function draw() {
background("white");
  
   if(keyDown("space")&& monkey.y > 10) {
   monkey.velocityY = -12;
   }
  spawnBanana();
  
   if (gameState === END) {

    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    ground.destroy();
    monkey.destroy();
    text("GameOver", 200,100);
  } 
  
  monkey.velocityY = monkey.velocityY + 0.4;
  monkey.collide(edges); 
  
  if (ground.x < 300){
      ground.x = ground.width/2;
    }
 if (obstacleGroup.isTouching (monkey)) {
     gameState = END; 
  }
  if (bananaGroup.isTouching (monkey)) {
      score = score + 1;
      bananaGroup.destroyEach();
  }
  ground.velocityX = -3;
  
  drawSprites();
  text("Score: "+ score, 500,50);
}

 
    
    function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var banana = createSprite(600,80,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    bananaGroup.add(banana);
    obstacle = createSprite(600,180,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1;
    obstacleGroup.add(obstacle);
  }
    }   
  






  