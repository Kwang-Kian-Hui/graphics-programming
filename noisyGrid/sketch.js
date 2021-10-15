var stepSize = 20;

function setup() {
  createCanvas(500, 500);
    background(125);
    rectMode(CENTER);
}
///////////////////////////////////////////////////////////////////////
function draw() {
  background(125);

  colorGrid();
  compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid(){
  // your code here
//    for(var x=0; x<width; x++){
//        for(var y=0; y<height; y++){
//            var n = noise(x/100, y/100, frameCount/75);
//            var c = map(n, 0, 1, 0, 255);
//            stroke(c);
//            point(x, y);
//        }
//    }
    
    push();
    translate(stepSize/2, stepSize/2);
    for(var i = 0; i < 25; ++i){
        for(var j = 0; j < 25; ++j){
            var x = stepSize * j;
            var y = stepSize * i;
            var n = noise(x/500, y/500, frameCount/(mouseX/2));
            var c = map(n, 0, 1, 0.1, 0.9);
            
            noStroke();
            var n1 = noise(1, 1, frameCount/mouseX);
            var c1 = map(n1, 0, 1, 122, 255);
            var n2 = noise(2, 2, frameCount/mouseX);
            var c2 = map(n2, 0, 1, 0, 255);
            var n3 = noise(x/300, x/300, frameCount/mouseX);
            var c3 = map(n3, 0, 1, 0, 255);
            
            var from = color(c3, c2, c1);
            var to = color(c1, c2, 0);
            fill(lerpColor(from, to, c));
            rect(x, y, stepSize, stepSize);
        }
    }
    pop();
}
///////////////////////////////////////////////////////////////////////
function compassGrid(){
    // your code here
    for(var i = 0; i < 25; ++i){
        for(var j = 0; j < 25; ++j){
            push();
            var x = stepSize * j;
            var y = stepSize * i;
            var compX = stepSize/2 + (j * stepSize);  
            var compY = stepSize/2 + (i * stepSize);
            
            var n = noise(x/500, y/600, frameCount/(mouseX/2));
            var rotAngle = map(n, 0, 50, 0, 720);
            
            var lineNoise = noise(1, 1, frameCount/(mouseX/2));
            var lineNoise2 = noise(2, 2, frameCount/(mouseX/2));
            var lineNoise3 = noise(x/200, y/200, frameCount/100);
            var lineMap = map(lineNoise, 0, 1, 5, stepSize);
            var lineRColor = map(lineNoise, 0, 1, 0, 150);
            var lineGColor = map(lineNoise2, 0, 1, 0, 40);
            var lineBColor = map(lineNoise3, 0, 1, 0, 180);
            
            stroke(lineRColor, lineGColor, lineBColor);
            translate(compX, compY);
            rotate(-rotAngle);
            line(0, lineMap, 0, 0);
            //line(0, stepSize, 0, 0);
            pop();
        }
    }
}
