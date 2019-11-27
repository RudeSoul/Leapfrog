var languages = [
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang",
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang",
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang",
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang",
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang",
  "python",
  "html",
  "css",
  "php",
  "c",
  "c++",
  "java script",
  "go-lang"
];

var uniqueArray = [];
var count = [];
k = 0;
languages.forEach(function (elementof) { 
    if (uniqueArray.indexOf(elementof) == -1) {
        uniqueArray.push(elementof);
    }
});
console.log(uniqueArray);




var countnumber = [];

languages.forEach(function (elementof) {
    countnumber[elementof] = (countnumber[elementof] || 0) + 1;
});

for (var elementof in countnumber) {
    console.log(elementof + ' = ' + countnumber[elementof]);
} 
