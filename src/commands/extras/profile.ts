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

            let waifu: string | undefined = '';
            if (userInfo.waifuId) {
                const waifuDiscordRef = client.users.cache.find(
                    (u) => u.id === userInfo!.waifuId
                );

                waifu = waifuDiscordRef?.username;
            }

            const moneyFormated = new Intl.NumberFormat('pt-BR', {
                currency: 'BRL',
                style: 'currency',
                minimumFractionDigits: 2,
            }).format(userInfo.balance);

            const messageEmbed = new MessageEmbed()
                .setTitle(`Perfil de ${userTarget.username}`)
                .setDescription(
                    `**Biografia:** ${userInfo.bio || 'Indefinida'}`
                )
                .setThumbnail(userImage)
                .addField('Dinheiro:', moneyFormated, true)
                .addField('Localização:', userInfo.locale || 'Desconhecida')
                .addField(
                    'Estado cívil:',
                    waifu ? `Casado com ${waifu}` : 'Abandonado'
                )
                .setFooter(`Solicitado por ${message.author.username}`);

            return message.reply(messageEmbed);
        } catch (err) {
            console.log(err);
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao mostrar o perfil.`
            );
        }
    },
};
