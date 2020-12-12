/*

--- Part Two ---

Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

    Action N means to move the waypoint north by the given value.
    Action S means to move the waypoint south by the given value.
    Action E means to move the waypoint east by the given value.
    Action W means to move the waypoint west by the given value.
    Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
    Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
    Action F means to move forward to the waypoint a number of times equal to the given value.

The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

    F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
    N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100, north 10.
    F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east 170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
    R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of the ship. The ship remains at east 170, north 38.
    F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.

After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?

Your puzzle answer was 22848.

*/

const fs = require('fs');
const readline = require('readline');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let pos = [0,0];
let waypointPos = [10, 1];
let instructionRegex = new RegExp("(.){1}(\\d*)");

readInterface.on('line', function(line) {
    let matches = instructionRegex.exec(line);
    //console.log(matches);
    if(matches !== null){
      let command = matches[1];
      let amount = parseInt(matches[2]);
      console.log(command, amount);
      switch(command){
        case 'F':
          pos = handleForward(pos, waypointPos, amount);
          break;
        case 'N':
          waypointPos[1] += amount;
          break;
        case 'S':
          waypointPos[1] -= amount;
          break;
        case 'E':
          waypointPos[0] += amount;
          break;
        case 'W':
          waypointPos[0] -= amount;
          break;
        case 'L':
          waypointPos = handleLeft(waypointPos, amount);
          break;
        case 'R':
          waypointPos = handleRight(waypointPos, amount);
          break;
      }
    }
    else{
      console.log("Something is wrong with the instruction regex");
    }

    console.log(pos, waypointPos, Math.abs(pos[1]) + Math.abs(pos[0]));
});

readInterface.on('close', function() {
  
});

function handleLeft(waypointPos, amount){
  let turn = 0;
  while(turn < amount){
    let temp = waypointPos[0];

    if(waypointPos[0] >= 0 && waypointPos[1] >= 0){
        waypointPos[0] = -waypointPos[1];
        waypointPos[1] = temp;
    }
    else if(waypointPos[0] < 0 && waypointPos[1] >= 0){
        waypointPos[0] = -waypointPos[1];
        waypointPos[1] = temp;
    }
    else if(waypointPos[0] >= 0 && waypointPos[1] < 0){
        waypointPos[0] = 0 - waypointPos[1];
        waypointPos[1] = temp;
    }
    else if(waypointPos[0] < 0 && waypointPos[1] < 0){
      waypointPos[0] = 0 - waypointPos[1];
      waypointPos[1] = temp;
    }


    turn += 90;
  }

  return waypointPos;
}

function handleRight(waypointPos, amount){
  let turn = 0;
  while(turn < amount){
    let temp = waypointPos[0];

    if(waypointPos[0] >= 0 && waypointPos[1] >= 0){
        waypointPos[0] = waypointPos[1];
        waypointPos[1] = -temp;
    }
    else if(waypointPos[0] < 0 && waypointPos[1] >= 0){
        waypointPos[0] = waypointPos[1];
        waypointPos[1] = 0 - temp;
    }
    else if(waypointPos[0] >= 0 && waypointPos[1] < 0){
        waypointPos[0] = waypointPos[1];
        waypointPos[1] = -temp;
    }
    else if(waypointPos[0] < 0 && waypointPos[1] < 0){
      waypointPos[0] = waypointPos[1];
      waypointPos[1] = 0 - temp;
    }


    turn += 90;
  }

  return waypointPos;
}

function handleForward(currentPosition, waypointPos, times){
  currentPosition[0] += waypointPos[0]*times;
  currentPosition[1] += waypointPos[1]*times;

  return currentPosition;
}
