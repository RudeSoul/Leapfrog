function GameAnimation(fps, parentElement) {
    var obstacles = [];
    var bird = null;
    var birdCollision = false;
    var obstacleImage = OBSTACLES[getRandom(0, 1)];
    var score = 0;
    var distanceTravelled = 0;
    var highScore = localStorage.getItem("highScore") || 0;
    var keyPressed = false;
    var keyPressedCounter = 0;
    var keyPressedId = 0;

    fps = fps || GAME_ANIMATION_SPEED_FPS;
    var start = 0,
        frameDuration = 1000 / fps;
    var animationFrameVariable = 0;
    var gameSpeed = gameSpeed || GAME_SPEED;

    this.init = function () {
        gameReset();

        bird = new BIRD(parentElement);
        bird.init();
        bird.draw();

        this.generateObstacle();

        animationFrameVariable = window.requestAnimationFrame(this.animate.bind(this));
    };

    function gameReset() {
        obstacles = [];
        bird = null;
        birdCollision = false;


        parentElement.style.backgroundImage = 'url("./assets/images/background-day.png")';

        obstacleImage = OBSTACLES[getRandom(0, 1)];

        score = 0;
        distanceTravelled = 0;
        highScore = localStorage.getItem("highScore") || 0;

        keyPressed = false;
        keyPressedCounter = 0;
        keyPressedId = 0;

        start = 0;
        animationFrameVariable = 0;

        var playRestartElement = parentElement.firstElementChild;
        parentElement.innerHTML = '';
        parentElement.appendChild(playRestartElement);

        document.getElementById("highScore").innerHTML = '';
        document.getElementById("score").innerHTML = '';
        document.getElementById("message").innerHTML = '';
    };


    this.animate = function (timestamp) {
        if (!birdCollision) {
            // for limiting fps
            if (timestamp >= start) {
                this.createObstacles();
                this.moveBird();
                this.MoveBackgroundImageAndObstacles();
                DisplayScoreAndInfo(highScore, score);

                if (bird.y > MOVING_SPACE || bird.y < -60) {
                    birdCollision = true;
                }

                //for fps limitation
                start = timestamp + frameDuration;
            }
            animationFrameVariable = window.requestAnimationFrame(this.animate.bind(this));
        }
        if (birdCollision) {
            dieAudio.play();
            window.cancelAnimationFrame(animationFrameVariable);
            setHighScoreIfHighest(highScore, score);
            pauseRestartButton.style.display = 'block';

        }
    };

    this.createObstacles = function () {
        // check if last pipe is greater than on distance of objectGenerationRate
        if (obstacles.length != 0) {
            var lastPipe = obstacles[obstacles.length - 1];
            if (lastPipe.x < PIPE_WIDTH * 3) {
                this.generateObstacle();
            }
        }
    };

    this.generateObstacle = function () {
        var top = getRandom(0, MOVING_SPACE - OBSTACLE_BETWEEN_SPACE);
        var bottom = MOVING_SPACE + OBSTACLE_BETWEEN_SPACE - top;
        var initialPipeGenerationArea = CONTAINER_WIDTH + PIPE_WIDTH + 10;

        var pipe1 = new PIPE(parentElement);
        pipe1.init(obstacleImage);
        pipe1.move(initialPipeGenerationArea, -top);
        pipe1.pipeElement.style.transform = 'rotate(180deg)';
        obstacles.push(pipe1);

        var pipe2 = new PIPE(parentElement);
        pipe2.init(obstacleImage);
        pipe2.move(initialPipeGenerationArea, bottom);
        obstacles.push(pipe2);
    };

    this.MoveBackgroundImageAndObstacles = function () {
        //decrease distance travelled for move of background image
        distanceTravelled -= gameSpeed;
        // move background image
        parentElement.children[0].style.backgroundPositionX = distanceTravelled + 'px';

        var isPipeOutOfBoundary = false;
        //move the obstacles 
        for (var i = 0; i < obstacles.length; i++) {
            obstacles[i].x -= gameSpeed;
            obstacles[i].draw();

            //collision detection
            if (bird.getBirdLeft() < obstacles[i].getPipeRight() &&
                bird.getBirdRight() > obstacles[i].getPipeLeft() &&
                (bird.getBirdTop()) < obstacles[i].getPipeBottom() &&
                bird.getBirdBottom() > obstacles[i].getPipeTop()) {
                birdCollision = true;
            }

            //set score when bird passes the pipe
            if (bird.getBirdLeft() >= obstacles[i].getPipeRight() && obstacles[i].getPipeRight() >= BIRD_DEFAULT_X_POSITION) {
                score += 0.5;
                pointAudio.play();
            }

            // if obstacles out of container remove them
            if (obstacles[i].x < -(PIPE_WIDTH * 2)) {
                obstacles[i].clearPipe();
                isPipeOutOfBoundary = true;
            }
        }

        // remove pipe from array if out of boundary
        // check filter only if pipe out of boundary set true as
        // filter expensive computaion so check and only apply
        if (isPipeOutOfBoundary) {
            obstacles = obstacles.filter(function (obstacle) {
                return !obstacle.pipeRemoved;
            });
        }
    };

    this.moveBird = function () {
        //Set the bird's acceleration if the keys are being pressed
        if (keyPressed) {
            bird.accelerationY = -5;
            wingAudio.play();
        }

        //Set the bird's acceleration to zero and gravity to default 
        //  if none of the keys are being pressed
        if (!keyPressed) {
            bird.accelerationY = 0;
            bird.gravity = 0.3;
        }

        swooshAudio.play();

        //Apply the acceleration
        bird.vy += bird.accelerationY;

        //Apply gravity
        bird.vy += bird.gravity;

        //Limit the speed
        if (bird.vy > bird.speedLimit * 2) {
            bird.vy = bird.speedLimit * 2;
        }
        if (bird.vy < -bird.speedLimit) {
            bird.vy = -bird.speedLimit;
        }

        //previous y value
        var ty = bird.y;

        //Move the bird
        bird.y += bird.vy;



        bird.draw();
    };

    this.getUserTapInputPressed = function (event) {

        // check if key is being continiously pressed without removing
        if (keyPressedCounter === 0) {
            keyPressed = true;

            //set timeout for clearing the key pressed
            keyPressedId = setTimeout(function () {
                keyPressed = false;
            }, 200);
        }
        //set key pressed to false on if key is not removed
        else {
            keyPressed = false;
        }
        keyPressedCounter++;
    };

    this.getUserTapInputPressedRemoved = function () {
        clearTimeout(keyPressedId);
        keyPressed = false;
        keyPressedCounter = 0;
    };
}








