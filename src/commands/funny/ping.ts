import { Client, Message } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const ping: Command = {
    name: 'Ping',
    description: 'Jogue ping pong comigo!',
    aliases: ['ping'],
    args: [],
    execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        message.channel.send('Pong!');
    },
};
