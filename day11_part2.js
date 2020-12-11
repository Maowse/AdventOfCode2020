/*

--- Part Two ---
As soon as people start to arrive, you realize your mistake. People don't just care about adjacent seats - they care about the first seat they can see in each of those eight directions!

Now, instead of considering just the eight immediately adjacent seats, consider the first seat in each of those eight directions. For example, the empty seat below would see eight occupied seats:

.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....
The leftmost empty seat below would only see one empty seat, but cannot see any of the occupied ones:

.............
.L.L.#.#.#.#.
.............
The empty seat below would see no occupied seats:

.##.##.
#.#.#.#
##...##
...L...
##...##
#.#.#.#
.##.##.
Also, people seem to be more tolerant than you expected: it now takes five or more visible occupied seats for an occupied seat to become empty (rather than four or more from the previous rules). The other rules still apply: empty seats that see no occupied seats become occupied, seats matching no rule don't change, and floor never changes.

Given the same starting layout as above, these new rules cause the seating area to shift around as follows:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL
#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##
#.LL.LL.L#
#LLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLLL.L
#.LLLLL.L#
#.L#.##.L#
#L#####.LL
L.#.#..#..
##L#.##.##
#.##.#L.##
#.#####.#L
..#.#.....
LLL####LL#
#.L#####.L
#.L####.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##LL.LL.L#
L.LL.LL.L#
#.LLLLL.LL
..L.L.....
LLLLLLLLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.#L.L#
#.L####.LL
..#.#.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
#.L#.L#.L#
#LLLLLL.LL
L.L.L..#..
##L#.#L.L#
L.L#.LL.L#
#.LLLL#.LL
..#.L.....
LLL###LLL#
#.LLLLL#.L
#.L#LL#.L#
Again, at this point, people stop shifting around and the seating area reaches equilibrium. Once this occurs, you count 26 occupied seats.

Given the new visibility method and the rule change for occupied seats becoming empty, once equilibrium is reached, how many seats end up occupied?

Your puzzle answer was 2019.

*/

const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let originalSeats = [];

readInterface.on('line', function(line) {
    originalSeats.push(line.split(''));
});

readInterface.on('close', function() {
  //console.log(originalSeats);  
 
  let updatedSeats = updateSeats(originalSeats);
  let oldSeats = originalSeats;
   while(checkIfChanged(oldSeats, updatedSeats)){
     oldSeats = [...updatedSeats];
     updatedSeats = updateSeats(updatedSeats);
   }

   console.log(countOccupiedSeats(updatedSeats));
});

//(one of the eight positions immediately up, down, left, right, or diagonal from the seat)

function updateSeats(oldSeats){
  let newSeats = lodash.cloneDeep(oldSeats);
  for(let i = 0; i < newSeats.length; i++){
    for(let j = 0; j < newSeats[i].length; j++){
      if(oldSeats[i][j] !== '.'){
        // count occupied adjacent original seats
        let occupiedCount = 0;

        occupiedCount += checkSlopeForSeat(i, j, 0, 1, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, 0, -1, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, -1, 0, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, 1, 0, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, -1, -1, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, 1, 1, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, 1, -1, oldSeats);
        occupiedCount += checkSlopeForSeat(i, j, -1, 1, oldSeats);
        
        if(oldSeats[i][j] === '#' && occupiedCount >= 5){
          newSeats[i][j] = 'L';
        }

        if(oldSeats[i][j] === 'L' && occupiedCount === 0){
          newSeats[i][j] = '#'
        }
      }
    }    
  }
 // console.log('--------------------------------------');
 // console.log(newSeats);
  return newSeats;
}

function checkSlopeForSeat(x, y, x_diff, y_diff, array){
  while(array[x] && array[x][y]){
    x = x + x_diff;
    y = y + y_diff;
    if(array[x] && array[x][y] === '#'){
      return 1;
    }
    else if(array[x] && array[x][y] === 'L'){
      return 0;
    }
  }

  return 0;
}

function checkIfChanged(originalArray, newArray){
  for(let i = 0; i < originalArray.length; i++){
    for(let j = 0; j < originalArray[i].length; j++){
        if(originalArray[i][j] !== newArray[i][j]){
          return true;
        }
    }
  }

  return false;
}

function countOccupiedSeats(array){
  let count = 0;
   for(let i = 0; i < array.length; i++){
    for(let j = 0; j < array[i].length; j++){
        if(array[i][j] === '#'){
          count++;
        }
    }
  }

  return count;
}
