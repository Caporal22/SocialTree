import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";

// Augmenting the Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}


export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  const [, token] = bearer.split(" ");

  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    if (typeof result === "object" && "id" in result) {
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(500).send({ message: "Invalid token" });
  }
};
