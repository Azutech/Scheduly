import { Schema, model } from 'mongoose';
import { Driver } from './drivers';
import { Vehicle } from './vehicles';

const scheduleSchema = new Schema(
	{
		driverName: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: Driver,
		},

		vehicle: {
			type: Schema.Types.ObjectId,
			required: true,
			ref: Vehicle,
		},

		clientName: {
			type: String,
			required: true,
		},

		clientCompany: {
			type: String,
			required: true,
		},
		stateDate: {
			type: Date,
			require: true,
		},
		endDate: {
			type: Date,
			require: true,
		},
		pickUpLocation: {
			type: String,
			required: true,
		},
		dropOffLocation: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export const Schedule = model('schedule', scheduleSchema);
