const fs = require('fs');



// blocking code

const text1 = fs.readFileSync('notes.txt', 'utf-8');

console.log('After read file sync');

const writeFile = fs.writeFileSync('new-notes.txt', text1);

console.log('After write file sync');

// non blocking code 

const text2 = fs.readFile('notes.txt', 'utf-8', (error, data) => {
    console.log(error, data);
})

console.log('will it print before read file');
