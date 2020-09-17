import { Client, Message, MessageEmbed } from 'discord.js';
import { User } from '../../database/models/User';
import { Command } from '../../types';

/**
 *
 *  @todo
 *  implementar futuramente o sistema de top de leveis.
 *  por exemplo: top money || top level
 *  top money => mostra os mais ricos do server
 *  top level = mostra os mais upados do server
 *
 *
 */
export const top: Command = {
    name: '',
    description: 'Veja os usuários mais ricos do server',
    aliases: ['top', 'rank'],
    args: ['money'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const loadingEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'discord_loading'
        );

        const loadingMessage = await message.channel.send(`
            <a:discord_loading:${loadingEmoji}>  Carregando rank...
        `);

        try {
            const users = await User.find({}).sort('money');

            if (!users.length) return;

            let players = '\n';
            let position = 1;
            users.forEach((user) => {
                const dcUser = client.users.cache.get(user.user_discord_id);
                if (!dcUser) return;

                const moneyFormated = new Intl.NumberFormat('pt-BR', {
                    minimumFractionDigits: 2,
                    style: 'currency',
                    currency: 'BRL',
                }).format(user.balance || 0);

                players += `${position++}# - ${
                    dcUser.username
                } - ${moneyFormated} \n`;
            });

            const messageEmbed = new MessageEmbed().addField(
                'Top money:',
                players
            );

            return await loadingMessage.edit(messageEmbed);
        } catch (err) {
            return await loadingMessage.edit(`
                <:errado:${errorEmoji}> Ocorreu um erro ao mostrar o rank.
            `);
        }
    },
};
