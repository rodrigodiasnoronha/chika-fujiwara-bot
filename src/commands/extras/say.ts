import { Client, Message } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const say: Command = {
    name: 'Say',
    description: 'Faça me dizer algo.',
    args: ['mensagem'],
    aliases: ['say', 'dizer'],
    async execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        return message.channel.send(`${args.join(' ')}`);
    },
};
