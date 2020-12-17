/*

--- Day 17: Conway Cubes ---
As your flight slowly drifts through the sky, the Elves at the Mythical Information Bureau at the North Pole contact you. They'd like some help debugging a malfunctioning experimental energy source aboard one of their super-secret imaging satellites.

The experimental energy source is based on cutting-edge technology: a set of Conway Cubes contained in a pocket dimension! When you hear it's having problems, you can't help but agree to take a look.

The pocket dimension contains an infinite 3-dimensional grid. At every integer 3-dimensional coordinate (x,y,z), there exists a single cube which is either active or inactive.

In the initial state of the pocket dimension, almost all cubes start inactive. The only exception to this is a small flat region of cubes (your puzzle input); the cubes in this region start in the specified active (#) or inactive (.) state.

The energy source then proceeds to boot up by executing six cycles.

Each cube only ever considers its neighbors: any of the 26 other cubes where any of their coordinates differ by at most 1. For example, given the cube at x=1,y=2,z=3, its neighbors include the cube at x=2,y=2,z=2, the cube at x=0,y=2,z=3, and so on.

During a cycle, all cubes simultaneously change their state according to the following rules:

If a cube is active and exactly 2 or 3 of its neighbors are also active, the cube remains active. Otherwise, the cube becomes inactive.
If a cube is inactive but exactly 3 of its neighbors are active, the cube becomes active. Otherwise, the cube remains inactive.
The engineers responsible for this experimental energy source would like you to simulate the pocket dimension and determine what the configuration of cubes should be at the end of the six-cycle boot process.

For example, consider the following initial state:

.#.
..#
###
Even though the pocket dimension is 3-dimensional, this initial state represents a small 2-dimensional slice of it. (In particular, this initial state defines a 3x3x1 region of the 3-dimensional space.)

Simulating a few cycles from this initial state produces the following configurations, where the result of each cycle is shown layer-by-layer at each given z coordinate (and the frame of view follows the active cells in each cycle):

Before any cycles:

z=0
.#.
..#
###


After 1 cycle:

z=-1
#..
..#
.#.

z=0
#.#
.##
.#.

z=1
#..
..#
.#.


After 2 cycles:

z=-2
.....
.....
..#..
.....
.....

z=-1
..#..
.#..#
....#
.#...
.....

z=0
##...
##...
#....
....#
.###.

z=1
..#..
.#..#
....#
.#...
.....

z=2
.....
.....
..#..
.....
.....


After 3 cycles:

z=-2
.......
.......
..##...
..###..
.......
.......
.......

z=-1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=0
...#...
.......
#......
.......
.....##
.##.#..
...#...

z=1
..#....
...#...
#......
.....##
.#...#.
..#.#..
...#...

z=2
.......
.......
..##...
..###..
.......
.......
.......
After the full six-cycle boot process completes, 112 cubes are left in the active state.

Starting with your given initial configuration, simulate six cycles. How many cubes are left in the active state after the sixth cycle?

Your puzzle answer was 263.

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
  let currentState = initGrid(50);
  initSlice(currentState, slice);
  for (let cycle = 1; cycle <= 6; cycle++) {
		  let copy = initGrid(currentState.length);
			for (let z = 0; z < currentState.length; z++) {
				for (let i = 0; i < currentState.length; i++) {
					for (let j = 0; j < currentState.length; j++) {
						let activeNeighbors = checkCoordinateForNeighbor(currentState, z, i, j);
						if (currentState[z][i][j] == '#') {
							if (activeNeighbors == 2 || activeNeighbors == 3) {
								copy[z][i][j] = '#';
							} else {
								copy[z][i][j] = '.';
							}
						} else if (currentState[z][i][j] == '.') {
							if (activeNeighbors == 3) {
								copy[z][i][j] = '#';
							} else {
								copy[z][i][j] = '.';
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
  for(let z = 0; z < currentState.length; z++){
    console.log('slice at z =', z);
    for(let i = 0; i < currentState[z].length; i++){
      let concat = '';
      for(let j = 0; j < currentState[z][i].length; j++){
       concat += currentState[z][i][j];
      }
       console.log(concat);
    }
    
  }
}

function countRemainingActive(currentState){
  let active = 0;
  for(let z = 0; z < currentState.length; z++){
    for(let i = 0; i < currentState[z].length; i++){
      for(let j = 0; j < currentState[z][i].length; j++){
        if(currentState[z][i][j] === '#'){
          active++;
        }
      }
    }
  }

  return active;
}

function checkCoordinateForNeighbor(currentState, z, i, j){
  let count = 0;
  for(let zi = -1; zi <= 1; zi++){
    for(let ii = -1; ii <=1; ii++){
      for(let ji = -1; ji <= 1; ji++){
       if (z + zi >= 0 && i + ii >= 0 && j + ji >= 0) {
						if (z + zi < currentState.length && i + ii < currentState.length && i + ji < currentState.length) {
							if (!(zi == 0 && ii == 0 && ji == 0)) {
								if (currentState[z + zi][i + ii][j + ji] == '#') {
									count++;
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
 
  for(let z = 0; z < additions; z++){
    let z_grid = [];
    for(let i = 0; i < additions; i++){
      let row = [];
      for(let j = 0; j < additions; j++){
        row.push('.');
      }
      z_grid.push(row);
    }
    grid.push(z_grid);
  }
  
  return grid;
  
}

function initSlice(currentState, slice){
  for (let i = 0; i < slice.length; i++) {
    for (let j = 0; j < slice[i].length; j++) {
      let half = Math.floor(currentState.length/2);
      let halfSlice = Math.floor(slice.length/2);
      currentState[half - halfSlice][half - halfSlice + i][half + j] = slice[i][j];
    }
  }		
}
