import { Command } from '../../types';
import { Client, Message, UserResolvable } from 'discord.js';

export const ban: Command = {
    name: 'Ban',
    description: 'Banir algum membro',
    aliases: ['ban', 'banir'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );
        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

        const userHasNotPermission = !message.member?.hasPermission(
            'BAN_MEMBERS',
            { checkAdmin: true, checkOwner: true }
        );

        if (userHasNotPermission) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Você não possui permissão para banir usuários.`
            );
        }

        const user = message.mentions.users.first();
        const banReason = args.slice(1).join(' ');

        if (!user || !banReason) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Você precisa marcar um usuário e o motivo do ban.`
            );
        }

        const userIsBannable = message.guild?.member(user as UserResolvable)
            ?.bannable;

        if (!userIsBannable) {
            return message.channel.send(
                'Você não possui permissão para banir este usuário.'
            );
        }

        try {
            await message.guild
                ?.member(user as UserResolvable)
                ?.ban({ reason: banReason });

            return message.channel.send(`<:certo:${okEmoji}> Usuário banido.`);
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao banir este usuário.`
            );
        }
    },
};
