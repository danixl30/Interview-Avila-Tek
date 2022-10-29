import { AuthChecker } from 'type-graphql'
import { Request, Response } from 'express'
import { TokenData } from '../../user/types/token-data'
import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { TokenGenerator } from '../../core/abstractions/token/token.generator'

export const customAuthChecker =
    (
        userRepo: UserRepository,
        tokenManager: TokenGenerator,
    ): AuthChecker<{ req: Request; res: Response }> =>
    async ({ context }) => {
        const token = context.req.cookies.auth
        if (!token) throw new Error('User not loged')
        const data = await tokenManager.verify<TokenData>(token)
        const user = await userRepo.findById(data.id)
        context.req.user = user
        return true
    }
