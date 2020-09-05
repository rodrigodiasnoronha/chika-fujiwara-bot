import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

export const attack: Command = {
    name: 'Kill',
    description: 'Mate alguém',
    aliases: ['attack', 'atacar', 'bater'],
    args: ['@user'],
    messages: [
        {
            message: 'Rasen Shuriken!',
            gif:
                'https://i.pinimg.com/originals/0e/0b/41/0e0b4144c51278746600048e780bb8bc.gif',
        },
        {
            message: 'KA-ME-HA-ME-HA!!!',
            gif:
                'https://i.pinimg.com/originals/e0/21/e4/e021e4a9bf146f7e4042f37da18286a4.gif',
        },
        {
            message: 'Morra! Dai!',
            gif:
                'https://i.pinimg.com/originals/ba/74/be/ba74bee37501bfc3f7a2dd883f4738f8.gif',
        },
        {
            message: 'DETROIT... SMASH!!!',
            gif:
                'https://i.pinimg.com/originals/dd/b7/84/ddb78414c7ff864af534ede005db0c63.gif',
        },
        {
            message: 'ORA ORA ORA ORA ORA!',
            gif:
                'https://i.pinimg.com/originals/56/55/b6/5655b624aafb00050359a6d29edf19d0.gif',
        },
        {
            message: 'KATON!',
            gif:
                'https://i.pinimg.com/originals/cf/33/2f/cf332f8e3cb41f574c8c23c94e08d1e1.gif',
        },
        {
            message: 'PLUS... ULTRA!!',
            gif:
                'https://i.pinimg.com/originals/a5/b2/de/a5b2de1d09a87b970ebed2ae0b858e77.gif',
        },
        {
            message: 'MORRA!',
            gif:
                'https://i.pinimg.com/originals/b6/10/c6/b610c621e26dd233f259f21f33c4f400.gif',
        },
        {
            message: 'SUNLIGHT YELLOW OVERDRIVE!',
            gif:
                'https://i.pinimg.com/originals/73/e8/fd/73e8fdb6c5af8fa49da0435c797c9e7f.gif',
        },
        {
            message: 'DORA DORA DORA DORA!',
            gif:
                'https://i.pinimg.com/originals/9b/97/9e/9b979e27c326a7625e19db7078c1b307.gif',
        },
        {
            message: 'ZA WARUDO!',
            gif:
                'https://i.pinimg.com/originals/0e/b7/98/0eb79898902ebd45e7248bc7c20be53c.gif',
        },
        {
            message: 'MUDA MUDA MUDA MUDA MUDA!',
            gif:
                'https://i.pinimg.com/originals/b7/35/75/b73575c3289f3d221fcb8089777b0549.gif',
        },
        {
            message: 'Shinra Tensei!',
            gif:
                'https://i.pinimg.com/originals/9e/f6/02/9ef6022f824e1f45417782a45a330991.gif',
        },
        {
            message: 'Explosion!',
            gif:
                'https://i.pinimg.com/originals/c4/07/40/c4074087283441de471b78e0fb56cf25.gif',
        },
    ],
    async execute(client: Client, message: Message, args: Array<string>) {
        if (!message.mentions.users.size) {
            return message.reply('você precisa mencionar um usuário.');
        }

        const user = message.mentions.users.first();

        if (user?.bot && user.id === client.user!.id) {
            const gif =
                'https://i.pinimg.com/originals/28/33/90/28339054bb49c1f39faadcaf55edf81d.gif';
            const messageEmbed = new MessageEmbed().setImage(gif);

            return message.channel.send(
                ` <@${message.author}> tentou me atacar, mas eu esquivei! Xablau!`,
                messageEmbed
            );
        }

        const messageObject = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
        const messageEmbed = new MessageEmbed().setImage(messageObject.gif);

        return message.channel.send(
            `<@${message.author}> atacou <@${user}>! - ${messageObject.message}`,
            messageEmbed
        );
    },
};
