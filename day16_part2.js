/*

--- Part Two ---
Now that you've identified which tickets contain invalid values, discard those tickets entirely. Use the remaining valid tickets to determine which field is which.

Using the valid ranges for each field, determine what order the fields appear on the tickets. The order is consistent between all tickets: if seat is the third field, it is the third field on every ticket, including your ticket.

For example, suppose you have the following notes:

class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9
Based on the nearby tickets in the above example, the first position must be row, the second position must be class, and the third position must be seat; you can conclude that in your ticket, class is 12, row is 11, and seat is 13.

Once you work out which field is which, look for the six fields on your ticket that start with the word departure. What do you get if you multiply those six values together?

Your puzzle answer was 3029180675981.

*/

const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let ticketRules = new Map();
let yourTicketNext = false;
let nearbyTicketNext = false;

let ruleRegex = new RegExp("(\\d+)-(\\d+) or (\\d+)-(\\d+)");
let validTickets = [];
let yourTicket = null;

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
      if(line !== 'your ticket:'){
        yourTicket = line.split(",").map(e => parseInt(e));
        validTickets.push(line);
      }
    }
    else {
      // check nearby tickets
      if(line !== 'nearby tickets:'){
        let validTicket = true;
        line.split(",").map(e => parseInt(e)).forEach(valueToCheck => {
        let validForSomething = false;
        for(const [key, value] of ticketRules) {
          if(checkRule(value, valueToCheck)){
            validForSomething = true;
            break;
          }
        }
        if(!validForSomething){
          validTicket = false;
        }
      });
      if(validTicket){
        validTickets.push(line);
      }
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
    let ticketMatches = [];
    validTickets.forEach((ticketLine, ticketIndex) => {
      let individualTicketMatches = [];
      ticketLine.split(",").map(e => parseInt(e)).forEach((valueToCheck, index) => {
        let tempMatches = [];
        for(const [key, value] of ticketRules) {
          if(checkRule(value, valueToCheck)){
            tempMatches.push(key);
          }
        }
        individualTicketMatches.push(tempMatches);
      });
      ticketMatches.push(individualTicketMatches);
    });

  let rulesToIndexes = [];
  let availableRules = Array.from( ticketRules.keys());

  let index = 0;
  let ruleIndex = 0;
  let multiplied = 1;

  while(index < availableRules.length){
    for(let i = 0; i < ticketMatches.length; i++){
      for(let j = 0; j < ticketMatches[i].length; j++){
        let seenRules = ticketMatches[i][j].filter(e => !rulesToIndexes.includes(e));
        for(let z = 1; z < ticketMatches.length; z++){
          seenRules = seenRules.filter(value => ticketMatches[z][j].filter(e => !rulesToIndexes.includes(e)).includes(value));
        }
        if(seenRules.length === 1){
          if(seenRules[0].includes("departure")){
            multiplied *= yourTicket[j];
          }
        
          rulesToIndexes.push(seenRules[0]);
          index++;
        }
      }
    }
  }

  console.log(multiplied);

});


function checkRule(rule, valueToCheck){
  let firstBound = valueToCheck >= rule[0][0] && valueToCheck <= rule[0][1];
  let secondBound = valueToCheck >= rule[1][0] && valueToCheck <= rule[1][1];

  return firstBound || secondBound;
}


