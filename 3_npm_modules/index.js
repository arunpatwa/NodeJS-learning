const logEvents = require("./logEvents");

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//defining the class

//initialise the object
const myEmitter = new MyEmitter();

// add listener for the log events
myEmitter.on("log", (msg) => logEvents(msg)); //msg is a annonomous function
//test the events and timeout

setTimeout(() => {
    //emit event
  myEmitter.emit("log", "log event emitted!");
},2000);
