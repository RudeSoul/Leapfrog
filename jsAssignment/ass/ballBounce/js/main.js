var view = document.getElementById("main");
view.style.height = "500px";
view.style.width = "500px";
view.style.marginLeft = "30%";
view.style.marginTop = "100px";
view.style.background = "#d1b569";

var canvas = document.createElement("canvas");
document.getElementById("main").appendChild(canvas);
canvas.width = "500";
canvas.height = "500";
var create = canvas.getContext("2d");
yAxix = 25;
var speed = 1;
var radius = 25;

setInterval(function() {
  if (yAxix >= canvas.height - radius) {
    speed = -1;
  } else if (yAxix <= radius) {
    speed = 1;
  }
  yAxix = yAxix + speed;
  create.clearRect(0, 0, canvas.height, canvas.width);
  create.beginPath();
  create.arc(250, yAxix, radius, 0, 2 * Math.PI);
  create.stroke();
  create.fillStyle = "blue";
  create.fill();
}, 5);
