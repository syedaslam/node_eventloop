const fs = require('fs');

function readFileSync() {
    try {
        console.log("Reading file synchronously...");
        const data = fs.readFileSync('sample', 'utf8');
        console.log("File content (sync):", data);
    } catch (error) {
        console.error("Error reading file:", error);
    }
}

readFileSync();
console.log("Sync code is blocking");

