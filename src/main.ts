import 'dotenv/config';
import { Client } from 'discord.js';

const client = new Client();

client.on('ready', () => console.log('I am alive!'));

const prefix = process.env.BOT_PREFIX || 'f.';

client.on('message', (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    /**
     *
     * args = argumentos passados na mensagem
     * command = comando usado
     *
     */

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase() || '';

    /**
     *
     * Comandos de diversão
     *
     */
});
