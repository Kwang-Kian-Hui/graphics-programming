var direction;
var vector;

class Bullet{
    constructor(vector, direction){
        this.vector = vector;
        this.direction = direction;
    }
}

class BulletSystem {

  constructor(){
        this.bullets = [];
        this.leftUpVelocity = new createVector(-5, -5);
        this.rightDownVelocity = new createVector(5, 5);
        this.diam = 10;
  }

  run(){
        this.move();
        this.draw();
        this.edges();
  }

  fire(x, y, direction){
        var newBullet = new Bullet(createVector(x, y), direction);
        this.bullets.push(newBullet);
  }

  //draws all bullets
  draw(){
        fill(255);
        for (var i=0; i<this.bullets.length; ++i){
            ellipse(this.bullets[i].vector.x, this.bullets[i].vector.y, this.diam, this.diam);
        }
  }

  //updates the location of all bullets
  move(){
        for (var i=0; i<this.bullets.length; i++){
            if(this.bullets[i].direction == "w"){
                this.bullets[i].vector.y += this.leftUpVelocity.y;
            }
            if(this.bullets[i].direction == "s"){
                this.bullets[i].vector.y += this.rightDownVelocity.y;
            }
            if(this.bullets[i].direction == "a"){
                this.bullets[i].vector.x += this.leftUpVelocity.x;
            }
            if(this.bullets[i].direction == "d"){
                this.bullets[i].vector.x += this.rightDownVelocity.x;
            }
        }
  }

  //check if bullets leave the screen and remove them from the array
  edges(){
        for(var i=0; i<this.bullets.length; i++){
            if(this.bullets[i].y < 0 || this.bullets[i].x < 0 || this.bullets[i].x > width){
                this.bullets.splice(i, 1);
                i--;
            }
        }
  }
}


