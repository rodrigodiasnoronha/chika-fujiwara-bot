import { Client, Message } from 'discord.js';
import { User } from '../../database/models/User';
import { Command } from '../../types';
import moment from 'moment';
import { timeOutAsync } from '../../utils/timeOutAsync';
import { helpEmbed } from '../../utils/HelpEmbed';

export const daily: Command = {
    name: 'Daily',
    description: 'Pegue uma recompensa diária.',
    aliases: ['daily'],
    args: [],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        const loadingEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'discord_loading'
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

        let loadingMessage = await message.channel.send(
            `<a:discord_loading:${loadingEmoji}> Carregando seu Daily...`
        );

        try {
            let user = await User.findOne({
                user_discord_id: message.author.id,
            });

            if (!user) {
                user = await User.create({
                    user_discord_id: message.author.id,
                    locale: '',
                    bio: '',
                    balance: 0,
                });
            }

            const now = new Date();
            const twelveHoursAhead = moment(now).add(12, 'hours');
            const invalid = moment(user.daily || now).isSameOrBefore(
                twelveHoursAhead
            );

            if (invalid) {
                return await loadingMessage.edit(
                    `
                     <:errado:${errorEmoji}> Você só pode pegar seu daily novamente em algumas horas.
                    `
                );
            }

            // Mensagem de loading
            await timeOutAsync(1500);
            loadingMessage = await loadingMessage.edit(
                `<a:discord_loading:${loadingEmoji}> Pegando seu Daily..`
            );

            user.daily = new Date(twelveHoursAhead.format());

            // daily de 400 até 1000;
            const dailyValue = Math.floor(Math.random() * 800) + 400;
            user.balance += dailyValue;
            await user.save();

            const dailyValueFormated = new Intl.NumberFormat('pt-BR', {
                minimumFractionDigits: 2,
                style: 'decimal',
            }).format(dailyValue);

            await timeOutAsync(1500);

            return await loadingMessage.edit(
                `<:certo:${okEmoji}> Você recebeu ${dailyValueFormated} de daily!`
            );
        } catch (err) {
            if (loadingMessage.deletable) await loadingMessage.delete();
            return message.channel.send(`
            <:errado:${errorEmoji}> Ocorreu um erro ao pegar seu daily.
            `);
        }
    },
};
