import { Router } from 'express'
import { registerDriver, getOneDriver } from '../controllers/drivers'

export const driver = Router()

driver.post('/register', registerDriver)
driver.get('/getUser=?/:id', getOneDriver)
