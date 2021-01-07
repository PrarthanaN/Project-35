var dog, happyDog;
var database;
var foodStock, foodS;

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  dog = createSprite(250, 300);
  dog.addImage(dogImg);
  dog.scale = 0.17;
}


function draw() {  
 background(46, 139, 87);

  if (keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();

  fill("white");
  textSize(20);
  strokeWeight(3);
  stroke("black");
  text("Food Remaining: " + foodS, 30, 70);
  text("NOTE: Press the UP_ARROW key to feed the dog", 25, 30);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }else{
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  });
}