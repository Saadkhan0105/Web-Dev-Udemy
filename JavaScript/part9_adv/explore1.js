function sayHello(name) {
    console.log("I would like to say Hello");
}

setTimeout(() =>{
    sayHello();
}, 5000)
    
console.log("Hello World!");

for (let index = 0; index < 10; index++) {
    console.log(index);
}