import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { measureMemory } from 'vm';
import { helpEmbed } from '../../utils/HelpEmbed';

export const prune: Command = {
    name: 'Prune',
    description: 'Apague mensagens de BOT de algum canal',
    aliases: ['prune'],
    args: ['quantidade_mensagens_apagar'],
    async execute(client: Client, message: Message, args: Array<string>) {
        // bulk delete -> metodo de excluir 100 mensagens
        const messageDropCounter = args[0];

        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.aliases,
                message
            );

        if (isNaN(Number.parseInt(messageDropCounter)))
            return message.channel.send('não é um número o que vc digitou');
    },
};
