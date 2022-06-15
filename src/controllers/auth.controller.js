"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.signup = exports.login = void 0;
// @ts-nocheck
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptSalt = 10;
const login = (req, res) => {
    const { username, password } = req.body;
    user_model_1.default.findOne({ username })
        .then((user) => {
        if (!user) {
            res.status(401).json({ message: 'User not found.' });
            return;
        }
        if (bcrypt_1.default.compareSync(password, user.password) === false) {
            throw new Error('Incorrect password');
        }
        const { _id, username } = user;
        const payload = { _id, username };
        const authToken = jsonwebtoken_1.default.sign(payload, process.env.TOKEN_SECRET, {
            algorithm: 'HS256',
            expiresIn: '6h',
        });
        res.status(200).json({ authToken: authToken });
    })
        .catch((err) => res.status(500).json({ code: 500, message: err.message }));
};
exports.login = login;
const signup = (req, res) => {
    const { username, password } = req.body;
    user_model_1.default.findOne({ username })
        .then((user) => {
        if (user) {
            throw new Error('Username already exists');
        }
        if (password.length < 8) {
            throw new Error('Password must have at least 8 characters long');
        }
        const salt = bcrypt_1.default.genSaltSync(bcryptSalt);
        const hashPass = bcrypt_1.default.hashSync(password, salt);
        return user_model_1.default.create({ username, password: hashPass });
    })
        .then((newUser) => {
        const { username, _id } = newUser;
        const user = { username, _id };
        res.status(201).json({ user: user });
    })
        .catch((err) => res.status(500).json({ code: 500, message: err.message }));
};
exports.signup = signup;
const verify = (req, res) => {
    const receivedToken = req.body.headers.Authorization;
    const authenticatedUser = jsonwebtoken_1.default.verify(receivedToken, process.env.TOKEN_SECRET);
    res.status(201).json({ authenticatedUser: authenticatedUser });
};
exports.verify = verify;
