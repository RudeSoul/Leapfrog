function draw() {

    ctx.drawImage(bg, 0, 0);


    for (var i = 0; i < pipe.length; i++) {

        constant = pipeDown.height + gap;
        ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y + constant);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeDown.height) - pipeDown.height
            });
        }

        // detect collision

        if (bX + flappyBird.width >= pipe[i].x && bX <= pipe[i].x + pipeDown.width && (bY <= pipe[i].y + pipeDown.height || bY + flappyBird.height >= pipe[i].y + constant) || bY + flappyBird.height >= cvs.height - fg.height) {
            // var reloadWrapper = document.getElementById("wrapper");
            // reloadWrapper.style.backgroundImage = "url('../images/gameover.png')";
            // reloadWrapper.addEventListener("click", reload);
            // var reload = function(){

            location.reload();
            // } 
        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(flappyBird, bX, bY);





    bY += gravity;

    if (score > highscore) {
        highscore = score;
}
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    localStorage.setItem("highScore", highscore);
    ctx.fillText("Score : " + score, 10, cvs.height - 30);
    ctx.fillText("HighScore : " + highscore, 10, cvs.height - 10);

    requestAnimationFrame(draw);

}
// document.getElementById("wrapper").addEventListener("click", draw);
draw();

