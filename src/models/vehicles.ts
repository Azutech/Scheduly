import { Schema, model } from 'mongoose';

const vehicleSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'name of vehicle required'],
		},

		model: {
			type: String,
			required: [true, 'model of vehicle required'],
		},

		carRegistration: {
			type: String,
			unique: true,
			required: [true, 'number of vehicle required'],
		},

		colour: {
			type: String,
			enum: ['Black', 'Red', 'White', 'Blue', 'Green'],
		},

		isAvailable: {
			type: Boolean,
			required: true,
			default: false,
		},

		isFixed: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

export const Vehicle = model('vehicle', vehicleSchema);
