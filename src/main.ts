import 'dotenv/config';
import { Client, Collection } from 'discord.js';
import * as database from './database';
import { onMessage } from './commands';
import { guildMemberAdd } from './listeners/guildMemberAdd';
import { presences } from './utils/presences';

const client = new Client();
const prefix = process.env.BOT_PREFIX || '.';

client.on('ready', async () => {
    const presence = presences[Math.floor(Math.random() * presences.length)];
    client.user?.setPresence(presence);

    setInterval(() => {
        const presence =
            presences[Math.floor(Math.random() * presences.length)];
        client.user?.setPresence(presence);
    }, 1000 * 60 * 60 * 0.5); // Executado cada 30 minutos

    await database.connect();
    console.log('I am alive!"');
});

client.on('error', console.error);
client.on('warn', console.warn);

client.on(
    'message',
    async (message) => await onMessage(client, message, prefix)
);

client.on('guildMemberAdd', async (user) => {
    await guildMemberAdd(user, client);
});

const token = process.env.MY_APP_CLIENT_TOKEN;
client.login(token);
