let gameName = "Guess the Number";

gameName = "Guess the Number 2";

console.log(gameName); // Output: "Guess the Number 2"

const gameDescription = "Guess a number between 1 and 100";

console.log(gameDescription); // Output: "Guess a number between 1 and 100"

/*
gameDescription = "Guess a number between 1 and 200";
console.log(gameDescription); // Output: "Guess a number between 1 and 200"

The gameDescription variable is a constant, which means it cannot be reassigned a new value.
If we try to do so, we will get a TypeError: Assignment to constant variable.
This is because the value of a constant cannot be changed once it is set.
If we want to change the value of a constant, we need to declare a new variable and assign it the new value.
*/

// In this case, we can declare a new variable and assign it the new value:

const newGameDescription = "Guess a number between 1 and 300";
console.log(newGameDescription); // Output: "Guess a number between 1 and 300"


