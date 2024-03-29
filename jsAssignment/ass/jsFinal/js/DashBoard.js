/**
 *
 *
 * @class DashBoard
 */
class DashBoard {
  constructor() {
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} isRightPressed
   * @param {*} isLeftPressed
   * @memberof DashBoard
   */
  drawSteering(ctx, isRightPressed, isLeftPressed) {
    let degrees;

    if (isLeftPressed) degrees = STEERING_ROTATION;
    else if (isRightPressed) degrees = -STEERING_ROTATION;
    else degrees = 0;

    ctx.save();
    ctx.translate(ROAD_PARAM.CANVAS_WIDTH - (300 * HEIGHT_MULTIPLIER + 300), ROAD_PARAM.CANVAS_HEIGHT - (200 * HEIGHT_MULTIPLIER + 200));
    // // rotate the canvas to the specified degrees
    ctx.rotate(degrees * Math.PI / 180);

    drawImage(
      ctx,
      'images/steering_wheel-.png',
      -(100 * HEIGHT_MULTIPLIER + 100),
      -(100 * HEIGHT_MULTIPLIER + 100),
      200 * HEIGHT_MULTIPLIER + 200,
      200 * HEIGHT_MULTIPLIER + 200
    );

    ctx.restore();
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} currentSpeed
   * @param {*} maxSpeed
   * @memberof DashBoard
   */
  drawSpeed(ctx, currentSpeed, maxSpeed) {
    const speed = Math.ceil(currentSpeed / maxSpeed * 150);
    const fontSize = 45 * HEIGHT_MULTIPLIER + 65;

    writeText(
      ctx,
      ROAD_PARAM.CANVAS_WIDTH / 2 - (600 * WIDTH_MULTIPLIER + 600),
      ROAD_PARAM.CANVAS_HEIGHT - (257 * HEIGHT_MULTIPLIER + 257),
      speed,
      `700 ${fontSize}px  josefin`,
      'white'
    );
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} rank
   * @param {*} aheadEnemyName
   * @param {*} behindEnemyName
   * @memberof DashBoard
   */
  drawRankInfo(ctx, rank, aheadEnemyName, behindEnemyName) {
    const fontSize = 30 * HEIGHT_MULTIPLIER + 30;
    writeText(
      ctx,
      ROAD_PARAM.CANVAS_WIDTH / 2 + 50 * HEIGHT_MULTIPLIER + 50,
      950 * HEIGHT_MULTIPLIER + 950,
      rank,
      `700 ${fontSize}px  josefin`,
      'white'
    );

    writeText(
      ctx,
      ROAD_PARAM.CANVAS_WIDTH / 2 - (170 * HEIGHT_MULTIPLIER + 170),
      820 * HEIGHT_MULTIPLIER + 820,
      aheadEnemyName,
      `700 ${fontSize}px  josefin`,
      'white'
    );

    writeText(
      ctx,
      ROAD_PARAM.CANVAS_WIDTH / 2 + 260 * HEIGHT_MULTIPLIER + 260,
      940 * HEIGHT_MULTIPLIER + 940,
      behindEnemyName,
      `700 ${fontSize}px  josefin`,
      'white'
    );
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} currentSpeed
   * @param {*} maxSpeed
   * @memberof DashBoard
   */
  drawSpeedNeedle(ctx, currentSpeed, maxSpeed) {
    const colorGradient = makeGradient(ctx, '#41dcf4', '#00b8fe');
    const shadowColor = '#00c6ff';

    drawSpeedoMeterArc(
      ctx,
      colorGradient,
      190,
      310,
      186 * HEIGHT_MULTIPLIER + 186,
      0.6 * Math.PI,
      calculateSpeedAngle(currentSpeed / maxSpeed, 83, 35) * Math.PI,
      false,
      shadowColor
    );
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} currentSpeed
   * @param {*} maxSpeed
   * @memberof DashBoard
   */
  drawSpeedometer(ctx, currentSpeed, maxSpeed) {

    drawImage(
      ctx,
      'images/spedoMeterTrans.png',
      (ROAD_PARAM.CANVAS_WIDTH / 2 - (600 * WIDTH_MULTIPLIER + 600)) - (210 * HEIGHT_MULTIPLIER + 210),
      ROAD_PARAM.CANVAS_HEIGHT - (440 * HEIGHT_MULTIPLIER + 440),
      420 * HEIGHT_MULTIPLIER + 420,
      420 * HEIGHT_MULTIPLIER + 420
    );

    this.drawSpeed(ctx, currentSpeed, maxSpeed);
    this.drawSpeedNeedle(ctx, currentSpeed, maxSpeed);
  }

  /**
   *
   *
   * @param {*} ctx
   * @param {*} baseSegment
   * @param {*} totalSegments
   * @memberof DashBoard
   */
  drawProgressBar(ctx, baseSegment, totalSegments) {

    drawRect(
      ctx,
      700 * WIDTH_MULTIPLIER + 700,
      ROAD_PARAM.CANVAS_HEIGHT - (150 * HEIGHT_MULTIPLIER + 150),
      600 * WIDTH_MULTIPLIER + 600,
      50 * HEIGHT_MULTIPLIER + 50,
      'rgba(0, 0, 0, 0.6)'
    );

    let progressGradient = makeGradient(ctx, '#da91db', '#c90ccc');

    //this is added just to stop the progress bar from moving beyond the background
    let width = (baseSegment <= totalSegments) ? baseSegment / totalSegments * 600 : 600;

    //drawing the % completion 
    drawRect(
      ctx,
      700 * WIDTH_MULTIPLIER + 700,
      ROAD_PARAM.CANVAS_HEIGHT - (150 * HEIGHT_MULTIPLIER + 150),
      width * WIDTH_MULTIPLIER + width,
      50 * HEIGHT_MULTIPLIER + 50,
      progressGradient
    );

    //drawing the finish icon
    drawImage(
      ctx,
      'images/finish2.png',
      1300 * WIDTH_MULTIPLIER + 1300,
      ROAD_PARAM.CANVAS_HEIGHT - (150 * HEIGHT_MULTIPLIER + 150),
      50 * WIDTH_MULTIPLIER + 50,
      50 * HEIGHT_MULTIPLIER + 50
    );
  }

}
