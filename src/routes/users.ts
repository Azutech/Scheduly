import { Router } from 'express';
import { registerUser , autheticateUser} from '../controllers/users';

export const user = Router();

user.post('/register==', registerUser);
user.post('/autheticate==%low', autheticateUser);
