var confLocs = [];
var confTheta = [];
var heightSlider;

function preload(){
    img = loadImage('assets/rocks.jpg'); 
}

function setup() {
    createCanvas(900, 800, WEBGL);
    angleMode(DEGREES);
    
    heightSlider = createSlider(150,  500, 300);
    heightSlider.position(10, height - 50);
    
    for(var i = 0; i <= 200; ++i){
        var randX = random(-500, 500);
        var randY = random(-800, 0);
        var randZ = random(-500, 500);
        
        let newVector = createVector(randX, randY, randZ);
        let newAngle = random(0, 360);
        confLocs[i] = newVector;
        confTheta[i] = newAngle;
    }
}

function draw() {
    background(125);
    stroke(0);
    strokeWeight(2);
    //normalMaterial();
    for(var x = -400; x <= 400; x+=50){
        for(var z = -400; z <= 400; z+=50){
            push();
            ambientMaterial(0, 0, 255);
            pointLight(0, 0, 255, 0, -200 - heightSlider.value(), 100);
            translate(x, 0, z);
            var distance = dist(x, 0, z, 0, 0, 0);
            //sin(distance + frameCount)
            //mouseX/200
            var sinNoise = noise(500, 1, sin(distance + frameCount) * 2);
            var length = map(sinNoise, 0, 1, 100, heightSlider.value());
            box(50, length, 50);
            pop();
        }
    }
    
    var xLoc = cos(frameCount/2) * height * 1.5;
    var zLoc = sin(frameCount/2) * height * 1.5;
    camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);
    
    confetti();
}

function confetti() {
    
    for(var j = 0; j < confLocs.length; ++j){
        push();
        texture(img);
        noStroke();
        translate(confLocs[j].x, confLocs[j].y, confLocs[j].z);
        rotateX(confTheta[j]);  //change to rotate front-wards not side
        plane(15, 15);
        confLocs[j].y++;
        confTheta[j] += 10;
        pop();
        
        if(confLocs[j].y >= 0){
            confLocs[j].y = -800;
        }
    }
}



//
//function setup() {
//    createCanvas(900, 600, WEBGL);
//    
//    noStroke();
//    buffer = createGraphics(500, 300);
//    buffer.background(255);
//    angleMode(DEGREES);   
//}

//function draw() {
////    background(0);
////    texture(img);
////    rotateY(frameCount);
////    box(300);
////    noStroke();
////    plane(500, 500);
//    
////    image(buffer, mouseX, mouseY); 
//    
//    background(125);
//    stroke(0);
//    strokeWeight(3);
//    buffer.fill(255, 0, 255);
//    buffer.noStroke();
//    buffer.ellipse(random(buffer.width), random(buffer.width), 10, 10);
//    
//    rotateY(frameCount);
//    texture(buffer);
//    
//    sphere(200, 30, 30);
////    box(200);
//}
