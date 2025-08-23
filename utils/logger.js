const {createLogger, format, transports, log} = require('winston')
const {combine, timestamp, printf, colorize} = format

const logFormat = printf(({level, message, timestamp, stack}) => {
    return `${timestamp} [${level}] : ${stack || message}`
})

const devFormat = combine(
    timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
    colorize(),
    logFormat
)

const prodFormat = combine(
    timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
    format.json()
)

const logger = createLogger({
    level: process.env.NODE_LEVEL || "info",
    format: process.env.NODE_ENV === "development" ? devFormat : logFormat,
    transports: [
        new transports.Console({format: combine(logFormat, colorize())}),
        new transports.File({filename: "logs/error.log", level: "error"}),
        new transports.File({filename: "logs/combined.log"})
    ]
})

logger.stream = {
    write: (message) => logger.info(message.trim())
}

module.exports = logger