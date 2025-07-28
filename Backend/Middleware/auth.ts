import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cookieParser = require("cookie-parser");

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: Error | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded === "string") {
        return res.status(403).json({ message: "Forbidden" });
      }
      // rozkodowanie tokenu i przypisanie userId do req.user
      const payload = decoded as JwtPayload;
      if (!payload.userId) {
        return res.status(403).json({ message: "Invalid token payload" });
      }

      req.user = { userId: payload.userId };
      next();
    }
  );
};

export const optionalVerifyToken = (
  req: Request,
  res: Response,
  next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return next();
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: Error | null, decoded: JwtPayload | string | undefined) => {
      if (err || !decoded || typeof decoded === "string") {
        return next();
      }

      const payload = decoded as JwtPayload;
      if (!payload.userId) {
        return next();
      }

      req.user = { userId: payload.userId };
      next();
    }
  );
};
