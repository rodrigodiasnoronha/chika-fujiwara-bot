import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const cake: Command = {
    name: 'Cake',
    description: 'Dê um bolo para alguém!',
    aliases: ['cake', 'bolo', 'bolinho'],
    args: ['@user'],
    gifs: [
        'https://i.pinimg.com/originals/80/84/fe/8084fe59c349424223f6e53b0b620372.gif',
        'https://i.pinimg.com/originals/b0/15/c4/b015c466727833b961c0e61d7547e21d.gif',
        'https://i.pinimg.com/originals/ca/5f/0e/ca5f0eb797072de9e760e40c4b6f3b1b.gif',
        'https://i.pinimg.com/originals/1b/25/d6/1b25d63378467aba564183b3b3a47ec6.gif',
        'https://i.pinimg.com/originals/a7/31/f7/a731f7581265ef8eec265681e64cefe5.gif',
        'https://i.pinimg.com/originals/c8/d7/2f/c8d72fcccd85de23bddb3391678c47ba.gif',
        'https://i.pinimg.com/originals/e5/da/23/e5da23a4fdaf45995785bb73053ff98f.gif',
        'https://i.pinimg.com/originals/dd/da/2f/ddda2ff34f0bb95da361c0c1de5db613.gif',
        'https://i.pinimg.com/originals/9c/7f/11/9c7f11b1c547dcb597ed42a475a2196b.gif',
        'https://i.pinimg.com/originals/d5/f1/c1/d5f1c14cfa901c892aff595c659af25c.gif',
        'https://i.pinimg.com/originals/89/4a/fd/894afdaa6de5cdbe11ff5acb36c7e0c2.gif',
        'https://i.pinimg.com/originals/48/f5/d4/48f5d47d485d6e52791cdb3a158ce7eb.gif',
        'https://i.pinimg.com/originals/7f/c1/16/7fc116c5acdd2ea425c20a2932f2ee2c.gif',
        'https://i.pinimg.com/originals/e2/0d/01/e20d0148724e21e908abd54a2506b1c6.gif',
    ],
    execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

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

        if (!user) {
            return message.channel.send(
                `<:errado:${errorEmoji}> Marque algum usuário`
            );
        }

        if (user.bot && user.id === client.user!.id) {
            const gif =
                'https://i.pinimg.com/originals/d7/e3/86/d7e3862ce9d6d6058a2d1a1ce84902fc.gif';
            const reply = `<@${message.author}> me deu um pedaço de bolo! Que delicia!`;
            const messageEmbed = new MessageEmbed().setImage(gif);

            return message.channel.send(reply, messageEmbed);
        }

        const reply = `<@${message.author}> deu um pedaço de bolo para <@${user}>!`;
        const gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);
        return message.channel.send(reply, messageEmbed);
    },
};
