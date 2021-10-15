var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var hitScore;
var timeScore;
var button;
var vector;
//////////////////////////////////////////////////
function setup() {
    hitScore = 0;
    timeScore = 0;
    createCanvas(1200,800);
    spaceship = new Spaceship();
    asteroids = new AsteroidSystem();
    //location and size of earth and its atmosphere
    atmosphereLoc = new createVector(width/2, height*2.9);
    atmosphereSize = new createVector(width*3, width*3);
    earthLoc = new createVector(width/2, height*3.1);
    earthSize = new createVector(width*3, width*3);
    angleMode(DEGREES);
    
    createRestartButton();
}

//////////////////////////////////////////////////
function draw() {
    background(0);
    starSystem();
    timeScore += 1;//frameCount
    
    spaceship.run();
    asteroids.run();

    drawEarth();
    
    showScore();

    checkCollisions(spaceship, asteroids); // function that checks collision between various elements
}

//////////////////////////////////////////////////
function createRestartButton(){
    button = createButton('Try Again');
    button.position(550, 500);
    button.size(100,50);
    button.mousePressed(restartGame);
    button.hide();
}
//////////////////////////////////////////////////
function restartGame(){
    button.hide();
    setup();
    draw();
    loop();
}
/////////////////////////////////////////////////
function showScore(){
    textSize(32);
    fill(255);
    text('Time score: ' + timeScore, 800, 700);
    text('Hit Score: ' + hitScore, 825, 750); 
}
//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
    noStroke();
    //draw atmosphere
    fill(0,0,255, 50);
    ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
    //draw earth
    fill(100,255);
    ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){

    //spaceship-2-asteroid collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i < asteroids.locations.length; ++i){
        if(isInside(spaceship.location, spaceship.size, asteroids.locations[i], asteroids.diams[i])){
            gameOver();
        }
    }
    //spaceship-2-asteroid collisions-end
    //asteroid-2-earth collisions
    //YOUR CODE HERE (2-3 lines approx)
    for(var i = 0; i < asteroids.locations.length; ++i){
        if(isInside(asteroids.locations[i], asteroids.diams[i], earthLoc, earthSize.x)){
            gameOver();
        }  
    }
    //asteroid-2-earth collisions-end
    //spaceship-2-earth
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)){
        gameOver(); 
    }
    //spaceship-2-earth-end
    //spaceship-2-atmosphere
    //YOUR CODE HERE (1-2 lines approx)
    if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)){
        spaceship.setNearEarth();
    }
    //spaceship-2-atmosphere-end
    //bullet collisions
    //YOUR CODE HERE (3-4 lines approx)
    for(var j = 0; j < spaceship.bulletSys.bullets.length; ++j){
        for(var i = 0; i < asteroids.locations.length; ++i){
            if(isInside(asteroids.locations[i], asteroids.diams[i], spaceship.bulletSys.bullets[j].vector, spaceship.bulletSys.diam)){
                asteroids.destroy(i);
                hitScore+= 10;
                spaceship.bulletSys.bullets.splice(j, 1);
                j--;
                break;
            }    
        }  
    }
    //bullet collisions-end
    //asteroid-2-atmosphere-calcGravity
    for(var i = 0; i < asteroids.locations.length; ++i){
        if(isInside(asteroids.locations[i], asteroids.diams[i], atmosphereLoc, atmosphereSize.x)){
            console.log("danger");
            asteroids.calcGravity(earthSize, i);    
        }
    }
    //asteroid-2-atmosphere-calcGravity-end
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, diamA, locB, diamB){
    // YOUR CODE HERE (3-5 lines approx)
    if(dist(locA.x, locA.y, locB.x, locB.y) < (diamA/2) + (diamB/2)){
        return true;
    } 
    return false;
} 

//////////////////////////////////////////////////
function keyPressed(){
    if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
        spaceship.fire();
    }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
    button.show();
    //game over and display total score
    push();
    fill(255);
    textSize(80);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    textSize(42);
    translate(0, 50);
    text("Total Score: " + (timeScore + hitScore), width/2, height/2);
    pop();
    noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function starSystem(){
    push();
    while (starLocs.length<300){
        starLocs.push(new createVector(random(width), random(height)));
    }
    fill(255);
    for (var i=0; i<starLocs.length; i++){
        rect(starLocs[i].x, starLocs[i].y,random(1,3),random(1,3)); 
    }

    if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
    pop();
}
