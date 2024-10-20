const async = require('async');

// Simulated asynchronous tasks
const task1 = (callback) => setTimeout(() => callback(null, 'Task 1'), 1000);
const task2 = (callback) => setTimeout(() => callback(null, 'Task 2'), 500);
const task3 = (callback) => setTimeout(() => callback(null, 'Task 3'), 300);

// Callback Example
function exampleCallback() {
    task1((err, result1) => {
        if (err) return console.error(err);
        console.log('Callback:', result1);
    });
}

// Callback Hell Example
function exampleCallbackHell() {
    task1((err, result1) => {
        if (err) return console.error(err);
        task2((err, result2) => {
            if (err) return console.error(err);
            task3((err, result3) => {
                if (err) return console.error(err);
                console.log('Callback Hell:', result1, result2, result3);
            });
        });
    });
}

// Promise Example
function examplePromise() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
    promise1.then(result => console.log('Promise:', result));
}

// Promise Chaining Example
function examplePromiseChaining() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve('Task 2'), 500));
    
    promise1
        .then(result1 => {
            console.log('Promise Chaining:', result1);
            return promise2;
        })
        .then(result2 => {
            console.log('Promise Chaining:', result2);
        });
}

// Async/Await Example
async function exampleAsyncAwait() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
    const result1 = await promise1;
    console.log('Async/Await:', result1);
}

// Promise.all Example
async function examplePromiseAll() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
    const promise2 = new Promise((resolve) => setTimeout(() => resolve('Task 2'), 500));

    const results = await Promise.all([promise1, promise2]);
    console.log('Promise.all:', results);
}

// Promise.allSettled Example
async function examplePromiseAllSettled() {
    const promise1 = new Promise((resolve) => setTimeout(() => resolve('Task 1'), 1000));
    const promise2 = new Promise((_, reject) => setTimeout(() => reject('Task 2 failed'), 500));

    const results = await Promise.allSettled([promise1, promise2]);
    console.log('Promise.allSettled:', results);
}

// Waterfall (async library)
function exampleWaterfall() {
    async.waterfall([
        (callback) => callback(null, 'Task 1'),
        (task1Result, callback) => callback(null, task1Result, 'Task 2'),
        (task1Result, task2Result, callback) => callback(null, `${task1Result}, ${task2Result}, Task 3`),
    ], (err, result) => {
        if (err) return console.error(err);
        console.log('Waterfall:', result);
    });
}

// async.series Example
function exampleSeries() {
    async.series([
        (callback) => setTimeout(() => callback(null, 'Task 1'), 1000),
        (callback) => setTimeout(() => callback(null, 'Task 2'), 500),
    ], (err, results) => {
        if (err) return console.error(err);
        console.log('Async.series:', results);
    });
}

// async.parallel Example
function exampleParallel() {
    async.parallel([
        (callback) => setTimeout(() => callback(null, 'Task 1'), 1000),
        (callback) => setTimeout(() => callback(null, 'Task 2'), 500),
    ], (err, results) => {
        if (err) return console.error(err);
        console.log('Async.parallel:', results);
    });
}

// async.queue Example
function exampleQueue() {
    const queue = async.queue((task, callback) => {
        console.log('Processing:', task.name);
        setTimeout(callback, task.delay);
    }, 2); // Process 2 tasks concurrently

    queue.push({ name: 'Task 1', delay: 1000 });
    queue.push({ name: 'Task 2', delay: 500 });
    queue.push({ name: 'Task 3', delay: 300 });
    
    queue.drain(() => console.log('All Queue tasks processed'));
}

// Demonstrating all the examples
exampleCallback();
exampleCallbackHell();
examplePromise();
examplePromiseChaining();
exampleAsyncAwait();
examplePromiseAll();
examplePromiseAllSettled();
exampleWaterfall();
exampleSeries();
exampleParallel();
exampleQueue();
