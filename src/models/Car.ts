import { model, Schema, Types } from 'mongoose';

const carSchema = new Schema({
    brand: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    engine: {
        type: String,
        required: true,
    },
    fuel: {
        type: String,
        required: true,
        enum: ['Petrol', 'Diesel', 'LPG', 'Electric'],
    },
    doors: {
        type: Number,
        required: true,
    },
    wheels: {
        type: String,
        required: true,
    },
    dimensions: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    tuning: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    _ownerId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

export const Car = model('Car', carSchema);
