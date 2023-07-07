import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { verifyJwt } from '../utils/tokens';
import { User } from '../models/users';
import { AppError } from '../utils/error';

dotenv.config();

export const deserializeUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		let token;

		if (
			req.headers.authorization &&
            req.headers.authorization.startsWith('bearer')
		) {
			token = req.headers.authorization.split('')[1];
		} else if (req.cookies.token) {
			token = req.cookies.token;
		}

		if (!token) {
			return next(new AppError('This token does not belong to you', 403));
		}

		const encryption = verifyJwt<{ sub: string }>(token);
		if (!encryption) {
			return res.status(404).json({ message: 'Invalid token' });
		}
        const user = await User.findById({ _id: encryption })

        if (!user) {
            return res
                .status(404)
                .json({ message: 'User with that token no longer exist' })
        }
        res.locals.user = user
        next()
	} catch (err) {
		console.error(err);
	}
};
