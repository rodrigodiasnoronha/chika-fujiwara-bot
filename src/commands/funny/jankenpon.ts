import { Command } from '../../types';
import { Client, Message } from 'discord.js';

export const jankenpon: Command = {
    name: 'Jankenpon',
    description: 'Jogue pedra, papel e tesoura comigo!',
    aliases: ['jankenpon', 'jkp', 'ppt'],
    args: ['pedra', 'papel', 'tesoura'],

    execute(client: Client, message: Message, args: Array<string>) {
        if (!args.length) {
            return message.reply(
                'digite `pedra` ou `papel` ou `tesoura`! :upside_down: '
            );
        }

        if (!this.args.includes(args[0])) {
            return message.reply(
                'eu não entendi sua escolha. Digite `pedra` ou `papel` ou `tesoura`! :upside_down:'
            );
        }

        const botChoice = this.args[
            Math.floor(Math.random() * this.args.length)
        ];
        const userChoice = args[0].toLowerCase();

        // DRAW
        if (botChoice === userChoice) {
            return message.reply(`${botChoice}! Deu empate! :neutral_face: `);
        }

        // BOT WIN
        if (
            (botChoice === 'pedra' && userChoice === 'tesoura') ||
            (botChoice === 'tesoura' && userChoice === 'papel') ||
            (botChoice === 'papel' && userChoice === 'pedra')
        ) {
            return message.reply(
                `${botChoice}! Haha, ganhei! :stuck_out_tongue_winking_eye: `
            );
        }

        // USER WIN
        return message.reply(
            `${botChoice}! Você ganhou! Parabéns! :wink: :sweat_smile: `
        );
    },
};
