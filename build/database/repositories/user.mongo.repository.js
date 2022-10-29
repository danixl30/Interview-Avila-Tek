"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoRepository = void 0;
const user_schema_1 = require("../schemas/user.schema");
class UserMongoRepository {
    async create(userData) {
        const userToSave = new user_schema_1.UserModel();
        userToSave.username = userData.username;
        userToSave.email = userData.email;
        userToSave.password = userData.password;
        await userToSave.save();
        return {
            username: userData.username,
            email: userData.email,
            id: userToSave.id,
        };
    }
    async list(pagination) {
        const users = await user_schema_1.UserModel.find()
            .skip((pagination.page - 1) * pagination.offset)
            .limit(pagination.offset);
        return users.map((e) => ({
            username: e.username,
            email: e.email,
            id: e.id,
        }));
    }
    async findById(id) {
        const user = await user_schema_1.UserModel.findById(id);
        if (!user)
            throw new Error('User not found');
        return {
            username: user.username,
            email: user.email,
            id: user.id,
        };
    }
    async findByEmail(email) {
        const user = await user_schema_1.UserModel.findOne({ email });
        if (!user)
            return null;
        return {
            username: user.username,
            email: user.email,
            id: user.id,
            password: user.password,
        };
    }
}
exports.UserMongoRepository = UserMongoRepository;
