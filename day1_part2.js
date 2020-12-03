/*

The Elves in accounting are thankful for your help; one of them even offers you a starfish coin they had left over from a past vacation. 
They offer you a second one if you can find three numbers in your expense report that meet the same criteria.

Using the above example again, the three entries that sum to 2020 are 979, 366, and 675. Multiplying them together produces the answer, 241861950.

In your expense report, what is the product of the three entries that sum to 2020?

*/

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
