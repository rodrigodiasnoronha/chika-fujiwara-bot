import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

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

        const messageEmbed = new MessageEmbed()
            .setTitle(`Perfil de ${message.author.username}`)
            .setDescription(`**Biografia:** Indefinido `)
            .addField('Dinheiro:', `R$${(0).toFixed(2)}`, true)
            .setThumbnail(userImage)
            .setFooter(`Solicitado por ${message.author.username}`);

        return message.reply(messageEmbed);
    },
};
