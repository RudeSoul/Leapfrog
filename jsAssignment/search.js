var fruits = [
  { id: 1, name: "Banana", color: "Yellow" },
  { id: 2, name: "Apple", color: "Red" }
];

var animals = [
  { id: 1, name: "daino", color: "Yellow" },
  { id: 2, name: "buff", color: "Red" }
];
function searchByName(indexnum, keyval, colorval = null) {
  indexnum.forEach(function(element) {
    var x = keyval.toLowerCase();
    var y = element.name.toLowerCase();
    var z = colorval.toLowerCase();
    var a = element.color.toLowerCase();

    if (colorval == null) {
      if (x == y) {
        console.log(element);
      }
    } else {
      if (x == y && z == a) {
        console.log(element);
      }
    }
  });
}

searchByName(fruits, "apple");
