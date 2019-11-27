var numbers = [1, 2, 3, 4];

function transform(collection, tranFunc) {
    num = collection.forEach(function (element) {
        return element;
    }
    };
    
    // var result = collection.map(transFunc);
 

var output = transform(numbers, function (num) {
    return num * 2;
});
console.log(output);


// var numbers = [1, 2, 3, 4];

// function transform1(numbers){
// var transform = numbers.map(function (num) {
//     return num * 2;
// });
    
// }

// console.log(transform);
