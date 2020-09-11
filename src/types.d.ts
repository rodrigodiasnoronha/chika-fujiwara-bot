import { Client, Message } from 'discord.js';
import { Document } from 'mongoose';

interface Command {
    name: string;
    description: string;
    aliases: Array<string>;
    args: Array<string>;
    execute: Execute;
    [name: string]: any;
}

interface Execute {
    (client: Client, message: Message, args: Array<string>): void;
}

interface UserModel extends Document {
    user_discord_id: string;
    balance: number;
    bio: string;
    last_stole_in?: Date;
    locale?: string;
}

interface UserItemsModel extends Document {
    user_discord_id: string;
    item_id: string;
    amount: number;
}

interface CurrencyShopModel extends Document {
    name: string;
    cost: number;
}
