import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

console.log(process.env.PORT);

app.get("/", (req: Request, res: Response) => {
   res.send("Hello from the Express server!");
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
