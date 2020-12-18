/*

--- Part Two ---
You manage to answer the child's questions and they finish part 1 of their homework, but get stuck when they reach the next section: advanced math.

Now, addition and multiplication have different precedence levels, but they're not the ones you're familiar with. Instead, addition is evaluated before multiplication.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are now as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
  3   *   7   * 5 + 6
  3   *   7   *  11
     21       *  11
         231
Here are the other examples from above:

1 + (2 * 3) + (4 * (5 + 6)) still becomes 51.
2 * 3 + (4 * 5) becomes 46.
5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 1445.
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 669060.
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 23340.
What do you get if you add up the results of evaluating the homework problems using these new rules?

Your puzzle answer was 283729053022731.

*/

const fs = require('fs');
const readline = require('readline');
const lodash = require('lodash');

const readInterface = readline.createInterface({
    input: fs.createReadStream('input.txt')
});

let sum = 0;

readInterface.on('line', function(line) {
  let stack = [];
  line.split('').forEach(e => {
    if(e != ' '){
      stack.push(e);
    }
  });

  sum += processStack(stack);

});

readInterface.on('close', function() {
  console.log(sum);
});

let operators = ['+','*'];

function processStack(stack){
  let value = 0;
  let nextInstruction = '';
  
  while(stack.length){
    if(operators.includes(stack[0])){
      nextInstruction = stack.shift();
    }
    else if(stack[0] == '('){
      let newStack = [];
      let seenParen = [stack.shift()];
      while(seenParen.length){
        if(stack[0] == '('){
          seenParen.push('(');
          newStack.push(stack.shift());
        }
        else if(stack[0] == ')'){
          if(seenParen.length === 1){
            seenParen.shift();
            stack.shift();
          }
          else {
            newStack.push(stack.shift());
            seenParen.shift();
          }
        }
        else{
          newStack.push(stack.shift());
        }
      }

      stack.unshift(processStack(newStack));

    }
    else{
      switch(nextInstruction){
        case '':
          value = parseInt(stack.shift());
          break;
        case '+':
          value += parseInt(stack.shift());
          break;
        case '*':
          if(stack.length > 1){
              let newStack = [];
              while(stack.length !== 0){
                newStack.push(stack.shift());
              }
              value *= processStack(newStack);
          }
          else {
            value *= parseInt(stack.shift());
          }
          break;
      }
    }
  }
  return value;
}
