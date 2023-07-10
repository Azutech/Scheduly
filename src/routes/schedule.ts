import { Router } from 'express';
import { createSchedule } from '../controllers/schedule';

export const schedule = Router();

schedule.post('/scheduleDrivers===yts/:userId', createSchedule);
