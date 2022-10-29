import express from 'express'
import cors from 'cors'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../../graphQl/schemas/resolvers/user/user.resolver'
import cookieParser from 'cookie-parser'
import { User } from '../../graphQl/schemas/user'
import { customAuthChecker } from '../../graphQl/guards/auth.guard'
import { UserMongoRepository } from '../../database/repositories/user.mongo.repository'
import { JwtGenerator } from '../jwt/jwt.generator'

const app = express()

app.use(
    cors({
        credentials: true,
        origin: ['https://studio.apollographql.com'],
    }),
)
app.use(express.json())
app.use(cookieParser())
app.set('trust proxy', 1)

declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

export const createServer = async () => {
    const server = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            authChecker: customAuthChecker(
                new UserMongoRepository(),
                new JwtGenerator(),
            ),
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    })
    await server.start()
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            credentials: true,
            origin: ['https://studio.apollographql.com'],
        },
    })
    return app
}
