/*

While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
How many passwords are valid according to the new interpretation of the policies?

*/

const fs = require("fs");
const readline = require('readline');
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
