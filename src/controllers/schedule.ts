import { Request, Response, NextFunction } from 'express';
import { User } from '../models/users';
import { Schedule } from '../models/schedule';
import { AppError } from '../utils/error';
import { notificationEmitter } from '../utils/events';
import { Driver } from '../models/drivers';
import { Vehicle } from '../models/vehicles';

export const createSchedule = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { userId } = req.params;
	const {
		driverName,
		vehicle,
		clientName,
		clientCompany,
		stateDate,
		endDate,
		pickUpLocation,
		dropOffLocation,
		message,
	} = req.body;

	try {
		if (
			!(
				driverName ||
                vehicle ||
                clientName ||
                clientCompany ||
                stateDate ||
                endDate ||
                pickUpLocation ||
                dropOffLocation ||
                message
			)
		) {
			return next(new AppError('Please provide all required fields', 400));
		}
		const driver = await Driver.findOne({ _id: driverName });
		if (!driver) {
			return next(new AppError('driver not found', 400));
		}
		const foundVehicle = await Vehicle.findOne({ _id: vehicle });
		if (!foundVehicle) {
			return next(new AppError('vehicle not found', 400));
		}
		const user = await User.findOne({ _id: userId });
		if (!user) {
			return next(
				new AppError(`User with this id ${user} not found`, 404)
			);
		}

		const newSchedule = await Schedule.create({
			driverName: driver._id,
			vehicle: foundVehicle._id,
			clientName,
			clientCompany,
			stateDate,
			endDate,
			pickUpLocation,
			dropOffLocation,
			message,
		});

		const populateSchedule = await Schedule.findOne({
			_id: newSchedule._id,
		})
			.populate({ path: 'driverName' })
			.populate({ path: 'vehicle' });

		if (!populateSchedule) {
			return next(new AppError('Unable to create schedule', 402));
		}

		notificationEmitter.emit(
			'A Schedule has been created',
			populateSchedule
		);

		await populateSchedule.save();

		return res.status(201).json({
			success: true,
			message: 'Schedule created successfully',
			data: populateSchedule,
		});
	} catch (err: any) {
		console.error(err);
		return next(new AppError(`Service Unavailable ${err.message}`, 503));
	}
};

// export const getallSchedule = async (req: Request, res: Response, next: NextFunction) => {

// }
