import { Crypto } from '../../core/abstractions/crypto/crypto'
import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { Service } from '../../core/abstractions/service/service'
import { UserRegisterDTO } from '../../graphQl/schemas/resolvers/user/dto/user.register'
import { User } from '../../graphQl/schemas/user'

export class CreateUserService implements Service<UserRegisterDTO, User> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly crypto: Crypto,
    ) {}

    async execute(data: UserRegisterDTO): Promise<User> {
        const possibleUser = await this.userRepo.findByEmail(data.email)
        if (possibleUser) throw new Error('User already exist')
        data.password = await this.crypto.encrypt(data.password)
        return await this.userRepo.create(data)
    }
}
