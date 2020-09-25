import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const sleepy: Command = {
    name: 'Sleepy',
    description: 'Demonstre que você está com sono!',
    aliases: ['sleepy', 'sono'],
    args: [],
    gifs: [
        'https://i.pinimg.com/originals/6f/c7/ce/6fc7cee694c6b665942ecad7466048d5.gif',
        'https://i.pinimg.com/originals/81/79/b5/8179b530237c2c657e2b17bd4b00c02e.gif',
        'https://i.pinimg.com/originals/4b/45/fc/4b45fc5ce39673b9ed0ee1fdcf9fa34f.gif',
        'https://i.pinimg.com/originals/77/e7/bf/77e7bfdb865154becae3233e0b870ab6.gif',
        'https://i.pinimg.com/originals/54/1a/11/541a114b71af5c17e4046c2d29aa9c2f.gif',
        'https://i.pinimg.com/originals/65/60/f0/6560f0218f5392d234e49f3826e6bad2.gif',
        'https://i.pinimg.com/originals/e7/d8/20/e7d820df79f40685c63b549009b96c71.gif',
        'https://i.pinimg.com/originals/00/50/a3/0050a3ea00bd58c0901c49ff24e36699.gif',
        'https://i.pinimg.com/originals/f8/73/68/f87368f1a73c3df51df7f68bb480b92e.gif',
        'https://i.pinimg.com/originals/79/c8/30/79c830262a5c8e1af05d0a6761011176.gif',
        'https://i.pinimg.com/originals/cc/d1/d5/ccd1d5649c54315a4100497a40f31ad9.gif',
        'https://i.pinimg.com/originals/76/6a/25/766a25de69e36c91d06726ba3113b234.gif',
        'https://i.pinimg.com/originals/6c/85/4a/6c854adec262a6373289cdbc31846565.gif',
        'https://i.pinimg.com/originals/03/19/2a/03192ab44c58a491d510c03b6e04ba87.gif',
        'https://i.pinimg.com/originals/c3/bc/10/c3bc10f31eca300f1d5ea035cf32df43.gif',
        'https://i.pinimg.com/originals/53/36/05/533605347770b3cc5bc1080309b9652f.gif',
        'https://i.pinimg.com/originals/17/2f/1b/172f1b722d9af58423619ff0a7c6503f.gif',
        'https://i.pinimg.com/originals/bc/30/8e/bc308ef7ed3753ae73f1ff047e14c554.gif',
    ],
    messages: ['BUAA', 'Que sono...', 'zzzzz...'],
    execute(client: Client, message: Message, args: Array<string>) {
        if (args[0] === 'ajuda' || args[0] === 'help')
            return helpEmbed(
                this.name,
                this.description,
                this.aliases,
                this.args,
                message
            );

        const gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        const msg = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
        const messageEmbed = new MessageEmbed().setImage(gif);

        return message.channel.send(
            `<@${message.author}> está com sono! - ${msg}`,
            messageEmbed
        );
    },
};
