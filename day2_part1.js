const fs = require("fs");
const readline = require('readline');
const map = new Map();
let validCount = 0;

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
    let spaceSplit = line.split(" ");
    let password = spaceSplit[2];
    let characterToCheck = spaceSplit[1].split(':')[0];
    let range = spaceSplit[0];
    let lowerRange = range.split('-')[0];
    let higherRange = range.split('-')[1];
    console.log(password, characterToCheck, lowerRange, higherRange);

    let count = password.split(characterToCheck).length - 1;
    if(count >= lowerRange && count <= higherRange){
      validCount++;
    }

});

readInterface.on('close', function() {
  console.log(validCount);
});
