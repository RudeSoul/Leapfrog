var points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 }
];

var view = document.getElementById("main");
view.style.height = "500px";
view.style.width = "500px";
view.style.background = "#d1b569";

var canvas = document.createElement("canvas");
document.getElementById("main").appendChild(canvas);

var ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";

points.forEach(function(val) {
  ctx.fillRect(val.x, val.y, 5, 5);
});
