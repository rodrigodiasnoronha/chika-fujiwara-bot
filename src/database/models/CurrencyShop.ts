import { model, Schema } from 'mongoose';
import { CurrencyShopModel } from '../../types';

const currencyShopSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        cost: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

export const CurrencyShop = model<CurrencyShopModel>(
    'CurrencyShop',
    currencyShopSchema
);
