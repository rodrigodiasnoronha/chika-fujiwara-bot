import { Client, Message } from 'discord.js';
import { Command } from '../../types';
import jimp from 'jimp';

export const inverse: Command = {
    name: 'Inverse',
    description: 'Inverta a imagem de perfil sua ou de alguém.',
    aliases: ['inverse', 'inverter'],
    args: ['@user'],
    async execute(client: Client, message: Message, args: Array<string>) {
        try {
            const profileImage = message.mentions.users.size
                ? message.mentions.users
                      .first()
                      ?.avatarURL({ format: 'jpeg', size: 1024 })
                : message.author.avatarURL({ format: 'jpeg', size: 1024 });

            if (!profileImage) return;

            // aplica o efeito de inverter a imagem.
            const jimpImage = await jimp.read(profileImage);
            const photo = jimpImage.flip(true, false);

            // denomina o caminho que a imagem será armazenada.
            const path = './raw/image.jpeg';
            await photo.writeAsync('./raw/image.jpeg');

            return message.channel.send(`<@${message.author}>`, {
                files: [path],
            });
        } catch (err) {
            const errorEmoji = client.emojis.cache.find(
                (emoji) => emoji.name === 'errado'
            );
            return message.channel.send(
                `<:errado:${errorEmoji}> Ocorreu um erro ao executar esse comando.`
            );
        }
    },
};
