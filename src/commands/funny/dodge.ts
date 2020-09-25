import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const dodge: Command = {
    name: 'Dodge',
    description: 'Desvie de algo que alguém disse',
    aliases: ['dodge', 'desviar', 'desvio'],
    args: ['@user'],
    gifs: [
        'https://i.pinimg.com/originals/78/79/77/7879779ff138270ca873e0fc775269e9.gif',
        'https://i.pinimg.com/originals/5f/cb/47/5fcb4776ecf0ae14b93fac41e75d294f.gif',
        'https://i.pinimg.com/originals/c1/82/86/c18286c0178619f931fc5dea01f1ea62.gif',
        'https://i.pinimg.com/originals/94/47/db/9447dbdc257e22e77cb07f0b8bdb0f7b.gif',
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

        const gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);

        return message.channel.send(
            `<@${message.author}> desviou.`,
            messageEmbed
        );
    },
};
