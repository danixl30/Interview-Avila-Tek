import 'dotenv/config'
import 'reflect-metadata'
import { createServer } from './core/server/app'
import './database/connection/mongoose.connection'

const PORT = process.env.PORT || 3000

async function bootstrap() {
    const app = await createServer()
    app.listen(PORT)
    console.log('Server started')
}

bootstrap()
