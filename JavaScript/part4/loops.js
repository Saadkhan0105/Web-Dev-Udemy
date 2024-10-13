/* 
1. Write a `while` loop that calculates the sum of all numbers from 1 to 5 and stores the result in a variable named `sum`.
*/

let sum = 0;
let i = 1;

while (i <= 5) {
  sum += i;
  i++;
}

console.log(sum); // Output: 15

/* 
2. Write a `while` loop that counts down from 5 to 1 and stores the numbers in an array named `countdown`.
*/

let countdown = [];
let j = 5;

while (j >= 1) {
  countdown.push(j);
  j--;
}

console.log(countdown); // Output: [5, 4, 3, 2, 1]

/* 
3. Write a `do while` loop that prompts a user to enter their favorite tea type until they enter `"stop"`. 
   Store each tea type in an array named `teaCollection`.
*/
   
   let teaCollection = [];
   let tea;
   do {
    tea = prompt(`Enter your favorite tea type (or type "stop" to finish): `)
    
    if (tea !== "stop") {
        teaCollection.push(tea);
    }
} while (tea !== "stop");

/* 
4. Write a `do while` loop that adds numbers from 1 to 3 and stores the result in a variable named `total`.
*/

let total = 0;
let k = 1;

do {
  total += k;
  k++;
} while (k <= 3);

console.log(total); // Output: 6

/* 
5. Write a `for` loop that multiplies each element in the array `[2, 4, 6]` by 2 and stores the results in a new array named `multipliedNumbers`.
*/
let multipliedNumbers = [];

for (let l = 0; l < [2, 4, 6].length; l++) {
  multipliedNumbers.push([2, 4, 6][l] * 2);
}

console.log(multipliedNumbers); // Output: [4, 8, 12]

/* 
6. Write a `for` loop that lists all the cities in the array `["Paris", "New York", "Tokyo", "London"]` and stores each city in a new array named `cityList`.
*/
let cityList = [];

for (let m = 0; m < ["Paris", "New York", "Tokyo", "London"].length; m++) {
  cityList.push(["Paris", "New York", "Tokyo", "London"][m]);
}

console.log(cityList); // Output: ["Paris", "New York", "Tokyo", "London"]
