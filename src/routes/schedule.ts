import { Router } from 'express';
import { createSchedule , getOneSchedule , getallSchedule} from '../controllers/schedule';

export const schedule = Router();

schedule.post('/scheduleDrivers===yts/:userId', createSchedule);
schedule.get('/getAllSchedules/', getallSchedule)
schedule.get('/getSchedule/:id', getOneSchedule)
