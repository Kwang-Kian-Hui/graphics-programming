////////////////////////////////////////////////////////////////
function setupGround(){
    ground = Bodies.rectangle(500, 600, 1000, 40, {
        isStatic: true, angle: 0
    });
    World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
    push();
    fill(128);
    drawVertices(ground.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
    // your code here
    propeller = Bodies.rectangle(150, 480, 200, 15, {isStatic: true, angle: angle})
    World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
    push();
    // your code here 
    Body.setAngle(propeller, angle);
    Body.setAngularVelocity(propeller, angleSpeed);
    angle += angleSpeed;
    fill(255);
    drawVertices(propeller.vertices);
    pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
    var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
        restitution: 0.95 });
    Matter.Body.setMass(bird, bird.mass*10);
    World.add(engine.world, [bird]);
    birds.push(bird);
    birdBombTimer.push(180);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
    push();
    //your code here
    for(var i = 0; i < birds.length; ++i){
        //if out of screen
        if(isOffScreen(birds[i])){
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
            
            birdBombTimer.splice(i, 1);
            i--;
        }else{
            fill(0);
            drawVertices(birds[i].vertices);   
        }
    }
    
    for(var i = 0; i < explosions.length; ++i){
        fill(255, 20, 0);
        drawVertices(explosions[i].vertices);
    }
    
    for(var i = 0; i < birdBombTimer.length; ++i){
        birdBombTimer[i]--;
        if(birdBombTimer[i] == -10){
            birdBombTimer.splice(i, 1); 
            removeFromWorld(explosions[i]);
            explosions.splice(i, 1); 
            i--;
        }
        if(birdBombTimer[i] == 0){
            var explode =  Bodies.circle(birds[i].position.x, birds[i].position.y, 80, {restitution: 0.5, density: 1});
            Matter.Body.setMass(explode, explode.mass*10000);
            explosions.push(explode);
            World.add(engine.world, [explode]);
            removeFromWorld(birds[i]);
            birds.splice(i, 1);
        }
    }
    pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
    //your code here
    stack = Composites.stack(600, 120, 3, 6, 0, 0, function(x, y){
        return Bodies.rectangle(x, y, 80, 80, {density: 0.01});  
    });
    World.add(engine.world, [stack]);
}

////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
    push();
    //your code here
    for(var i = 0; i < stack.bodies.length; ++i){
        colors.push(random(122, 255));
        fill(0, colors[i], 0);
        drawVertices(stack.bodies[i].vertices);
        
        if(isOffScreen(stack.bodies[i])){
            colors.splice(i, 1);
            stack.bodies.splice(i, 1);
            i--;
        }
    }
    
    pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
    //your code here
    slingshotBird = Bodies.circle(width/4, height/3, 25, {friction: 0, restitution: 0.95});
    Matter.Body.setMass(slingshotBird, slingshotBird.mass*10);
    slingshotConstraint = Constraint.create({
            pointA: { x: width/4, y: height/3 },
            bodyB: slingshotBird,
            pointB: { x: 0, y: 0 },
            stiffness: 0.01,
            damping: 0.0001,
          });
    World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
    push();
    // your code here
    fill(255);
    drawVertices(slingshotBird.vertices);
    drawConstraint(slingshotConstraint);
    pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
    var mouse = Mouse.create(canvas.elt);
    var mouseParams = {
        mouse: mouse,
        constraint: { stiffness: 0.05 }
    }
    mouseConstraint = MouseConstraint.create(engine, mouseParams);
    mouseConstraint.mouse.pixelRatio = pixelDensity();
    World.add(engine.world, mouseConstraint);
}
