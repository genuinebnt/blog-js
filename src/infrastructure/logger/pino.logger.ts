import { Logger } from "#domain/interfaces/logger.js";
import { Bindings, pino } from "pino";

export const pinoInstance = pino({
  formatters: {
    bindings: (bindings: Bindings) => {
      return {
        hostname: bindings.hostname as string,
        process_id: bindings.pid as number,
      };
    },
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  level: process.env.LOG_LEVEL ?? "info",
  redact: ["*.user.name", "*.user.email", "*.user.password"],
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
});

export class PinoLogger implements Logger {
  private readonly logger: pino.Logger;

  constructor(loggerInstance?: pino.Logger) {
    this.logger = loggerInstance ?? pinoInstance;
  }

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
