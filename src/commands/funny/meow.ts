import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';
import { helpEmbed } from '../../utils/HelpEmbed';

export const meow: Command = {
    name: 'Meow',
    description: 'Faça `meow` para alguém!',
    aliases: ['meow', 'miau'],
    args: ['@user'],
    gifs: [
        'https://i.pinimg.com/originals/c8/6d/8b/c86d8bc6e219c53a471cd0ba20e58404.gif',
        'https://i.pinimg.com/originals/06/1b/47/061b474a92aea722eea21a05c72373ce.gif',
        'https://i.pinimg.com/originals/ca/a6/97/caa697ba2a4737b7be7a3fcc176e35cd.gif',
        'https://i.pinimg.com/originals/8e/d7/fc/8ed7fc935759a443576f1f430774c6c7.gif',
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
        const messageEmbed = new MessageEmbed().setImage(gif);
        const user = message.mentions.users.first();

        if (!user) {
            return message.reply(`fez meow! Own, que fofo!`, messageEmbed);
        }

        const reply = `<@${message.author}> fez \`meow\` para <@${user}>! Kawaii!`;
        return message.channel.send(reply, messageEmbed);
    },
};
