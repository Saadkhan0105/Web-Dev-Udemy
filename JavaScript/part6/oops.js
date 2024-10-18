let car = {
    make: "Toyota",
    model: "Camry",
    year: 2015,

    drive: function() {
        return `${this.make} car got started in ${this.year}`;
    },
}

console.log(car.drive())

function Person(name, age) {
    this.name = name;
    this.age = age;
}

let john = new Person("John", 25);

console.log(john.age);

function Animal(type){
    this.type = type;
    // this.eat = function(){
    //     return `${this.type} is eating`;
    // }
}

Animal.prototype.eat = function(){
    return `${this.type} is eating`;
}
Array.prototype.saad = function(){
    return `Custom method ${this}`;
}
let myArray = [1, 2, 3];
console.log(myArray.saad())
let myNewArray = [1, 2, 3, 4, 5, 6];
console.log(myNewArray.saad());

class Vehicle{
    constructor(make, model, year){
        this.make = make;
        this.model = model;
        this.year = year;
    }
    start(){
        return `${this.make} ${this.model} got started in ${this.year}`;
    }
}

class Car extends Vehicle{
    drive(){
        return `${this.make} : This is an example of inheritance`;
    }
}

let myCar = new Car("Toyota", "Camry", 2015);
console.log(myCar.start());
console.log(myCar.drive());

let vehOne = new Vehicle("Toyota", "Corolla", 2020);
console.log(vehOne.make);

// Encapsulation: Encapsulation is the process of hiding the implementation details of an object and exposing only the necessary functionality to the user. In JavaScript, encapsulation is achieved through the use of private variables and methods.
class BankAccount{
    #balance = 0;

    deposit(amount){
        this.#balance += amount;
        return this.#balance;
    }
    getBalance(){
        return `$ ${this.#balance}`
    }
}

let account = new BankAccount();
console.log(account.getBalance());

// Abstraction: Abstraction is the process of hiding the complex details of an object and showing only the necessary information to the user. In JavaScript, abstraction is achieved through the use of classes and objects.

class CoffeeMachine{
    start(){
        return `Starting the machine...`
    }
    brewCoffee(){
        return `Brewing coffee...`
    }
    pressStartButton(){
        let messageOne = this.start();
        let messageTwo = this.brewCoffee();
        return `${messageOne} ${messageTwo} Coffee is ready!`;        
    }
}

let myMachine = new CoffeeMachine();
// console.log(myMachine.start());
// console.log(myMachine.brewCoffee());
console.log(myMachine.pressStartButton());

// Polymorphism: Polymorphism is the ability of an object to take on multiple forms. In JavaScript, polymorphism is achieved through method overloading and method overriding.

class Bird{
    fly(){
        return `Flying...`
    }
}

class Penguin extends Bird{
    fly(){
        return `Penguins can't fly.`
    }
}

let bird = new Bird();
let penguin = new Penguin();

console.log(bird.fly());
console.log(penguin.fly());

// static method: A static method is a method that belongs to a class, rather than an instance of the class.


class Calculator{
    static add(num1, num2){
        return num1 + num2;
    }
}

console.log(Calculator.add(2, 3));

// getters and setters: A getter is a method that returns a value of an object property, and a setter is a method that sets the value of an object property.

class Employee{

    #salary;
    constructor(name, salary){
        if (salary < 0){
            throw new Error("Salary cannot be negative");
        }
        this.name = name;
        this.#salary = salary;
    }

    get salary(){
        return `You are not allowed to access the salary.`;
    }

    set salary(value){
        if(value < 0){
            console.log("Salary cannot be negative");
        } else {
            this._salary = value;
        }
    }
}

let emp = new Employee("John", 50000);
console.log(emp.salary);

emp.salary = 60000;
