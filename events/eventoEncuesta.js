const Discord = require('discord.js');

// Almacena los ID de los usuarios que han votado
let hanVotado = new Set();

module.exports = {
    name: 'eventoEncuesta',
    execute: async (interaction) => {
        console.log('Interacción recibida');
        if (!interaction.isButton() || !interaction.customId) return;
        console.log('La interacción es un botón y tiene un customId');

        try {
            let btn = interaction.customId

            await interaction.deferReply({ephemeral: true});
            console.log('deferReply enviado');
            if (!hanVotado.has(interaction.user.id)) {
                if (btn === 'opcion1') {
                    hanVotado.add(interaction.user.id);
                    await interaction.editReply('Has votado, gracias por participar')
                    console.log('editReply enviado');
                    return;
                }
            }
        } catch (error) {
            console.log(`Error en eventoEncuesta.js ${error}`)
        }
    }
};
