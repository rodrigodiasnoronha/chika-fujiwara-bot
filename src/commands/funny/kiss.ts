import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

export const kiss: Command = {
    name: 'Kiss',
    description: 'Dê um beijo em alguém!',
    args: ['@user'],
    aliases: ['kiss', 'beijar'],
    gifs: [
        'https://i.pinimg.com/originals/a7/4a/bf/a74abfc0fa25c35353066b37443e74ae.gif',
        'https://i.pinimg.com/originals/c1/e1/98/c1e198a514380ebc2956734024a815c9.gif',
        'https://i.pinimg.com/originals/9a/3f/ad/9a3fadd2cb2c05da0d105f66b35700ed.gif',
        'https://i.pinimg.com/originals/3e/61/a8/3e61a84af9251733e1d20d170d0438fe.gif',
        'https://i.pinimg.com/originals/fe/6f/a7/fe6fa711ed29f18387c5da9800436062.gif',
        'https://i.pinimg.com/originals/57/f9/a0/57f9a081fa8a3f7e12cba25194ca4e01.gif',
        'https://i.pinimg.com/originals/0a/ac/39/0aac390dc598e22578ef476b0f41c0a3.gif',
        'https://i.pinimg.com/originals/9c/be/bf/9cbebfb852e76c2b8d9c3b72ae08e68f.gif',
        'https://i.pinimg.com/originals/17/c8/a5/17c8a5eea32eb6875c9b744871bcb5b1.gif',
        'https://i.pinimg.com/originals/41/6a/85/416a8536c3ba7830c64cd9847e3b880d.gif',
        'https://i.pinimg.com/originals/b3/9c/5d/b39c5db227c2ccf82073512786f97183.gif',
        'https://i.pinimg.com/originals/0c/6b/9e/0c6b9e1b1e328087bf4a7079b1d3db5b.gif',
    ],

    execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();
        const gif = this.gifs![Math.floor(Math.random() * this.gifs!.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);

        if (!user) {
            return message.reply(
                `você não pode beijar ninguém! Mencione um usuário! :wink: `
            );
        }

        if (user.bot && user.id === client.user!.id) {
            return message.reply(
                'desculpe, eu já estou comprometida! :relieved: '
            );
        }

        const reply = `<@${message.author}> beijou <@${user}>! Shippo demais!`;
        return message.channel.send(reply, messageEmbed);
    },
};
