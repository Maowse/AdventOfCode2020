/*

--- Day 18: Operation Order ---
As you look out the window and notice a heavily-forested continent slowly appear over the horizon, you are interrupted by the child sitting next to you. They're curious if you could help them with their math homework.

Unfortunately, it seems like this "math" follows different rules than you remember.

The homework (your puzzle input) consists of a series of expressions that consist of addition (+), multiplication (*), and parentheses ((...)). Just like normal math, parentheses indicate that the expression inside must be evaluated before it can be used by the surrounding expression. Addition still finds the sum of the numbers on both sides of the operator, and multiplication still finds the product.

However, the rules of operator precedence have changed. Rather than evaluating multiplication before addition, the operators have the same precedence, and are evaluated left-to-right regardless of the order in which they appear.

For example, the steps to evaluate the expression 1 + 2 * 3 + 4 * 5 + 6 are as follows:

1 + 2 * 3 + 4 * 5 + 6
  3   * 3 + 4 * 5 + 6
      9   + 4 * 5 + 6
         13   * 5 + 6
             65   + 6
                 71
Parentheses can override this order; for example, here is what happens if parentheses are added to form 1 + (2 * 3) + (4 * (5 + 6)):

1 + (2 * 3) + (4 * (5 + 6))
1 +    6    + (4 * (5 + 6))
     7      + (4 * (5 + 6))
     7      + (4 *   11   )
     7      +     44
            51
Here are a few more examples:

2 * 3 + (4 * 5) becomes 26.
5 + (8 * 3 + 9 + 3 * 4 * 3) becomes 437.
5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4)) becomes 12240.
((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2 becomes 13632.
Before you can help with the homework, you need to understand it yourself. Evaluate the expression on each line of the homework; what is the sum of the resulting values?

Your puzzle answer was 11076907812171.

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

  //console.log(stack);
  // console.log(processStack(stack));
  sum += processStack(stack);

});

readInterface.on('close', function() {
  console.log(sum);
});

let operators = ['+','*'];
let parenthesis = {'(': ')'};


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
      
      if(nextInstruction === '+'){
        value += processStack(newStack);
      }
      else if(nextInstruction === '*'){
        value *= processStack(newStack);
      }
      else{
        value = processStack(newStack);
      }
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
          value *= parseInt(stack.shift());
          break;
      }
      nextInstruction = '';
    }
  }
  return value;
}
