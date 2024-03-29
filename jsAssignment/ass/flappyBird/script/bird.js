function BIRD(parentElement) {
    this.x = BIRD_DEFAULT_X_POSITION;
    this.y = BIRD_DEFAULT_Y_POSITION;
    this.vx = 0;
    this.vy = 0;
    this.accelerationY = AccelerationY;
    this.gravity = GRAVITY;
    this.speedLimit = BIRD_SPEED_LIMIT;
    this.birdElement = null;
    this.angle = 0;

    this.init = function () {
        this.birdElement = document.createElement('div');
        this.birdElement.style.backgroundImage = 'url("./assets/images/yellowbird.gif")';
        this.birdElement.style.backgroundRepeat = 'no-repeat';
        this.birdElement.style.backgroundPosition = 'center';
        this.birdElement.style.backgroundSize = '100% 100%';
        this.birdElement.style.height = BIRD_HEIGHT + 'px';
        this.birdElement.style.width = BIRD_WIDTH + 'px';
        this.birdElement.style.position = 'absolute';
        this.birdElement.style.transform = 'rotate(' + this.angle + 'deg)';
        this.birdElement.style.zIndex = 30;

        parentElement && parentElement.appendChild(this.birdElement);
    };


    this.draw = function () {
        this.birdElement.style.top = this.y + 'px';
        this.birdElement.style.left = this.x + 'px';
        this.birdElement.style.transform = 'rotate(' + this.angle + 'deg)';
    };


    this.move = function (xInc, yInc) {
        this.y = this.y + yInc;
        this.x = this.x + xInc;
        this.draw();
    };

    this.getBirdTop = function () { return this.y; };
    this.getBirdBottom = function () { return this.y + BIRD_HEIGHT; };
    this.getBirdLeft = function () { return this.x; };
    this.getBirdRight = function () { return this.x + BIRD_WIDTH; };
}
