var imgs = [];
var viewingImgIndex = 0;
var avgImg;
var loadedImgsCounter;
var numOfImages = 30;
var imageLoaded;
var mouseXVal = 1;

//////////////////////////////////////////////////////////
function preload() { // preload() runs once
    loadedImgsCounter = 0;
    for(var i = 0; i < numOfImages; ++i) {
        var fileName = "assets/" + i + ".jpg";
        img = loadImage(fileName, imageLoadSuccess);    
        imgs.push(img);
    }
}

function imageLoadSuccess() {
    loadedImgsCounter++;
}

//////////////////////////////////////////////////////////
function setup() {
    createCanvas(imgs[0].width * 2, imgs[0].height);
    pixelDensity(1);
    avgImg = createGraphics(imgs[0].width, imgs[0].height);
}
//////////////////////////////////////////////////////////
function draw() {
    background(125);
    // left image
    image(imgs[viewingImgIndex], 0, 0);
    
    if(loadedImgsCounter == numOfImages) {
        for(var i = 0; i < imgs.length; ++i) {
            imgs[i].loadPixels();
        }
        avgImg.loadPixels();
        mouseXVal = map(mouseX, 0, width, 0, 1);
        
        for(var x = 0; x < avgImg.width; ++x) {
            for(var y = 0; y < avgImg.height; ++y){
                var pixelIndex = ((avgImg.width * y) + x) * 4;
                var sumR = 0;
                var sumG = 0;
                var sumB = 0;

                for(var i = 0; i < imgs.length; ++i){
                    var img = imgs[i];
                    sumR += img.pixels[pixelIndex + 0];
                    sumG += img.pixels[pixelIndex + 1];
                    sumB += img.pixels[pixelIndex + 2];
                }

                avgImg.pixels[pixelIndex + 0] = sumR/imgs.length;
                avgImg.pixels[pixelIndex + 1] = sumG/imgs.length;
                avgImg.pixels[pixelIndex + 2] = sumB/imgs.length;
                avgImg.pixels[pixelIndex + 3] = 255;
                
                var lerpR = lerp(imgs[viewingImgIndex].pixels[pixelIndex+0], avgImg.pixels[pixelIndex + 0], mouseXVal);
                var lerpG = lerp(imgs[viewingImgIndex].pixels[pixelIndex+1], avgImg.pixels[pixelIndex + 1], mouseXVal);
                var lerpB = lerp(imgs[viewingImgIndex].pixels[pixelIndex+2], avgImg.pixels[pixelIndex + 2], mouseXVal);

                avgImg.pixels[pixelIndex + 0] = lerpR;
                avgImg.pixels[pixelIndex + 1] = lerpG;
                avgImg.pixels[pixelIndex + 2] = lerpB;
                avgImg.pixels[pixelIndex + 3] = 255;
            }
        }
        avgImg.updatePixels();
    }
    // right image
    image(avgImg, imgs[0].width, 0);
    noLoop();
    
    textSize(16);
    fill(0, 0, 255);
    text('r - random img', 10, imgs[0].height - 50);
    text('left_arrow - previous img', 10, imgs[0].height - 30);
    text('right_arrow - next img', 10, imgs[0].height - 10);
}

function keyPressed() {
    // press left arrow key to go to previous image
    if (keyCode === LEFT_ARROW) {
        viewingImgIndex--;
        if(viewingImgIndex < 0){
            viewingImgIndex = 29;
        }
        redraw();
    } 
    // press right arrow key to go to next image
    if (keyCode === RIGHT_ARROW) {
        viewingImgIndex++;
        if(viewingImgIndex > 29){
            viewingImgIndex = 0;
        }
        redraw();
    }
    // press r key for a random image
    if (key === 'r'){
        viewingImgIndex = int(random(0, 29));
        redraw();
    }
    // stops any default behaviour
    return false; 
}

function mouseMoved() {
    // remap mouseX value and redraw
    // may suffer from frame drops but works
    mouseXVal = map(mouseX, 0, width, 0, 1);
    redraw();
}