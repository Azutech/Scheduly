import { NextFunction, Request, Response } from 'express';
import { User } from '../models/users';
import { createJwt } from '../utils/tokens';
import dotenv from 'dotenv';
import { AppError } from '../utils/error';
import { hashString } from '../utils/helpers';

dotenv.config();

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, username, email, password } = req.body;
	const hash = hashString('rounds');
	try {
		const existingEmail = await User.findOne({ email: email });
		if (existingEmail) {
			return next(new AppError('User already exist', 400));
		}

		const existingUsername = await User.findOne({ email: email });
		if (existingUsername) {
			return next(new AppError('Username has been taken', 409));
		}

		const newUser = await User.create({
			firstName,
			lastName,
			username,
			email,
			password: hash,
		});

		const accessToken = createJwt({ email: newUser.email });

		if (!newUser) return next(new AppError('Unable to Create User', 402));

		newUser.accessToken = accessToken;

		newUser.save();
	} catch (err) {
		console.error(err);
		return next(new AppError('Database Error', 503));
	}
};
