import { Schema, model } from 'mongoose';

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: [true, 'First Name is required'],
		},

		lastName: {
			type: String,
			required: [true, 'First Name is required'],
		},

		username: {
			type: String,
			unique: true,
			required: [true, 'Username is required'],
		},

		email: {
			type: String,
			unique: true,
			required: [true, 'Email is required'],
		},

		password: {
			type: String,
			required: [true, 'Email is required'],
		},

		profilePhoto: {
			type: String,
			required: false,
		},

		accessToken: {
			type: String,
			index: true,
		},
	},
	{ timestamps: true }
);

export const User = model('UserSchema', userSchema);
