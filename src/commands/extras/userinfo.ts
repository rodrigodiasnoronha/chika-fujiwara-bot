import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import moment from 'moment';
import 'moment/locale/pt-br';
import { measureMemory } from 'vm';
import { User } from '../../database/models/User';
moment.locale('pt-br');

export const userInfo: Command = {
    name: 'User Info',
    description: 'Veja informações de algum usuário.',
    aliases: ['userinfo'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        try {
            const user = message.mentions.users.size
                ? message.mentions.users.first()
                : message.author;

            if (!user) return message.reply('usuário não encontrado.');

            const userImage = user.avatarURL() || user.defaultAvatarURL;
            const userCreatedAt = moment(user.createdAt).format('LLLL');

            let userInfo = await User.findOne({ user_discord_id: user.id });
            if (!userInfo) {
                userInfo = await User.create({
                    user_discord_id: user.id,
                    money: 0,
                    bio: '',
                });
            }

            const messageEmbed = new MessageEmbed()
                .setTitle(`${user.username} - detalhes`)
                .addField('ID:', user.id, false)
                .addField('Localização:', userInfo.locale || 'Desconhecida')
                .addField('Entrou no Discord em:', userCreatedAt)
                .addField(
                    'Última mensagem:',
                    user.lastMessage || 'Desconhecida'
                )
                .setThumbnail(userImage)
                .setFooter(`Solicitado por ${message.author.username}.`);

            await user.lastMessage?.delete();
            return message.channel.send(messageEmbed);
        } catch (err) {
            return message.reply(
                'ocorreu um erro ao mostrar os detalhes do usuário.'
            );
        }
    },
};
