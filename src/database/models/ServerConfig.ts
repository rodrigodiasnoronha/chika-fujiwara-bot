import { model, Schema } from 'mongoose';
import { ServerConfigModel } from '../../types';

const ServerConfigSchema = new Schema(
    {
        autorole_id: {
            type: String,
            required: false,
        },
        guild_id: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

export const ServerConfig = model<ServerConfigModel>(
    'ServerConfig',
    ServerConfigSchema
);
