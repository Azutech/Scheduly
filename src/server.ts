import express, { Application, Request, Response } from "express";
import log from "./logger/customlogger";
import { database } from "./connections/database";
import dotenv from "dotenv";

dotenv.config();

export const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Welcome to Scheduly \n Helps get you there on time with reminders",
  });
  log.info("BOOM 🔥🔥");
});

app.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist" });
});
