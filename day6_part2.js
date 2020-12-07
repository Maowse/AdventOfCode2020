/*

--- Part Two ---
As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

Using the same example as above:

abc

a
b
c

ab
ac

a
a
a
a

b
This list represents answers from five groups:

In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
In the second group, there is no question to which everyone answered "yes".
In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
In the fourth group, everyone answered yes to only 1 question, a.
In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?

*/

const fs = require("fs");
const readline = require('readline');
let groups = new Map();

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let groupNum = 1;
let currentMap = new Map();
let numPeople = 0;
let sumOfAllGroups = 0;

readInterface.on('line', function(line) {
    if(line == ''){
      groups.set(groupNum, currentMap);

      // check if numPeople === all entries in the map
      for(const [key, value] of currentMap.entries()){
        if(value === numPeople){
          sumOfAllGroups++;
        }
      }

      currentMap = new Map();
      numPeople = 0;
    }
    else{
      let split = line.split("");
      numPeople++;
      split.forEach(char => {
       if(!currentMap.has(char)){
         currentMap.set(char, 1);
       }
       else {
         currentMap.set(char, currentMap.get(char) + 1);
       }
      });
    }

});

readInterface.on('close', function() {
    //console.log(groups);
    console.log(sumOfAllGroups);
});
