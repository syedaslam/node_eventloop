const fs = require('fs').promises;
const util = require('util');
const axios = require('axios'); 

console.log("Start of the script");

async function thirdPartyAPICall() {
      console.log("Third-party API call started (Fetching data from JSONPlaceholder API)");
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data[0].id; // Return the data fetched from the API
      } catch (error) {
        console.error("Error during third-party API call:", error);
        throw error;
      }
}

function fileReadOperation() {
  return fs.readFile('sample', 'utf8')
    .then((data) => {
      console.log("File read operation completed");
      console.log("File content:", data);
    })
    .catch((error) => {
      console.error("Error reading file:", error);
    });
}

async function asyncOperation() {
    try {
      console.log("Async operation started");
      // Wait for the file read operation to complete
      await fileReadOperation(); 
      console.log("File read finished, starting API call");

      // Wait for the third-party API call to complete
      const apiResponse = await thirdPartyAPICall(); 
      console.log("Received API Response:", apiResponse);

    } catch (error) {
      console.error("Error in async operation:", error);
    }
}

setTimeout(() => {
    console.log("setTimeout - Timers Phase (0ms)");
}, 0);

setTimeout(() => {
  console.log("setTimeout - Timers Phase (200ms)");
}, 200);


setImmediate(() => {
  console.log("setImmediate - Check Phase");
});

Promise.resolve().then(() => {
  console.log("Promise 1 - Microtask");
});

process.nextTick(() => {
  console.log("process.nextTick 1 - Microtask before event loop continues");
});


asyncOperation();

Promise.resolve().then(() => {
  console.log("Promise 2 - Microtask");
});

process.nextTick(() => {
  console.log("process.nextTick 2 - Microtask before event loop continues");
});

console.log("End of the script");
/*
Why Doesn't the Code Stop?
The event loop keeps moving through its phases (timers, I/O, check, poll, etc.) while promises (including file operations and API calls) are sent to the microtask queue
 promise handlers are synchronouse but promises are asynchrpnous
 functions written with await are wrapped inside of promise and does not block the code and run asynchronously
 When you await a promise (e.g., file read), Node.js doesn't "stop" the entire execution. 
 Instead, it allows the event loop to process other tasks, and the promise resolution is handled after the current phase's synchronous and microtasks have completed.
*/
