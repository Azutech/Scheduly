import { Router } from 'express';
import { driver } from './drivers';
import { vehicles } from './vehicles';
import { user } from './users';

export const routes = Router();

routes.use('/drivers', driver);
routes.use('/vehicles', vehicles);
routes.use('/users', user);
