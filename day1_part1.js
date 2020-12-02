const fs = require("fs");
const readline = require('readline');
const map = new Map();
const sum = 2020;
let result = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
    let val = parseInt(line);
    if(map.has(sum - val)){
      result.push(sum-val);
      result.push(val);
      readInterface.close();
    }
    map.set(val, sum - val);
});

readInterface.on('close', function() {
  console.log(result);
  console.log(result[0] * result[1]);
});
