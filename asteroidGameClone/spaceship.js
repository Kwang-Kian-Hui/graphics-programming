var gravity;
var left;
var right;
var up;
var down;

class Spaceship {

  constructor(){
        this.velocity = new createVector(0, 0);
        this.location = new createVector(width/2, height/2);
        this.acceleration = new createVector(0, 0);
        this.maxVelocity = 5;
        this.bulletSys = new BulletSystem();
        this.size = 50;
        this.direction = 'w';
        this.engfires = [];
  }

  run(){
        this.bulletSys.run();
        this.draw();
        this.move();
        this.edges();
        this.interaction();
  }

  draw(){
        fill(125);
        this.drawSpaceShip();
        this.drawEngineFire();
  }
    
  drawSpaceShip(){ 
        if(this.direction == 'w'){
            triangle(this.location.x - this.size/2, this.location.y + this.size/2,
                   this.location.x + this.size/2, this.location.y + this.size/2,
                   this.location.x, this.location.y - this.size/2);
            rect(this.location.x + 5, this.location.y + (this.size* 11/30), 10, 20);
            rect(this.location.x - 15, this.location.y + (this.size* 11/30), 10, 20);
            
        }
      if(this.direction == 'a'){
            triangle(this.location.x + this.size/2, this.location.y + this.size/2,
                   this.location.x + this.size/2, this.location.y - this.size/2,
                   this.location.x - this.size/2, this.location.y);
            rect(this.location.x + (this.size * 11/30), this.location.y - 15, 20, 10);
            rect(this.location.x + (this.size * 11/30), this.location.y + 5, 20, 10);
        }
        if(this.direction == 's'){
            triangle(this.location.x - this.size/2, this.location.y - this.size/2,
                   this.location.x + this.size/2, this.location.y - this.size/2,
                   this.location.x, this.location.y + this.size/2);
            rect(this.location.x + 5, this.location.y - (this.size * 4/5), 10, 20);
            rect(this.location.x - 15, this.location.y - (this.size * 4/5), 10, 20);
        }
        if(this.direction == 'd'){
            triangle(this.location.x - this.size/2, this.location.y + this.size/2,
                   this.location.x - this.size/2, this.location.y - this.size/2,
                   this.location.x + this.size/2, this.location.y);
            rect(this.location.x - (this.size * 4/5), this.location.y - 15, 20, 10);
            rect(this.location.x - (this.size * 4/5), this.location.y + 5, 20, 10);
        }
  }
    
  drawEngineFire(){
        for (var i=0; i<this.engfires.length; ++i){
            fill(255,random(255),0);
            if(this.engfires[i].fireSpan == 0){
                splice(this.engfires.splice(i,1));
            }
            if(this.engfires[i].direction == 'w'){
                ellipse(this.engfires[i].fireX + 10, this.engfires[i].fireY + (this.size * 3/4), this.engfires[i].fireSize);    
                ellipse(this.engfires[i].fireX - 10, this.engfires[i].fireY + (this.size * 3/4), this.engfires[i].fireSize);    
            }
            if(this.engfires[i].direction == 'a'){
                ellipse(this.engfires[i].fireX + (this.size * 3/4), this.engfires[i].fireY + 10, this.engfires[i].fireSize);    
                ellipse(this.engfires[i].fireX + (this.size * 3/4), this.engfires[i].fireY - 10, this.engfires[i].fireSize);    
            }
            if(this.engfires[i].direction == 's'){
                ellipse(this.engfires[i].fireX + 10, this.engfires[i].fireY - (this.size * 3/4), this.engfires[i].fireSize);    
                ellipse(this.engfires[i].fireX - 10, this.engfires[i].fireY - (this.size * 3/4), this.engfires[i].fireSize);    
            }
            if(this.engfires[i].direction == 'd'){
                ellipse(this.engfires[i].fireX - (this.size * 3/4), this.engfires[i].fireY + 10, this.engfires[i].fireSize);    
                ellipse(this.engfires[i].fireX - (this.size * 3/4), this.engfires[i].fireY - 10, this.engfires[i].fireSize);    
            }
            this.engfires[i].fireSpan--;
        }
  }

  move(){
        // YOUR CODE HERE (4 lines)
        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
        this.velocity.limit(this.maxVelocity);
  }

  applyForce(f){
        this.acceleration.add(f);
  }

  interaction(){
        if (keyIsDown(LEFT_ARROW)){
            this.applyForce(createVector(-0.1, 0));
            this.direction = 'a';
        }
        if (keyIsDown(RIGHT_ARROW)){
            this.applyForce(createVector(0.1, 0));
            this.direction = 'd';
        }
        if (keyIsDown(UP_ARROW)){
            this.applyForce(createVector(0, -0.1));
            this.direction = 'w';
        }
        if (keyIsDown(DOWN_ARROW)){
            this.applyForce(createVector(0, 0.1));
            this.direction = 's';
        }
        var engfire = new EngFire(this.direction, this.location);
        this.engfires.push(engfire);
  }

  fire(){
        this.bulletSys.fire(this.location.x, this.location.y, this.direction);
  }

  edges(){
        if (this.location.x<0) this.location.x=width;
        else if (this.location.x>width) this.location.x = 0;
        else if (this.location.y<0) this.location.y = height;
        else if (this.location.y>height) this.location.y = 0;
  }

  setNearEarth(){
        //YOUR CODE HERE (6 lines approx)
        this.applyForce(createVector(0, 0.05));
        var friction = this.velocity.copy();
        friction.mult(-1/30);
        this.applyForce(friction);
  }
}

class EngFire{
    constructor(direction, location){
        this.fireX = location.x;
        this.fireY = location.y;
        this.fireSize = random(10,20);
        this.fireSpan = 2;
        this.direction = direction;
    }
}