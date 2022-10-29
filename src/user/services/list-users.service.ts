import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { Service } from '../../core/abstractions/service/service'
import { PaginationDTO } from '../../graphQl/schemas/resolvers/user/dto/pagination.dto'
import { User } from '../../graphQl/schemas/user'

export class ListUsersService implements Service<PaginationDTO, User[]> {
    constructor(private readonly userRepo: UserRepository) {}

    async execute(data: PaginationDTO): Promise<User[]> {
        return await this.userRepo.list(data)
    }
}
