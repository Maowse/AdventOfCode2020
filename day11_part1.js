/*

--- Day 11: Seating System ---
Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

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
Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
Otherwise, the seat's state does not change.
Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

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
After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##
This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##
#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##
#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##
At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

Your puzzle answer was 2251.

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

        if(oldSeats[i][j+1] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i][j-1] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i-1] && oldSeats[i-1][j] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i+1] && oldSeats[i+1][j] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i-1] && oldSeats[i-1][j-1] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i+1] && oldSeats[i+1][j+1] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i+1] && oldSeats[i+1][j-1] === '#'){
          occupiedCount++;
        }
        if(oldSeats[i-1] && oldSeats[i-1][j+1] === '#'){
          occupiedCount++;
        }

        if(oldSeats[i][j] === '#' && occupiedCount >= 4){
          newSeats[i][j] = 'L';
        }

        if(oldSeats[i][j] === 'L' && occupiedCount === 0){
          newSeats[i][j] = '#'
        }
      }
    }    
  }

 // console.log(newSeats);
  return newSeats;
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



