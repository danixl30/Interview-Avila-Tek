"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const user_1 = require("../../user");
const pagination_dto_1 = require("./dto/pagination.dto");
const user_register_1 = require("./dto/user.register");
const create_user_service_1 = require("../../../../user/services/create-user.service");
const user_mongo_repository_1 = require("../../../../database/repositories/user.mongo.repository");
const sha256_crypto_1 = require("../../../../core/sha256/sha256.crypto");
const list_users_service_1 = require("../../../../user/services/list-users.service");
const user_login_1 = require("./dto/user.login");
const login_service_1 = require("../../../../user/services/login.service");
const jwt_generator_1 = require("../../../../core/jwt/jwt.generator");
const res_decorator_1 = require("../../../decorators/res.decorator");
const user_auth_decorator_1 = require("../../../decorators/user.auth.decorator");
let UserResolver = class UserResolver {
    async register(data) {
        await (0, class_validator_1.validate)(data);
        return await new create_user_service_1.CreateUserService(new user_mongo_repository_1.UserMongoRepository(), new sha256_crypto_1.Sha256Cryto()).execute(data);
    }
    async findUsers(data) {
        await (0, class_validator_1.validate)(data);
        return await new list_users_service_1.ListUsersService(new user_mongo_repository_1.UserMongoRepository()).execute(data);
    }
    async login(data, res) {
        await (0, class_validator_1.validate)(data);
        const token = await new login_service_1.LoginService(new user_mongo_repository_1.UserMongoRepository(), new sha256_crypto_1.Sha256Cryto(), new jwt_generator_1.JwtGenerator()).execute(data);
        res.cookie('auth', token, {
            sameSite: 'none',
            secure: true,
        });
        return true;
    }
    async getUserLoged(user) {
        return user;
    }
    logout(res) {
        res.clearCookie('auth', {
            sameSite: 'none',
            secure: true,
        });
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)('data', () => user_register_1.UserRegisterDTO)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_register_1.UserRegisterDTO]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User]),
    __param(0, (0, type_graphql_1.Arg)('pagination', () => pagination_dto_1.PaginationDTO)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDTO]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "findUsers", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('data', () => user_login_1.UserLoginDTO)),
    __param(1, (0, res_decorator_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_login_1.UserLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(() => user_1.User),
    __param(0, (0, user_auth_decorator_1.UserAuth)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserLoged", null);
__decorate([
    (0, type_graphql_1.Query)(() => Boolean),
    __param(0, (0, res_decorator_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
