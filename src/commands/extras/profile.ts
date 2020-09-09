import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { User } from '../../database/models/User';

export const profile: Command = {
    name: 'Profile',
    description: 'Veja seu perfil.',
    aliases: ['perfil', 'profile', 'eu'],
    args: [],

    async execute(client: Client, message: Message, args: Array<string>) {
        const userImage = message.author.avatarURL()
            ? message.author.avatarURL()
            : message.author.defaultAvatarURL;

        if (!userImage)
            return message.reply('este usuário não tem imagem de perfil');

        try {
            let user = await User.findOne({
                user_discord_id: message.author.id,
            });

            if (!user) {
                user = await User.create({
                    user_discord_id: message.author.id,
                    bio: '',
                    money: 0,
                });
            }

            const messageEmbed = new MessageEmbed()
                .setTitle(`Perfil de ${message.author.username}`)
                .setDescription(`**Biografia:** ${user.bio || 'Indefinida'}`)
                .setThumbnail(userImage)
                .addField('Dinheiro:', `R$${(0).toFixed(2)}`, true)
                .setFooter(`Solicitado por ${message.author.username}`);

            return message.reply(messageEmbed);
        } catch (err) {
            return message.reply('ocorreu um erro ao mostrar o perfil.');
        }
    },
};
