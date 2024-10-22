// Closure in JavaScript: A closure is an inner function that has access to the variables in the outer function's scope.

function outer() {
    let counter = 4
    return function(){
        counter++;
        return counter;
    }
}
let increment = outer();
console.log(increment());
console.log(increment());
console.log(increment());
