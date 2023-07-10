import { NextFunction, Request, Response } from "express";
import { Vehicle } from "../models/vehicles";
import { Driver } from "../models/drivers";
import { AppError } from "../utils/error";

export const query = async(req: Request, res: Response, next: NextFunction) => {
    const { queryWord } = req.body

    if(!queryWord) {
        return next(new AppError('Not the results that you expected?', 404))
    }

    try {
         const queryVehicles = await Vehicle.find({ carRegistration :  { $regex : queryWord , $options : 'i'}, name :{ $regex : queryWord , $options : 'i'} })

         const queryDriver = await Driver.find({fullName:   { $regex : queryWord , $options : 'i'}})

         const querySearch = [...queryDriver, ...queryVehicles]
         if (!querySearch) {
            return next(new AppError('Not the results that you expected?', 404))
         } 

         return res.status(200).json({
            success: true,
            message: "Found item",
            data: querySearch

         })
    } catch (err: any) {
        console.log(err);
		return next(new AppError(`Service error ${err.message}`, 503));
    }
}
