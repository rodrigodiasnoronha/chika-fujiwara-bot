import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';
import { Command } from '../../types';

export const divorce: Command = {
    name: 'Divorce',
    description: 'Se divorcie do seu casamento',
    aliases: ['divorce', 'divórcio', 'divorcio', 'divorciar'],
    args: [],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

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

            if (!user.waifuId)
                return message.channel.send(
                    `<:errado:${errorEmoji}> Você não está casado.`
                );

            await User.updateMany(
                {
                    $or: [
                        { user_discord_id: { $eq: message.author.id } },
                        { user_discord_id: { $eq: user.waifuId } },
                    ],
                },
                { waifuId: '' }
            );

            return message.channel.send(
                `<:certo:${okEmoji}> Divórcio operado com sucesso.`
            );
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao se divorciar.`
            );
        }
    },
};
