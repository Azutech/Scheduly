import { Router } from 'express'
import { createVehicle } from '../controllers/vehicles'

export const vehicles = Router()

vehicles.post('/registerVehicles', createVehicle)
