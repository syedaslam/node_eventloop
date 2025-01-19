console.log("Start");
setTimeout(() => {
    console.log("Timeout 0");
}, 0);
setTimeout(() => {
    console.log("Timeout 1");
}, 1000);
setTimeout(() => {
    console.log("Timeout 2");
}, 2000);
Promise.resolve().then(() => {
    console.log("Promise 1");
});
Promise.resolve().then(() => {
    console.log("Promise 2");
});
setImmediate(() => {
    console.log("Immediate 0");
}, 0);

console.log("End");
// start, end , p1,p2, t0,i0,t1,t2