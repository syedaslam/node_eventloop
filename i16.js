async function fetchData() {
    console.log("Async function started");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // await new Promise((resolve) => {
    //     console.log("....fetch promise resolved");
    // });
    console.log("Async function resolved");
}
process.nextTick(() => {
    console.log("Next tick");
});
setTimeout(() => {
    console.log("Timeout 1");
}, 0);
fetchData();
setTimeout(() => {
    console.log("Timeout 2");
}, 0);








/*
 the promise from fetchData() doesn't execute before the setTimeout callbacks 
 because the promise resolution happens after the event loop processes the timers phase.
  The await in fetchData() defers its execution until the promise resolves, 
  and that resolution happens after the current call stack and microtasks are cleared.
 */