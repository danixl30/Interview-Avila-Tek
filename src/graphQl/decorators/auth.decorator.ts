import { createParamDecorator } from 'type-graphql'
import { Request } from 'express'

export function Auth() {
    return createParamDecorator<{ req: Request }>(
        ({ context }) => context.req.cookies.auth,
    )
}
