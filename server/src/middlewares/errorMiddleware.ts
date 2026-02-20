import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";
export const errorHandler = (
  err: any,
  _: Request,
  res: Response,
  __: NextFunction,
) => {
  logger.error(err.message);
  res.status(err.status || 500).json({
    message: err.message || "Server Error",
  });
};
