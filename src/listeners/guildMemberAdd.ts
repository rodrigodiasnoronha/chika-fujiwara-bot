import { Client, GuildMember, PartialGuildMember } from 'discord.js';
import { ServerConfig } from '../database/models/ServerConfig';

export const guildMemberAdd = async (
    user: PartialGuildMember | GuildMember,
    client: Client
) => {
    try {
        let serverConfig = await ServerConfig.findOne({
            guild_id: user.guild.id,
        });

        if (!serverConfig) {
            serverConfig = await ServerConfig.create({
                guild_id: user.guild.id,
            });
        }

        if (!serverConfig.autorole_id) return;

        const role = user.guild.roles.cache.get(serverConfig!.autorole_id);
        if (!role) return;
        user.guild.roles.add(role);

        return true;
    } catch (err) {
        return;
    }
};
