import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { collation: { locale: 'en', strength: 2 } }
);

export const User = model('User', userSchema);
