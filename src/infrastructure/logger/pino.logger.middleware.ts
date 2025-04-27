import { Request, Response } from "express";
import { pinoHttp } from "pino-http";

import { pinoInstance } from "./pino.logger.js";

export const pinoHTTPInstance = pinoHttp({
  customLogLevel: (req: Request, res: Response, err) => {
    if (err) {
      return "error";
    }
    if (res.statusCode >= 500) {
      return "error";
    }
    if (res.statusCode >= 400) {
      return "warn";
    }
    return "info";
  },
  logger: pinoInstance,
  serializers: {
    req: (req: Request) => {
      return {
        body: req.body as string,
        headers: req.headers,
        method: req.method,
        url: req.url,
      };
    },
    res: (res: Response) => {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
