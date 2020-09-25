import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';
import { helpEmbed } from '../../utils/HelpEmbed';

export const cry: Command = {
    name: 'Cry',
    aliases: ['cry', 'chorar', 'choro'],
    args: ['@user'],
    description:
        'Chore um pouco. Dexe essas lágrimas lavarem seus globos oculares!',
    gifs: [
        'https://i.pinimg.com/originals/22/0b/ea/220bea3595cd9ab6144e4064ed2da544.gif',
        'https://i.pinimg.com/originals/4b/ed/c9/4bedc9d0851bf27758acbcd98c3c7f4b.gif',
        'https://i.pinimg.com/originals/75/50/0f/75500f0fc88a932f11f66f892dd1cef4.gif',
        'https://i.pinimg.com/originals/53/df/6e/53df6e6dcab44d4cf0bb0d002dcae6ee.gif',
        'https://i.pinimg.com/originals/9a/e4/2d/9ae42d6da2acbfff24931495f9a8ea1a.gif',
        'https://i.pinimg.com/originals/09/b0/85/09b085a6b0b33a9a9c8529a3d2ee1914.gif',
        'https://i.pinimg.com/originals/06/b3/12/06b312621bf46a8cce59d10c5ab16ef0.gif',
    ],
    messages: [
        'Faça isso parar!',
        'Eu não aguento mais!',
        'Estou tão triste!',
        'BUAAA!',
        'A vida não faz mais sentido...',
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

        const gif = this.getGif();
        const randomMessage = this.getMessage();

        const messageEmbed = new MessageEmbed().setImage(gif);

        message.channel.send(
            `<@${message.author}> está chorando! - ${randomMessage}`,
            messageEmbed
        );
    },

    getGif() {
        return this.gifs![Math.floor(Math.random() * this.gifs!.length)];
    },

    getMessage() {
        return this.messages[Math.floor(Math.random() * this.messages.length)];
    },
};
