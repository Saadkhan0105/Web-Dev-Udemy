// THIS CONTEXT IN JAVASCRIPT: 
// In JavaScript, this refers to the object that the function is being called on. 
// If the function is called on the global object, this refers to the global object. 
// If the function is called on an object, this refers to that object.

const person = {
    name: "Saad",
    greet(){
        console.log(`Hi, I am ${this.name}`);
        
    },
};

person.greet();
const greetFunction = person.greet;
greetFunction();

// In the above example, the greet function is called on the person object. 
// The this keyword in the greet function refers to the person object.
// When the greetFunction is called, it is not called on the person object, but on the global object.
// Therefore, this refers to the global object in this case.
// To fix this, we can use the bind method to bind the greet function to the person object.

const greetFunction2 = person.greet.bind({name: "Khan"});
greetFunction2();
// In the above example, we are binding the greet function to the person object with the name "Khan".
// This will make the greet function refer to the person object with the name "Khan" instead of the global object.

//bind, call and apply methods are used to bind the this keyword to a specific object.
//bind method returns a new function with the this keyword bound to the object passed as an argument.
//call and apply methods immediately invoke the function with the this keyword bound to the object passed as an argument.
//call method takes a list of arguments, while apply method takes an array of arguments.
//bind method returns a new function, call and apply methods immediately invoke the function.

// call method
person.greet.call({name: "Abuzar"});
// apply method
person.greet.apply({name: "Ronaldo"});

