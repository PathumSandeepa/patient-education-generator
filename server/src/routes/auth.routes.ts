import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = Router();

router.get(
   "/google",
   passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
   })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/' }),
  (req, res) => {
    
    const user: any = req.user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect('http://localhost:3000/dashboard');
  }
);

export default router;