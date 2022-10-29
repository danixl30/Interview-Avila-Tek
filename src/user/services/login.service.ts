import { Crypto } from '../../core/abstractions/crypto/crypto'
import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { Service } from '../../core/abstractions/service/service'
import { TokenGenerator } from '../../core/abstractions/token/token.generator'
import { UserLoginDTO } from '../../graphQl/schemas/resolvers/user/dto/user.login'

export class LoginService implements Service<UserLoginDTO, string> {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly crypto: Crypto,
        private readonly tokenManager: TokenGenerator,
    ) {}

    async execute(data: UserLoginDTO): Promise<string> {
        const user = await this.userRepo.findByEmail(data.email)
        if (!user) throw new Error('Not user found')
        const result = await this.crypto.compare(data.password, user.password)
        if (!result) throw new Error('Password not valid')
        const token = await this.tokenManager.sign({ id: user.id })
        return token
    }
}
