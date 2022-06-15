import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
        },
        favRestaurants: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Restaurant',
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model('User', userSchema);
