function DisplayScoreAndInfo(highScore, score) {
    // set values in dom
    document.getElementById("highScore").innerHTML = highScore;
    document.getElementById("score").innerHTML = score;
}


function setHighScoreIfHighest(highScore, userScore) {
    if (userScore > highScore) {
        localStorage.setItem("highScore", userScore);
        document.getElementById("message").innerHTML = 'Congratulations You have Got High Score';
    }
}
