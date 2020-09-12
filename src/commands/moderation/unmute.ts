import { Client, Message } from 'discord.js';
import { Command } from '../../types';

export const unmute: Command = {
    name: 'Unmute',
    description: 'Desmutar um usuário.',
    aliases: ['desmutar', 'unmute'],
    args: ['@user'],

    async execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );
        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === `certo`
        );

        const userHasPermission = message.member?.hasPermission([
            'MUTE_MEMBERS',
            'MANAGE_ROLES',
        ]);

        if (!userHasPermission)
            return message.channel.send(
                `<:errado:${errorEmoji}> Você não tem permissão suficiente para desmutar um usuário.`
            );

        const botHasPermission = message.guild?.me?.hasPermission([
            'MANAGE_ROLES',
            'MUTE_MEMBERS',
        ]);

        if (!botHasPermission)
            return message.channel.send(
                `<:errado:${errorEmoji}> Estou sem permissão para desmutar um usuário.`
            );

        if (!user)
            return message.channel.send(
                `<:errado:${errorEmoji}> Você precisa mencionar um usuário.`
            );

        if (user.id === message.author.id)
            return message.channel.send(
                `<:errado:${errorEmoji}> Baka! Você não pode desmutar você mesmo.`
            );

        const mutedRole = message.guild?.roles.cache.find(
            (role) => role.name === 'Chika Mute'
        );

        if (!mutedRole)
            return message.channel.send(
                `<:errado:${errorEmoji}> O meu cargo de mute não existe neste servidor. Tente usar \`f.mute\` para ativar ele.`
            );

        if (!message.guild?.member(user)?.roles.cache.has(mutedRole.id))
            return message.channel.send(
                `<:errado:${errorEmoji}> Esse usuário não esta mutado.`
            );

        await message.guild.member(user)?.roles.remove(mutedRole);

        return message.channel.send(
            `<:certo:${okEmoji}> Usuário desmutado com sucesso.`
        );
    },
};
