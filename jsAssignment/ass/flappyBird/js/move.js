document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);

function moveUp() {
    bY -= 55;
    ctx.drawImage(flappyBirdUp, bX, bY);
    fly.play();
}
