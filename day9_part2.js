/*

--- Part Two ---
The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?

Your puzzle answer was 55732936.

*/

const fs = require("fs");
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let target = 466456641;
let currentSum = 0;
let sumSet = [];
let seen = [];

readInterface.on('line', function(line) {
    let currentNum = parseInt(line);
    currentSum = 0;
    sumSet = [];
    seen.push(currentNum);
    console.log('current num:', currentNum);
    for(let i = seen.length - 1; i >= 0; i--){
     currentSum += seen[i];
     sumSet.push(seen[i]);
     if(currentSum === target){
       console.log('Found sum set:');
       console.log(sumSet.sort());
       console.log(sumSet[0] + sumSet[sumSet.length - 1]);
       process.exit();
     }
     else if(currentSum > target){
       break;
     }
    }
});

readInterface.on('close', function() {
  
});

