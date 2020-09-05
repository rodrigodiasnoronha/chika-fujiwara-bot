import { Client, Message } from 'discord.js';
import { Command } from '../../types';

export const ping: Command = {
    name: 'Ping',
    description: 'Jogue ping pong comigo!',
    aliases: ['ping'],
    args: [],
    execute(client: Client, message: Message, args: Array<string>) {
        message.channel.send('Pong!');
    },
};
