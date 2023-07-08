import { CookieOptions, NextFunction, Request, Response } from 'express';
import { User } from '../models/users';
import { createJwt } from '../utils/tokens';
import dotenv from 'dotenv';
import { AppError } from '../utils/error';
import { hashString, compareHash } from '../utils/helpers';

dotenv.config();

const access_token = parseInt(process.env.ACCESS_TOKEN_EXPIRES_IN as string);

const accessTokenCookieOptions: CookieOptions = {
	expires: new Date(Date.now() + access_token * 60 * 1000),
	maxAge: access_token * 60 * 1000,
	httpOnly: true,
	sameSite: 'lax',
};

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { firstName, lastName, username, email, password } = req.body;

	try {
		if (!(firstName || lastName || username || email || password)) {
			return next(new AppError('Input Parameter', 404));
		}
		const existingEmail = await User.findOne({ email: email });
		if (existingEmail) {
			return next(new AppError('User already exist', 400));
		}

		const existingUsername = await User.findOne({ email: email });
		if (existingUsername) {
			return next(new AppError('Username has been taken', 409));
		}

		const hash = await hashString(password);

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

		return res.status(201).json({
			success: true,
			message: 'User has been created',
			data: newUser,
		});
	} catch (err) {
		console.error(err);
		return next(new AppError('Database Error', 503));
	}
};

export const autheticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { usernameOrEmail, password } = req.body;

	try {
		if (!usernameOrEmail || !password) {
			return next(new AppError('Input Parameter', 404));
		}

		const user = await User.findOne({
			$or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
		});
		if (!user) {
			return next(new AppError('Invalid credentials', 401));
		}

		const validPassword = await compareHash(password, String(user.password));
		if (!validPassword) {
			return next(new AppError('Invalid credentials', 401));
		}

		const access_token = createJwt({ user });
		res.cookie('access_token', access_token, accessTokenCookieOptions);
		res.cookie('logged_in', true, {
			...accessTokenCookieOptions,
			httpOnly: false,
		});

		res.status(200).json({
			status: 'success',
			message: 'User logged in successfully',
			access_token,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError('Service Error', 503));
	}
};
