var hotair;
var position
var database
function preload() {
  imagean=loadAnimation("images/02.png","images/03.png","images/04.png") 
  bag=loadImage("images/bg.png") 
}
function setup(){
    database=firebase.database();
    console.log(database);
    createCanvas(500,500);
    hotair = createSprite(250,250,10,10);
    hotair.addAnimation("hot",imagean)
    hotair.scale=0.5 
    var ballPosition=database.ref("hotair/position");
    ballPosition.on("value",readPosition,showError);

}

function draw(){
    background(bag);
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
        
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }


    drawSprites();
}

function writePosition(x,y){
    database.ref("hotair/position").set({
    "x" : position.x + x,
    "y" : position.y + y
    })
}
function readPosition(data){
    position=data.val()
    console.log(position.x)
    hotair.x=position.x;
    hotair.y=position.y;
}
function showError(){
    console.log("error")
}