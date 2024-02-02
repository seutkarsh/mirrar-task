import express, { Express, Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import config from "./config";
import productRoutes from "./api/products";
import mongoose from "mongoose";

const app: Express = express();

mongoose
  .connect(config.mongo.uri)
  .then((connection) => {
    console.log(`Connected to DB: ${connection.connection?.host}`);
  })
  .catch((e) => {
    console.log(`Error Connecting DB: ${e.message}`);
  });

app.get("/api/health", (req: Request, res: Response) => {
  res.status(200).end();
});
app.head("/api/health", (req: Request, res: Response) => {
  res.status(200).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api", productRoutes);

app.listen(config.port, () => {
  console.log(`Server Listening to Port ${config.port}`);
});
