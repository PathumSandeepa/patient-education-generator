import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";

import "./config/passport-setup";
import authRoutes from "./routes/auth.routes";
import planRoutes from './routes/plan.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
   cors({
      origin: "http://localhost:3000",
      credentials: true,
   })
);

app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use('/api/plans', planRoutes);

app.get("/api/health-check", (req: Request, res: Response) => {
   res.json({ message: "Server is healthy and running!" });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
