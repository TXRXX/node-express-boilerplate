const { createLogger, format, transports } = require("winston");
const fs = require("fs");
require("winston-daily-rotate-file");

const logDir = "logs";
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%.log`,
    datePattern: "YYYY-MM-DD",
});

const logger = createLogger({
    level: "debug",
    format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp({
            format: "DD/MM/YY HH:mm:ss",
        }),
        format.printf(
            (info) => `${info.timestamp} ${info.level}: ${info.message}`,
        ),
    ),
    transports: [
        new transports.Console({
            level: "info",
            format: format.combine(
                format.colorize(),
                format.printf(
                    (info) =>
                        `${info.timestamp} ${info.level}: ${info.message}`,
                ),
            ),
        }),
        dailyRotateFileTransport,
    ],
});

module.exports = { logger };
