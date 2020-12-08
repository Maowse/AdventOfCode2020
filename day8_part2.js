/*

--- Part Two ---
After some careful analysis, you believe that exactly one instruction is corrupted.

Somewhere in the program, either a jmp is supposed to be a nop, or a nop is supposed to be a jmp. (No acc instructions were harmed in the corruption of this boot code.)

The program is supposed to terminate by attempting to execute an instruction immediately after the last instruction in the file. By changing exactly one jmp or nop, you can repair the boot code and make it terminate correctly.

For example, consider the same program from above:

nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
If you change the first instruction from nop +0 to jmp +0, it would create a single-instruction infinite loop, never leaving that instruction. If you change almost any of the jmp instructions, the program will still eventually find another jmp instruction and loop forever.

However, if you change the second-to-last instruction (from jmp -4 to nop -4), the program terminates! The instructions are visited in this order:

nop +0  | 1
acc +1  | 2
jmp +4  | 3
acc +3  |
jmp -3  |
acc -99 |
acc +1  | 4
nop -4  | 5
acc +6  | 6
After the last instruction (acc +6), the program terminates by attempting to run the instruction below the last instruction in the file. With this change, after the program terminates, the accumulator contains the value 8 (acc +1, acc +1, acc +6).

Fix the program so that it terminates normally by changing exactly one jmp (to nop) or nop (to jmp). What is the value of the accumulator after the program terminates?

*/

const fs = require("fs");
const readline = require('readline');

let accValue = 0;
let instructionArr = [];

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

readInterface.on('line', function(line) {
    instructionArr.push(line);
});

let commandRegex = new RegExp('^(\\+|-)(.*)$');

readInterface.on('close', function() {
  //test different instruction arrays
  testForLoop(instructionArr);
  for(let i = 0; i < instructionArr.length; i++){
    let instructionArrayCopy = [...instructionArr];
    if(instructionArr[i].indexOf('nop') !== -1){
      instructionArrayCopy[i] = instructionArr[i].replace('nop', 'jmp');
    }
    else if(instructionArr[i].indexOf('jmp') !== -1){
      instructionArrayCopy[i] = instructionArr[i].replace('jmp', 'nop');
    }
    else {
      continue;
    }

    let test = testForLoop(instructionArrayCopy);
      if(test === false){
        console.log('still got a loop, continue');
      }
      else {
        console.log('found one without a loop! Value:', test);
        break;
      }
  }
});

function testForLoop(instructionArr){
  let accValue = 0;
  let seenIndexes = new Set();
  let nextInstruction = instructionArr[0];
  let currentIndex = 0;
  
  while(nextInstruction !== undefined){
    if(seenIndexes.has(currentIndex)){
      // infinite loop
      return false;
    }

    // do the command
    let args = nextInstruction.split(" ");
    let command = args[0];
    let value = args[1];

    seenIndexes.add(currentIndex);
    
    switch(command){
      case 'nop':
        currentIndex++;
        break;
      case 'acc':
        let matches = commandRegex.exec(value);
        if(matches !== null){
          let operation = matches[1];
          let operationValue = parseInt(matches[2]);
          switch(operation){
            case '+':
              accValue += operationValue;
              break;
            case '-':
              accValue -= operationValue;
              break;
          }
        }
        currentIndex++;
        break;

      case 'jmp':
        let jmpMatches = commandRegex.exec(value);
        if(jmpMatches !== null){
          let jmpOperation = jmpMatches[1];
          let jmpOperationValue = parseInt(jmpMatches[2]);
          switch(jmpOperation){
            case '+':
              currentIndex += jmpOperationValue;
              break;
            case '-':
              currentIndex -= jmpOperationValue;
              break;
          }
        }
        break;
        
    }

    nextInstruction = instructionArr[currentIndex];
  }
  return accValue;
}
