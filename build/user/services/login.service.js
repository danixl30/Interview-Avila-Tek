"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
class LoginService {
    constructor(userRepo, crypto, tokenManager) {
        this.userRepo = userRepo;
        this.crypto = crypto;
        this.tokenManager = tokenManager;
    }
    async execute(data) {
        const user = await this.userRepo.findByEmail(data.email);
        if (!user)
            throw new Error('Not user found');
        const result = await this.crypto.compare(data.password, user.password);
        if (!result)
            throw new Error('Password not valid');
        const token = await this.tokenManager.sign({ id: user.id });
        return token;
    }
}
exports.LoginService = LoginService;
