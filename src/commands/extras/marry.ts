import {
    Client,
    GuildEmoji,
    Message,
    MessageReaction,
    ReactionEmoji,
    User,
} from 'discord.js';
import { Command } from '../../types';
import { User as UserModel } from '../../database/models/User';
import { UserModel as UserModelMongo } from '../../types';

export const marry: Command = {
    name: 'Marry',
    description: '',
    aliases: ['marry', 'casar'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

        if (!user)
            return message.channel.send(
                `<:errado:${errorEmoji}> Você precisa mencionar o usuário que você deseja se casar.`
            );

        try {
            /**
             *
             * Waifu => usuário que recebe o pedido de casamento
             * Husband => usuário que faz o pedido
             *
             *
             * @todo
             * fazer mensagem de erro quando acabar o tempo do pedido
             *
             *
             */

            let waifu = await UserModel.findOne({
                user_discord_id: user.id,
            });

            let husband = await UserModel.findOne({
                user_discord_id: message.author.id,
            });

            if (!husband) {
                husband = await UserModel.create({
                    user_discord_id: message.author.id,
                    balance: 0,
                    bio: '',
                });
            }

            if (!waifu) {
                waifu = await UserModel.create({
                    user_discord_id: user.id,
                    balance: 0,
                    bio: '',
                });
            }

            if (husband.waifuId) {
                return message.channel.send(`
                <:errado:${errorEmoji}> Você já está casado.`);
            }

            if (waifu.waifuId) {
                return message.channel.send(`
                <:errado:${errorEmoji}> Este usuário já esta casado.`);
            }

            if (waifu.id === husband.id)
                return message.channel.send(`
                <:errado:${errorEmoji}> Você não pode casar consigo mesmo.`);

            const marryMessage = await message.channel.send(
                `<@${user}>, você foi pedido em casamento por <@${message.author}>. Reaga com :heart: para aceitar.`
            );
            await marryMessage.react('❤️');

            // filtro da reação
            const marryFilter = (reaction: MessageReaction, userReact: User) =>
                reaction.emoji.name === '❤️' && userReact.id === user.id;

            const collector = marryMessage.createReactionCollector(
                marryFilter,
                { time: 15000 }
            );

            collector.on('collect', async () => {
                await this.handleReactToMarry(
                    message,
                    user,
                    waifu,
                    husband,
                    okEmoji
                );

                collector.removeAllListeners();
                await marryMessage.delete();
            });

            collector.on('end', async () => {
                message.channel.send(`
                    <:errado:${errorEmoji}> O Tempo de aceitação do pedido de casamento foi esgotado.
                `);
            });

            collector.on('remove', async () => {
                message.channel.send(
                    '<:errado:${errorEmoji}> Listeners removidos.'
                );
            });
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao mostrar o pedido de casamento.`
            );
        }
    },

    async handleReactToMarry(
        message: Message,
        user: User,
        waifu: UserModelMongo,
        husband: UserModelMongo,
        okEmoji: GuildEmoji
    ) {
        waifu.waifuId = message.author.id;
        husband.waifuId = user.id;

        await waifu.save();
        await husband.save();

        await message.channel.send(
            `<:certo:${okEmoji}> <@${message.author}> se casou com <@${user}>!`
        );
    },
};
