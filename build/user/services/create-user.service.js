"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
class CreateUserService {
    constructor(userRepo, crypto) {
        this.userRepo = userRepo;
        this.crypto = crypto;
    }
    async execute(data) {
        const possibleUser = await this.userRepo.findByEmail(data.email);
        if (possibleUser)
            throw new Error('User already exist');
        data.password = await this.crypto.encrypt(data.password);
        return await this.userRepo.create(data);
    }
}
exports.CreateUserService = CreateUserService;
