// Check if a number is greater than anohther number:

let num1 = 12;
let num2 = 8;
console.log("I am regular upper code");

if (num2 > num1) {
    console.log(num1 + " is greater than " + num2);
} else {
    console.log(num2 + " is not greater than " + num1);
}

console.log("I am regular bottom code");
// Check if a string is equal to another string:

let username = "chai"
let anotherUsername = "tea"

if (username == anotherUsername) {
    console.log("The usernames are equal");
} else {
    console.log("The usernames are not equal");
}


// Checking if a variable is a number or not:

let num = "12abc";

if (typeof num === "number") {
    console.log("The variable is a number");
} else {
    console.log("The variable is not a number");
}

// Checking if a variable is a string or not:

let str = 123;

if (typeof str === "string") {
    console.log("The variable is a string");
    } else {
        console.log("The variable is not a string");
    }
// Checking if a variable is a boolean or not:

let bool = true;
        if (typeof bool === "boolean") {
            console.log("The variable is a boolean");
            } else {
                console.log("The variable is not a boolean");
                }

// Check if a boolean value is true or false:

let isLoggedIn = false;

    
if (isLoggedIn) {
    console.log("The user is logged in");
} else {
    console.log("The user is not logged in");
}

// Check if array is empty or not:

let arr = [1, 2, 3];

if (arr.length === 0) {
    console.log("The array is empty");
} else {
    console.log("The array is not empty");
}