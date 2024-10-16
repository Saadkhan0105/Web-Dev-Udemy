function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
}

let myCar = new Car("Toyota", "Camry", 2015);
console.log(myCar); // { make: "Toyota", model: "Camry", year: 2015 }

let myNewCar = new Car("Tata", "Safari", 2020);
console.log(myNewCar); // { make: "Tata", model: "Safari", year: 2020 }

function Tea(type) {
    this.type = type;
    this.describe = function() {
        return `this is a cup of ${this.type} tea`;
    }
}

let lemonTea = new Tea("lemon");
console.log(lemonTea.describe()); // this is a cup of lemon tea

function Animal(species) {
    this.species = species;
    this.eat = function() {
        return `The ${this.species} is eating`;
    }
}

Animal.prototype.sound = function() {
    return `The ${this.species} makes a sound`;
}

let lion = new Animal("lion");
console.log(lion.eat()); // The lion is eating

console.log(lion.sound()); // The lion makes a sound

function Drink(name) {
    if(!new.target){
        throw new Error("You must use the 'new' keyword when creating a Drink instance");
    }
    this.name = name;
}

let tea = new Drink("tea"); // Error: You must use the 'new' keyword when creating a Drink instance

// let coffee = Drink("coffee"); // { name: "coffee" }