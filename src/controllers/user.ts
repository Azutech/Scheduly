import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';
import { AppError } from '../utils/error';

export const getAlluser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const allUsers = await User.find();
		if (!allUsers)
			return next(
				new AppError('You are able to perfrom this function', 404)
			);
		return res.status(202).json({
			success: true,
			message: 'All users has been retrieved',
			data: allUsers,
		});
	} catch (err: any) {
		console.log(err);
		return next(new AppError(`Service error ${err.message}`, 503));
	}
};

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const getThisUser = await User.findOne({ _id: id });
		if (!getThisUser)
			return next(
				new AppError('You are able to perfrom this function', 404)
			);

		return res.status(200).json({
			success: true,
			message: 'All users has been retrieved',
			data: getThisUser,
		});
	} catch (err: any) {
		console.log(err);
		return next(new AppError(`Service error ${err.message}`, 503));
	}
};

export const destroyerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;
	try {
		const removeUser = await User.findOneAndDelete({ _id: id });
		if (!removeUser)
			return next(
				new AppError('You are able to perfrom this function', 404)
			);
		return res.status(200).json({
			success: true,
			message: `user with this id ${id} has been deleted`,
			data: removeUser,
		});
	} catch (err: any) {
		console.log(err);
		return next(new AppError(`Service error ${err.message}`, 503));
	}
};
