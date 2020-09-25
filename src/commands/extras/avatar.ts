import { Command } from '../../types';
import { executionAsyncResource } from 'async_hooks';
import {
    Client,
    Message,
    MessageEmbed,
    GuildEmojiRoleManager,
} from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const avatar: Command = {
    name: 'Avatar',
    description: 'Retorna a foto de perfil de algum usuário',
    aliases: ['avatar'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.size
            ? message.mentions.users.first()
            : message.author;
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        if (!user) return;

        const avatarUrl = user
            ? user.avatarURL({ format: 'jpg', size: 1024 })
            : message.author.avatarURL({ format: 'jpg', size: 1024 });

        if (!avatarUrl) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Foto de perfil não encontrada.`
            );
        }

        const messageEmbed = new MessageEmbed()
            .setImage(avatarUrl)
            .setFooter(`Solicitado por ${message.author.username}`);
        return message.channel.send(messageEmbed);
    },
};
