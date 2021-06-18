//Create variables here
var dog,happydog,database,foodS,foodStock,dogImg,feed,addFood,fedTime,lastFed,foodObj;

function preload()
{
	//load images here
  happydog=loadImage("Images/happydog.png");
  dogImg=loadImage("Images/Dog.png");
}

function setup() {
	createCanvas(500, 500);

  dog=createSprite(250,400,30,30)
  dog.addImage(dogImg);
  dog.scale=0.4;

  database=firebase.database();

  foodStock=database.ref('Food');
  foodStock.on('value',readStock);
  
  foodS=20

  feed=createButton("Feed The Dog");
  feed.position(550,80);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(550,120);
  addFood.mousePressed(addFoods);

  foodObj=new Food();

}


function draw() {  
  background(46,139,87);

  fedTime=database.ref(('feedTime'));
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  foodObj.display();

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+lastFed%12 + "PM",350,30);
  }else if(lastFed===0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed : "+lastFed + "AM",350,30);
  }


  drawSprites();
  //add styles here
  fill("white");
  strokeWeight(2);
  stroke("black");
  textSize(20);
  text("FOOD:"+foodS,190,250);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1
  }

  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.addImage(happydog);

  if(foodS>0){
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodS-1,
    feedTime:hour()
  })
}

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}