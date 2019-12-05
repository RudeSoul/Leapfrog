var helixCanvas = document.getElementById('helix-canvas');
var container = document.getElementsByClassName('container')[0];
container.style.backgroundColor = 'black';

var colCount = 60;
var ballCount = 10;
var speed = 0.05;
var ballRadius = 10;
var helix = new Helix(ballCount, colCount, speed, helixCanvas, ballRadius).init()
helix.run();
