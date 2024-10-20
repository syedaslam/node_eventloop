
const fs = require('fs').promises;

async function demo() {
    console.log("*START......");

    async function fileReadOperation() {
      return fs.readFile('sample', 'utf8')
        .then((data) => {
          console.log("File read operation completed");
          console.log("File content:", data);
        })
        .catch((error) => {
          console.error("Error reading file:", error);
        });
    }
    await fileReadOperation(); 

    async function asyncOperation() {
      try {
        console.log("Async operation started");

        // Wait for the file read operation to complete
        await fileReadOperation(); 
        console.log("File read finished, starting API call");

      } catch (error) {
        console.error("Error in async operation:", error);
      }
    }

    asyncOperation();
    console.log("File read finished, starting API call");
  
    console.log("END.....");
  }
  
demo();
  
  /*
await inside the main demo() function:

When you use await fileReadOperation(); directly in demo(), the function waits for the file reading to complete before proceeding to the next line of code.
This means the next console log, such as "File read finished, starting API call", will only be executed after the file reading finishes.
await inside a separate asyncOperation() function:

When asyncOperation() is called inside demo(), it starts executing asynchronously, but demo() does not wait for asyncOperation() to finish.
This is because asyncOperation() always returns a promise, and demo() does not await this promise (unless you specifically add await asyncOperation();).


  */