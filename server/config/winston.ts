import winston from "winston";
import { Options } from 'morgan';
import { Request, Response } from "express";

const loggerOptions: winston.LoggerOptions = {
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.File({
      filename: `logs/error.log`,
      level: "error",
    }),
    new winston.transports.File({
      filename: `logs/app.log`,
      level: "info",
    }),
  ],
};

const logger: winston.Logger = winston.createLogger(loggerOptions);

export const morganOption: Options<Request, Response> = {
  stream: {
    write: function (message: string) {
      logger.info(message.trim());
    },
  },
};

const mode: string = process.env.NODE_ENV;

if (mode !== "production" || 'test') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;
