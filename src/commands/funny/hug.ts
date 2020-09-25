import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const hug: Command = {
    name: 'Hug',
    description: 'Abrace alguém! Deixe o dia de alguém mais feliz!',
    args: ['@user'],
    aliases: ['hug', 'abracar', 'abraçar', 'abraco', 'abraço'],
    gifs: [
        'https://i.pinimg.com/originals/aa/27/00/aa27008ab7250b9f8b32abd95f6c4025.gif',
        'https://i.pinimg.com/originals/50/6a/a9/506aa95bbb0a71351bcaa753eaa2a45c.gif',
        'https://i.pinimg.com/originals/22/f5/33/22f5333a63315dcb874f72e137fa0d92.gif',
        'https://i.pinimg.com/originals/5d/93/f4/5d93f4ca1115d4f9e01a67ba9250f14f.gif',
        'https://i.pinimg.com/originals/6e/a9/7b/6ea97b29209318c70ae8916ceb19827a.gif',
    ],

    execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        const gif = this.gifs![Math.floor(Math.random() * this.gifs!.length)];
        const user = message.mentions.users.first();
        let reply = `<@${message.author}> abraçou <@${user}>!`;

        if (!user && !args.length) {
            reply = `<@${message.author}> abraçou a si mesmo!`;
        }

        const messageEmbed = new MessageEmbed().setImage(gif);
        message.channel.send(reply, messageEmbed);
    },
};
