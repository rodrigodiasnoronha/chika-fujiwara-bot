import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const bite: Command = {
    name: 'Bite',
    description: 'Morda alguém',
    aliases: ['bite', 'morder'],
    args: ['@user'],
    gifs: [
        'https://i.pinimg.com/originals/c2/fb/fc/c2fbfc5d50b99c796b6d67a3f8dbea8d.gif',
        'https://i.pinimg.com/originals/8b/d6/0b/8bd60b33a7c082a51a0e1c8271188167.gif',
        'https://i.pinimg.com/originals/17/9a/16/179a16220f6cf2712073ccdc759ff3e1.gif',
        'https://i.pinimg.com/originals/72/30/c1/7230c1950f2cbf7217b56349d3317cd3.gif',
        'https://i.pinimg.com/originals/21/3c/5a/213c5a93142eb37cd2a986b7d4cb123a.gif',
        'https://i.pinimg.com/originals/9b/d0/55/9bd0555b0d4eb772804ac3f0bc331712.gif',
        'https://i.pinimg.com/originals/3f/6b/ae/3f6bae5cefac261b1b131fe3cb2d867a.gif',
    ],
    messages: ['VÔ TE MOIDÊ!', 'Você foi mordida!', 'Wryyyyy!'],

    execute(client: Client, message: Message, args: Array<string>) {
        let gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        let msg = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
        let user = message.mentions.users.first();
        let reply = `<@${message.author}> mordeu <@${user}>! - ${msg}`;

        const errorEmoji = client.emojis.cache.find(
            (emoji) => emoji.name === 'errado'
        );

        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        if (args.length && !user) {
            return message.reply(
                `<:errado:${errorEmoji}> Marque algum usuário.`
            );
        }

        if (!user) {
            reply = `<@${message.author}> mordeu si mesmo!`;
            gif =
                'https://i.pinimg.com/originals/75/b9/0e/75b90e4a9468102d00be81d020d93589.gif';
        }

        if (user?.bot && user.id === client.user?.id) {
            reply = `<@${message.author}> tentou me morder! - Baka...`;
            gif = `https://i.pinimg.com/originals/6d/b6/d3/6db6d393f50f2ee9df4058b95f0b21a1.gif`;
        }

        const messageEmbed = new MessageEmbed().setImage(gif);
        return message.channel.send(reply, messageEmbed);
    },
};
