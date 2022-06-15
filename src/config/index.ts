import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGO_DATABASE:
        process.env.MONGO_DATABASE || 'mongodb://localhost/tailor-challenge',
    PORT: process.env.PORT || 3000,
};