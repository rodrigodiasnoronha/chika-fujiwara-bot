import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';

export const helper: Command = {
    name: 'Helper',
    description: 'Veja aqui minha lista de comandos!',
    aliases: ['help', 'ajuda', ' helper'],
    args: [],

    execute(client: Client, message: Message, args: Array<string>) {
        const messageEmbed = new MessageEmbed()
            .setTitle('Ajuda - Lista de comandos')
            .setDescription('Abaixo está uma lista com todos os meus comandos.')
            .addField('`f.chorar`', 'chore um pouco', false)
            .addField('`f.beijar @user`', 'beije alguém', false)
            .addField(
                '`f.jankenpon <pedra | papel | tesoura>`',
                'Jogue pedra, papel ou tesoura comigo!',
                false
            )
            .addField('`f.abracar @user`', 'Abraçar alguém', false)
            .addField('`f.shame`', 'fique com vergonha', false)
            .addField('`f.ping`', 'jogue ping pong comigo', false)
            .addField('`f.atacar @user`', 'ataca alguém', false)
            .addField('`f.cafuné @user`', 'faz cafuné em alguém', false)
            .addField(
                '`f.pensando <mensagem> ou @user`',
                'demonstre que você está pensando em alguém ou em alguma coisa!',
                false
            )
            .addField('`f.slap <@user>`', 'Estapeie alguém!', false)
            .addField('`f.cake @user`', 'Dê um bolo para alguém!');

        return message.channel.send(messageEmbed);
    },
};
