import { createParamDecorator } from 'type-graphql'
import { Request } from 'express'

export function UserAuth() {
    return createParamDecorator<{ req: Request }>(
        ({ context }) => context.req.user,
    )
}
