import { Request, Response, NextFunction } from 'express'
import { Driver } from '../models/drivers'
import { AppError } from '../utils/error'
// import {}

export const registerDriver = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { fullName, email, mobileNumber, address } = req.body

    try {
        if (!(fullName || email || mobileNumber || address)) {
            return next(new AppError('Input parameters required', 404))
        }

        const existingDriver = await Driver.findOne({ email })
        if (existingDriver) {
            return next(new AppError('User already exist', 409))
        }

        const newDriver = await Driver.create({
            fullName,
            email,
            mobileNumber,
            address,
        })

        if (!newDriver) {
            return next(new AppError('Unable to create driver', 409))
        }

        await newDriver.save()

        return res.status(201).json({
            success: true,
            message: 'Driver has been created',
            data: newDriver,
        })
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Service Unavailable ${err.message}`, 503))
    }
}
