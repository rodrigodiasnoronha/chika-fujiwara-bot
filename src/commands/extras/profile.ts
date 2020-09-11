import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { User } from '../../database/models/User';

export const profile: Command = {
    name: 'Profile',
    description: 'Veja seu perfil.',
    aliases: ['perfil', 'profile'],
    args: [],

    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );
        let userTarget = message.mentions.users.size
            ? message.mentions.users.first()
            : message.author;

        if (!userTarget)
            return message.channel.send(
                `<:errado:${errorEmoji}> Usuário não encontrado.`
            );

        const userImage = userTarget.avatarURL() || userTarget.defaultAvatarURL;

        try {
            let userInfo = await User.findOne({
                user_discord_id: userTarget.id,
            });

            if (!userInfo) {
                userInfo = await User.create({
                    user_discord_id: userTarget.id,
                    balance: 0,
                    bio: '',
                });
            }

            const messageEmbed = new MessageEmbed()
                .setTitle(`Perfil de ${userTarget.username}`)
                .setDescription(
                    `**Biografia:** ${userInfo.bio || 'Indefinida'}`
                )
                .setThumbnail(userImage)
                .addField('Dinheiro:', `R$${userInfo.balance.toFixed(2)}`, true)
                .addField('Localização:', userInfo.locale || 'Desconhecida')
                .setFooter(`Solicitado por ${message.author.username}`);

            return message.reply(messageEmbed);
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao mostrar o perfil.`
            );
        }
    },
};
