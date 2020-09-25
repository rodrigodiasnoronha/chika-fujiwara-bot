import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';
import { helpEmbed } from '../../utils/HelpEmbed';

export const transfer: Command = {
    name: 'Transfer',
    description: 'Transfira uma quantia de dinheiro para outro usuário.',
    aliases: ['transfer', 'pay', 'pagar', 'transferir', 'tr'],
    args: ['<valor> @user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

        if (args[0] === 'help' || args[0] === 'ajuda')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        try {
            let valueToTransfer = parseInt(args[0]);
            const userToBePaidRef = message.mentions.users.first();
            const payerRef = message.author;

            if (!userToBePaidRef)
                return message.channel.send(
                    `<:errado:${errorEmoji}> Você precisa mencionar o usuário a ser pago.`
                );

            if (!valueToTransfer || isNaN(valueToTransfer))
                return message.channel.send(
                    `<:errado:${errorEmoji}> Você precisa digitar um valor válido`
                );

            if (valueToTransfer < 50)
                return message.channel.send(
                    `<:errado:${errorEmoji}> O valor mínimo de transferência é de R$50.00`
                );

            if (userToBePaidRef.bot)
                return message.channel.send(
                    `<:errado:${errorEmoji}> Baka! Você não pode pagar um BOT. `
                );

            if (userToBePaidRef.id === payerRef.id)
                return message.channel.send(
                    `<@${payerRef}> pagou a si mesmo. Pera, não tem como!`
                );

            // Verifica se o pagador já está cadastrado e se não tiver ele  cadastra
            let payerBalance = await User.findOne({
                user_discord_id: payerRef.id,
            });
            if (!payerBalance) {
                payerBalance = await User.create({
                    user_discord_id: payerRef.id,
                    balance: 0,
                    locale: '',
                    bio: '',
                });
            }

            // Verifica se a pessoa a ser transferida está registrada no db e se não tiver ele cadastra ela
            let userToBePaidBalance = await User.findOne({
                user_discord_id: userToBePaidRef.id,
            });
            if (!userToBePaidBalance) {
                userToBePaidBalance = await User.create({
                    user_discord_id: userToBePaidRef.id,
                    balance: 0,
                    bio: '',
                    locale: '',
                });
            }

            // verificamos se o usuário pode pagar tal valor
            if (valueToTransfer > payerBalance.balance)
                return message.reply(
                    `<:errado:${errorEmoji}> Você não possui saldo suficiente para fazer esta transação.`
                );

            // Retira o saldo do pagador e transfere para a conta da pessoa a ser paga
            payerBalance.balance -= valueToTransfer;
            userToBePaidBalance.balance += valueToTransfer;

            // salva no database
            await payerBalance.save();
            await userToBePaidBalance.save();

            return message.channel.send(
                `<:certo:${okEmoji}> Transferência bem sucedida.`
            );
        } catch (err) {
            return message.reply(
                `<:errado:${errorEmoji}> Ocorreu um erro ao transferir a quantia.`
            );
        }
    },
};
