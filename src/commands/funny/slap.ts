import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

export const slap: Command = {
    name: 'Slap',
    description: 'Dê um tapa em alguém',
    args: ['@user'],
    aliases: ['slap', 'tapa', 'estapear'],
    messages: [
        'Que dor!',
        'Essa doeu!',
        'Essa foi braba!',
        'Pegou pesado, senpai!',
    ],
    gifs: [
        'https://i.pinimg.com/originals/40/ef/24/40ef24388a01ba9be6da6dea69d30fda.gif',
        'https://i.pinimg.com/originals/65/57/f6/6557f684d6ffcd3cd4558f695c6d8956.gif',
        'https://i.pinimg.com/originals/9e/f6/ac/9ef6ac6a998a889e93eb473f050e0671.gif',
        'https://i.pinimg.com/originals/bc/ee/bf/bceebfa72d3a5933cb0e9cf319bb67ae.gif',
        'https://i.pinimg.com/originals/6a/60/d1/6a60d1eaf8c7317f7dfb0a892789c490.gif',
        'https://i.pinimg.com/originals/f8/5f/4c/f85f4c557e5a03d2a7a2e903b66e0047.gif',
        'https://i.pinimg.com/originals/01/0e/d8/010ed87785eccdcc7189edd27ae80d72.gif',
        'https://i.pinimg.com/originals/cf/44/db/cf44db9953c93d5588595c89f4462684.gif',
        'https://i.pinimg.com/originals/6d/4c/be/6d4cbe4a871d8bd4a89eb60169e450cd.gif',
        'https://i.pinimg.com/originals/a1/cf/c4/a1cfc41d9b12c1d4b4aa201712f8eb5a.gif',
        'https://i.pinimg.com/originals/c6/00/12/c60012a00fd5257d71d734f57910bf33.gif',
        'https://i.pinimg.com/originals/01/5e/18/015e18721c72e62184409cedb7e57888.gif',
    ],
    execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

        if ((args.length && !user) || !user) {
            return message.reply('você precisa marcar alguém! :wink: ');
        }

        if (user.bot && user.id === client.user!.id) {
            const gif =
                'https://i.pinimg.com/originals/42/38/d3/4238d39eb91be9edcd9bf578c8e4bb11.gif';
            const messageEmbed = new MessageEmbed().setImage(gif);
            return message.channel.send(
                `<@${client.user}> estapegou <@${message.author}>! Você mereceu!`,
                messageEmbed
            );
        }

        const gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);
        const reply = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
        return message.channel.send(
            `<@${message.author}> estapeou <@${user}>! - ${reply}`,
            messageEmbed
        );
    },
};
