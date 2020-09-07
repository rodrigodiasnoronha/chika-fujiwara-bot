import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

export const runaway: Command = {
    name: 'Runaway',
    description: 'Fuga de alguém.',
    aliases: ['fugir', 'runaway'],
    args: ['@user'],
    gifs: [
        'https://i.pinimg.com/originals/30/46/3e/30463efd473cc7bd9aaebc3ea375d2f4.gif',
        'https://i.pinimg.com/originals/7b/65/19/7b6519089cc27135155459ece52f51f4.gif',
        'https://i.pinimg.com/originals/78/7d/62/787d6214416f28390736209880e86270.gif',
        'https://i.pinimg.com/originals/f8/35/0e/f8350eddfba10c83ea2b3774c6c69214.gif',
        'https://i.pinimg.com/originals/19/38/b3/1938b3b9578c8ad25a28302db860dff3.gif',
        'https://i.pinimg.com/originals/ad/a8/4a/ada84a90f77622152da8cce64d778a24.gif',
        'https://i.pinimg.com/originals/31/25/9d/31259df8e025259c10b1273b774918f8.gif',
    ],
    execute(client: Client, message: Message, args: Array<string>) {
        let gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        let reply = `<@${message.author}> está fungindo!`;
        let user = message.mentions.users.first();

        if (user) {
            reply = `<@${message.author}> está fugindo de <@${user}>!`;
        }

        const messageEmbed = new MessageEmbed().setImage(gif);
        return message.channel.send(reply, messageEmbed);
    },
};
