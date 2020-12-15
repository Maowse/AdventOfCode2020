/*

--- Part Two ---
Impressed, the Elves issue you a challenge: determine the 30000000th number spoken. For example, given the same starting numbers as above:

Given 0,3,6, the 30000000th number spoken is 175594.
Given 1,3,2, the 30000000th number spoken is 2578.
Given 2,1,3, the 30000000th number spoken is 3544142.
Given 1,2,3, the 30000000th number spoken is 261214.
Given 2,3,1, the 30000000th number spoken is 6895259.
Given 3,2,1, the 30000000th number spoken is 18.
Given 3,1,2, the 30000000th number spoken is 362.
Given your starting numbers, what will be the 30000000th number spoken?

Your puzzle answer was 47205.

*/

const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let numbersMap = new Map();
let startingNumbers = [];

readInterface.on('line', function(line) {
  startingNumbers = line.split(",");
});

readInterface.on('close', function() {
  let turn = 0;
  let lastNumberSpoken = -1;
  while(turn < 30000000){
    // handle the starting numbers
    if(startingNumbers.length){
      lastNumberSpoken = parseInt(startingNumbers.shift());
      numbersMap.set(lastNumberSpoken, [turn]);
    }
    // handle everything after the starting numbers
    else{
      let seenTurns = numbersMap.get(lastNumberSpoken);
      if(seenTurns === undefined || seenTurns.length === 1){
        lastNumberSpoken = 0;
        addLastNumberSpokenToMap(lastNumberSpoken, turn);
      }
      else if(seenTurns.length > 1){
        // calc the difference
        let diff = seenTurns[seenTurns.length - 1] - seenTurns[seenTurns.length - 2];
        lastNumberSpoken = diff;
        addLastNumberSpokenToMap(lastNumberSpoken, turn);
      }
    }
    turn++;
  }

  console.log(lastNumberSpoken);
});

function addLastNumberSpokenToMap(number, turn){
  if(numbersMap.has(number)){
    // we only care about the last 2 turns a number was seen...
    // remove anything prior to that
    let currentTurns = numbersMap.get(number);
    if(currentTurns.length === 2){
      currentTurns.shift();
      currentTurns.push(turn);
      numbersMap.set(number, currentTurns);
    }
    else {
      numbersMap.set(number, [...numbersMap.get(number), turn]);
    }
    
  }
  else{
    numbersMap.set(number, [turn])
  }
}


