/**
 *
 *
 * @class Player
 */
class Player {
  constructor() {
    this.speed = 0;
    this.playerX = 0;
    this.nitro = 0;
    this.rank = NO_OF_ENEMIES + 1;
    this.behindEnemyName = '';
    this.aheadEnemyName = '';
  }

  //sign is the -1 or +1 depending on the direction car is curved to 
  /**
   *
   *
   * @param {*} sign
   * @memberof Player
   */
  updateX(sign) {
    this.playerX += (sign * TURNING_SPEED);
  }


  /**
   *
   *
   * @param {*} curveValue
   * @memberof Player
   */
  updateXInCurve(curveValue) {
    //we only update if there is speed ,if car is in stall  dont update
    if (this.speed > CURVE_POSITION_UPDATE_THRESHOLD) this.playerX -= curveValue * CENTRIFUGAL_FORCE;
  }

  /**
   *
   *
   * @param {*} enemy
   * @memberof Player
   */
  handleEnemyCollision(enemy) {
    this.speed = 0;
    enemy.handleCollision();
  }

  handleTreeCollision() {
    this.speed = 0;

  }

  /**
   *
   *
   * @param {*} currentZ
   * @param {*} enemiesArr
   * @memberof Player
   */
  checkAndHandleEnemyCollision(currentZ, enemiesArr) {
    enemiesArr.map((enemy, index) => {

      if (enemy.x < (this.playerX * ROAD_PARAM.WIDTH / 3) + PLAYER_WIDTH * PLAYER_WIDTH_MULTIPLIER &&
        enemy.x + PLAYER_WIDTH * ENEMY_WIDTH_MULTIPLIER > (this.playerX * ROAD_PARAM.WIDTH) &&
        enemy.zPos < (currentZ + ROAD_PARAM.SEGMENT_LENGTH * 3) + (PLAYER_Z_WIDTH) &&
        enemy.zPos - ENEMY_Z_WIDTH > currentZ
      )
        this.handleEnemyCollision(enemy);
    });
  }



  /**
   *
   *
   * @param {*} segments
   * @param {*} baseSegment
   * @memberof Player
   */
  checkAndHandleTreeCollision(segments, baseSegment) {

    let currentSegment = segments[baseSegment + CAR_TO_BASE_SEGMENT_OFFSET];
    if (((this.playerX >= ROAD_CENTRE_TO_RIGHT_TREE_DISTANCE && currentSegment.tree.sideToDrawTree > 0)
      || (this.playerX <= ROAD_CENTRE_TO_LEFT_TREE_DISTANCE && currentSegment.tree.sideToDrawTree < 0))
      && currentSegment.tree.isDrawn
    )
      this.handleTreeCollision();

  }

  /**
   *
   *
   * @param {*} currentZ
   * @param {*} enemiesArr
   * @param {*} isGameOver
   * @memberof Player
   */
  calculateCurrentPosition(currentZ, enemiesArr, isGameOver) {
    //flag that checks if we found previous and next plaayer
    let found = false;

    if (!isGameOver) {
      let enemiesBehind = 0;
      enemiesArr.map((enemy, index) => {
        if (enemy.zPos < (currentZ + 3 * ROAD_PARAM.SEGMENT_LENGTH)) {
          enemiesBehind++;

          if (index === enemiesArr.length - 1) {
            this.behindEnemyName = enemiesArr[index].name;
            this.aheadEnemyName = '';
          }
        } else {

          if (!found) {
            if (index != 0) this.behindEnemyName = enemiesArr[index - 1].name;
            this.aheadEnemyName = enemiesArr[index].name;
            found = true;
          }
        }
      });
      this.rank = NO_OF_ENEMIES - enemiesBehind + 1;
    }
  }

  /**
   *
   *
   * @param {*} buttonState
   * @memberof Player
   */
  updateSpeed(buttonState) {
    //changes the max speed and acceleration depending upon the position on the road
    let currentMaxSpeed, currentAcceleration = ACCELERATION;

    //changes max speed depending on the road type
    currentMaxSpeed = (this.playerX < -1.3 || this.playerX > 0.8) ? OFF_ROAD_MAX_SPEED : MAX_SPEED;


    //if up button is pressed update speed of car
    if (buttonState.isUpPressed) {
      (!(this.speed > currentMaxSpeed)) ? this.speed += currentAcceleration : this.speed = currentMaxSpeed;

    }
    //if down button is pressed decrease the speed of the car
    if (buttonState.isDownPressed)
      (!(this.speed + BREAKING <= 0)) ? this.speed += BREAKING : this.speed = 0;

    // if no button is pressed constantly decrease the speed of the car
    if (!buttonState.isUpPressed && !buttonState.isDownPressed)
      (!(this.speed + DECELERATION <= 0)) ? this.speed += DECELERATION : this.speed = 0;

  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} image
   * @param {*} sprite
   * @param {*} destX
   * @param {*} destY
   * @memberof Player
   */
  draw(ctx, image, sprite, destX, destY) {
    let spriteSheet = new Image();
    spriteSheet.src = image;

    ctx.drawImage(
      spriteSheet,
      sprite.x,
      sprite.y,
      sprite.w,
      sprite.h,
      destX,
      destY,
      PLAYER_WIDTH * WIDTH_MULTIPLIER + PLAYER_WIDTH,
      PLAYER_HEIGHT * WIDTH_MULTIPLIER + PLAYER_HEIGHT
    );

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }

}
   