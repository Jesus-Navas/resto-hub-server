import User from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const bcryptSalt = 10;

export const login: RequestHandler = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (!user) {
                res.status(401).json({ message: 'User not found.' });
                return;
            }
            if (bcrypt.compareSync(password, user.password) === false) {
                throw new Error('Incorrect password');
            }
            const { _id, username } = user;
            const payload = { _id, username };

            const authToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
                algorithm: 'HS256',
                expiresIn: '6h',
            });
            res.status(200).json({ authToken: authToken });
        })
        .catch((err) => res.status(500).json({ code: 500, message: err.message }));
};

export const signup: RequestHandler = (req, res) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => {
            if (user) {
                throw new Error('Username already exists');
            }
            if (password.length < 8) {
                throw new Error('Password must have at least 8 characters long');
            }
            const salt = bcrypt.genSaltSync(bcryptSalt);
            const hashPass = bcrypt.hashSync(password, salt);

            return User.create({ username, password: hashPass });
        })
        .then((newUser) => {
            const { username, _id } = newUser;
            const user = { username, _id };
            res.status(201).json({ user: user });
        })
        .catch((err) => res.status(500).json({ code: 500, message: err.message }));
};

export const verify: RequestHandler = (req, res) => {
    const receivedToken = req.body.headers.Authorization;
    const authenticatedUser = jwt.verify(
        receivedToken as string,
        process.env.TOKEN_SECRET!
    );
    res.status(201).json({ authenticatedUser: authenticatedUser });
};
