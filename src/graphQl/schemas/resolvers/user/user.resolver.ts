import { Resolver, Query, Arg, Mutation, Authorized } from 'type-graphql'
import { Response } from 'express'
import { validate } from 'class-validator'
import { User } from '../../user'
import { PaginationDTO } from './dto/pagination.dto'
import { UserRegisterDTO } from './dto/user.register'
import { CreateUserService } from '../../../../user/services/create-user.service'
import { UserMongoRepository } from '../../../../database/repositories/user.mongo.repository'
import { Sha256Cryto } from '../../../../core/sha256/sha256.crypto'
import { ListUsersService } from '../../../../user/services/list-users.service'
import { UserLoginDTO } from './dto/user.login'
import { LoginService } from '../../../../user/services/login.service'
import { JwtGenerator } from '../../../../core/jwt/jwt.generator'
import { Res } from '../../../decorators/res.decorator'
import { UserAuth } from '../../../decorators/user.auth.decorator'
import { CountPagesDTO } from './dto/count-pages.dto'
import { CountUserPagesService } from '../../../../user/services/count-user-pages.service'

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('data', () => UserRegisterDTO) data: UserRegisterDTO,
    ): Promise<User> {
        await validate(data)
        return await new CreateUserService(
            new UserMongoRepository(),
            new Sha256Cryto(),
        ).execute(data)
    }

    @Query(() => [User])
    async findUsers(
        @Arg('pagination', () => PaginationDTO) data: PaginationDTO,
    ) {
        await validate(data)
        return await new ListUsersService(new UserMongoRepository()).execute(
            data,
        )
    }

    @Query(() => Boolean)
    async login(
        @Arg('data', () => UserLoginDTO) data: UserLoginDTO,
        @Res() res: Response,
    ) {
        await validate(data)
        const token = await new LoginService(
            new UserMongoRepository(),
            new Sha256Cryto(),
            new JwtGenerator(),
        ).execute(data)
        res.cookie('auth', token, {
            sameSite: 'none',
            secure: true,
        })
        return true
    }

    @Authorized()
    @Query(() => User)
    async getUserLoged(@UserAuth() user: User) {
        return user
    }

    @Authorized()
    @Query(() => Boolean)
    logout(@Res() res: Response) {
        res.clearCookie('auth', {
            sameSite: 'none',
            secure: true,
        })
        return true
    }

    @Query(() => Number)
    async countUserPages(
        @Arg('data', () => CountPagesDTO) data: CountPagesDTO,
    ) {
        await validate(data)
        return await new CountUserPagesService(
            new UserMongoRepository(),
        ).execute(data)
    }
}
