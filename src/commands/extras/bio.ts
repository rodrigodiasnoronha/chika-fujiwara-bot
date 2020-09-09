import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';

export const bio: Command = {
    name: 'Bio',
    description: 'Mude sua biografia.',
    aliases: ['biografia', 'bio'],
    args: ['bio'],
    async execute(client: Client, message: Message, args: Array<string>) {
        if (!args.length) {
            return message.reply(
                'você precisa digitar algo para mudar sua biografia.'
            );
        }

        try {
            const biograph = args.join(' ');
            let user = await User.findOne({
                user_discord_id: message.author.id,
            });

            // cria usuário se ele não tiver
            if (!user) {
                user = await User.create({
                    user_discord_id: message.author.id,
                    bio: biograph,
                    money: 0,
                });
            } else {
                user.bio = biograph;
                await user.save();
            }

            return message.channel.send(
                ':white_check_mark: Biografia alterada com sucesso.'
            );
        } catch (err) {
            return message.reply('ocorreu um erro ao alterar a biografia.');
        }
    },
};
