const { logLevel, logPath }  = require('../config/config');

const { createLogger, transports, format } = require('winston');
const { printf } = format;

// a custom format that outputs request id
const logFormat = printf(info => {
    return `${info.timestamp}: ${info.level}: ${info.message}`;
});

const logger = createLogger({
    level: logLevel,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
        logFormat
    ),
    transports: [
        new transports.File({
            filename: logPath + '/app.log',
            json: false,
            maxsize: 5242880,
            maxFiles: 5
        }),
        new transports.Console()
    ]
});

module.exports.log = logger;
module.exports.logger = logger;
