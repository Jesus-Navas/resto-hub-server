"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_jwt_1 = __importDefault(require("express-jwt"));
const isAuthenticated = (0, express_jwt_1.default)({
    secret: process.env.TOKEN_SECRET,
    algorithms: ['HS256'],
    requestProperty: 'payload',
    getToken: getTokenFromHeaders,
});
function getTokenFromHeaders(req) {
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        return token;
    }
    return null;
}
exports.default = isAuthenticated;
