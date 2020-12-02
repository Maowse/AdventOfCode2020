const fs = require("fs");
const readline = require('readline');
const map = new Map();
const sum = 2020;

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
    let val = parseInt(line);
    map.set(val, sum - val);
});

readInterface.on('close', function() {
  for(const [key, value] of map.entries()){
    for(const [key2, value2] of map.entries()){
      if(map.has(sum - (key + key2))){
        console.log(sum - (key + key2), key, key2);
        return;
      }
    }
  }
});
