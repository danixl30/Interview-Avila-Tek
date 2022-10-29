import { UserComplete } from '../../core/abstractions/repositories/types/user-complete'
import { UserRepository } from '../../core/abstractions/repositories/user.repository'
import { PaginationDTO } from '../../graphQl/schemas/resolvers/user/dto/pagination.dto'
import { UserRegisterDTO } from '../../graphQl/schemas/resolvers/user/dto/user.register'
import { User } from '../../graphQl/schemas/user'
import { Optional } from '../../utils/types/optional'
import { UserModel } from '../schemas/user.schema'

export class UserMongoRepository implements UserRepository {
    async create(userData: UserRegisterDTO): Promise<User> {
        const userToSave = new UserModel()
        userToSave.username = userData.username
        userToSave.email = userData.email
        userToSave.password = userData.password
        await userToSave.save()
        return {
            username: userData.username,
            email: userData.email,
            id: userToSave.id,
        }
    }

    async list(pagination: PaginationDTO): Promise<User[]> {
        const users = await UserModel.find()
            .skip((pagination.page - 1) * pagination.offset)
            .limit(pagination.offset)
        return users.map((e) => ({
            username: e.username!!,
            email: e.email!!,
            id: e.id!!,
        }))
    }

    async findById(id: string): Promise<User> {
        const user = await UserModel.findById(id)
        if (!user) throw new Error('User not found')
        return {
            username: user.username!!,
            email: user.email!!,
            id: user.id!!,
        }
    }

    async findByEmail(email: string): Promise<Optional<UserComplete>> {
        const user = await UserModel.findOne({ email })
        if (!user) return null
        return {
            username: user.username!!,
            email: user.email!!,
            id: user.id!!,
            password: user.password!!,
        }
    }

    async count(): Promise<number> {
        return await UserModel.count()
    }
}
