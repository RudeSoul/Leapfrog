class BallAnim{
    constructor(context, ballCount, radius){
      this.context = context;
      this.ballCount = ballCount;    
      this.maxCircleRadius = radius; 
      this.ballVGap = 15;
      this.ballHGap = 20;
      this.amplitude = 30;
      this.frequency = 3
      this.topPad = 250;
      this.leftPad = 80;
    }

    gradColor = function (){
        return `yellow` ;
    }

    update = function (colInd, vShift) {
        
        var xPos = colInd * this.ballHGap + this.leftPad;
        var colIndShift = this.frequency * (colInd * Math.PI) / this.amplitude;    
        for(var ballInd = 0; ballInd < this.ballCount; ballInd++){ 
            var yPos =  this.topPad + ballInd * this.ballVGap +  Math.sin(vShift + colIndShift) * this.amplitude;
            var changeSize = (Math.cos(vShift - (ballInd * 0.1) + colIndShift) + 1)/2;        
            var radius = changeSize * this.maxCircleRadius;
            
            this.draw(xPos, yPos, radius, this.gradColor());
        }
    }
    
    draw = function(xPos, yPos, radius, color){     
        this.context.beginPath();
        this.context.arc(xPos, yPos, radius, 0, Math.PI * 2, false);
        this.context.fillStyle = color;
        this.context.fill();
        this.context.closePath();
      }      
  
  }
  

class Helix {
    constructor(ballCount, colCount, velocity, canvas, ballRadius) {
        this.canvas = canvas;
        this.context = this.canvas.getContext('2d')
        this.colCount = colCount;
        this.velocity = velocity;
        this.ballCount = ballCount;
        this.ballRadius = ballRadius
        this.ballAnimList = []
        this.time = 0
    }

    init = function() {
        this.createBallAnims()
        return this;
    }

    generateBallAnim = function () {
        var balls = new BallAnim(this.context, this.ballCount, this.ballRadius)
        this.ballAnimList.push(balls)
    }

    createBallAnims = function (){
        this.generateBallAnim()
        this.generateBallAnim()
    }

    update = function (){
        this.time++
        this.ballAnimList.map((balls, i) => {
            var speed = this.time * this.velocity
            var vShiftSpeed = speed + i * Math.PI;
            for (var j = 0; j < this.colCount; j++) {
                balls.update(j, vShiftSpeed)
            }
        })
    }

    run = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.update()
        window.requestAnimationFrame(this.run)
    }
}

var helixCanvas = document.getElementById('helix-canvas');
var container = document.getElementsByClassName('container')[0];
container.style.backgroundColor = 'black';

var colCount = 60;
var ballCount = 10;
var speed = 0.05;
var ballRadius = 10;
var helix = new Helix(ballCount, colCount, speed, helixCanvas, ballRadius).init()
helix.run();


