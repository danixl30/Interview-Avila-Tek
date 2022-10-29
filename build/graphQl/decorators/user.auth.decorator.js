"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuth = void 0;
const type_graphql_1 = require("type-graphql");
function UserAuth() {
    return (0, type_graphql_1.createParamDecorator)(({ context }) => context.req.user);
}
exports.UserAuth = UserAuth;
