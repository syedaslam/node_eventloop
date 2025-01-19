console.log("Begin");

process.nextTick(() => {
    console.log("Next tick 1");
});

Promise.resolve().then(() => {
    console.log("Promise resolved");
});

process.nextTick(() => {
    console.log("Next tick 2");
});

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");
