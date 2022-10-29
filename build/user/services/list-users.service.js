"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListUsersService = void 0;
class ListUsersService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async execute(data) {
        return await this.userRepo.list(data);
    }
}
exports.ListUsersService = ListUsersService;
