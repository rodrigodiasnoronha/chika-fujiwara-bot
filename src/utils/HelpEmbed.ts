import { Message, MessageEmbed } from 'discord.js';

// help embed usado em todos os comandos de helpers
export const helpEmbed = (
    name: string,
    description: string,
    aliases: Array<string>,
    args: Array<string>,
    message: Message
) => {
    let alternatives = '';

    aliases.forEach((alias) => {
        alternatives += `\`${alias}\` `;
    });

    const messageEmbed = new MessageEmbed()
        .setTitle(`${name} - Ajuda`)
        .setDescription(description)
        .addFields([
            {
                name: 'Como usar:',
                value: `${
                    args[0] ? `.${aliases[0]} ${args[0]}` : `.${aliases[0]}`
                }`,
            },
            {
                name: 'Aliases (alternativas):',
                value: alternatives,
            },
        ])
        .setFooter(`Solicitado por ${message.author.username}`);

    return message.channel.send(messageEmbed);
};
