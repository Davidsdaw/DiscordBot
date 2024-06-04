const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["Guilds", "GuildPresences", "GuildMessages"] });

client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    channel.send(`¡Hola ${member}, bienvenido a nuestro servidor de Discord!`);
});
