import { Command } from '../../types';
import { Client, Message } from 'discord.js';

export const anime: Command = {
    name: 'Anime',
    description: 'Procure algum anime na internet',
    aliases: ['search', 'anime'],
    args: ['nome_anime'],
    execute(client: Client, message: Message, args: Array<string>) {
        try {
            return message.channel.send('anime buscado com sucesso');
        } catch (err) {
            console.log(err);

            return message.channel.send(
                'ocorreu um erro ao buscar por esse anime'
            );
        }
    },
};
