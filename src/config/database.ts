import mongoose from 'mongoose';

(async () => {
    try {
        const db = await mongoose.connect(
            process.env.MONGO_DATABASE!
        );
        console.log('Connected to:', db.connection.name);
    } catch (error) {
        console.error(error);
    }
})();