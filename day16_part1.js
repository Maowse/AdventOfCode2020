/*

const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let ticketRules = new Map();
let yourTicketNext = false;
let nearbyTicketNext = false;

let ruleRegex = new RegExp("(\\d+)-(\\d+) or (\\d+)-(\\d+)");
let invalidNumbersSum = 0;

readInterface.on('line', function(line) {
  if(line !== ''){
    if(!yourTicketNext && !nearbyTicketNext){
      // read in the rules
      let splitRule = line.split(": ");
      let matches = ruleRegex.exec(splitRule[1]);
      if(matches !== null){
       let rules = [[parseInt(matches[1]), parseInt(matches[2])], [parseInt(matches[3]), parseInt(matches[4])]];
       ticketRules.set(splitRule[0], rules);
      }
    }
    else if(yourTicketNext){
      // save your ticket for later
    }
    else {
      // check nearby tickets
      if(line !== 'nearby tickets:'){
        line.split(",").map(e => parseInt(e)).forEach(valueToCheck => {
        let validForSomething = false;
        for(const [key, value] of ticketRules) {
          let firstBound = valueToCheck >= value[0][0] && valueToCheck <= value[0][1];
          let secondBound = valueToCheck >= value[1][0] && valueToCheck <= value[1][1];
          if(firstBound || secondBound){
            validForSomething = true;
            break;
          }
        }
        if(!validForSomething){
          invalidNumbersSum += valueToCheck;
        }
      });
      }
      
    }
  }
  else{
    if(!yourTicketNext && !nearbyTicketNext){
      yourTicketNext = true;
    }
    else if(yourTicketNext && !nearbyTicketNext){
      nearbyTicketNext = true;
      yourTicketNext = false;
    }
  }
});

readInterface.on('close', function() {
  console.log(invalidNumbersSum)
});




*/
