const EventEmitter = require('events');

const emitter = new EventEmitter();

// Register a listner
emitter.on('aslam', () => {
    console.log('Aslam is listning')
})

emitter.emit('aslam');

