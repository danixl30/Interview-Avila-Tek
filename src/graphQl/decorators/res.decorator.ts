import { createParamDecorator } from 'type-graphql'
import { Response } from 'express'

export function Res() {
    return createParamDecorator<{ res: Response }>(({ context }) => context.res)
}
