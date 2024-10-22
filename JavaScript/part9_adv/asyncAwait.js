// Async Await: Async Await is a new feature in JavaScript that allows developers to write asynchronous code that looks like synchronous code. It is a way to handle asynchronous operations like reading or writing files, making HTTP requests, and more.

// Example: Fetching User Data using Async Await
function fetchUserData(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({name:"chaicode", url:"https://chaicode.com"})
        }, 2000);
    })
} 

async function getUserData(){
    try{
        console.log('Fetching user data...');
        const userData = await fetchUserData();
        console.log("User data fetched: ", userData.name);
        
        console.log("User data: ", userData);
        
        
    } catch (error) {
        console.log("Error fetching user data: ", error);
    }
}
getUserData()