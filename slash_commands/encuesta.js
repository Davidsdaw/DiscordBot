const Discord = require('discord.js');
const votos =  require('../votos');
const { actualizarPorcentaje } = require('../actualizarPorcentaje');
let row;
let interaction;
let embed;


module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('encuesta')
        .setDescription('Podrás configurar una encuesta')
        .addStringOption(option => 
            option.setName('pregunta')
                .setDescription('La pregunta para la encuesta')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion1')
                .setDescription('La primera opción para la encuesta')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion2')
                .setDescription('La segunda opción para la encuesta')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('opcion3')
                .setDescription('La tercera opción para la encuesta')
                .setRequired(false)) // Opción 3 es opcional
        .addStringOption(option => 
            option.setName('opcion4')
                .setDescription('La cuarta opción para la encuesta')
                .setRequired(false)), // Opción 4 es opcional
    async execute(inter) {
        interaction=inter;
        const pregunta = interaction.options.getString('pregunta');
        const opcion1 = interaction.options.getString('opcion1');
        const opcion2 = interaction.options.getString('opcion2');
        const opcion3 = interaction.options.getString('opcion3');
        const opcion4 = interaction.options.getString('opcion4');

        embed = new Discord.EmbedBuilder()
            .setColor('#fc32e1') // Color del embed es blanco
            .setTitle(pregunta);

        // Añade los campos solo si las opciones correspondientes están proporcionadas
        if (opcion1) {
            embed.addFields({ name: '--->  1. ' + opcion1, value: '\u200B' });
        }
        if (opcion2) {
            embed.addFields({ name: '--->  2. ' + opcion2, value: '\u200B' });
        }
        if (opcion3) {
            embed.addFields({ name: '--->  3. ' + opcion3, value: '\u200B' });
        }
        if (opcion4) {
            embed.addFields({ name: '--->  4. ' + opcion4, value: '\u200B' });
        }

        actualizarPorcentaje(embed);

        
        row = new Discord.ActionRowBuilder();

        // Añade los botones solo si las opciones correspondientes están proporcionadas
        if (opcion1) {
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('opcion1')
                    .setLabel(opcion1)
                    .setStyle(1)
            );
        }
        if (opcion2) {
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('opcion2')
                    .setLabel(opcion2)
                    .setStyle(3)
            );
        }
        if (opcion3) {
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('opcion3')
                    .setLabel(opcion3)
                    .setStyle(4)
            );
        }
        if (opcion4) {
            row.addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('opcion4')
                    .setLabel(opcion4)
                    .setStyle(2)
            );
        }

        await interaction.reply({ embeds: [embed], components: [row] });
        
    },
    
    getRow: function() { return row; },
    getInteraction: function() { return interaction; },
    getEmbed: function() { return embed; },
};
