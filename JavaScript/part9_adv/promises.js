/*
 Promises: A promise is an object that represents the eventual completion or failure of an asynchronous operation. It is used to handle the asynchronous behavior of a function and make it more readable and easier to manage.
A promise can be in one of three states: pending, fulfilled, and rejected.

A promise is created using the Promise constructor. It takes a function as an argument, which is called the executor. The executor function is called immediately when the promise is created, and it is responsible for calling the resolve or reject function to set the promise's state.

The resolve function is called when the operation is successful, and the reject function is called when the operation fails.

Here's an example of a function that fetches data from a server using a promise:
*/
function fetchData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let success = true;
            if (success) {
                resolve("Data fetched successfully");
            } else {
                reject("Failed to fetch data");
            }
        }, 5000)
    })
}

fetchData()
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    })