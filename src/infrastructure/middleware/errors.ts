import { logger } from "#app.js";
import { AppError } from "#errors/app_error.js";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    const { errors, logging, statusCode } = err;
    if (logging) {
      logger.error(
        JSON.stringify(
          {
            code: err.statusCode,
            errors: err.errors,
            stack: err.stack,
          },
          null,
          2,
        ),
      );
    }
    res.status(statusCode).send({ errors });
  }

  logger.error(
    JSON.stringify({ error: err.message, stack: err.stack }, null, 2),
  );
  res.status(500).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });

  next();
};
