const fs = require('fs').promises; // Using fs promises for file operations
const axios = require('axios');    // For simulating API calls

// Function using a promise to simulate a delay (like a network request)
function simulatePromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = true; // You can toggle this to test error handling
            if (success) {
                resolve("Promise resolved after 2 seconds");
            } else {
                reject("Promise rejected due to some error");
            }
        }, 2000); // Simulates a delay of 2 seconds
    });
}

// Async function to demonstrate async/await with promise and file reading
async function demoAsyncAwait() {
    try {
        console.log("Starting demoAsyncAwait...");

        // Example of awaiting a promise
        const promiseResult = await simulatePromise();
        console.log("Promise result:", promiseResult);

        // Example of reading a file with async/await
        console.log("Reading file...");
        const fileContent = await fs.readFile('sample', 'utf8'); // Ensure a 'sample.txt' file exists
        console.log("File content:", fileContent);

        // Example of an API call using async/await
        console.log("Fetching data from API...");
        const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log("API Response (First User's Name):", apiResponse.data[0].name);

        console.log("Finished demoAsyncAwait...");

    } catch (error) {
        console.error("Error caught in demoAsyncAwait:", error);
    }
}

// Function using Promise.all for parallel async operations
async function demoPromiseAll() {
    try {
        console.log("\nStarting demoPromiseAll...");

        // Running two promises in parallel
        const [fileReadResult, apiResult] = await Promise.all([
            fs.readFile('sample', 'utf8'),
            axios.get('https://jsonplaceholder.typicode.com/users')
        ]);

        console.log("File read result:", fileReadResult);
        console.log("API Response (First User's Name):", apiResult.data[0].name);

        console.log("Finished demoPromiseAll...");

    } catch (error) {
        console.error("Error caught in demoPromiseAll:", error);
    }
}

// Function to demonstrate promise chaining without async/await
function demoPromiseChaining() {
    console.log("\nStarting demoPromiseChaining...");

    simulatePromise()
        .then(result => {
            console.log("Promise resolved:", result);
            return fs.readFile('sample', 'utf8');
        })
        .then(fileContent => {
            console.log("File content:", fileContent);
            return axios.get('https://jsonplaceholder.typicode.com/users');
        })
        .then(apiResponse => {
            console.log("API Response (First User's Name):", apiResponse.data[0].name);
        })
        .catch(error => {
            console.error("Error caught in demoPromiseChaining:", error);
        });

    console.log("Finished demoPromiseChaining...");
}

// Execute the functions sequentially
(async function runExamples() {
    await demoAsyncAwait();      // Async/await example
    await demoPromiseAll();      // Promise.all example
    await demoPromiseChaining();       // Promise chaining example
})();

/*
The simulatePromise() function returns a promise, but the function does not wait for that promise to resolve. It immediately moves on to the next line.
The demoPromiseChaining() function ends with console.log("Finished demoPromiseChaining..."), which gets executed synchronously—right after the promise chain is set up, but before the promise resolves.
In short: the console.log("Finished demoPromiseChaining...") gets executed before the promise chain completes because JavaScript doesn't "block" on promises— it continues executing the rest of the code.

Promise Chaining is asynchronous. When you execute demoPromiseChaining(), the function starts by setting up the promise chain, but it doesn't wait for the promise chain to complete before continuing to the next statement.
*/