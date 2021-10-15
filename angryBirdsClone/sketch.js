// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;
var Composites = Matter.Composites;

var engine;
var propeller;
var boxes = []; 
var birds = [];
var birdBombTimer = [];
var explosions = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle;
var angleSpeed;
var canvas;
var box;
var secLapse;

var birdCounter;
var bombCounter;
var startTime;
////////////////////////////////////////////////////////////
function setup() {
    angle=0;
    angleSpeed=0;
    bombCounter = 5;
    birdCounter = 10;
    startTime = new Date().getTime();
    
    canvas = createCanvas(1000, 600);
    
    engine = Engine.create();  // create an engine

    setupGround();

    setupPropeller();

    setupTower();

    setupSlingshot();

    setupMouseInteraction();
    
    createRestartButton();
}
////////////////////////////////////////////////////////////
function draw() {
    background(0, 234, 199);
    
    //sling
    push();
    fill(80, 50, 0);
    rect(width/4, height/3, 20, height * 2/3, 10);
    pop();
    //end-sling
    
    displayTimer();
    
    Engine.update(engine);

    drawGround();

    drawPropeller();

    drawTower();

    drawBirds();

    drawSlingshot();
    
    
    if(secLapse == 60){
        gameOver();
    }
    if(stack.bodies.length == 0){
        gameWon();
    }
}
////////////////////////////////////////////////////////////
function displayTimer(){
    push();
    var now = new Date().getTime();
    var diff = now - startTime;
    secLapse = Math.floor(diff%(1000*61)/1000);
    fill(0);
    textAlign(LEFT, TOP);
    textSize(30);
    text("Time left: " + (60 - secLapse), 50, 20);
    fill(255);
    for(var i = 0; i < birdCounter; ++i){
        circle(65 + (i * 32), 80, 30);
    }
    fill(0);
    circle(60, 120, 20);
    fill(255);
    textSize(20);
    text("x " + bombCounter, 75, 110);
    pop();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
    if (keyCode == LEFT_ARROW){
        //your code here
        angleSpeed += 0.01;
    }
    else if (keyCode == RIGHT_ARROW){
        //your code here
        angleSpeed -= 0.01;
    }
}
////////////////////////////////////////////////////////////
function keyTyped(){
    //if 'b' create a new bird to use with propeller
    if (key==='b'){
        if(bombCounter != 0){
            setupBird();    
            bombCounter--;
        }
    }

    //if 'r' reset the slingshot
    if (key==='r'){
        if(birdCounter != 0){
            removeFromWorld(slingshotBird);
            removeFromWorld(slingshotConstraint);
            setupSlingshot();
            birdCounter--;   
        }
    }
}
////////////////////////////////////////////////////////////
function createRestartButton(){
    button = createButton('Play Again');
    button.position(width/2 - 50, height * 3/5);
    button.size(100,50);
    button.mousePressed(restartGame);
    button.hide();
}
////////////////////////////////////////////////////////////
function restartGame(){
    button.hide();
    birds = [];
    boxes = [];
    stack = null;
    setup();
    draw();
    loop();
}
////////////////////////////////////////////////////////////
function startCounter(){
    loop();
    noLoop();
    button.hide();
}
////////////////////////////////////////////////////////////
function gameOver(){
    button.show();
    //game over
    push();
    fill(0);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    pop();
    noLoop();
}
////////////////////////////////////////////////////////////
function gameWon(){
    button.show();
    //win
    push();
    fill(0);
    textSize(80);
    textAlign(CENTER);
    text("GAME WON", width/2, height/2);
    pop();
    noLoop();
}
//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
    setTimeout(() => {
        slingshotConstraint.bodyB = null;
        slingshotConstraint.pointA = { x: 0, y: 0 };
    }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
    var pos = body.position;
    return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
    World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
    beginShape();
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
    push();
    var offsetA = constraint.pointA;
    var posA = {x:0, y:0};
    if (constraint.bodyA) {
        posA = constraint.bodyA.position;
    }
    var offsetB = constraint.pointB;
    var posB = {x:0, y:0};
    if (constraint.bodyB) {
        posB = constraint.bodyB.position;
    }
    strokeWeight(5);
    stroke(255);
    line(
        posA.x + offsetA.x,
        posA.y + offsetA.y,
        posB.x + offsetB.x,
        posB.y + offsetB.y
    );
    pop();
}
