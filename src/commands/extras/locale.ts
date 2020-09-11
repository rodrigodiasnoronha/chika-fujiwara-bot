import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';

export const locale: Command = {
    name: 'Locale',
    description: 'Digite o local onde você mora.',
    args: ['local'],
    aliases: ['locale', 'localization', 'local'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const locale = args.join(' ');

        if (!locale)
            return message.channel.send(':x: É necessário digitar um local.');

        try {
            let user = await User.findOne({
                user_discord_id: message.author.id,
            });

            if (!user) {
                user = await User.create({
                    user_discord_id: message.author.id,
                    balance: 0,
                    bio: '',
                });
            }

            user.locale = locale;
            await user.save();

            return message.channel.send(
                ':white_check_mark: Localização alterada com sucesso.'
            );
        } catch (err) {
            return message.channel.send(
                ':x: Ocorreu um erro ao salvar o local.'
            );
        }
    },
};
