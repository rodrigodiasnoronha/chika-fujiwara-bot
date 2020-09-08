import { Command } from '../../types';
import { Client, Message } from 'discord.js';
import { measureMemory } from 'vm';

export const prune: Command = {
    name: 'Prune',
    description: 'Apague mensagens de BOT de algum canal',
    aliases: ['prune'],
    args: ['quantidade_mensagens_apagar'],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send('comando em dev');
        const messageDropCounter = args[0];

        if (messageDropCounter) {
            if (!Number.isInteger(messageDropCounter))
                return message.reply('digite um valor válido');

            const value = Number(messageDropCounter);
            if (value < 2 || value > 100)
                return message.reply('Digite um valor entre 2 e 100');
        }

        try {
            const value = Number(messageDropCounter || 100);
            let counter = 0;
            const last100Messages = await message.channel.messages.fetch(
                { limit: value, before: message.id },
                true
            );

            last100Messages.forEach(async (item) => {
                if (!item.author.bot) return 0;
                await item.delete();
                counter++;
            });

            return message.channel.send(`O chat foi limpo.`);
        } catch (err) {
            return message.reply('ocorreu um erro ao excluir as mensagens.');
        }

        return message.channel.send('prune');
    },
};
