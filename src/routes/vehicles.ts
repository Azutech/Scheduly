import { Router } from 'express';
import {
	createVehicle,
	getOneDriver,
	getAllVehicles,
	destroyVehicle,
} from '../controllers/vehicles';

export const vehicles = Router();

vehicles.post('/registerVehicles', createVehicle);
vehicles.get('/getOneVehicles==%/:id', getOneDriver);
vehicles.get('/getallvehicle=%', getAllVehicles);
vehicles.delete('/deletethisVehicle==/:id', destroyVehicle);
