import { Command } from '../../types';
import { Client, Message, MessageEmbed } from 'discord.js';

export const thinking: Command = {
    name: 'Thinking',
    description: 'Estou pensando ainda...',
    args: ['@user', 'mensagem'],
    aliases: ['pensando', 'pensar', 'think', 'thinking'],
    gifs: [
        'https://i.pinimg.com/originals/1a/c3/75/1ac375ffe6f2e99ac36eb1b42a7b9707.gif',
        'https://i.pinimg.com/originals/3b/36/97/3b3697a164590cfd8b06166a4a2099ff.gif',
        'https://i.pinimg.com/originals/3a/fc/18/3afc18a6111ab4df5b5ca6caafb307a9.gif',
        'https://i.pinimg.com/originals/c3/f2/c6/c3f2c62aaca6dea6b9abeef11a2939d2.gif',
        'https://i.pinimg.com/originals/9f/8c/9b/9f8c9bbae48b93250147f2c089b2fde1.gif',
        'https://i.pinimg.com/originals/31/de/e4/31dee4b3a2a5c14c1b7d834814334001.gif',
        'https://bloomreviewsblog.files.wordpress.com/2018/06/anime-thinking-gif.gif',
        'https://www.gifimage.net/wp-content/uploads/2018/06/thinking-anime-gif-10.gif',
        'http://pa1.narvii.com/6364/f43cd89e56ba467fa60619409d73255b5aa9297a_hq.gif',
        'https://gifimage.net/wp-content/uploads/2017/09/anime-thinking-gif-8.gif',
    ],
    execute(client: Client, message: Message, args: Array<string>) {
        let gif = this.gifs[Math.floor(Math.random() * this.gifs.length)];
        let user = message.mentions.users.first();
        let reply = `<@${message.author}> está pensando!`;

        if (args.length && !user) {
            reply = `<@${message.author}> está pensando ${args.join(' ')}`;
        }

        if (user) {
            reply = `<@${message.author}> está pensando em <@${user}>!`;
        }

        if (user?.bot && user.id === client.user!.id) {
            reply = `<@${message.author}> está pensando em mim! Socorro! :flushed: `;
            gif = `https://i.pinimg.com/originals/2b/a9/45/2ba945abd8db5c6da04944e154f17640.gif`;
        }

        const messageEmbed = new MessageEmbed().setImage(gif);
        message.channel.send(reply, messageEmbed);
    },
};
