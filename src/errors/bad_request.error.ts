import { AppError } from "./app_error.js";

export default class BadRequestError extends AppError {
  private static readonly _statusCode = 400;

  get errors() {
    return [
      {
        context: this._context,
        message: this.message,
      },
    ];
  }
  get logging(): boolean {
    return this._logging;
  }
  get statusCode(): number {
    return this._code;
  }

  private readonly _code: number;
  private readonly _context: Record<string, unknown>;
  private readonly _logging: boolean;

  constructor(params?: {
    code?: number;
    context?: Record<string, unknown>;
    logging?: boolean;
    message?: string;
  }) {
    const { code, logging, message } = params ?? {};

    super(message ?? "Bad Request");
    this._code = code ?? BadRequestError._statusCode;
    this._logging = logging ?? true;
    this._context = params?.context ?? {};

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}
