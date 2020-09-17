import { Client, Message } from 'discord.js';

// funny commands
import { attack } from './funny/attack';
import { cry } from './funny/cry';
import { eightBall } from './funny/eightBall';
import { hug } from './funny/hug';
import { jankenpon } from './funny/jankenpon';
import { kiss } from './funny/kiss';
import { meow } from './funny/meow';
import { pat } from './funny/pat';
import { ping } from './funny/ping';
import { sad } from './funny/sad';
import { shame } from './funny/shame';
import { thinking } from './funny/thinking';
import { slap } from './funny/slap';
import { cake } from './funny/cake';
import { bite } from './funny/bite';
import { sleepy } from './funny/sleepy';
import { dodge } from './funny/dodge';
import { runaway } from './funny/runaway';

// help commands
import { helper } from './help/helper';

// moderation commands
import { ban } from './moderation/ban';
import { kick } from './moderation/kick';
import { prune } from './moderation/prune';
import { mute } from './moderation/mute';
import { unmute } from './moderation/unmute';

// extras commands
import { avatar } from './extras/avatar';
import { userInfo } from './extras/userinfo';
import { profile } from './extras/profile';
import { bio } from './extras/bio';
import { locale } from './extras/locale';
import { support } from './extras/support';
import { say } from './extras/say';
import { inverse } from './extras/inverse';

// economy commands
import { balance } from './economy/balance';
import { transfer } from './economy/transfer';
import { steal } from './economy/steal';
import { daily } from './economy/daily';
import { top } from './extras/top';

// test commands
import { dither } from './test/commands';

export const onMessage = async (
    client: Client,
    message: Message,
    prefix: string
) => {
    if (
        !message.content.startsWith(prefix) ||
        message.author.bot ||
        message.webhookID
    )
        return;

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
    if (attack.aliases.includes(command)) {
        return attack.execute(client, message, args);
    }

    if (cry.aliases.includes(command)) {
        return cry.execute(client, message, args);
    }

    if (eightBall.aliases.includes(command)) {
        return eightBall.execute(client, message, args);
    }

    if (hug.aliases.includes(command)) {
        return hug.execute(client, message, args);
    }

    if (jankenpon.aliases.includes(command)) {
        return jankenpon.execute(client, message, args);
    }

    if (kiss.aliases.includes(command)) {
        return kiss.execute(client, message, args);
    }

    if (meow.aliases.includes(command)) {
        return meow.execute(client, message, args);
    }

    if (pat.aliases.includes(command)) {
        return pat.execute(client, message, args);
    }

    if (ping.aliases.includes(command)) {
        return ping.execute(client, message, args);
    }

    if (sad.aliases.includes(command)) {
        return sad.execute(client, message, args);
    }

    if (shame.aliases.includes(command)) {
        return shame.execute(client, message, args);
    }

    if (thinking.aliases.includes(command)) {
        return thinking.execute(client, message, args);
    }

    if (slap.aliases.includes(command)) {
        return slap.execute(client, message, args);
    }

    if (cake.aliases.includes(command)) {
        return cake.execute(client, message, args);
    }

    if (bite.aliases.includes(command)) {
        return bite.execute(client, message, args);
    }

    if (sleepy.aliases.includes(command)) {
        return sleepy.execute(client, message, args);
    }

    if (dodge.aliases.includes(command)) {
        return dodge.execute(client, message, args);
    }

    if (runaway.aliases.includes(command)) {
        return runaway.execute(client, message, args);
    }

    // Comandos de moderação

    if (ban.aliases.includes(command)) {
        return ban.execute(client, message, args);
    }

    if (kick.aliases.includes(command)) {
        return kick.execute(client, message, args);
    }

    if (prune.aliases.includes(command)) {
        return prune.execute(client, message, args);
    }

    if (mute.aliases.includes(command)) {
        return mute.execute(client, message, args);
    }

    if (unmute.aliases.includes(command)) {
        return unmute.execute(client, message, args);
    }

    /**
     *
     * Comandos extras
     *
     */

    if (avatar.aliases.includes(command)) {
        return avatar.execute(client, message, args);
    }

    if (userInfo.aliases.includes(command)) {
        return userInfo.execute(client, message, args);
    }

    if (profile.aliases.includes(command)) {
        return profile.execute(client, message, args);
    }

    if (bio.aliases.includes(command)) {
        return bio.execute(client, message, args);
    }

    if (locale.aliases.includes(command)) {
        return locale.execute(client, message, args);
    }

    if (support.aliases.includes(command)) {
        return support.execute(client, message, args);
    }

    if (say.aliases.includes(command)) {
        return say.execute(client, message, args);
    }

    if (inverse.aliases.includes(command)) {
        return inverse.execute(client, message, args);
    }

    /**
     *
     * Comandos de economia
     *
     */

    if (daily.aliases.includes(command)) {
        return daily.execute(client, message, args);
    }

    if (balance.aliases.includes(command)) {
        return balance.execute(client, message, args);
    }

    if (transfer.aliases.includes(command)) {
        return transfer.execute(client, message, args);
    }

    if (steal.aliases.includes(command)) {
        return steal.execute(client, message, args);
    }

    if (top.aliases.includes(command)) {
        return top.execute(client, message, args);
    }

    /**
     *
     * Comandos de suporte
     *
     */

    if (helper.aliases.includes(command)) {
        return helper.execute(client, message, args);
    }

    // COmands de teste
    if (dither.aliases.includes(command)) {
        return dither.execute(client, message, args);
    }

    const errorEmoji = client.emojis.cache.find(
        (emoji) => emoji.name === 'errado'
    );
    return message.channel.send(
        `<:errado:${errorEmoji}> Comando não encontrado. Digite \`f.ajuda\`.`
    );
};
