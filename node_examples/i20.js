const axios = require('axios');

// Function to fetch a user's details (User Tier)
async function fetchUser(userId) {
    console.log(`Fetching details for User ${userId}`);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
    const user = response.data;
    
    // Nested tier: Fetch the user's posts after fetching user details
    const posts = await fetchUserPosts(userId);
    return { ...user, posts };  // Return user with posts
}

// Function to fetch the user's posts (Post Tier)
async function fetchUserPosts(userId) {
    console.log(`Fetching posts for User ${userId}`);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = response.data;
    
    // Nested tier: Fetch comments for each post
    const postPromises = posts.map(post => fetchPostComments(post.id));  // Fetch comments for each post
    const postsWithComments = await Promise.all(postPromises);  // Wait for all posts to fetch their comments
    return postsWithComments;
}

// Function to fetch comments for a specific post (Comments Tier)
async function fetchPostComments(postId) {
    console.log(`Fetching comments for Post ${postId}`);
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = response.data;
    
    return { postId, comments };  // Return post with its comments
}

// Main function to demonstrate async/await with nested API calls
async function main() {
    console.log("Starting the operation...");

    try {
        // Tier 1: Fetch details for multiple users concurrently
        const userPromises = [];
        for (let i = 1; i <= 2; i++) {
            userPromises.push(fetchUser(i));  // Fetch user details for user IDs 1 and 2
        }

        // Wait for all user data (including their posts and comments) to be fetched
        const usersWithPostsAndComments = await Promise.all(userPromises);

        // After fetching all nested data, process the final result
        console.log("All user data with posts and comments fetched:");
        // console.log(JSON.stringify(usersWithPostsAndComments, null, 2));  // Print user data with nested posts and comments

    } catch (error) {
        console.error("Error in main operation:", error);
    } finally {
        console.log("Operation completed.");
    }
}
console.log("synchronous code will execute first");

setImmediate(() => {
    console.log("Imemdiate 1");
}, 0);

setTimeout(() => {
    console.log("Timeout 1");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise 1");
});

setTimeout(() => {
    console.log("Timeout 2");
}, 1000);
 
setTimeout(() => {
    console.log("Timeout 3");
}, 2000);

Promise.resolve().then(() => {
    console.log("Promise 2");
});
// Execute the main function
main();
