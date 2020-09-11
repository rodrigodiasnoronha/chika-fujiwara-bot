import { Schema, model } from 'mongoose';
import { UserModel } from '../../types';

const userSchema = new Schema(
    {
        user_discord_id: {
            type: String,
            required: true,
            unique: true,
        },
        balance: {
            type: Number,
            default: 0,
        },
        bio: {
            type: String,
            default: 'Hi there!',
        },
        locale: {
            type: String,
            default: '',
        },
        user_items: {
            type: [Schema.Types.ObjectId],
            ref: 'UserItems',
        },
        last_stole_in: {
            type: Date,
        },
    },
    { timestamps: true }
);

export const User = model<UserModel>('User', userSchema);
