import { Router } from 'express';
import { registerUser, autheticateUser } from '../controllers/auth';

export const auth = Router();

auth.post('/auth/register==', registerUser);
auth.post('/auth/autheticate==low', autheticateUser);
