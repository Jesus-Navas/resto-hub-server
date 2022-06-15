import { Schema, model } from 'mongoose';

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        neighborhood: {
            type: String,
            trim: true,
            default: 'Not specified',
        },
        photograph: {
            type: String,
            default: 'https://i.ibb.co/rFwpx3K/kindpng-2011704.png',
        },
        address: {
            type: String,
            default: 'Address not specified',
        },
        latlng: {
            lat: {
                type: Number,
            },
            lng: {
                type: Number,
            },
        },
        image: {
            type: String,
            default: 'https://i.ibb.co/rFwpx3K/kindpng-2011704.png',
            required: true,
        },
        cuisine_type: {
            type: String,
            default: 'Unknown',
        },
        operating_hours: {
            Monday: {
                type: String,
            },
            Tuesday: {
                type: String,
            },
            Wednesday: {
                type: String,
            },
            Friday: {
                type: String,
            },
            Saturday: {
                type: String,
            },
            Sunday: {
                type: String,
            },
        },
        reviews: [
            {
                name: {
                    type: String,
                },
                date: {
                    type: String,
                },
                rating: {
                    type: Number,
                },
                comments: {
                    type: String,
                },
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export default model('Restaurant', restaurantSchema);
