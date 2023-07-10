import { Router } from 'express';
import { driver } from './drivers';
import { vehicles } from './vehicles';
import { auth } from './auth';
import { user } from './users';
import { schedule } from './schedule';
import { search } from './query';


export const routes = Router();

routes.use('/drivers', driver);
routes.use('/vehicles', vehicles);
routes.use('/users', auth);
routes.use('/users', user);
routes.use('/schedule', schedule)
routes.use('/search', search)
