import { Command } from '../../types';
import { Client, Message, UserResolvable } from 'discord.js';

export const ban: Command = {
    name: 'Ban',
    description: 'Banir algum membro',
    aliases: ['ban', 'banir'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        return message.reply(
            'este comando ainda está em fase de desenvolvimento pelo meu senpai.'
        );
        const user = message.mentions.users.first();
        const banReason = args.join(' ');

        if (!user)
            message.channel.send(
                'é preciso mencionar um usuário para usar este comando.'
            );

        if (user === message.author)
            message.channel.send('você não pode banir você mesmo');

        if (!banReason)
            message.channel.send('você precisa especificar um motivo de ban');

        message.guild?.me
            ?.ban()
            .then(() => message.channel.send('usuáiro banido'))
            .catch(console.log);
    },
};
