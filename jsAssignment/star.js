// var tara = [];
// for (var i = 0; i < 5; i++) {
//     tara[i] = '';
//     for (var j = 5; j > i; j--) {
//     tara[i] = tara[i] == "" ? "*" : tara[i] + "*";
//   }
//   console.log(tara[i]);
// }

(function tara(x) {
  taraitara = '';
  for (i = 1; i <= x; i++){
    taraitara = taraitara + '*';
  }
  --x;
  console.log(taraitara);
  if (x > 0)
    tara(x);
}) (5);
