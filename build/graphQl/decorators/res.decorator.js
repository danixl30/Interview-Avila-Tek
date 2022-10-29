"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
const type_graphql_1 = require("type-graphql");
function Res() {
    return (0, type_graphql_1.createParamDecorator)(({ context }) => context.res);
}
exports.Res = Res;
