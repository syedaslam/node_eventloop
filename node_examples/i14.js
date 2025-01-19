async function asyncFunc() {
    console.log("Inside asyncFunc");
    await Promise.resolve();
    console.log("After await");
}// always return a promise ---

console.log("Start");

setTimeout(() => {
    console.log("Timeout 0");
    process.nextTick(()=>{
        console.log("process next tick")
    })
    setTimeout(()=>{
        console.log("...nested")
    },0)
}, 0);
asyncFunc
();//always return a promise

console.log("End");
// start, inside async, end , after await, timeout 0, process next tick