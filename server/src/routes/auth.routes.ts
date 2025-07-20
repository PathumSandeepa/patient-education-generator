import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { protect } from "../middleware/auth.middleware";
import prisma from "../lib/prisma";

const router = Router();

router.get(
   "/google",
   passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
   })
);

router.get(
   "/google/callback",
   passport.authenticate("google", { session: false, failureRedirect: "/" }),
   (req, res) => {
      const user: any = req.user;

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
         expiresIn: "7d",
      });

      res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.redirect("http://localhost:3000/dashboard");
   }
);

router.get("/me", protect, (req, res) => {
   res.json(req.user);
});

router.post("/logout", (req, res) => {
   res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
   });
   res.status(200).json({ message: "Logged out successfully" });
});

export default router;
