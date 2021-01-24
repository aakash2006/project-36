//Create variables here
var dog,happydog,dogImg,happyDogImg,foodStock,foodS,database;
var fedTime,lastFed;
var feed, addFood;

function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000, 500);
  
  foodObj = new Food();
  
  dog = createSprite(800,240,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  feed = createButton("Feed drago");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)
    
 

}


function draw() 
{  
background(46,139,87);

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed = data.val();
})

fill(255,255,254);
textSize(15);
if(lastFed>=12)
{
  text("lastFed: "+lastFed%12 +" PM",350,30);
}else if(lastFed==0)
{
  text("lastFed: 12 AM",350,30);
}else{
  text("lastFed:"+ lastFed +"AM",350,30);
}




foodObj.display();
drawSprites();
}






function readStock(data)
{
 foodS = data.val();
 foodObj. updateFoodStock(foodS);
}

function feedDog()
{
 dog.addImage(happyDogImg);
 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   Food: foodObj.getFoodStock(),
   FeedTime: hour()
 })
}

function addFoods()
{
  foodS = foodS+1;
  database.ref('/').update({
    Food: foodS
  })
}