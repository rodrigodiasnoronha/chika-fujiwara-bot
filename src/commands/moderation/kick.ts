import { Command } from '../../types';
import { Client, Message, UserResolvable, MessageEmbed } from 'discord.js';

export const kick: Command = {
    name: 'Kick',
    description: 'Expulsar algum membro',
    aliases: ['kick', 'expulsar', 'kickar'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();
        const kickReason = args.slice(1).join(' ');

        if (!message.member?.hasPermission('KICK_MEMBERS'))
            return message.reply(
                'você não possui permissão para expulsar usuários.'
            );

        if (!user)
            return message.reply(
                'você precisa mencionar o usuário a ser expulso.'
            );

        if (user === message.author)
            return message.reply('você não pode expulsar você mesmo!');

        // Verifica se o usuário pode ser expulso
        const isKickable = message.guild?.member(user as UserResolvable)
            ?.kickable;
        if (!isKickable)
            return message.reply(
                'você não possui permissão para expulsar este usuário.'
            );

        if (!kickReason)
            return message.reply('você precisa digitar o motivo da expulsão.');

        // Expulsa o usuário
        try {
            await message.guild
                ?.member(user as UserResolvable)
                ?.kick(kickReason);
        } catch (err) {
            return message.reply('ocorreu um erro ao expulsar o usuário');
        }
    },
};
