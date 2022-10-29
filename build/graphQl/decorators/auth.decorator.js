"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const type_graphql_1 = require("type-graphql");
function Auth() {
    return (0, type_graphql_1.createParamDecorator)(({ context }) => context.req.cookies.auth);
}
exports.Auth = Auth;
