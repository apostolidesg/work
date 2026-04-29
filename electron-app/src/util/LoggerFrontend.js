import dayjs from 'dayjs';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import LoggerFoldersGenerator from './LoggerFoldersGenerator';

const appendTimestamp = format(info => {
  info.timestamp = dayjs().format();
  return info;
});

/**
 * Logger for the Frontend
 */
export const loggerFrontend = createLogger({
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        appendTimestamp(),
        format.align(),
        format.printf(i => {
          return `${JSON.stringify(i.timestamp)} ${JSON.stringify(i.level)}: FRONT-END - ${JSON.stringify(i.message)}`;
        }),
      ),
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new transports.DailyRotateFile({
      level: 'info',
      filename: 'application-%DATE%.log',
      dirname: LoggerFoldersGenerator.loggerPaths.frontend,
      datePattern: 'YYYY-MM-DD',
      handleExceptions: true,
      zippedArchive: true,
      maxFiles: '30d',
      maxSize: '20m',
      format: format.combine(
        appendTimestamp(),
        format.align(),
        format.printf(i => {
          return `${JSON.stringify(i.timestamp)} ${JSON.stringify(i.level)}: ${JSON.stringify(i.message)}`;
        }),
      ),
    }),
  ],
  level: 'debug',
});
