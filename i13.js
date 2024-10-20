console.log("Step 1");

setImmediate(() => {
    console.log("Immediate");
});

setTimeout(() => {
    console.log("Timeout 0");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("Step 2");