import { Client, Message, MessageEmbed } from 'discord.js';
import { Command } from '../../types';

export const pat: Command = {
    name: 'Pat',
    description: 'Faça cafuné (carinho) em alguém!',
    args: ['@user'],
    aliases: ['cafuné', 'cafune', 'pat', 'carinho'],
    messages: ['FUU!', 'Ownn!!', 'Kawaii!!'],
    gifs: [
        'https://i.pinimg.com/originals/4b/04/15/4b04151923d45f118a7dabbfe85cad07.gif',
        'https://i.pinimg.com/originals/24/5c/a8/245ca846e4d4d8a5eb2ca8ba17d2b809.gif',
        'https://i.pinimg.com/originals/a8/b1/aa/a8b1aab3534d5851ed14184521cce539.gif',
        'https://64.media.tumblr.com/f95f14437809dfec8057b2bd525e6b4a/tumblr_omvkl2SzeK1ql0375o1_500.gif',
        'https://em.wattpad.com/37a87d64a27c9b0e2e4a7d7314b6338a8c7ae458/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f6c59776c39554c4d58376f7851773d3d2d3438313233323432392e313465643034313932656532333137663336383636393034393832332e676966?s=fit&w=720&h=720',
    ],

    execute(client: Client, message: Message, args: Array<string>) {
        const user = message.mentions.users.first();

        if (!user) {
            return message.reply(
                'não entendi o que quis dizer, marque algum usuário! :wink: '
            );
        }

        if (user?.bot && user.id === client.user!.id) {
            let gif =
                'https://i.pinimg.com/originals/95/47/1f/95471f621d0f3fafae2822312d4da671.gif';
            const messageEmbed = new MessageEmbed().setImage(gif);
            const reply = `<@${message.author}> fe-fez cafuné em mi-mim!`;

            return message.channel.send(reply, messageEmbed);
        }

        const reply = this.messages[
            Math.floor(Math.random() * this.messages.length)
        ];
        const gif = this.gifs![Math.floor(Math.random() * this.gifs!.length)];
        const messageEmbed = new MessageEmbed().setImage(gif);

        return message.channel.send(
            `<@${message.author}> fez cafuné em <@${user}>! - ${reply}`,
            messageEmbed
        );
    },
};
