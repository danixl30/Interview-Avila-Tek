"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Req = void 0;
const type_graphql_1 = require("type-graphql");
function Req() {
    return (0, type_graphql_1.createParamDecorator)(({ context }) => context.req);
}
exports.Req = Req;
