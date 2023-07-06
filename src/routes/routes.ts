import { Router } from 'express'
import { driver } from './drivers'

export const routes = Router()

routes.use('/drivers', driver)
