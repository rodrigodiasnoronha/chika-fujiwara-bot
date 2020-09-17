import { Client, Message } from 'discord.js';
import { Command } from '../../types';

/**
 *
 *  @todo
 *  implementar futuramente o sistema de top de leveis.
 *  por exemplo: top money || top level
 *  top money => mostra os mais ricos do server
 *  top level = mostra os mais upados do server
 *
 *
 */
export const top: Command = {
    name: '',
    description: 'Veja os usuários mais ricos do server',
    aliases: ['top', 'rank'],
    args: [],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.channel.send('Error 404. Command not Found');
    },
};
