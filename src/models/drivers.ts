import { Schema, model } from 'mongoose'
import { AddressSchema } from './schema/address'

const driverSchema = new Schema(
    {
        fullName: {
            type: String,
            required: [true, 'fullname is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
        },
        mobileNUmber: {
            type: String,
            required: [true, 'Mobile number is required'],
        },
        address: {
            type: [AddressSchema],
            required: true,
        },
    },
    { timestamps: true }
)

export const Driver = model('Driver', driverSchema)
