import * as jwt from 'jsonwebtoken'
import { TokenGenerator } from '../abstractions/token/token.generator'

const SECRET = process.env.SECRET || 'test'

export class JwtGenerator implements TokenGenerator {
    async sign<T extends object>(data: T): Promise<string> {
        return jwt.sign(data, SECRET)
    }

    async verify<T extends object>(value: string): Promise<T> {
        const data = jwt.verify(value, SECRET) as T
        return data
    }
}
