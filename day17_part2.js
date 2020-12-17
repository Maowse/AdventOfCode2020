/*

--- Part Two ---
For some reason, your simulated results don't match what the experimental energy source engineers expected. Apparently, the pocket dimension actually has four spatial dimensions, not three.

The pocket dimension contains an infinite 4-dimensional grid. At every integer 4-dimensional coordinate (x,y,z,w), there exists a single cube (really, a hypercube) which is still either active or inactive.

Each cube only ever considers its neighbors: any of the 80 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3,w=4, its neighbors include the cube at x=2,y=2,z=3,w=3, the cube at x=0,y=2,z=3,w=4, and so on.

The initial state of the pocket dimension still consists of a small flat region of cubes. Furthermore, the same rules for cycle updating still apply: during each cycle, consider the number of active neighbors of each cube.

For example, consider the same initial state as in the example above. Even though the pocket dimension is 4-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1x1 region of the 4-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z and w coordinate:

Before any cycles:

z=0, w=0
.#.
..#
###


After 1 cycle:

z=-1, w=-1
#..
..#
.#.

z=0, w=-1
#..
..#
.#.

z=1, w=-1
#..
..#
.#.

z=-1, w=0
#..
..#
.#.

z=0, w=0
#.#
.##
.#.

z=1, w=0
#..
..#
.#.

z=-1, w=1
#..
..#
.#.

z=0, w=1
#..
..#
.#.

z=1, w=1
#..
..#
.#.


After 2 cycles:

z=-2, w=-2
.....
.....
..#..
.....
.....

z=-1, w=-2
.....
.....
.....
.....
.....

z=0, w=-2
###..
##.##
#...#
.#..#
.###.

z=1, w=-2
.....
.....
.....
.....
.....

z=2, w=-2
.....
.....
..#..
.....
.....

z=-2, w=-1
.....
.....
.....
.....
.....

z=-1, w=-1
.....
.....
.....
.....
.....

z=0, w=-1
.....
.....
.....
.....
.....

z=1, w=-1
.....
.....
.....
.....
.....

z=2, w=-1
.....
.....
.....
.....
.....

z=-2, w=0
###..
##.##
#...#
.#..#
.###.

z=-1, w=0
.....
.....
.....
.....
.....

z=0, w=0
.....
.....
.....
.....
.....

z=1, w=0
.....
.....
.....
.....
.....

z=2, w=0
###..
##.##
#...#
.#..#
.###.

z=-2, w=1
.....
.....
.....
.....
.....

z=-1, w=1
.....
.....
.....
.....
.....

z=0, w=1
.....
.....
.....
.....
.....

z=1, w=1
.....
.....
.....
.....
.....

z=2, w=1
.....
.....
.....
.....
.....

z=-2, w=2
.....
.....
..#..
.....
.....

z=-1, w=2
.....
.....
.....
.....
.....

z=0, w=2
###..
##.##
#...#
.#..#
.###.

z=1, w=2
.....
.....
.....
.....
.....

z=2, w=2
.....
.....
..#..
.....
.....
After the full six-cycle boot process completes, 848 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles in a 4-dimensional space. How many cubes are left in the active state after the sixth cycle?

Your puzzle answer was 1680.

*/

const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let slice = [];


readInterface.on('line', function(line) {
  let row = [];
  slice.push(line.split(''));
});

readInterface.on('close', function() {
  let currentState = initGrid(30);
  initSlice(currentState, slice);
  for (let cycle = 1; cycle <= 6; cycle++) {
		  let copy = initGrid(currentState.length);
      for (let w = 0; w < currentState.length; w++){
        for (let z = 0; z < currentState.length; z++) {
          for (let i = 0; i < currentState.length; i++) {
            for (let j = 0; j < currentState.length; j++) {
              let activeNeighbors = checkCoordinateForNeighbor(currentState, w, z, i, j);
              if (currentState[w][z][i][j] == '#') {
                if (activeNeighbors == 2 || activeNeighbors == 3) {
                  copy[w][z][i][j] = '#';
                } else {
                  copy[w][z][i][j] = '.';
                }
              } else if (currentState[w][z][i][j] == '.') {
                if (activeNeighbors == 3) {
                  copy[w][z][i][j] = '#';
                } else {
                  copy[w][z][i][j] = '.';
                }
              }
            }
          }
        }
      }
			
			currentState = lodash.cloneDeep(copy);
		}

    //prettyPrintState(currentState);

    console.log(countRemainingActive(currentState));
});

function prettyPrintState(currentState){
  for(let w = 0; w < currentState.length; w++){
    console.log('slice at w =', w);
    for(let z = 0; z < currentState.length; z++){
      console.log('slice at z =', z);
      for(let i = 0; i < currentState[z].length; i++){
        let concat = '';
        for(let j = 0; j < currentState[z][i].length; j++){
        concat += currentState[w][z][i][j];
        }
        console.log(concat);
      }
    }
  }
}

function countRemainingActive(currentState){
  let active = 0;
  for(let w = 0; w < currentState.length; w++){
    for(let z = 0; z < currentState[w].length; z++){
      for(let i = 0; i < currentState[w][z].length; i++){
        for(let j = 0; j < currentState[w][z][i].length; j++){
          if(currentState[w][z][i][j] === '#'){
            active++;
          }
        }
      }
    }
  }

  return active;
}

function checkCoordinateForNeighbor(currentState, w, z, i, j){
  let count = 0;
  for(let wi = -1; wi <= 1; wi++){
    for(let zi = -1; zi <= 1; zi++){
      for(let ii = -1; ii <=1; ii++){
        for(let ji = -1; ji <= 1; ji++){
        if (w + wi >=0 && z + zi >= 0 && i + ii >= 0 && j + ji >= 0) {
              if (w + wi < currentState.length && z + zi < currentState.length && i + ii < currentState.length && i + ji < currentState.length) {
                if (!(wi==0 && zi == 0 && ii == 0 && ji == 0)) {
                  if (currentState[w + wi][z + zi][i + ii][j + ji] == '#') {
                    count++;
                  }
                }
              }
            }
        }
      }
    }
  }
  
  return count;
}

function initGrid(additions){
  let grid = [];
 
  for(let w = 0; w < additions; w++){
    let w_grid = [];
    for(let z = 0; z < additions; z++){
      let z_grid = [];
      for(let i = 0; i < additions; i++){
        let row = [];
        for(let j = 0; j < additions; j++){
          row.push('.');
        }
        z_grid.push(row);
      }
      w_grid.push(z_grid);
    }
    grid.push(w_grid);
  }
  
  
  return grid;
  
}

function initSlice(currentState, slice){
  for(let z = 0; z < currentState.length; z++){
    for (let i = 0; i < slice.length; i++) {
      for (let j = 0; j < slice[i].length; j++) {
        let half = Math.floor(currentState.length/2);
        let halfSlice = Math.floor(slice.length/2);
        currentState[half - halfSlice][half - halfSlice][half - halfSlice + i][half + j] = slice[i][j];
      }
    }
  } 
}
