"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const user_resolver_1 = require("../../graphQl/schemas/resolvers/user/user.resolver");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_guard_1 = require("../../graphQl/guards/auth.guard");
const user_mongo_repository_1 = require("../../database/repositories/user.mongo.repository");
const jwt_generator_1 = require("../jwt/jwt.generator");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['https://studio.apollographql.com'],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.set('trust proxy', 1);
const createServer = async () => {
    const server = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({
            resolvers: [user_resolver_1.UserResolver],
            authChecker: (0, auth_guard_1.customAuthChecker)(new user_mongo_repository_1.UserMongoRepository(), new jwt_generator_1.JwtGenerator()),
            validate: false,
        }),
        context: ({ req, res }) => ({ req, res }),
    });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql',
        cors: {
            credentials: true,
            origin: ['https://studio.apollographql.com'],
        },
    });
    return app;
};
exports.createServer = createServer;
