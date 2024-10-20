/*
what is the difference between arrow function and normal function?

In JavaScript, function() { console.log(this); } and () => { console.log(this); } are two different ways to define a function, and they have different behaviors when it comes to the value of this.

Function Declaration

function() { console.log(this); } is a function declaration, also known as a "traditional" function. When you call this function, the value of this is determined by the context in which the function is called.

- If you call the function as a global function, this will refer to the global object (usually the window object in a browser or the global object in a Node.js environment).
- If you call the function as a method of an object, this will refer to that object.
- If you call the function using new, this will refer to the newly created object.
Arrow Function

() => { console.log(this); } is an arrow function, which is a shorthand way to define a function. When you call an arrow function, the value of this is determined by the context in which the function is defined, not by the context in which it is called.

- If you define the arrow function in a global scope, this will refer to the global object (usually the window object in a browser or the global object in a Node.js environment).
- If you define the arrow function inside an object or a class, this will refer to that object or class.
- If you define the arrow function inside another function, this will refer to the this value of the outer function.

// Global scope
function traditionalFunction() {
  console.log(this); // logs the global object (window or global)
}
traditionalFunction();

const arrowFunction = () => {
  console.log(this); // logs the global object (window or global)
};
arrowFunction();

// Object scope
const obj = {
  traditionalFunction: function() {
    console.log(this); // logs the obj object
  },
  arrowFunction: () => {
    console.log(this); // logs the global object (window or global)
  }
};
obj.traditionalFunction();
obj.arrowFunction();

// Class scope
class MyClass {
  traditionalFunction() {
    console.log(this); // logs the MyClass instance
  }
  arrowFunction = () => {
    console.log(this); // logs the MyClass instance
  }
}
const myInstance = new MyClass();
myInstance.traditionalFunction();
myInstance.arrowFunction();
*/

// Example 1

document.getElementById("changeTextButton").addEventListener("click", function () {
    let paragraph = document.getElementById("myParagraph");
    paragraph.textContent = "The paragraph has been changed!";
});

// Example 2: Traversing the DOM

document.getElementById("highlightFirstCity").addEventListener("click", function () {
    let citiesList = document.getElementById("citiesList");
    citiesList.firstElementChild.classList.add("highlight");
    
});

// Example 3: Manipulating DOM Elements

document.getElementById("changeOrder").addEventListener("click", function () {    
    let coffeeType = document.getElementById("coffeeType");coffeeType.textContent = "Espresso";    
    coffeeType.style.backgroundColor = "brown";
    coffeeType.style.padding = "5px";
});

// Example 4: Creating and Inserting Elements

document.getElementById("addNewItem").addEventListener("click", function () {
    let newItem = document.createElement("li");
    newItem.textContent = "Eggs";
    document.getElementById("shoppingList").appendChild(newItem);
});

// Example 5: Removing DOM Elements

document.getElementById("removeLastTask").addEventListener("click", function () {
    let taskList = document.getElementById("taskList");
    taskList.lastElementChild.remove();
});

// Example 6: Event Handling in the DOM

document.getElementById("clickMeButton").addEventListener("click", function () {
    alert("You clicked me!");
});

// Example 7: Event Delegation

document.getElementById("teaList").addEventListener("click", function (event) {
    if (event.target.classList.contains("teaItem")) {
        event.target.style.backgroundColor = "red";
    }
});

// Example 8: Form Handling

document.getElementById("feedbackForm").addEventListener("submit", function (event) {
    event.preventDefault();
    let feedback = document.getElementById("feedbackInput").value;
    // document.getElementById("feedbackOutput").textContent = feedback;
    // document.getElementById("feedbackForm").reset();
    document.getElementById("feedbackDisplay").textContent = `Feedback is: ${feedback}`;
});

// Example 9: Local Storage

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("domStatus").textContent = "DOM Loaded";
})

// Example 10: CSS Classes Manipulation

document.getElementById("toggleHighlight").addEventListener("click", function () {
    let descriptionText = document.getElementById("descriptionText").classList.toggle("highlight");
    descriptionText.classList.toggle("highlight");
});
