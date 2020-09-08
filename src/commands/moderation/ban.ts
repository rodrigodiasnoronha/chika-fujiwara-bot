import { Command } from '../../types';
import { Client, Message, UserResolvable } from 'discord.js';

export const ban: Command = {
    name: 'Ban',
    description: 'Banir algum membro',
    aliases: ['ban', 'banir'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const userHasNotPermission = !message.member?.hasPermission(
            'BAN_MEMBERS',
            { checkAdmin: true, checkOwner: true }
        );

        if (userHasNotPermission) {
            return message.reply(
                'você não possui permissão para banir usuários.'
            );
        }

        const user = message.mentions.users.first();
        const banReason = args.slice(1).join(' ');

        if (!user || !banReason) {
            return message.reply(
                'você precisa marcar um usuário e o motivo do ban.'
            );
        }

        const userIsBannable = message.guild?.member(user as UserResolvable)
            ?.bannable;

        if (!userIsBannable) {
            return message.reply(
                'você não possui permissão para banir este usuário.'
            );
        }

        try {
            await message.guild
                ?.member(user as UserResolvable)
                ?.ban({ reason: banReason });

            return message.reply('usuário banido.');
        } catch (err) {
            return message.reply('ocorreu um erro ao banir o usuário.');
        }
    },
};
