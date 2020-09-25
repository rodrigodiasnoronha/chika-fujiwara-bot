import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const support: Command = {
    name: 'Suporte',
    description: 'Obtenha suporte de minha equipe.',
    args: [],
    aliases: ['suporte', 'support', 'serversupport'],
    async execute(client: Client, message: Message, args: Array<string>) {
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

        try {
            const linkSupportServer = 'https://discord.gg/QXrPwgE';
            const dmMessage = `Olá, ${message.author.username}, parece que você está precisando de ajuda com meus comandos. Abaixo deixo o link de meu servidor de suporte. Fique a vontade para tirar dúvidas e dar sugestões.\n${linkSupportServer}`;

            await message.author.send(dmMessage);

            return message.reply('verifique sua DM.');
        } catch (err) {
            return message.channel.send(
                `<:errorEmoji:${errorEmoji}> Ocorreu um erro ao executar este comando.`
            );
        }
    },
};
