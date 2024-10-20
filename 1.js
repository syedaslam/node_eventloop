console.log("Start of the script");

setTimeout(() => {
  console.log("setTimeout - Timers Phase");
}, 1000);

setImmediate(() => {
  console.log("setImmediate - Check Phase");
},0);

Promise.resolve().then(() => {
  console.log("Promise - Microtask (after current event loop phase)");
});

process.nextTick(() => {
  console.log("process.nextTick - Microtask (before the next phase)");
});

console.log("End of the script");

function asyncTask(callback) {
  console.log("Async task started");
  setTimeout(() => {
    console.log("Async task - setTimeout");
    callback();
  }, 100);
}

asyncTask(() => {
  console.log("Async task completed");
});

/*
 Depending on the I/O operations, setImmediate() might run before setTimeout(0).
 setTimeout(0) executes first than setImmediate(0)
 promise handlers are synchronous but promises are asynchrpnous
*/