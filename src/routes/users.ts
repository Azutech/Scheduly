import { Router } from 'express';
import { getUser, getAlluser, destroyerUser } from '../controllers/user';

export const user = Router();

user.get('/getUser==%/:id', getUser);
user.get('/getAllUser', getAlluser);
user.get('/destroyerUser==%/:id', destroyerUser);
