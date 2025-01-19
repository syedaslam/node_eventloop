const axios = require('axios');
/*
1. setTimeout() / setInterval():
Asynchronous: These functions schedule a task to be run after a certain delay or interval 
but do not block the execution of the following code. 
The scheduled tasks are pushed into the event loop and executed later.
*/

console.log("Before timeout");
setTimeout(() => console.log("Inside timeout"), 1000); // Asynchronous
console.log("After timeout"); // Will run immediately


/*
Promises:
Asynchronous: Promises are asynchronous by nature. 
When a promise is created, it begins its operation (like an API call or file read), 
but the code after the promise doesn't wait for it to finish. 
Instead, .then() and .catch() handlers are queued and executed when the promise is resolved or rejected,
 which happens in the microtask queue.
*/

let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise resolved"), 1000);
  });
  
  promise.then(result => console.log(result)); // Asynchronous
  console.log("This runs before the promise is resolved");
  /*Async/Await:
  Asynchronous: async/await is syntax sugar built on top of promises. 
  Even though the await keyword makes code look sequential, it is still asynchronous.
   When you await a promise, the function pauses execution,
    allowing other tasks to run while it waits for the promise to resolve.  
*/
async function demo() {
    console.log("Before async operation");
    await new Promise(resolve => setTimeout(resolve, 1000)); // Asynchronous
    console.log("After async operation");
  }
  
  demo();
/*
I/O Operations (e.g., File System, HTTP Requests):
Asynchronous: In Node.js, operations like reading files or making HTTP requests are typically asynchronous, 
meaning they don't block the execution of subsequent code. 
These tasks are managed by Node.js's libuv library and later handled by the event loop.
*/
const fs = require('fs').promises;

fs.readFile('sample', 'utf8')
  .then(data => console.log(data))  // Asynchronous
  .catch(err => console.error(err));
/*
Network Requests (XHR, Fetch, Axios):
Asynchronous: Making network requests (like fetch() in the browser or axios in Node.js) are asynchronous. 
The request is made, and JavaScript continues to execute while it waits for a response,
 typically through promises.
*/

axios.get('https://jsonplaceholder.typicode.com/users').then(response => response.data)  // Asynchronous
  .then(data => console.log(data[0].id));

console.log("This runs before the data is fetched");

/*
Database Queries (Node.js with MongoDB, MySQL, etc.):
Asynchronous: Interactions with databases are typically asynchronous in JavaScript. 
The query is sent, and other code can run while the database processes the query. 
The result is returned via promises or callbacks.

db.collection('users').find({}).toArray()
  .then(users => console.log(users))  // Asynchronous
  .catch(err => console.error(err));

*/


/*

 Timers (process.nextTick(), setImmediate()):
Asynchronous:
process.nextTick(): A Node.js-specific function that defers the execution of a callback 
until the next iteration of the event loop (microtask queue). It’s still asynchronous, 
though it runs sooner than setTimeout or setImmediate.
setImmediate(): Executes callbacks in the check phase of the event loop.
*/

process.nextTick(() => console.log('Next Tick')); // Asynchronous
setImmediate(() => console.log('Immediate'));     // Asynchronous
console.log('Sync code');
