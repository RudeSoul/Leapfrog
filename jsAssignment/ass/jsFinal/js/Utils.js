/**
 *
 *
 * @param {*} ctx
 * @param {*} x1
 * @param {*} y1
 * @param {*} x2
 * @param {*} y2
 * @param {*} x3
 * @param {*} y3
 * @param {*} x4
 * @param {*} y4
 * @param {*} color
 */
const drawPolygon = (ctx, x1, y1, x2, y2, x3, y3, x4, y4, color) => {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.lineTo(x4, y4);
  ctx.closePath();
  ctx.fill();
}


/**
 *
 *
 * @param {*} ctx
 * @param {*} startColor
 * @param {*} endColor
 * @returns
 */
const makeGradient = (ctx, startColor, endColor) => {
  let speedGradient = ctx.createLinearGradient(0, 1000, 0, 0)
  speedGradient.addColorStop(1, startColor);
  speedGradient.addColorStop(0, endColor);
  return speedGradient;
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} x
 * @param {*} y
 * @param {*} text
 * @param {*} font
 * @param {*} color
 */
const writeText = (ctx, x, y, text, font, color) => {
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.fillStyle = color;
  ctx.shadowColor = 'black';
  ctx.shadowBlur = 40;
  ctx.fillText(text, x, y);

  ctx.shadowBlur = 0;
}

/**
 *
 *
 * @param {*} ctx
 * @param {*} xPos
 * @param {*} yPos
 * @param {*} width
 * @param {*} height
 * @param {*} color
 * @param {*} shadowBlur
 */
const drawRect = (ctx, xPos, yPos, width, height, color, shadowBlur) => {
  ctx.beginPath();
  ctx.fillStyle = color;

  if (shadowBlur) {
    ctx.shadowColor = shadowBlur;
    ctx.shadowBlur = 20;
  }

  ctx.rect(xPos, yPos, width, height);
  ctx.fill();
  ctx.closePath();
  ctx.shadowBlur = 0;
}

/**
 *
 *
 * @param {*} speedRatio
 * @param {*} a
 * @param {*} b
 * @returns
 */
const calculateSpeedAngle = (speedRatio, a, b) => {
  let degree = (a - b) * speedRatio + b;
  let radian = (degree * Math.PI) / 180;
  return radian <= 7 ? radian : 7;
}


/**
 *
 *
 * @param {*} ctx
 * @param {*} colorGradient
 * @param {*} x
 * @param {*} y
 * @param {*} radius
 * @param {*} startAngle
 * @param {*} endAngle
 * @param {*} anticlockwise
 * @param {*} shadowColor
 */
const drawSpeedoMeterArc = function (ctx, colorGradient, x, y, radius, startAngle, endAngle, anticlockwise, shadowColor) {
  ctx.beginPath();
  ctx.lineWidth = 33 * HEIGHT_MULTIPLIER + 33;
  ctx.strokeStyle = colorGradient;

  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 20;
  ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise | false);

  ctx.stroke();
  ctx.closePath();
  ctx.shadowColor = shadowColor;
  ctx.shadowBlur = 0;

}

/**
 *
 *
 * @param {*} ctx
 * @param {*} src
 * @param {*} x
 * @param {*} y
 * @param {*} width
 * @param {*} height
 * @param {*} shadowColor
 */
const drawImage = (ctx, src, x, y, width, height, shadowColor) => {
  let img = new Image();
  img.src = src;

  ctx.drawImage(img, x, y, width, height);
}

/**
 *
 *
 * @param {*} currentSegment
 * @param {*} goal
 * @param {*} length
 * @returns
 */
const getEnterCurvature = (currentSegment, goal, length) => {
  //getting equal increments so that we can add in each segment
  let percent = goal / length;
  return currentSegment * percent + percent;
}

/**
 *
 *
 * @param {*} curvature
 * @param {*} currentSegment
 * @param {*} length
 * @returns
 */
const getExitCurvature = (curvature, currentSegment, length) => {
  let percent = currentSegment / length;
  curvature -= percent;
  return curvature - percent;
}

/**
 *
 *
 * @param {*} location
 * @returns
 */
const createSoundObject = location => {
  let sound = new Audio();
  let src = document.createElement("source");
  src.type = "audio/mpeg";
  src.src = location;
  sound.appendChild(src);
  return sound;
}


/**
 *
 *
 * @param {number} [max=1]
 * @param {number} [min=0]
 * @returns
 */
const generateRandomNO = (max = 1, min = 0) => {
  return (Math.floor(Math.random() * (max - min + 1)) + min);
}
