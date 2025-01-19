const fs = require('fs').promises;

async function asyncOperation() {
    console.log("Async Operation Started");

    // This looks like it waits, but it's non-blocking
    const fileContent = await fs.readFile('sample', 'utf8');
    console.log("File Content:", fileContent);

    // This code will only run after the file read promise resolves
    console.log("Async Operation Completed");
}

console.log("Before Async Call");
asyncOperation();
console.log("After Async Call");

// Non-blocking tasks (timers, microtasks) can still proceed here while waiting for the file to be read
setTimeout(() => {
    console.log("Timeout finished");
}, 500);

/*
asyncOperation() starts and encounters await fs.readFile('sample.txt').
Execution of the asyncOperation() is paused until the file reading operation completes.
However, the program does not stop entirely. Other code (like console.log("After Async Call") or the setTimeout) can still run while the file is being read. This shows that the event loop is still working and handling other tasks.

When you use await, the function is paused in a non-blocking manner.
The event loop can still handle other tasks during this time.
It gives an illusion of waiting or synchronous code, but it is still asynchronous.
*/