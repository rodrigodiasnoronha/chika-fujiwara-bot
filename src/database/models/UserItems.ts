import { model, Schema } from 'mongoose';
import { UserItemsModel } from '../../types';

const userItemsSchema = new Schema(
    {
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        item_id: {
            type: Schema.Types.ObjectId,
            ref: 'CurrencyShop',
        },
        amount: {
            type: Number,
            default: 0,
            required: true,
        },
    },
    { timestamps: true }
);

export const UserItems = model<UserItemsModel>('UserItems', userItemsSchema);
