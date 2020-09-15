import { Client, Message } from 'discord.js';
import { Command } from '../../types';
import jimp from 'jimp';

// tremor imagem
export const dither: Command = {
    name: 'Inverse',
    description: 'Inverta a imagem de perfil sua ou de alguém.',
    aliases: ['teste', 'teste'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send('404 - Command not Found.');
    },
};
