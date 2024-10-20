async function demoPromiseChaining() {
    console.log("\nStarting demoPromiseChaining...");

    try {
        const result = await simulatePromise();
        console.log("Promise resolved:", result);

        const fileContent = await fs.readFile('sample.txt', 'utf8');
        console.log("File content:", fileContent);

        const apiResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        console.log("API Response (First User's Name):", apiResponse.data[0].name);

    } catch (error) {
        console.error("Error caught in demoPromiseChaining:", error);
    }

    console.log("Finished demoPromiseChaining...");
}

// Call the async function
(async function runExamples() {
    await demoPromiseChaining();
})();

/*
By using async/await within demoPromiseChaining(), each promise (like simulatePromise(), fs.readFile(), and axios.get()) is awaited before proceeding to the next line.
This way, the program waits for all asynchronous operations to complete before it prints "Finished demoPromiseChaining...".
*/