const fs = require('fs').promises;
const axios = require('axios');

// Synchronous Function Example
function syncOperation() {
    console.log("Synchronous: Start");
    const sum = (a, b) => a + b;
    console.log("Synchronous: Sum =", sum(5, 10));
    console.log("Synchronous: End");
}

// Promise Example (Asynchronous)
function promiseOperation() {
    return new Promise((resolve, reject) => {
        console.log("Promise: Start (Asynchronous)");
        setTimeout(() => {
            resolve("Promise resolved after 2 seconds");
        }, 2000); // Simulate a delay
    });
}

// Async/Await Example (Asynchronous)
async function asyncOperation() {
    try {
        console.log("Async/Await: Start");
        await fileReadOperation(); // Asynchronous file reading
        console.log("File read operation completed, starting API call...");
        const apiResponse = await thirdPartyAPICall(); // Asynchronous API call
        console.log("API Response (First User's Name):", apiResponse);
    } catch (error) {
        console.error("Error in asyncOperation:", error);
    }
}

// File Read Operation (Asynchronous)
function fileReadOperation() {
    return fs.readFile('sample', 'utf8')
        .then((data) => {
            console.log("File content:", data);
        })
        .catch((error) => {
            console.error("Error reading file:", error);
        });
}

// Third-Party API Call (Asynchronous)
async function thirdPartyAPICall() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data[0].name; // Return the first user's name from the API
    } catch (error) {
        console.error("Error during API call:", error);
    }
}

// Combining Different Async Techniques in One Flow
async function demoAsyncFlow() {
    console.log("*START: Demo Async Flow*");

    // 1. Synchronous operation
    syncOperation();

    // 2. Promise operation
    const promiseResult = await promiseOperation(); // Awaiting a promise resolution
    console.log("Promise Result:", promiseResult);

    // 3. Async/Await for file read and API call
    await asyncOperation();

    // 4. Timer (setTimeout)
    setTimeout(() => {
        console.log("setTimeout: Timer executed after 1 second");
    }, 1000);

    // 5. Process nextTick
    process.nextTick(() => {
        console.log("process.nextTick: Microtask executed");
    });

    console.log("*END: Demo Async Flow*");
}

// Event Listener Example (DOM in Browser context)
// Assume the following is in a browser context, as Node.js doesn't support DOM.
// Uncomment this section if you're running in a browser.
// document.getElementById('myButton').addEventListener('click', () => {
//     console.log("DOM Event: Button clicked");
// });

// Start the asynchronous flow
demoAsyncFlow();

console.log("End of the script");

// Output Explanation:
// 1. Synchronous code executes first (syncOperation).
// 2. Promise resolves after 2 seconds (promiseOperation).
// 3. Async/Await handles file read and API call (asyncOperation).
// 4. Timers are placed in the event loop and will run after async code (setTimeout).
// 5. process.nextTick() ensures microtasks run right after synchronous code.
