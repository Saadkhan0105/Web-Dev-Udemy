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