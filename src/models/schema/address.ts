import { Schema } from 'mongoose';

export const AddressSchema = new Schema(
	{
		streetAdress: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		country: {
			type: String,
		},
		zipcode: {
			type: String,
			min: [5, 'zipcode is must be 5'],
			max: [6, 'zipcode is must be 6'],
		},
	},
	{ _id: false }
);
