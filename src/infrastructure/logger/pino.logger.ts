import { Logger } from "#domain/interfaces/logger.js";
import { requestContext } from "#infrastructure/context/request-context.js";
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
  level: process.env.LOG_LEVEL ?? "INFO",
  redact: ["*.user.name", "*.user.email", "*.user.password"],
  timestamp: () => `,"timestamp":"${new Date().toISOString()}"`,
});

export class PinoLogger implements Logger {
  private readonly logger: pino.Logger;

  constructor(loggerInstance?: pino.Logger) {
    this.logger = loggerInstance ?? pinoInstance;
  }

  debug(message: string, meta?: unknown): void {
    this.logger.debug(this.getEnhancedMeta(meta), message);
  }

  error(message: string, meta?: unknown): void {
    this.logger.error(this.getEnhancedMeta(meta), message);
  }

  info(message: string, meta?: unknown): void {
    this.logger.info(this.getEnhancedMeta(meta), message);
  }

  warn(message: string, meta?: unknown): void {
    this.logger.warn(this.getEnhancedMeta(meta), message);
  }

  /**
   * Helper method to enhance log metadata with request ID from the context
   * @param meta Original metadata to be included in the log
   * @returns Enhanced metadata including request ID if available
   */
  private getEnhancedMeta(meta?: unknown): Record<string, unknown> {
    const requestId = requestContext.getRequestId();

    // If there's no request ID in the context, just return the original metadata
    if (!requestId) {
      return { meta };
    }

    // Otherwise, include the request ID in the metadata
    return {
      meta,
      requestId,
    };
  }
}
