import { Client, Message } from 'discord.js';
import { ServerConfig } from '../../database/models/ServerConfig';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const autorole: Command = {
    name: 'Autorole',
    description:
        'Defina um cargo padrão para quando o usuário entrar no seu servidor!',
    aliases: ['autorole', 'autocargo'],
    args: ['@cargo'],
    async execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );
        const okEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'certo'
        );

        const hasAdminPermissions = message.member?.hasPermission(
            ['ADMINISTRATOR', 'MANAGE_ROLES', 'MANAGE_GUILD'],
            { checkAdmin: true, checkOwner: true }
        );

        if (!hasAdminPermissions)
            return message.channel.send(`
            <:errado:${errorEmoji}> Você não tem permissão suficiente para usar este comando.
        `);

        const hasBotPermissionEnough = message.guild?.me?.hasPermission([
            'ADMINISTRATOR',
            'MANAGE_GUILD',
            'MANAGE_ROLES',
        ]);

        if (!hasBotPermissionEnough)
            return message.channel.send(
                `<:errado:${errorEmoji}> Baka! Eu não estou com permissão suficiente para setar cargos.`
            );

        try {
            const role = message.mentions.roles.first();

            if (!role)
                return message.channel.send(`
                <:errado:${errorEmoji}> Você precisa mencionar o cargo de autorole desejado.
             `);

            let serverConfig = await ServerConfig.findOne({
                guild_id: message.guild!.id,
            });

            if (!serverConfig) {
                serverConfig = await ServerConfig.create({
                    guild_id: message.guild!.id,
                });
            }

            serverConfig.autorole_id = role.id;

            await serverConfig.save();

            return message.channel.send(`
                <:certo:${okEmoji}> Cargo de autorole definido com sucesso.
            `);
        } catch (err) {
            return message.channel.send(`
                <:errado:${errorEmoji}> Ocorreu um erro ao setar o cargo de autorole.
            `);
        }
    },
};
