import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma";
import { User } from "@prisma/client";

interface JwtPayload {
   id: string;
}

declare global {
   namespace Express {
      interface Request {
         user?: User;
      }
   }
}

export const protect = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.token;

   if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

      const foundUser = await prisma.user.findUnique({
         where: { id: decoded.id },
      });

      if (!foundUser) {
         return res
            .status(401)
            .json({ message: "Not authorized, user not found" });
      }

      req.user = foundUser;
      next();
   } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
   }
};
