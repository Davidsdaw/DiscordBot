const Discord = require("discord.js");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('status')
        .setDescription('Establece el status del bot')
        .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
        .addIntegerOption(option =>
            option
                .setName('actividad')
                .setDescription('El tipo de actividad (0: Jugando, 1: Transmitiendo, 2: Escuchando, 3: Viendo)')
                .setRequired(true)
                .addChoices(
                    { name: 'Jugando', value: 0 },
                    { name: 'Transmitiendo', value: 1 },
                    { name: 'Escuchando', value: 2 },
                    { name: 'Viendo', value: 3 },
                    { name: 'Custom', value: 4 },
                    { name: 'Competing', value: 5 }
                )
        )
        .addStringOption(option =>
            option
                .setName('descripcion')
                .setDescription('Descripción de la actividad')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('url')
                .setDescription('URL de transmisión (solo requerido para "Transmitiendo")')
        ),
    execute: async (interaction, Client) => {

            const actividad = interaction.options.getInteger('actividad');
            const descripcion = interaction.options.getString('descripcion');
            const url = interaction.options.getString('url');
    
            const activityTypes = [
                'PLAYING',   // Jugando
                'STREAMING', // Transmitiendo
                'LISTENING', // Escuchando
                'WATCHING',  // Viendo
                'CUSTOM',    // Custom
                'COMPETING'  // Competing
            ];
    
            try {
                if (actividad === 1 && !url) {
                    return interaction.reply({ content: 'La URL es requerida para la actividad "Transmitiendo".', ephemeral: true })
                    .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 30000)});
                }
    
                const activityOptions = { type: actividad, url: actividad === 1 ? url : undefined};
                //EXISTEN "STATE" "NAME" "DETAILS"
                Client.user.setActivity(descripcion, activityOptions);
                
                await interaction.reply(`Status actualizado a: ${activityTypes[actividad]} ${descripcion}${url ? ` (URL: ${url})` : ''}`);
            } 
            catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Hubo un error actualizando el estado.', ephemeral: true })
                .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 30000)});
            }
    }
};