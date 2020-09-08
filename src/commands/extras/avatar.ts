import { Command } from '../../types';
import { executionAsyncResource } from 'async_hooks';
import { Client, Message } from 'discord.js';

export const avatar: Command = {
    name: 'Avatar',
    description: 'Retorna a foto de perfil de algum usuário',
    aliases: ['avatar'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

        if (args.length && !user) {
            return message.reply(
                'marque algum usuário para ver sua foto de perfil.'
            );
        }

        const avatarUrl = user
            ? user.avatarURL({ format: 'jpg', size: 1024 })
            : message.author.avatarURL({ format: 'jpg', size: 1024 });

        return message.channel.send(avatarUrl);
    },
};
