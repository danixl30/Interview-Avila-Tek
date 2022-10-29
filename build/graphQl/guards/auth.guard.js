"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAuthChecker = void 0;
const customAuthChecker = (userRero, tokenManager) => async ({ context }) => {
    const token = context.req.cookies.auth;
    if (!token)
        throw new Error('User not logued');
    const data = await tokenManager.verify(token);
    const user = await userRero.findById(data.id);
    context.req.user = user;
    return true;
};
exports.customAuthChecker = customAuthChecker;
