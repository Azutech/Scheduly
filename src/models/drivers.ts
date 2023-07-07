import { Schema, model } from 'mongoose';
import { AddressSchema } from './schema/address';

const driverSchema = new Schema(
	{
		fullName: {
			type: String,
			required: [true, 'fullname is required'],
		},
		email: {
			type: String,
			match: [
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
				'Please enter a valid email',
			],
			required: [true, 'email is required'],
		},
		mobileNumber: {
			type: Number,
			min: [11, 'Digits must be 11'],
			max: [14, 'Digits must be 14'],
			required: [true, 'Mobile number is required'],
		},
		address: {
			type: [AddressSchema],
			required: true,
		},
	},
	{ timestamps: true }
);

export const Driver = model('Driver', driverSchema);
