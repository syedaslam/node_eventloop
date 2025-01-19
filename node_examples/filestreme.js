const express = require('express');

const fs = require('fs');

const app = express();

app.get("/", (req, res) => {
    fs.readFile("./sample.txt", (err, data) => {
        res.end(data);
    })
})

app.get("/", (req, res) => {
    const stream = fs.createReadStream('./sample.txt', 'utf-8');
    stream.on('data', () => res.write(chunk));
    stream.on('end', () => res.end());
})





app.listen(8000, () => {
    console.log("server connected");
})