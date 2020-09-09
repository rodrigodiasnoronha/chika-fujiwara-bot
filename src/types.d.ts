import { Client, Message } from 'discord.js';
import { Document } from 'mongoose';

export interface Command {
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
    money: number;
    bio: string;
}
