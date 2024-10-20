console.log("start");

setTimeout(() => {
    console.log("Timeout resolved after 1s");
}, 1000);

setTimeout(() => {
    console.log("Timeout reoslved after 2 s");
}, 2000);

Promise.resolve().then(() => {
    console.log("Promise resolver micro task 1");
});

setTimeout(() => {
    console.log("Timeout 0");
}, 0);

const promise1 = new Promise((resolve, reject) => {
    console.log('Inside new Promise1');
    resolve('Promise resolver micor task 2');
});
promise1.then(result => {
    console.log(result);
});
const promise2 = new Promise((resolve, reject) => {
    console.log('Inside new Promise2');
    setTimeout(() => {
      resolve('Promise resolved after 2 seconds');
    }, 2000);
});
promise2.then(result => {
    console.log(result);
});

Promise.resolve().then(() => {
    console.log("Promise resolver micro task 3");
});
process.nextTick(()=>{
    console.log("process next tick micro task0 priority")
})
console.log("end");














/*
Explanation of Execution:
Synchronous code runs first:
console.log("Start") runs.
setTimeout() callbacks are registered, but they don’t execute immediately.
Promise resolutions (Promise.resolve().then()) are registered as microtasks, 
to be handled after the current tick.
console.log("End") runs.
Microtask Queue (Promise Resolutions):

After all the synchronous code is executed, the event loop checks the microtask queue 
(before moving to the Timers Phase).
Promise resolutions (Promise 1 and Promise 2) are processed in the microtask queue.
Timers Phase:

After microtasks are processed, the event loop moves to the Timers Phase.
Both setTimeout() callbacks (registered with 0ms) are added to the callback queue, 
and they are executed in order (Timeout 1, Timeout 2).
*/