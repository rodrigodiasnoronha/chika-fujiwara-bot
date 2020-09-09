import { Schema, model } from 'mongoose';
import { UserModel } from '../../types';

const userSchema = new Schema(
    {
        user_discord_id: {
            type: String,
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
    },
    { timestamps: true }
);

export const User = model<UserModel>('User', userSchema);
