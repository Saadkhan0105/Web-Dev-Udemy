const fs = require('fs');
const os = require('os');

const EventEmitter = require('events');

class Logger extends EventEmitter {
    log(message){
        this.emit('messageLogged', {message});
    }
}

const logger = new Logger();
const logFile = './eventlog.txt';

const logToFile = (event) => {
    const logMessage = `${new Date().toISOString()} - ${event.message}\n`;
    fs.appendFileSync(logFile, logMessage);
}

logger.on('messageLogged', logToFile);

setInterval(() => {
    const memoryUsage = (os.freemem() / os.totalmem()) * 100;
    logger.log('Hello World');
}, 3000);

logger.log('Application started');
logger.log("Application event occurred");