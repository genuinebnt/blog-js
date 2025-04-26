import { Logger } from "#domain/interfaces/logger.js";
import { pino } from "pino";

const pinoInstance = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [],
  transport: {
    options: {
      colorize: true,
    },
    target: "pino-pretty",
  },
});

export class PinoLogger implements Logger {
  debug(message: string, meta?: unknown): void {
    pinoInstance.debug({ meta }, message);
  }

  error(message: string, meta?: unknown): void {
    pinoInstance.error({ meta }, message);
  }

  info(message: string, meta?: unknown): void {
    pinoInstance.info({ meta }, message);
  }

  warn(message: string, meta?: unknown): void {
    pinoInstance.warn({ meta }, message);
  }
}
