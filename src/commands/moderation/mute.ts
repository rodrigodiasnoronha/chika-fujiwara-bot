import { Client, Message, UserResolvable } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const mute: Command = {
    name: 'Mute',
    description: 'Silencia um membro em específico.',
    aliases: ['mute', 'mutar', 'silenciar'],
    args: ['time @User'],

    async execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        const [userId, reason] = args;

        const user = message.mentions.users.first();
        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );
        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        if (!message.member?.hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS'])) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Você não possui permissão para mutar usuários.`
            );
        }

        if (
            !message.guild?.me?.hasPermission(['MANAGE_ROLES', 'MUTE_MEMBERS'])
        ) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Eu não estou com permissões suficientes para mutar usuários.`
            );
        }

        if (!user)
            return message.channel.send(
                `<:errado:${errorEmoji}> Você precisa mencionar o usuário que deseja mutar.`
            );

        if (user.id === message.author.id)
            return message.channel.send(
                `<:errado:${errorEmoji}> Baka! Você não pode mutar você mesmo.`
            );

        if (!reason)
            return message.channel.send(
                `<:errado:${errorEmoji}> Você precisa dizer o motivo do mute.`
            );

        const mutedRole = message.guild.roles.cache.find(
            (role) => role.name === 'Chika Mute'
        );

        if (!mutedRole) {
            try {
                await this.createMutedRole(message);
            } catch (err) {
                return message.channel.send(
                    `<:errado:${errorEmoji}> Ocorreu um erro ao criar o cargo de mute.`
                );
            }
        }

        if (message.guild.member(user)?.roles.cache.has(mutedRole!.id))
            return message.channel.send(
                `<:errado:${errorEmoji}> Este usuário já está mutado.`
            );

        try {
            await message.guild.member(user)?.roles.add(mutedRole || '');
        } catch (err) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao mutar esse usuário.`
            );
        }

        return message.channel.send(
            `<:certo:${okEmoji}> O usuário foi mutado com sucesso.`
        );
    },

    async createMutedRole(message: Message) {
        await message.guild?.roles.create({
            data: {
                name: 'Chika Mute',
                color: '#cccccc',
                permissions: [],
                mentionable: false,
            },
        });
    },
};
