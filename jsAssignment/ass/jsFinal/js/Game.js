
// const racingTrack = [
//     { number: 100, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 300, curvature: 0 },
//     { number: 500, curvature: 0 },
// ];
const racingTrack = racingMap;
console.log(racingTrack);
const FINISH_LINE_LENGTH = 140;

const TOTAL_LENGTH_OF_ROAD = (() => {
    let total = 0;
    for (let i = 0; i < racingTrack.length - 1; i++)
        total += racingTrack[i].number;

    return total + FINISH_LINE_LENGTH;
})();


const CAR_CENTRE = {
    x: 0,
    y: 130,
    w: 69,
    h: 38
};

const CAR_LEFT = {
    x: 70,
    y: 130,
    w: 77,
    h: 38
};

const CAR_RIGHT = {
    x: 148,
    y: 130,
    w: 77,
    h: 38
};

const CAR_ACCELERATE = createSoundObject('sounds/caraccelerate.mp3');
const CAR_DECELERATE = createSoundObject('sounds/cargeardown.mp3');
const CAR_SKID = createSoundObject('sounds/carskid.mp3');
const CARSTARTED = createSoundObject('sounds/carstart.mp3');

const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;
const BACKGROUND_MOVEMENT_FACTOR = 14;

const PLAYER_NAME = [
    'PRABESH',
    'PRAJWAL',
    'SWEKSHYA',
    'PRABIN',
    'JANISH',
    'NIRMAL',
    'NIRAJ',
    'SULAV',
    'VAXO',
];

/**
 *
 *
 * @class Game
 */
class Game {

    constructor() {
        this.canvas = document.getElementById("main-canvas");
        this.canvas.setAttribute('width', ROAD_PARAM.CANVAS_WIDTH);
        this.canvas.setAttribute('height', ROAD_PARAM.CANVAS_HEIGHT);

        this.ctx = this.canvas.getContext("2d");
        this.backgroundImageStart = -(ROAD_PARAM.CANVAS_WIDTH) * 2;

        this.position = 0;   //   Z position of the camera 
        this.currentSegment = 3; //number of segments
        this.isGameOver = false; //initially game is not over

        //these 3 variables are used to show the initial countdown
        this.isInitialCountDownOngoing = true;
        this.initialCountDownValue = 3;
        this.isInTimeout = false;

        this.isRightPressed = false;
        this.isLeftPressed = false;
        this.isUpPressed = false;

        this.isDownPressed = false;
        this.isSpacePressed = false;

        this.road = new Road();

        //initialize the road object
        racingTrack.map(sector => {
            this.addRoad(sector.number / 2, sector.curvature);
        });


        this.enemies = [];
        //creating enemies dynamically
        for (let x = 0; x < NO_OF_ENEMIES; x++)
            this.enemies.push(new Enemies((x + 1) / 2.5 * 500, x, (x + 1) / 2.5 * 10000, PLAYER_NAME[x] || ('PLAYER' + x)));

        this.player = new Player();
        this.dashBoard = new DashBoard();

        this.carSprite = CAR_CENTRE;

        this.drawPlayer = this.drawPlayer.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.keyDownHandler = this.keyDownHandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);
        this.start = this.start.bind(this);

    }

    /**
     *
     *
     * @param {*} length
     * @param {*} curvature
     * @memberof Game
     */
    enterSector(length, curvature) {
        for (let n = 0; n < length; n++)
            this.road.initializeSegments(getEnterCurvature(n, curvature, length));
    }


    /**
     *
     *
     * @param {*} length
     * @param {*} curvature
     * @memberof Game
     */
    exitSector(length, curvature) {
        for (let n = 0; n < length; n++)
            this.road.initializeSegments(getExitCurvature(curvature, n, length));
    }

    /**
     *
     *
     * @param {*} length
     * @param {*} curvature
     * @memberof Game
     */
    addRoad(length, curvature) {
        //segment started
        this.enterSector(length, curvature);

        //exit the segments
        this.exitSector(length, curvature);
    }

    /**
     *
     *
     * @memberof Game
     */
    drawRoad() {
        this.road.drawRoad(this.ctx, this.position, this.player.playerX, this.enemies);
    }

    /**
     *
     *
     * @param {*} currentCurve
     * @memberof Game
     */
    updateBackground(currentCurve) {
        this.backgroundImageStart -= currentCurve / BACKGROUND_MOVEMENT_FACTOR;
    }

    /**
     *
     *
     * @memberof Game
     */
    updatePlayerAsPerCurve() {
        //player is pushed out of the track to simulate the effect of a curve
        let currentCurveIndex = this.road.findSegmentIndex(this.position);
        let currentCurve = this.road.segments[currentCurveIndex].curvature;

        if (currentCurve !== 0) {
            this.player.updateXInCurve(currentCurve);
            this.updateBackground(currentCurve);
        }
    }


    /**
     *
     *
     * @memberof Game
     */
    updatePlayerXPos() {
        //we only update the x position only if car has certain speed   
        if (this.player.speed > 0) {
            if (this.isLeftPressed) this.player.updateX(-1);
            if (this.isRightPressed) this.player.updateX(+1);
        }
    }

    /**
     *
     *
     * @returns
     * @memberof Game
     */
    checkIfGameEnded() {
        return (this.road.findSegmentIndex(this.position) > TOTAL_LENGTH_OF_ROAD);
    }

    showGameOver() {
        writeText(
            this.ctx,
            this.canvas.width / 2, 200 * HEIGHT_MULTIPLIER + 200,
            `Game Over! Your Position: ${this.player.rank}`,
            '700 50px  PerfectDark',
            'white'
        );
    }

    /**
     *
     *
     * @memberof Game
     */
    checkAndHandleGameEnd() {
        if (this.isGameOver) this.showGameOver();
        if (this.checkIfGameEnded() && !this.isGameOver) {
            this.removeEventListeners();

            this.isUpPressed = false;
            this.isSpacePressed = false;

            //this speed is added to counteract the condition when player enters exit zone with nitro and speed is very high to decelerate fast
            this.player.speed = (this.player.speed > MAX_SPEED) ? MAX_SPEED : this.player.speed / 1.5;

            this.isGameOver = true;
        }
    }

    /**
     *
     *
     * @memberof Game
     */
    updateEnemies() {
        if (!this.isInitialCountDownOngoing) {
            this.enemies.map(enemy => {
                enemy.updateZPos();
                enemy.updateSpeed();
                enemy.checkIfEnemyCrossedFinishLine();
            });
        }
    }

    /**
     *
     *
     * @memberof Game
     */
    calculatePlayerRank() {
        this.player.calculateCurrentPosition(this.position, this.enemies, this.isGameOver);

    }

    /**
     *
     *
     * @memberof Game
     */
    update() {

        this.player.updateSpeed({ isUpPressed: this.isUpPressed, isDownPressed: this.isDownPressed});

        //we create a illusion of curve by moving the car as per the curve
        this.updatePlayerAsPerCurve();

        this.updatePlayerXPos();

        this.updateEnemies();

        this.calculatePlayerRank();

        this.position += this.player.speed;

        this.checkAndHandleGameEnd();
    }

    /**
     *
     *
     * @memberof Game
     */
    drawBackground() {
        drawImage(this.ctx, 'images/b.png', this.backgroundImageStart, 0, ROAD_PARAM.CANVAS_WIDTH * 5, 549 * HEIGHT_MULTIPLIER + 549);
    }

    /**
     *
     *
     * @memberof Game
     */
    drawPlayer() {
        this.player.draw(
            this.ctx,
            'images/spritesheet.high.png',
            this.carSprite,
            this.canvas.width / 2 + 30 * WIDTH_MULTIPLIER + 30,
            600 * HEIGHT_MULTIPLIER + 600,
            
        );
    }

    /**
     *
     *
     * @memberof Game
     */
    playSounds() {
        if (this.isUpPressed) CAR_ACCELERATE.play();

        if (this.isDownPressed) {
            CAR_ACCELERATE.pause();
            CAR_DECELERATE.play();
        }

        if ((this.isLeftPressed || this.isRightPressed)
            && this.road.segments[this.road.findSegmentIndex(this.position)].curvature != 0)
            CAR_SKID.play();
    }

    /**
     *
     *
     * @memberof Game
     */
    drawDashBoard() {
        this.dashBoard.drawSteering(this.ctx, this.isLeftPressed, this.isRightPressed);
        this.dashBoard.drawSpeedometer(this.ctx, this.player.speed, MAX_SPEED);
        this.dashBoard.drawProgressBar(this.ctx, this.road.findSegmentIndex(this.position), TOTAL_LENGTH_OF_ROAD);
    }

    /**
     *
     *
     * @memberof Game
     */
    drawRank() {
        this.dashBoard.drawRankInfo(this.ctx, this.player.rank, this.player.aheadEnemyName, this.player.behindEnemyName);
    }

    /**
     *
     *
     * @memberof Game
     */
    addEventListeners() {
        document.addEventListener('keydown', this.keyDownHandler, false);
        document.addEventListener('keyup', this.keyUpHandler, false);
    }

    /**
     *
     *
     * @memberof Game
     */
    removeEventListeners() {
        document.removeEventListener('keydown', this.keyDownHandler, false);
        document.removeEventListener('keyup', this.keyUpHandler, false);
    }

    /**
     *
     *
     * @memberof Game
     */
    showInitialCountDown() {
        if (this.isInitialCountDownOngoing)
            writeText(
                this.ctx,
                this.canvas.width / 2, 690 * HEIGHT_MULTIPLIER + 490,
                this.initialCountDownValue,
                '900 80px  lightDark',
                'rgb(235, 137, 52)'
            );

        if (this.isInitialCountDownOngoing && !this.isInTimeout) {
            this.isInTimeout = true;
            setTimeout(() => {

                if (this.initialCountDownValue === 'GO!!') {
                    this.isInitialCountDownOngoing = false;
                    this.addEventListeners();
                }

                if (this.initialCountDownValue === 1) this.initialCountDownValue = 'GO!!';
                if (this.initialCountDownValue !== 'GO!!') this.initialCountDownValue--;
                this.isInTimeout = false;
            }, 1000)
        }
    }

    /**
     *
     *
     * @memberof Game
     */
    draw() {
        this.drawBackground();
        this.drawRoad();
        this.drawPlayer();
        this.drawDashBoard();
        this.drawRank();
    }

    /**
     *
     *
     * @memberof Game
     */
    checkAndHandleEnemyCollision() {
        this.player.checkAndHandleEnemyCollision(this.position, this.enemies);
    }

    /**
     *
     *
     * @memberof Game
     */
    checkAndHandleTreeCollision() {
        this.player.checkAndHandleTreeCollision(this.road.segments, this.road.findSegmentIndex(this.position));
    }

    /**
     *
     *
     * @memberof Game
     */
    checkAndHandleCollision() {
        this.checkAndHandleEnemyCollision();
        this.checkAndHandleTreeCollision();
    }

    /**
     *
     *
     * @memberof Game
     */
    gameLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.playSounds();
        this.draw();
        this.update();
        this.checkAndHandleCollision()
        this.showInitialCountDown();

    }

    /**
     *
     *
     * @param {*} e
     * @memberof Game
     */
    keyDownHandler(e) {

        switch (e.keyCode) {
            case KEY_RIGHT:
                this.isRightPressed = true;
                this.carSprite = CAR_RIGHT;
                break;

            case KEY_LEFT:
                this.isLeftPressed = true;
                this.carSprite = CAR_LEFT;
                break;

            case KEY_UP:
                this.isUpPressed = true;
                break;

            case KEY_DOWN:
                this.isDownPressed = true;
                break;

        }
    }

    /**
     *
     *
     * @param {*} e
     * @memberof Game
     */
    keyUpHandler(e) {

        switch (e.keyCode) {
            case KEY_RIGHT:
                this.isRightPressed = false;
                this.carSprite = CAR_CENTRE;
                break;

            case KEY_LEFT:
                this.isLeftPressed = false;
                this.carSprite = CAR_CENTRE;
                break;

            case KEY_UP:
                this.isUpPressed = false;
                break;

            case KEY_DOWN:
                this.isDownPressed = false;
                break;


        }
    }

    /**
     *
     *
     * @memberof Game
     */
    start() {
        let preLoader = new PreLoader();
        preLoader.load(() => {
            setInterval(this.gameLoop, 40);
            // CARSTARTED.play();
        });
    }
}





const startGame = document.getElementById('levelEditorBtn');
startGame.style.display = 'block';


startGame.addEventListener('click', function () {
    startGame.style.display = 'none';
    roadValues.style.display = 'none';
    document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_WIDTH;
    document.getElementById('main-canvas').width = ROAD_PARAM.CANVAS_HEIGHT;
    const game = new Game();
    game.start(); 
})



