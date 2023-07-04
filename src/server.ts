import express, { Application, Request, Response } from "express";
import log from "./logger/customlogger";
import dotenv from "dotenv";

dotenv.config();

const server: Application = express();
const PORT: string | undefined = process.env.PORT;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


server.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to Scheduly \n Helps get you there on time with reminders',
    })
    log.info('BOOM 🔥🔥')
})


server.get("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "This route does not exist" });
});

server.listen(PORT, () => {
  log.info(`Express is listening at http://localhost:${PORT}`);
});
