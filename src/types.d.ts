import { Client, Message } from 'discord.js';

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
