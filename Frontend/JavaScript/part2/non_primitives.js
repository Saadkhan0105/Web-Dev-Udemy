let username = {
    firstname: "John",
    isLoggedIn: true
}
username.firstname = "Saad";
username.lastname = "Khan";

console.log(username.firstname); // Output: Saad
console.log(username.lastname); // Output: Khan
console.log(username.isLoggedIn); // Output: true

let obj = {name: "John", age: 30, city: "New York"};

// Accessing properties using dot notation
console.log(obj.name); // Output: John
console.log(obj.age); // Output: 30
console.log(obj.city); // Output: New York

// Accessing properties using bracket notation
console.log(obj["name"]); // Output: John
console.log(obj["age"]); // Output: 30
console.log(obj["city"]); // Output: New York

// Adding new properties to the object using dot notation
obj.email = "john@example.com";
console.log(obj.email); // Output: john@example.com

// Adding new properties to the object using bracket notation
obj["phone"] = "123-456-7890";
console.log(obj.phone); // Output: 123-456-7890

// Deleting properties from the object using dot notation
delete obj.age;
console.log(obj.age); // Output: undefined

// Deleting properties from the object using bracket notation
delete obj["city"];
console.log(obj.city); // Output: undefined

// Accessing non-existent properties using dot notation
console.log(obj.gender); // Output: undefined

// Accessing non-existent properties using bracket notation
console.log(obj["gender"]); // Output: undefined


let today = new Date();
console.log(today.getDay()); // Output: 2021-10-12T15:30:00.000Z

// Array
let heroes = ["Iron Man", "Hulk", "Thor", true];
