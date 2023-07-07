import { Router } from 'express';
import { driver } from './drivers';
import { vehicles } from './vehicles';

export const routes = Router();

routes.use('/drivers', driver);
routes.use('/vehicles', vehicles);
