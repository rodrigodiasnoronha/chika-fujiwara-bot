import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import moment from 'moment';
import 'moment/locale/pt-br';
import { User } from '../../database/models/User';
import { helpEmbed } from '../../utils/HelpEmbed';
moment.locale('pt-br');

export const userInfo: Command = {
    name: 'User Info',
    description: 'Veja informações de algum usuário.',
    aliases: ['userinfo'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );
        const localeEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'local'
        );

        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        try {
            const user = message.mentions.users.size
                ? message.mentions.users.first()
                : message.author;

            if (!user) return;

            const userImage = user.avatarURL() || user.defaultAvatarURL;
            const userCreatedAt = moment(user.createdAt).format('LLLL');

            let userInfo = await User.findOne({ user_discord_id: user.id });
            if (!userInfo) {
                userInfo = await User.create({
                    user_discord_id: user.id,
                    balance: 0,
                    bio: '',
                });
            }

            const messageEmbed = new MessageEmbed()
                .setTitle(`${user.username} - detalhes`)
                .addField(':mag_right: ID:', user.id, false)
                .addField(
                    `<:local:${localeEmoji}> Localização`,
                    userInfo.locale || 'Desconhecida'
                )
                .addField(':paperclip: Entrou no Discord em:', userCreatedAt)
                .addField(
                    ':book: Última mensagem:',
                    user.lastMessage || 'Desconhecida'
                )
                .setThumbnail(userImage)
                .setFooter(`Solicitado por ${message.author.username}.`);

            return message.channel.send(messageEmbed);
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao mostrar os detalhes do usuário.`
            );
        }
    },
};
