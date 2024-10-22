// Prototypal Inheritance in JavaScript:

function Person(name, age){
    this.name = name;
    this.age = age;
}
Person.prototype.greet = function(){
    console.log(`Hello, I am ${this.name} and I am ${this.age} years old`);
}
let person = new Person("Saad", 25);
person.greet(); // Output: Hello, I am Saad and I am 25 years old
