
const fs = require('fs').promises;

async function readFileAsync() {
    try {
        console.log("Reading file asynchronously...");
        const data = await fs.readFile('sample', 'utf8');
        console.log("File content (async):", data);
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

readFileAsync();
console.log("Async code is non-blocking");
