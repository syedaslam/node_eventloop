let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Promise resolved"), 1000);
  });
  
  promise.then(result => console.log(result)); // Asynchronous
  console.log("This runs before the promise is resolved");
  
  async function demo() {
    console.log("Before async operation");
    const a = await new Promise(resolve => resolve("welome")); // Asynchronous
    console.log(a)
    console.log("After async operation");
  }
  
  demo();