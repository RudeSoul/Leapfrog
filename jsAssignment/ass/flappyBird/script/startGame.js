














function Game() {

    var parentElement = document.getElementById('containerBackground');
    var gameAnimation = new GameAnimation(120, parentElement);

    window.addEventListener("keydown", gameAnimation.getUserTapInputPressed, true);
    window.addEventListener("keyup", gameAnimation.getUserTapInputPressedRemoved, false);

    window.addEventListener("mousedown", gameAnimation.getUserTapInputPressed, true);
    window.addEventListener("mouseup", gameAnimation.getUserTapInputPressedRemoved, false);

    window.addEventListener("ontouchstart", gameAnimation.getUserTapInputPressed, true);
    window.addEventListener("ontouchend", gameAnimation.getUserTapInputPressedRemoved, false);


    pauseRestartButton.addEventListener("click", playRestart);
    pauseRestartButton.addEventListener("ontouchstart", playRestart);
    function playRestart() {
        pauseRestartButton.style.display = 'none';
        gameAnimation.init();
    }
}
Game();