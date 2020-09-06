import { Client, Message } from 'discord.js';
import { Command } from '../../types';

export const sleepy: Command = {
    name: 'Sleepy',
    description: 'Demonstre que você está com sono!',
    aliases: ['sleepy', 'sono'],
    args: [],
    gifs: [],
    execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send('sono');
    },
};
