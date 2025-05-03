export interface AppErrorContent {
  context?: Record<string, unknown>;
  message: string;
}
export abstract class AppError extends Error {
  abstract readonly errors: AppErrorContent[];
  abstract readonly logging: boolean;
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
