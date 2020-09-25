import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';
import { helpEmbed } from '../../utils/HelpEmbed';

export const bio: Command = {
    name: 'Bio',
    description: 'Mude sua biografia.',
    aliases: ['biografia', 'bio'],
    args: ['bio'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        if (!args.length) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Digite sua biografia.`
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
                    balance: 0,
                });
            } else {
                user.bio = biograph;
                await user.save();
            }

            return message.channel.send(
                `<:certo:${okEmoji}> Biografia alterada com sucesso.`
            );
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao alterar a biografia.`
            );
        }
    },
};
