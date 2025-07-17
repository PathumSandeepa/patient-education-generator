import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/health-check', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the Express server! I am healthy!' });
});

app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
