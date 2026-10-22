import chalk from 'chalk';
import crypto from 'crypto';
import prompts from 'prompts';

//displays game title, instructions and rules using chalk package
console.log(chalk.bold.bgYellow.white("DESKTOP GUESSING GAME"));    //title
console.log(chalk.blue("Try to guess the random number between " + chalk.underline.bold.bgBlueBright("1-10") + " within " + chalk.underline.bold.bgBlueBright("3") + " guesses")); //instructions
console.log(chalk.red.bold.underline("Rules:\n") +
            chalk.green("1: Input must be an integer number within 1-10 range (all other inputs are ignored)\n") + 
            chalk.green("2: Have fun :)"));     //rules

//creates const to track number of guesses
const guess_amt = 3;

//creates the random number with crypto.randomInt func 
const random_num = crypto.randomInt(1,10);
// console.log(random_num); used to see random numbers

(async () => {
  const response = await prompts({
    type: 'number',
    name: 'value',
    message: 'Attempt 1/3: Enter your guess'
  });

  console.log(response.value);
})();


