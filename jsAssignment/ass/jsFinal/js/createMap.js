var dropDownBtn = document.getElementById("dropDownBtn");
var roadValues = document.getElementById("roadValues");
var leftCurvature = document.getElementById("leftCurvature");
var rightCurvature = document.getElementById("rightCurvature");
var roadLength = document.getElementById("roadLength");
var submitButton = document.getElementById("submitButton");
var racingMap = []
dropDownBtn.style.display = "block";
roadValues.style.display = "none";

dropDownBtn.addEventListener("click", function (event) {
    
    dropDownBtn.style.display = "none";
    roadValues.style.display = "block";
});


submitButton.addEventListener("click", function (event) {
    var obj = { };
    var left = leftCurvature.value;
    var length = roadLength.value;
    obj.key1 = left;
    obj.key2 = length;
    racingMap.push(obj);
    console.log(racingMap);
    
    console.log(left);

});



