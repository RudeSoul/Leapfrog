var view = document.getElementById("main");
view.style.height = "500px";
view.style.width = "500px";
view.style.background = "#d1b569";

var a = document.createElement("a");
document.getElementById("main").appendChild(a);


var velocity = 1;
var thisMargin = 10; 

setInterval(function () {
  if (thisMargin >= 460) {
    velocity = -1;
  } else if (thisMargin <= 0) {
    velocity = 1;
  }
  thisMargin = thisMargin + velocity;

  a.style.display = "inline-block";
  a.style.border = "20px solid blue";
  a.style.borderRadius = "100%";
  a.style.marginLeft = "40%";
  a.style.marginTop = thisMargin + 'px';

}, 5);

