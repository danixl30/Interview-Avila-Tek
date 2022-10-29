import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { Service } from '../../core/abstractions/service/service'
import { CountPagesDTO } from '../../graphQl/schemas/resolvers/user/dto/count-pages.dto'

export class CountUserPagesService implements Service<CountPagesDTO, number> {
    constructor(private readonly userRepo: UserRepository) {}
    async execute(data: CountPagesDTO): Promise<number> {
        const count = await this.userRepo.count()
        return Math.ceil(count / data.offset)
    }
}
