//Number
let balance = 105;
let anotherBalance = new Number(105);

console.log(balance); // Output: 105
console.log(anotherBalance.valueOf); // Output: 105
console.log(typeof anotherBalance); // Output: object
console.log(typeof balance); // Output: number

// Boolean
let isLoggedIn = true;
let anotherIsLoggedIn = new Boolean(true); // not recommended

// null and undefined
let user = null;
console.log(user); // Output: null  

let anotherUser = undefined;
console.log(anotherUser); // Output: undefined

// String
let myString = "Hello World";
let myStringOne = 'hola'
let username = 'Saad'

let oldGreet = myString + " Saad";
console.log(oldGreet); // Output: Hello World Saad


let greetMessage = `Hello ${username}, how are you today?` 
// console.log(greetMessage); // Output: Hello Saad, how are you today?

// Symbol
let sym1 = Symbol('id');
let sym2 = Symbol('id');

// console.log(sym1 == sym2); // Output: false
console.log(sym1.description);
console.log(sym2.description);
