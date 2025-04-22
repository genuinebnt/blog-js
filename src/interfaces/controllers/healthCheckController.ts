import { Request, Response } from "express";

const healthCheckController = (req: Request, res: Response) => {
  res.sendStatus(200);
};

export default healthCheckController;
