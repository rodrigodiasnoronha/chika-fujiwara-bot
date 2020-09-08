import 'dotenv/config';
import { Client } from 'discord.js';
import botCommands from './commands';
import { presences } from './utils/presences';

const client = new Client();
const prefix = process.env.BOT_PREFIX || 'f.';

client.on('ready', () => {
    const presence = presences[Math.floor(Math.random() * presences.length)];
    client.user?.setPresence(presence);

    setInterval(() => {
        const presence =
            presences[Math.floor(Math.random() * presences.length)];
        client.user?.setPresence(presence);
    }, 1000 * 60 * 60 * 4); // Executado cada 4 horas

    console.log('I am alive!"');
});

client.on('error', console.error);
client.on('warn', console.warn);

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
    if (botCommands.funny.attack.aliases.includes(command)) {
        return botCommands.funny.attack.execute(client, message, args);
    }

    if (botCommands.funny.cry.aliases.includes(command)) {
        return botCommands.funny.cry.execute(client, message, args);
    }

    if (botCommands.funny.eightBall.aliases.includes(command)) {
        return botCommands.funny.eightBall.execute(client, message, args);
    }

    if (botCommands.funny.hug.aliases.includes(command)) {
        return botCommands.funny.hug.execute(client, message, args);
    }

    if (botCommands.funny.jankenpon.aliases.includes(command)) {
        return botCommands.funny.jankenpon.execute(client, message, args);
    }

    if (botCommands.funny.kiss.aliases.includes(command)) {
        return botCommands.funny.kiss.execute(client, message, args);
    }

    if (botCommands.funny.meow.aliases.includes(command)) {
        return botCommands.funny.meow.execute(client, message, args);
    }

    if (botCommands.funny.pat.aliases.includes(command)) {
        return botCommands.funny.pat.execute(client, message, args);
    }

    if (botCommands.funny.ping.aliases.includes(command)) {
        return botCommands.funny.ping.execute(client, message, args);
    }

    if (botCommands.funny.sad.aliases.includes(command)) {
        return botCommands.funny.sad.execute(client, message, args);
    }

    if (botCommands.funny.shame.aliases.includes(command)) {
        return botCommands.funny.shame.execute(client, message, args);
    }

    if (botCommands.funny.thinking.aliases.includes(command)) {
        return botCommands.funny.thinking.execute(client, message, args);
    }

    if (botCommands.funny.slap.aliases.includes(command)) {
        return botCommands.funny.slap.execute(client, message, args);
    }

    if (botCommands.funny.cake.aliases.includes(command)) {
        return botCommands.funny.cake.execute(client, message, args);
    }

    if (botCommands.funny.bite.aliases.includes(command)) {
        return botCommands.funny.bite.execute(client, message, args);
    }

    if (botCommands.funny.sleepy.aliases.includes(command)) {
        return botCommands.funny.sleepy.execute(client, message, args);
    }

    if (botCommands.funny.dodge.aliases.includes(command)) {
        return botCommands.funny.dodge.execute(client, message, args);
    }

    if (botCommands.funny.runaway.aliases.includes(command)) {
        return botCommands.funny.runaway.execute(client, message, args);
    }

    // Comandos de moderaçao

    if (botCommands.moderation.ban.aliases.includes(command)) {
        return botCommands.moderation.ban.execute(client, message, args);
    }

    if (botCommands.moderation.kick.aliases.includes(command)) {
        return botCommands.moderation.kick.execute(client, message, args);
    }

    if (botCommands.moderation.prune.aliases.includes(command)) {
        return botCommands.moderation.prune.execute(client, message, args);
    }

    /**
     *
     * Comandos de suporte
     *
     */

    if (botCommands.help.helper.aliases.includes(command)) {
        return botCommands.help.helper.execute(client, message, args);
    }
});

const token = process.env.MY_APP_CLIENT_TOKEN;
client.login(token);
