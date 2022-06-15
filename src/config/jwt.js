"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jsonwebtoken_1 = require("jsonwebtoken");
//TODO: Find a better way for JWTSECRET
const generateAccessToken = (user) => {
    return (0, jsonwebtoken_1.sign)({
        userId: user._id,
        username: user.username,
        favRestaurants: user.favRestaurants,
    }, process.env.TOKEN_SECRET);
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    return (0, jsonwebtoken_1.verify)(token, process.env.TOKEN_SECRET);
};
exports.verifyAccessToken = verifyAccessToken;
