/*

--- Part Two ---

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?


*/

const fs = require("fs");
const readline = require('readline');
let highestSeatID = -1;
let seatArr = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
  let arr = line.split("");
  let endRange = 127;
  let startRange = 0;
  let mid = -1;
  for(let i = 0; i < 7; i++){
    let curr = arr[i];
    mid = Math.ceil((startRange + endRange) / 2);
    if(curr == 'F'){
      endRange = mid;
    }
    else if(curr == 'B'){
      startRange = mid;
    }
  }

  let endRangeColumn = 7;
  let startRangeColumn = 0;
  let midColumn = -1;

  for(let i = 7; i < 10; i++){
    let currColumn = arr[i];
    midColumn = Math.ceil((startRangeColumn + endRangeColumn) / 2);
    if(currColumn == 'R'){
      startRangeColumn = midColumn;
    }
    else if(currColumn == 'L'){
      endRangeColumn = midColumn;
    }
  }

  let seatID = (startRange * 8) + startRangeColumn;
  if(seatID > highestSeatID){
    highestSeatID = seatID;
  }
  seatArr.push(seatID);

});

readInterface.on('close', function() {
  console.log(highestSeatID);
  seatArr.sort((a, b) => a > b ? 1 : -1);
  seatArr.forEach((seatID, index) => {
    if(index + 1 !== seatArr.length){
      if((seatID + 1) !== seatArr[index+1]){
        console.log('Missing seat: ', seatID + 1);
      }
    }
  })
});
