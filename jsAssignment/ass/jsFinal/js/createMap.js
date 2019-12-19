const mapSpaceCtx = mapSpace.getContext("2d");
dropDownBtn.style.display = "block";
roadValues.style.display = "none";

dropDownBtn.addEventListener("click", function (event) {
  dropDownBtn.style.display = "none";
  roadValues.style.display = "block";
});


//create map according to user
submitButton.addEventListener("click", function (event) {
  const obj = {};
  const length = parseInt(roadLength.value);
  const left = parseInt(leftCurvature.value);
  obj.number = length;
  obj.curvature = left;
  RACING_MAP.push(obj);

  ROAD_DRAWING_FACTOR = (ROAD_DRAWING_FACTOR + (obj.number / 20));
  ROAD_CURVE_DRAWING_FACTOR = (ROAD_CURVE_DRAWING_FACTOR + (obj.curvature) / 10);

  if (RACING_MAP.length <= 1) {

    mapSpaceCtx.beginPath();
    mapSpaceCtx.moveTo(400, 0);
    mapSpaceCtx.lineTo(400, 10);
    mapSpaceCtx.lineTo(500, 10);
    mapSpaceCtx.lineTo(500, 0);
    mapSpaceCtx.fillStyle = 'red';
    mapSpaceCtx.closePath();
    mapSpaceCtx.stroke();
    mapSpaceCtx.fill();
  }
  CURVATURE = obj.curvature;

  if (CURVATURE == 0) {
    mapSpaceCtx.beginPath();
    mapSpaceCtx.moveTo(400, 0 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(400, 10 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(500, 10 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(500, 0 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.fillStyle = 'black';
    mapSpaceCtx.closePath();
    mapSpaceCtx.stroke();
    mapSpaceCtx.fill();
  }
  else {
    mapSpaceCtx.beginPath();
    mapSpaceCtx.moveTo(400 - (ROAD_CURVE_DRAWING_FACTOR), 0 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(400 - (ROAD_CURVE_DRAWING_FACTOR), 10 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(500 - (ROAD_CURVE_DRAWING_FACTOR), 10 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.lineTo(500 - (ROAD_CURVE_DRAWING_FACTOR), 0 + (ROAD_DRAWING_FACTOR));
    mapSpaceCtx.fillStyle = 'black';
    mapSpaceCtx.closePath();
    mapSpaceCtx.stroke();
    mapSpaceCtx.fill();
  }
});
