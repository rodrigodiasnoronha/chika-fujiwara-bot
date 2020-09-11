import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { User } from '../../database/models/User';
import moment from 'moment';

export const steal: Command = {
    name: 'Steal',
    description: 'Roube alguém. O Valor máximo de roubo é de 50.',
    args: ['@user'],
    aliases: ['steal', 'roubar'],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send(
            'Esse comando não existe. Digite `f.ajuda` para ver meus comandos.'
        );

        // try {
        //     const valorASerRoubado = Math.floor(Math.random() * 50);
        //     const vitimaRoubo = message.mentions.users.first();

        //     const emojiLoading = message.guild?.emojis.cache.find(
        //         (e) => e.name === 'loading_heart'
        //     );

        //     if (!vitimaRoubo)
        //         return message.reply('você precisa mencionar um usuário');

        //     if (vitimaRoubo.bot)
        //         return message.reply('você não pode roubar um BOT.');

        //     if (vitimaRoubo.id === client.user!.id)
        //         return message.reply('você não pode me roubar.');
        // } catch (err) {
        //     return message.channel.send(':warning: Buguei. Tente novamente.');
        // }
        // try {
        //     const stolenValue = parseInt(args[0]);
        //     const userStoled = message.mentions.users.first();
        //     if (!userStoled)
        //         return message.reply(
        //             'você precisa mencionar o usuário no qual você quer roubar.'
        //         );
        //     if (isNaN(stolenValue))
        //         return message.reply('digite uma quantia válida.');
        //     if (stolenValue < 1)
        //         return message.reply('o valor mínimo para roubar é de 1.');
        //     if (userStoled.bot)
        //         return message.reply('você não pode roubar um BOT.');
        //     let userStoledBalance = await User.findOne({
        //         user_discord_id: userStoled.id,
        //     });
        //     if (!userStoledBalance) {
        //         userStoledBalance = await User.create({
        //             user_discord_id: userStoled.id,
        //             balance: 0,
        //             bio: '',
        //             locale: '',
        //         });
        //     }
        //     let thief = await User.findOne({
        //         user_discord_id: message.author.id,
        //     });
        //     if (!thief) {
        //         thief = await User.create({
        //             user_discord_id: message.author.id,
        //             balance: 0,
        //             bio: '',
        //             locale: '',
        //         });
        //     }
        //     if (thief.last_stole_in) {
        //         let lastStoleInMinutes = moment(new Date()).diff(
        //             thief.last_stole_in,
        //             'minutes'
        //         );
        //         const fourHours = 60 * 4;
        //         const diff = moment
        //             .utc(moment(thief?.last_stole_in).diff(new Date()))
        //             .format('HH:mm:ss');
        //         if (lastStoleInMinutes < fourHours)
        //             return message.reply(
        //                 `você já roubou recentemente. Tente novamente em ${diff}`
        //             );
        //     }
        //     if (userStoledBalance.balance < stolenValue)
        //         return message.reply('o usuário não possui essa quantia.');
        //     userStoledBalance.balance -= stolenValue;
        //     thief.balance += stolenValue;
        //     thief.last_stole_in = new Date();
        //     await userStoledBalance.save();
        //     await thief.save();
        //     return message.reply('usuário roubado com sucesso.');
        // } catch (err) {
        //     return message.reply('buguei. Tente novamente.');
        // }
    },
};
