const fs = require('fs').promises;
const axios = require('axios'); 
async function fileReadOperation(filePath) {
    try {
        const data = await fs.readFile('sample', 'utf8');
        console.log("File read operation completed");
        return data.id; 
    } catch (error) {
        console.error("Error reading file:", error);
        throw error; 
    }
}
async function fetchUserData(userId) {
    try {
        console.log(userId)
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
        console.log(`API Response for User ${userId}:`, response.data.name);
        return response.data.username; 
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error; 
    }
}
async function main() {
    console.log("Starting the main operation");
    try {
        const fileData = await fileReadOperation('sample'); 
        const userId = fileData; 
        const userPromises = [];
        for (let i = 1; i <= 3; i++) {
            userPromises.push(fetchUserData(i)); 
        }
        const users = await Promise.all(userPromises);
        console.log("All user data fetched:", users);
    } catch (error) {
        console.error("Error in main operation:", error);
    } finally {
        console.log("Main operation completed");
    }
}
main();
setTimeout(() => {
    console.log("Timeout 1: Simulating some other async task after 1 second");
}, 1000);
setTimeout(() => {
    console.log("Timeout 2: Simulating another async task after 2 seconds");
}, 2000);

/*
1. API Calls in the Poll Phase
API calls, like axios.get, are non-blocking, meaning the JavaScript engine doesn't wait for the API call to complete.
The call is delegated to an underlying system (e.g., network) that runs outside of the event loop.
Once the network operation completes, the response is returned to the Poll Phase of the event loop.
Poll Phase is responsible for processing I/O operations (network requests, reading from file systems, etc.). 
It waits for incoming data from these operations and adds callbacks to the event loop once the operation completes.

2. Promises and Microtasks
When the Poll Phase completes and returns data from the API, 
this data is passed to the callback associated with the network request.
If you're using a promise-based API (like axios), the resolution of the API call is handled via a promise.
The callback associated with the promise resolution is placed into the microtask queue.

Microtask queue is a separate, high-priority queue for resolving promises and async/await operations.
After each phase of the event loop (including the Poll Phase), 
the event loop checks the microtask queue and processes any pending tasks there before moving to the next phase.


Initiating the API Call:
When an API call is made (e.g., using axios.get()), the actual network request is handled outside the event loop.
The event loop continues executing other tasks while waiting for the network response.

Poll Phase:
The Poll Phase monitors for incoming data from I/O tasks.
When the network request completes, the Poll Phase retrieves the data and schedules the callback (which resolves the promise).
. The callback associated with the file operation (which could resolve a promise) is then added to the callback queue for the Poll Phase.

Types of Callbacks:
Timers: Callbacks from setTimeout() and setInterval().
I/O Operations: Callbacks for file reads, network requests, etc.
User Events: Callbacks from events like mouse clicks or key presses.
Promises (Microtasks): Callbacks for resolved or rejected promises.

On each loop iteration, it creates and immediately returns a pending promise for the API request, which is pushed into the userPromises array.
So, after the loop finishes, userPromises contains 3 pending promises for fetching the data of users with IDs 1, 2, and 3.

*/