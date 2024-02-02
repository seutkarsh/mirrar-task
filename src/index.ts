import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).end();
});
app.head("/api/health", (req: Request, res: Response) => {
  res.status(200).end();
});

app.use(cors());
app.use("/api");
