import { Client, Message } from 'discord.js';
import { Command } from '../../types';

export const say: Command = {
    name: 'Say',
    description: 'Faça me dizer algo.',
    args: ['<mensagem>'],
    aliases: ['say', 'dizer'],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send(`${args.join(' ')}`);
    },
};
