import mongoose from 'mongoose'

const URL = process.env.MONGO_URL || 'mongodb://127.0.0.1/interview-database'

mongoose
    .connect(URL)
    .then(() => console.log('Database connected'))
    .catch((e) => {
        throw e
    })
