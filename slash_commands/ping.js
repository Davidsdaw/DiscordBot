const Discord = require("discord.js")

module.exports= {
    data: new Discord.SlashCommandBuilder()
    .setName("ping")
    .setDescription("Te devuelve pong"),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};