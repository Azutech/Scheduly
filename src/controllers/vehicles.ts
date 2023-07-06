import { Request, Response, NextFunction } from 'express'
import { Vehicle } from '../models/vehicles'
import { AppError } from '../utils/error'
import { Driver } from '../models/drivers'

export const createVehicle = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { name, model, carRegistration, colour } = req.body

    try {
        if (!(name || model || carRegistration || colour)) {
            return next(new AppError('Input parameters required', 404))
        }
        const carNumber = await Vehicle.findOne({ carRegistration })
        if (carNumber) {
            return next(new AppError('Vehicle has already exist', 409))
        }

        const registerVehicle = await Driver.create({
            name,
            model,
            carRegistration,
            colour,
            isAvailable: false,
        })

        if (! registerVehicle) {
            return next(new AppError('Unable to register vehicle', 409))
        }

        await registerVehicle.save()
        return res.status(201).json({
            success: true,
            message: 'Vehicle has been registered',
            data: registerVehicle,
        })
    } catch (err: any) {
        console.error(err)
        return next(new AppError(`Service Unavailable ${err.message}`, 503))
    }
}
