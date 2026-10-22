import chalk from 'chalk';
import crypto from 'crypto';
import prompts from 'prompts';
import fs from 'fs';

//displays game title, instructions and rules using chalk package
console.log(chalk.bold.bgYellow.white("DESKTOP GUESSING GAME"));    //title
fs.appendFileSync('game-log.txt', "DESKTOP GUESSING GAME\n");
console.log(chalk.blue("Try to guess the random number between " + chalk.underline.bold.bgBlueBright("1-10") + " within " + chalk.underline.bold.bgBlueBright("3") + " guesses")); //instructions
fs.appendFileSync('game-log.txt', "Try to guess the random number between 1-10 within 3 guesses \n");
console.log(chalk.red.bold.underline("Rules:\n") +
            chalk.green("1: Input must be an integer number within 1-10 range (all other inputs are ignored)\n") + 
            chalk.green("2: Have fun :)"));     //rules
fs.appendFileSync('game-log.txt', "Rules:\n1: Input must be an integer number within 1-10 range (all other inputs are ignored)\n2: Have fun :)\n");

//creates const to track number of guesses
const max_guess_amt = 3;

//creates the random number with crypto.randomInt func 
const random_num = crypto.randomInt(1,11);
// console.log(random_num); used to see random numbers


(async () => {
    let is_guessed = false;
    let guess = 1;
    while(guess <= max_guess_amt && is_guessed === false){
        const response = await prompts({
        type: 'number',
        name: 'value',
        message: `Attempt ${guess}/3: Enter your guess`
        });

        fs.appendFileSync('game-log.txt', `Attempt ${guess}/3: Enter your guess\n`);

        try{
            if(String(response.value).trim() === "")
                throw new Error("A guess is required");
            
            if(Number.isInteger(response.value) === false)
                throw new Error("Guess must be an integer");
            
            if(response.value < 1)
                throw new Error("Guess must be at least 1");
            
            if(response.value > 10)
                throw new Error("Guess cannot exceed 10");
        }
        catch(error){
            console.log(chalk.red.bold.underline(error.message));
            fs.appendFileSync('game-log.txt', error.message + "\n");
            continue;
        }

        //too low/too high goes here
        if(response.value > random_num){
            console.log(chalk.yellow("Too High"));
            fs.appendFileSync('game-log.txt', "Too High\n");
        }
        if(response.value < random_num){
            console.log(chalk.yellow("Too Low"));
            fs.appendFileSync('game-log.txt', "Too Low\n");
        }
        if(response.value === random_num){
            is_guessed = true;
        }
        guess++;
    }
    if (is_guessed){
        console.log(chalk.green.bold(`Congrats you guessed the number ${random_num}`));
        fs.appendFileSync('game-log.txt', `Congrats you guessed the number ${random_num}\n`);
    }
    else{
        console.log(chalk.red.bold(`GAME OVER!!! The number was ${random_num}`));
        fs.appendFileSync('game-log.txt', `GAME OVER!!! The number was ${random_num}\n`);
    }
})();


