import { Request, Response, NextFunction } from 'express'
import { Driver } from '../models/drivers'
import { AppError } from '../utils/error'

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

export const getOneDriver = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params

    try {
        const getThisDriver = await Driver.findOne({ _id: id })
        if (!getThisDriver) {
            return next(new AppError('You are able to perfrom this function', 404))
        }

        return res.status(200).json({
            success: true,
            message: `this user${id} has been retrieved`,
            data: getThisDriver,
        })
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Service Unavailable ${err.message}`, 503))
    }
}
