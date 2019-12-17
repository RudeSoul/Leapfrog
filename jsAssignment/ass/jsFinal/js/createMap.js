var dropDownBtn = document.getElementById("dropDownBtn");
var roadValues = document.getElementById("roadValues");
var leftCurvature = document.getElementById("leftCurvature");
var rightCurvature = document.getElementById("rightCurvature");
var roadLength = document.getElementById("roadLength");
// var submitButton = document.getElementById("submitButton");
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
const racingMap = [];
dropDownBtn.style.display = "block";
roadValues.style.display = "none";

dropDownBtn.addEventListener("click", function (event) {
    
    dropDownBtn.style.display = "none";
    roadValues.style.display = "block";
});


submitButton.addEventListener("click", function (event) {
    var obj = { };
    var left = parseInt(leftCurvature.value);
    var length = parseInt(roadLength.value);
    obj.number = left;
    obj.curvature = length;
    racingMap.push(obj);
    console.log(racingMap);


});



