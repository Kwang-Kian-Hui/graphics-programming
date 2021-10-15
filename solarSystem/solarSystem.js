var speed;

//objects
var sun;
var earth;
var moon;
var asteroid;
var moon2;
var rocket;

//CelesObj
var objColor;
var objSize;
var objWidth;
var objRotSpeed;
var objDist;

//Star
var stars;
var x;
var y;
var fadeVal;
var fade;
var fadeAmount;

function setup() {
    createCanvas(1000, 900);
    background(0);
    sun = new CelesObj(color(255,150,0), 200, 5, 1/3, 0);
    earth = new CelesObj(color(0, 0, 255), 80, 4, 1, 300);
    moon = new CelesObj(color(255, 255, 255), 30, 3, -2, 100); //-2 * speed = -speed * 2
    asteroid = new CelesObj(color(120, 120, 120), 20, 2, 4, 35);
    moon2 = new CelesObj(color(155, 155, 155), 25, 3, 0.8, 155);
    
    stars = [];
    fade = 0;
    fadeAmount = 1;
    for(var i = 0; i < 100; ++i){
        var tempX = random(1, width-1);
        var tempY = random(1, height-1);
        var star = new Star(tempX, tempY, random(10, 255));
        stars.push(star);
    }   
    
}

function draw() {
    background(0);
    //------stars------
    push();
    for(var i = 0; i < 100; ++i){
        stars[i].draw();
    }
    if (fade<10) fadeAmount=1; 
    if (fade>180) fadeAmount=-1; 
    fade += fadeAmount; 
    pop();
    //------stars-end------ 
    
    push();
    translate(width/2, height/2);
    
    sun.draw();
    earth.draw();
    push();
    moon.draw();
    asteroid.draw();
    pop();
    moon2.draw();
    pop();
    //------rocket------
    push();
    rotate(radians(50));
    translate(frameCount * 2 % width, frameCount % (height + 100) * -1);
    beginShape();
    vertex(100,170);
    vertex(75,55);
    vertex(75,50);
    vertex(50,170);
    vertex(20,215);
    vertex(25,215);
    vertex(55,190);
    vertex(55,195);
    vertex(95,195);
    vertex(95,190);
    vertex(125,215);
    vertex(125,215);
    vertex(100,170);
    endShape();
    pop();
    //------rocket-end------
}

function celestialObj(c, size, width){
    strokeWeight(width);
    fill(c);
    stroke(0);
    ellipse(0, 0, size, size);
    line(0, 0, size/2, 0);
}

class CelesObj{
    constructor(objColor, objSize, objWidth, objRotSpeed, objDist){
    this.objColor = objColor;
    this.objSize = objSize;
    this.objWidth = objWidth; 
    this.objRotSpeed = objRotSpeed;
    this.objDist = objDist;
  }
    
  draw(){ 
      rotate(radians(frameCount * this.objRotSpeed));
      translate(this.objDist, 0);
      celestialObj(this.objColor, this.objSize, this.objWidth);
  }
}

class Star{
    constructor(x, y, fadeVal){
        this.x = x;
        this.y = y;
        this.fadeVal = fadeVal;
    }
    
    draw(){
        fill(255, 255, 255, 255 - fade);
        ellipse(this.x, this.y, random(5,10), random(5,10));
    }
}
