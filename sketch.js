//Create variables here
var dog,dogImg,happyDog;
var database;
var foodS,foodStock;
var food=20;
var bg = "#575757";

function preload()
{
  //load images here
  dogImg= loadImage("images/dogImg1.png");
  happyDog= loadImage("images/dogImg2.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  createCanvas(500, 500);

  dog= createSprite(width/2,height/2);
  dog.addImage(dogImg);
  dog.scale=0.2;

}


function draw() {  
  background((bg));

  if(keyDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    food-=1;
  }

  if(keyWentDown(DOWN_ARROW)){
    dog.addImage(dogImg);
  }

  if(food<11){
    fill("#FFCB2B");
    textSize(15);
    text("Its Too Much",230,350);
  }

  if(food<1){
    bg = "#669DF6";
    fill("#FF311F")
    textSize(20);
    text("Its Too Much",360,height/2);
  }

  drawSprites();
  //add styles here
  fill("#FDA30F");
  textSize(20);
  text("Food Remaining = "+food,160,150);
  fill("#FFCB2B");
  textSize(15);
  text("PRESS UP ARROW TO FEED MILK TO THE DOG",80,80);
  text("PRESS DOWN ARROW FOR THE NORMAL POSITION",60,100);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  database.ref('/').update({
    Food:x
  })
}