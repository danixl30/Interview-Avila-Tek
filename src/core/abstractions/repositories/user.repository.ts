import { PaginationDTO } from '../../../graphQl/schemas/resolvers/user/dto/pagination.dto'
import { UserRegisterDTO } from '../../../graphQl/schemas/resolvers/user/dto/user.register'
import { User } from '../../../graphQl/schemas/user'
import { Optional } from '../../../utils/types/optional'
import { UserComplete } from './types/user-complete'

export interface UserRepository {
    create(userData: UserRegisterDTO): Promise<User>
    list(pagination: PaginationDTO): Promise<User[]>
    findById(id: string): Promise<User>
    findByEmail(email: string): Promise<Optional<UserComplete>>
    count(): Promise<number>
}
