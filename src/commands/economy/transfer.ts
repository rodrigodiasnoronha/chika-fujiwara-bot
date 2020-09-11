import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';

export const transfer: Command = {
    name: 'Transfer',
    description: 'Transfira uma quantia de dinheiro para outro usuário.',
    aliases: ['transfer', 'pay', 'pagar', 'transferir'],
    args: ['<valor> @user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        try {
            let valueToTransfer = parseInt(args[0]);
            const userToBePaidRef = message.mentions.users.first();
            const payerRef = message.author;

            if (!userToBePaidRef)
                return message.reply(
                    'você precisa mencionar o usuário a ser pago.'
                );

            if (!valueToTransfer || isNaN(valueToTransfer))
                return message.reply('você precisa digitar um valor válido.');

            if (valueToTransfer < 100)
                return message.reply(
                    'o valor mínimo de transferência é de 100'
                );

            if (userToBePaidRef.bot)
                return message.reply('você não pode pagar um BOT.');

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
                    'você não possui saldo suficiente para fazer esta transação.'
                );

            // Retira o saldo do pagador e transfere para a conta da pessoa a ser paga
            payerBalance.balance -= valueToTransfer;
            userToBePaidBalance.balance += valueToTransfer;

            // salva no database
            await payerBalance.save();
            await userToBePaidBalance.save();

            return message.channel.send(
                ':white_check_mark: Transferência bem sucedida.'
            );
        } catch (err) {
            return message.reply('ocorreu um erro ao transferir a quantia.');
        }
    },
};
