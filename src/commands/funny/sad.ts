import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';

export const sad: Command = {
    name: 'Sad',
    description: 'Está triste? Use este comando para demonstrar sua tristeza!',
    aliases: ['trsite', 'sad', 'sadness', 'tristeza'],
    args: [],
    messages: [
        'Nada mais faz sentido...',
        'A vida não faz sentido...',
        'Tudo esta tão escuro...',
        'Nada mais tem graça...',
    ],
    gifs: [
        'https://i.pinimg.com/originals/f0/15/00/f0150078910b6febbdd9ffff9d1009ff.gif',
        'https://i.pinimg.com/originals/5d/bd/cc/5dbdcc4193edeeca325e2220dd4f857f.gif',
        'https://i.pinimg.com/originals/17/36/d0/1736d0778750b3b66fff45af021a2f63.gif',
        'https://i.pinimg.com/originals/e6/2e/2c/e62e2ca8a5f588cbb2ae0284b3314459.gif',
        'https://i.pinimg.com/originals/6d/55/ad/6d55ad934bb27473d3df8211bb8831bf.gif',
        'https://i.pinimg.com/originals/03/ad/71/03ad71abf3741f3188428ff0d95d1616.gif',
        'https://i.pinimg.com/originals/4a/65/ab/4a65abeead3a8d113bccfee5d5d239f4.gif',
        'https://i.pinimg.com/originals/02/e3/3a/02e33a98434231eaeea9247efe7ea443.gif',
        'https://i.pinimg.com/originals/8e/44/c4/8e44c484dde7ed6582222c9c7c779e23.gif',
        'https://i.pinimg.com/originals/66/50/ee/6650ee321d733117d8832e3bab4135a0.gif',
    ],
    execute(client: Client, message: Message, args: Array<string>) {
        const gif = this.gifs![Math.floor(Math.random() * this.gifs!.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);
        const reply = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];

        return message.channel.send(
            `<@${message.author}> está triste! - ${reply}`,
            messageEmbed
        );
    },
};
