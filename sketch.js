
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var survivalTime=0;
var gameState = "play";
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  monkey = createSprite(100,300,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;
  
  ground = createSprite(200,350,600,10);
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  
}


function draw() {
  background("white");
  if (gameState === "play"){
    survivalTime = Math.ceil(frameCount/frameRate())
    ground.velocityX = -2;
    if (ground.x < 100){
      ground.x = 200;
    }
    if(keyDown("space")){
      monkey.velocityY = -8;

    }

    monkey.velocityY = monkey.velocityY+0.5;
    monkey.collide(ground);
    //console.log(monkey.y);
    fruits();
    obstacles();
    if (obstacleGroup.isTouching(monkey)){
      gameState = "end";
    }
  }
  if (gameState === "end"){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ground.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  }
  
  drawSprites();
  textSize(20);
  fill("black");
  text("Survival Time: "+ survivalTime, 100,50);
  
}
function fruits(){
  if (frameCount%80===0){
    banana = createSprite(400,Math.round(random(120,200)),10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 100;
    banana.velocityX = -4;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if (frameCount%300===0){
    obstacle = createSprite(400,320,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.lifetime = 200;
    obstacle.velocityX = -2;
    obstacleGroup.add(obstacle);
  }
}






