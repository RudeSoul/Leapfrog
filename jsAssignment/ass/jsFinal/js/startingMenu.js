class startingMenu {
    constructor() {

    }

    addListeners() {
        document.getElementsByClassName('play-game')[0].addEventListener("click", function () {
            window.location.href = "game.html";
        });

    }
    
}


let startingMenu = new startingMenu();

startingMenu.addListeners();