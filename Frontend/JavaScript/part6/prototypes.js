let computer = {cpu: 12}
let lenovo = {
    screen:"HD",
    __proto__: computer
}
let tomHardware = {}
// console.log(`lenovo`, lenovo.__proto__)

let genericCar = {tyres: 4}

let tesla = {
    driver: "AI"
}

Object.setPrototypeOf(tesla, genericCar)

console.log(`tesla`, Object.getPrototypeOf(tesla));
console.log(`tesla`, Object.getPrototypeOf(genericCar));
console.log(`tesla`, Object.getPrototypeOf(lenovo));
console.log(`tesla`, Object.getPrototypeOf(computer)); 

console.log(`tesla`, Object.getOwnPropertyNames(genericCar));  
console.log(`tesla`, Object.getOwnPropertyNames(tesla));

console.log(`tesla`, Object.keys(genericCar));
console.log(`tesla`, Object.keys(tesla));  

console.log(`tesla`, Object.getOwnPropertyDescriptor(genericCar, "tyres")); 
console.log(`tesla`, Object.getOwnPropertyDescriptor(tesla, "tyres"));

console.log(`tesla`, Object.getOwnPropertyDescriptors(genericCar));
console.log(`tesla`, Object.getOwnPropertyDescriptors(tesla));

console.log(`tesla`, Object.values(genericCar));
console.log(`tesla`, Object.values(tesla));

console.log(`tesla`, Object.entries(genericCar));
console.log(`tesla`, Object.entries(tesla));

console.log(`tesla`, Object.assign({}, genericCar, tesla));

console.log(`tesla`, Object.is(genericCar, tesla));
console.log(`tesla`, Object.is(tesla, tesla));

console.log(`tesla`, Object.isExtensible(genericCar));
console.log(`tesla`, Object.isExtensible(tesla));

console.log(`tesla`, Object.isFrozen(genericCar));
console.log(`tesla`, Object.isFrozen(tesla));

console.log(`tesla`, Object.isSealed(genericCar));
console.log(`tesla`, Object.isSealed(tesla));

console.log(`tesla`, Object.preventExtensions(genericCar));
console.log(`tesla`, Object.preventExtensions(tesla));

console.log(`tesla`, Object.seal(genericCar));
console.log(`tesla`, Object.seal(tesla)); 


console.log(`tesla`, Object.hasOwnProperty(genericCar));
console.log(`tesla`, Object.hasOwnProperty(tesla));

console.log(`tesla`, tesla.tyres);
console.log(`tesla`, tesla.driver);



