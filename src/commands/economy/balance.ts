import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { User } from '../../database/models/User';

export const balance: Command = {
    name: 'Balance',
    description: 'Veja seu saldo monetário.',
    aliases: ['balance', 'money', 'dinheiro', 'carteira', 'yen', 'saldo'],
    args: [],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        try {
            const userTarget = message.mentions.users.size
                ? message.mentions.users.first()
                : message.author;

            if (!userTarget)
                return message.channel.send(
                    `<:errado:${errorEmoji}> Usuário não encontrado.`
                );

            let user = await User.findOne({ user_discord_id: userTarget.id });

            if (!user) {
                user = await User.create({
                    user_discord_id: userTarget.id,
                    balance: 0,
                    bio: '',
                    locale: '',
                });
            }

            // Emojis
            const moneyEmoji = client.emojis.cache.find(
                (emoji) => emoji.name === 'money'
            );

            const userBalanceFormated = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
            }).format(user.balance);
            console.log(userBalanceFormated);
            const messageEmbed = new MessageEmbed()
                .setTitle(`Saldo - ${userTarget.username}`)
                .setDescription(
                    `
                    <:money:${moneyEmoji}> Saldo | ${userBalanceFormated} 
                `
                )
                .setThumbnail(
                    'https://media.discordapp.net/attachments/744759288156913718/753663809347911890/money.png'
                )
                .setFooter(`Solicitado por ${message.author.username}`);

            return message.channel.send(messageEmbed);
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> ocorreu um erro ao mostrar saldo.`
            );
        }
    },
};
