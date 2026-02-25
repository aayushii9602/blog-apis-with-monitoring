import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from "../utils/logger";

export interface AuthRequest extends Request {
  user?: { id: string };
}

interface JwtPayloadWithId extends JwtPayload {
  id: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as JwtPayloadWithId;
    req.user = { id: decoded.id };
    logger.info(`decoded value: ${JSON.stringify(decoded)}`);
    logger.info(`user is: ${JSON.stringify(req.user)}`);
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
