import { Request, Response, NextFunction } from 'express';
import { Vehicle } from '../models/vehicles';
import { AppError } from '../utils/error';

export const createVehicle = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { name, model, carRegistration, colour } = req.body;

	try {
		if (!(name || model || carRegistration || colour)) {
			return next(new AppError('Input parameters required', 404));
		}
		const carNumber = await Vehicle.findOne({ carRegistration });
		if (carNumber) {
			return next(new AppError('Vehicle has already exist', 409));
		}

		const registerVehicle = await Vehicle.create({
			name,
			model,
			carRegistration,
			colour,
			isAvailable: false,
		});

		if (!registerVehicle) {
			return next(new AppError('Unable to register vehicle', 409));
		}

		await registerVehicle.save();
		return res.status(201).json({
			success: true,
			message: 'Vehicle has been registered',
			data: registerVehicle,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError(`Service Unavailable ${err.message}`, 503));
	}
};

export const getAllVehicles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const allVehicle = await Vehicle.find();
		if (!allVehicle) {
			return next(new AppError('all frivers not found', 404));
		}
		return res.status(202).json({
			success: true,
			message: 'All Vehicles has been retrieved',
			data: allVehicle,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError(`Service Unavailable ${err.message}`, 503));
	}
};

export const getOneDriver = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	try {
		const getThisVehicle = await Vehicle.findOne({ _id: id });
		if (!getThisVehicle) {
			return next(new AppError('vehicle not found', 404));
		}

		return res.status(200).json({
			success: true,
			message: `this user${id} has been retrieved`,
			data: getThisVehicle,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError(`Service Unavailable ${err.message}`, 503));
	}
};

export const destroyVehicle = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { id } = req.params;

	try {
		const removeVehicle = await Vehicle.findOneAndDelete({ _id: id });
		if (!removeVehicle) {
			return next(new AppError('User not found', 404));
		}
		return res.status(200).json({
			success: true,
			message: `vehicle with this id ${id} has been deleted`,
			data: removeVehicle,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError(`Service Unavailable ${err.message}`, 503));
	}
};
