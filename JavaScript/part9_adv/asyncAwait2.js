function fetchPostData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Post Data Fetched")
        }, 2000);
    });
}
function fetchCommentData(){
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Comment Data Fetched")
        }, 3000);
    });
}

async function getBlogData() {
    try {
        console.log("Fetching blog data...");
        // const blogData = await fetchPostData();
        // const commentData = await fetchCommentData();
        const [postData, commentData] = await Promise.all([fetchPostData(), fetchCommentData()]);
        console.log("Blog data fetched: ", postData);
        console.log("Comment data fetched: ", commentData);

        console.log("Fetch Complete!");   
    } catch (error) {
        console.error("Error fetching blog data: ", error);    
    }
}
getBlogData();