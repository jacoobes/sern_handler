
/**
 * Function to automatically send paginated embeds and switch between the pages by listening to the user reactions
 * @param {import('discord.js').Message} message - Used to send the paginated message to the channel, get the user, etc.
 * @param {MessageEmbed[]} embeds - The array of embeds to switch between
 * @param {object} [options] - Optional parameters
 * @param {number} [options.time] - The max time for createReactionCollector after which all of the reactions disappear
 * @example From https://github.com/canta-slaus/bot-prefab/blob/main/js/src/utils/utils.js
 */
 async function paginate(message, embeds, options) {
    try {
        const pageMsg = await message.channel.send({ embed: embeds[0] });

        for (const emote of reactions) {
            await pageMsg.react(emote);
            await delay(750);
        }

        let pageIndex = 0;
        let time = 30000;
        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === message.author.id;
        };

        if (options) {
            if (options.time) time = options.time;
        };

        const collector = pageMsg.createReactionCollector(filter, { time: time });
        collector.on('collect', async (reaction, user) => {
            try {
                await reaction.users.remove(user)
                if (reaction.emoji.name === '⏩') {
                    pageIndex = embeds.length - 1;
                    await pageMsg.edit({ embed:embeds[pageIndex] });
                } else if (reaction.emoji.name === '▶️') {
                    if (pageIndex < embeds.length - 1) {
                        pageIndex++;
                        await pageMsg.edit({ embed: embeds[pageIndex] });
                    } else {
                        pageIndex = 0;
                        await pageMsg.edit({ embed: embeds[pageIndex] });
                    }
                } else if (reaction.emoji.name === '⏸️') {
                    await pageMsg.delete();
                } else if (reaction.emoji.name === '⏪') {
                    pageIndex = 0;
                    await pageMsg.edit({ embed: embeds[pageIndex] });
                } else if (reaction.emoji.name === '◀️') {
                    if (pageIndex > 0) {
                        pageIndex--;
                        await pageMsg.edit({ embed: embeds[pageIndex] });
                    } else {
                        pageIndex = embeds.length - 1;
                        await pageMsg.edit({ embed: embeds[pageIndex] });
                    }
                } else if (reaction.emoji.name === '🔢') {
                    let msg = await getReply(message, { time: 7500, regexp: /^\d+$/ });
                    if (!msg) return;
    
                    let num = parseInt(msg.content);
    
                    if (num > embeds.length) num = embeds.length - 1;
                    else num--;
    
                    pageIndex = num;
    
                    await pageMsg.edit({ embed: embeds[pageIndex] });
                }
            } catch (e) {
                return;
            }
        });

        collector.on('end', () => {
            pageMsg.reactions.removeAll()
        });
    } catch (e) {
        return;
    }
}
module.exports.paginate = paginate