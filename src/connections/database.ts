import mongoose, { ConnectOptions } from 'mongoose'
import log from '../logger/customlogger'

import dotenv from 'dotenv'

dotenv.config()

mongoose.set('debug', true)

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const uri = process.env.MONGO_URI as string

export const database = async () => {
    await mongoose
        .connect(uri, connectionParams as ConnectOptions)
        .then(() => {
            log.info('Connected to Scheduly DB on MongoDB local server')
        })
        .catch((err) => {
            log.info(`Error connecting to the database. n${err}`)
            process.exit(1)
        })
}
