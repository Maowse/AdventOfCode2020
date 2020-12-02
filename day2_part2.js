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
    let validLower = password[lowerRange-1] === characterToCheck ? 1 : 0;
    let validHigher = password[higherRange-1] === characterToCheck ? 1 : 0;
    console.log(password, characterToCheck, lowerRange, higherRange, validLower, validHigher);

    if(validLower + validHigher === 1){
      validCount++;
    }

});

readInterface.on('close', function() {
  console.log(validCount);
});
