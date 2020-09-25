import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const shame: Command = {
    name: 'Shame',
    aliases: ['vergonha', 'shame', 'envergonhar', 'shamed'],
    args: [],
    description:
        'Está com vergonha? Utilize este comando para demonstrar seus sentimentos!',
    gifs: [
        'https://i.pinimg.com/originals/c8/51/28/c851280dfc35207936e407655e2226bb.gif',
        'https://i.pinimg.com/originals/47/fe/a1/47fea17927f5e62dfc054146851c3fee.gif',
        'https://i.pinimg.com/originals/09/7f/46/097f46e1db35653902b10b0a322c908f.gif',
        'https://i.pinimg.com/originals/5e/92/9a/5e929a9b4984b48bd0ab5f43a591b687.gif',
        'https://i.pinimg.com/originals/db/b3/b3/dbb3b386a2cfa8d681c590b8196bec0f.gif',
        'https://i.pinimg.com/originals/38/ef/a1/38efa19bd76d3d1a7edbf1ace18a4ec1.gif',
        'https://i.pinimg.com/originals/f5/6a/4a/f56a4ab55f16832a5c887b8b52d0b04d.gif',
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

        if (args.length) {
            return message.reply(
                'eu não entendi o que você quis dizer. Use somente o comando `shame`'
            );
        }

        const gif = this.gifs![Math.floor(Math.random() * this.gifs!.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);
        const reply = `<@${message.author}> está envergonhado!`;

        return message.channel.send(reply, messageEmbed);
    },
};
