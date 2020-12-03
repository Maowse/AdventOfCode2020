/*

--- Part Two ---
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?

*/

const fs = require("fs");
const readline = require('readline');
let map = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
    map.push(line.split(''));
});

readInterface.on('close', function() {
  let slope1 = checkSlope(1,1);
  let slope2 = checkSlope(1,3);
  let slope3 = checkSlope(1,5);
  let slope4 = checkSlope(1,7);
  let slope5 = checkSlope(2,1);
  console.log(slope1, slope2, slope3, slope4, slope5);
  console.log(slope1*slope2*slope3*slope4*slope5);
});

function checkSlope(x_addition, y_addition){
  let trees = 0;
  let x = 0;
  let y = 0;
   while(x < map.length){
    if(map[x][y] === undefined){
      y = (y % map[0].length);
    }
    //console.log(x,y);
     if(map[x][y] === '#'){
      trees++;
    }
    x = x + x_addition;
    y = y + y_addition;
  }

  return trees;
}
