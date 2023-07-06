import { Router } from 'express'
import { registerDriver, getOneDriver, getAllDrivers } from '../controllers/drivers'

export const driver = Router()

driver.post('/register', registerDriver)
driver.get('/getUser=?/:id', getOneDriver)
driver.get('/getall', getAllDrivers)
