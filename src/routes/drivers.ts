import { Router } from 'express'
import { registerDriver } from '../controllers/drivers'

export const driver = Router()

driver.post('/register', registerDriver)
