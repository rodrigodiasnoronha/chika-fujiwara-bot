import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    user_discord_id: {
        type: Number,
        required: true,
        unique: true,
    },
    money: {
        type: Number,
        default: 0,
    },
    bio: {
        type: String,
        default: 'Hi there!',
    },
});

export const User = model('User', userSchema);
