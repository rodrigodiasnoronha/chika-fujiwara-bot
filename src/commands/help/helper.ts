import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';

export const helper: Command = {
    name: 'Helper',
    description: 'Veja aqui minha lista de comandos!',
    aliases: ['help', 'ajuda', ' helper'],
    args: [],
    commands: {
        moderation: ['`.kick`', '`.ban`', '`.mute`', '`.unmute`'],
        economy: ['`.saldo`', '`.pagar`'],
        funny: [
            '`.beijar`',
            '`.chorar`',
            '`.jankenpon`',
            '`.abracar`',
            '`.vergonha`',
            '`.ping`',
            '`.atacar`',
            '`.cafuné`',
            '`.pensando`',
            '`.tapa`',
            '`.bolo`',
            '`.morder`',
            '`.sono`',
            '`.desviar`',
            '`.fugir`',
        ],
        extras: [
            '`.avatar`',
            '`.userinfo`',
            '`.perfil`',
            '`.bio`',
            '`.local`',
            '`.suporte`',
            '`.say`',
            '`.inverter`',
            '`.casar`',
            '`.divorciar`',
        ],
    },

    execute(client: Client, message: Message, args: Array<string>) {
        const funCommands = this.commands.funny.join(', ');
        const extrasCommands = this.commands.extras.join(', ');
        const modCommands = this.commands.moderation.join(', ');
        const economyCommands = this.commands.economy.join(', ');

        const totalCommands =
            this.commands.funny.length +
            this.commands.moderation.length +
            this.commands.extras.length +
            this.commands.economy.length;

        const messageEmbed = new MessageEmbed()
            .setTitle('Ajuda - Lista de comandos')
            .setThumbnail(
                'https://cdn.discordapp.com/emojis/753988417091797152.png'
            )
            .setDescription('Abaixo está uma lista com todos os meus comandos.')
            .addField(':police_officer: | Moderação', modCommands)
            .addField(':moneybag: | Economia', economyCommands)
            .addField(':smile: | Diversão', funCommands)
            .addField(':star: | Extras', extrasCommands)
            .setFooter(`Lista de comandos - Chika | ${totalCommands} comandos`);
        return message.channel.send(messageEmbed);
    },
};
