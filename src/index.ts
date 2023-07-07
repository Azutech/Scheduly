import http from 'http';
import { database } from './connections/database';
import dotenv from 'dotenv';
import log from './logger/customlogger';
import { app } from './server';

dotenv.config();

const server = http.createServer(app);

database().catch((err) => console.error(err));

const PORT: string | undefined = process.env.PORT;

server.listen(PORT, () => {
	log.info(`Express is listening at http://localhost:${PORT}`);
});

export default server;
