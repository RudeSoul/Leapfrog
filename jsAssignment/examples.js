function example(arr) {
  var array = [].concat(arr);
  array[1] = 10;
  return array;
}

var oldArr = [1, 2, 3, 4];
var newArr = example(oldArr);
console.log("new", newArr);
console.log("old", oldArr);
