var WIDTH = 40;
var HEIGHT = 40;
//
//                                            ***** point to remember *****
//maximum nummber of box can be almost equal to [(height of container) (2*height of box) + (width of container )/ (2* width of box)]

var boxcounts = 9;
var boxs = [];

var getRandomValue = function (upperLimit, lowerLimit) {

  return Math.random() * (upperLimit - lowerLimit);
};

var viewScore = function (score) {
  this.score = score;
  var scoreTag = document.createElement("div");
  body.appendChild(scoreTag);
  scoreTag.style.display = "inlineBlock";
  scoreTag.style.fontSize = '30px';
  scoreTag.style.position = 'absolute';
  scoreTag.innerHTML = 'score:';
  scoreTag.style.background = 'blue';

};
function Container() {
  this.width = 500;
  this.height = 500;
  this.backgroundElement = null;

  this.init = function () {
    this.backgroundElement = document.createElement("div");
    this.backgroundElement.style.width = this.width + "px";
    this.backgroundElement.style.height = this.height + "px";
    this.backgroundElement.style.background = 'lightgray';
    this.backgroundElement.style.position = "relative";
    document.body.appendChild(this.backgroundElement);
    return this;
  };
}

function createBoxes(x, y, Parent) {
  var xVelocity = getRandomValue(3, -3);
  var yVelocity = getRandomValue(3, -3);
  // var score = 0;
  // var imageNumber = getRandomValue(1, 4);
  this.x = x;
  this.y = y;
  this.ant = null;
  this.init = function () {
    // this.ant = document.createElement("div");
    // this.ant.style.background = 'red';
    // this.ant.style.borderRadius = '50%';
    this.ant = document.createElement("img");
    // this.ant.setAttribute('src', './Images/ant1.png');
    // this.ant.setAttribute('src', './Images/ant2.png');
    this.ant.setAttribute('src', './Images/ant3.png');
    // this.ant.setAttribute('src', './Images/ant4.png');
    this.ant.style.background = 'transparent';
    // this.ant.setAttribute('src', './Images/ant'+imageNumber+'.png');
    this.ant.style.position = "absolute";
    this.ant.style.width = WIDTH + "px";
    this.ant.style.height = HEIGHT + "px";
    this.ant.onclick = function (eventDie) {
      var el = eventDie.target;
      Parent.removeChild(el);
      // score++;
    };
    Parent.appendChild(this.ant);
  };
  this.setPosition = function () {
    this.ant.style.left = this.x + "px";
    this.ant.style.top = this.y + "px";
  };

  this.moveBox = function () {
    if (this.x <= 0) {
      xVelocity = -xVelocity;
    }

    if (this.x + WIDTH >= 500) {
      xVelocity = -xVelocity;
    }

    if (this.y + HEIGHT >= 500) {
      yVelocity = -yVelocity;
    }
    if (this.y <= 0) {
      yVelocity = -yVelocity;
    }

    this.x += xVelocity;
    this.y += yVelocity;
  };

  this.detectCollision = function (i) {

    for (var j = 0; j < boxcounts; j++) {
      if (j != i) {
        var distanceX = boxs[i].x - boxs[j].x;
        var distanceY = boxs[i].y - boxs[j].y;
        var distance = Math.sqrt(
          Math.pow(distanceX, 2) + Math.pow(distanceY, 2)
        );
        if (distance <= WIDTH) {
          if (distanceX <= WIDTH) {
            xVelocity = -xVelocity;
            this.x += xVelocity;
          }
          if (distanceY <= WIDTH) {
            yVelocity = -yVelocity;
            this.y += yVelocity;
          }
        }
      }
    }
  };
}

function Animator(parentElem) {
  this.parentElem = parentElem;
  this.init = function () {
    for (var i = 1; i <= boxcounts; i++) {
      var box = new createBoxes(
        Math.ceil(Math.random() * (500 - WIDTH)),
        Math.ceil(Math.random() * (500 - HEIGHT)),
        this.parentElem
      );
      boxs.push(box);
      box.init();
      box.setPosition();
    }
  };
  setInterval(function () {
    for (var i = 0; i < boxcounts; i++) {
      boxs[i].moveBox();
      boxs[i].setPosition();
      boxs[i].detectCollision(i);
    }
  }, 17);
}

var parent = new Container().init();
//we can create the container width and height as our need for that we need to pass height and width as parameter in above function and receive it on calling part

new Animator(parent.backgroundElement).init();
//sending another paramater on animator we van control the setinterval time also
//for example: Animator(parameter1,paramater2) and receive this on set interval with a name 
//
//
//
//
//                         ****** fun part *******
//
//
//       make height and width of box 5x5 make the number of box 1000 or 2000 and make the size of container 1350x650
//      enable line number of code 49 50 51 and disable line no. 52 53 54 55 56 57 58 
//      you will get beautiful pattern ^_^
//
//
//
//
//               *****PRABESH GOULI // prabesh7@gmail.com ***** 