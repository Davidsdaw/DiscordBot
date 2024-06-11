const Discord = require('discord.js');
const votos =  require('../votos');
const { actualizarPorcentaje } = require('../actualizarPorcentaje');
const mensaje = require('../slash_commands/encuesta');


// Almacena los ID de los usuarios que han votado
let hanVotado = new Set();

    module.exports = {
        name: 'eventoEncuesta',
        execute: async (interaction) => {
            if (!interaction.isButton() || !interaction.customId) return;
            
            try {
                let btn = interaction.customId
                let em;
                await interaction.deferReply({ephemeral: true});
                if (!hanVotado.has(interaction.user.id)) {
                    if (btn === 'opcion1') {
                        hanVotado.add(interaction.user.id);
                        votos['opcion1']++;
                        await interaction.editReply('Gracias por participar');
                        em = await actualizarPorcentaje(mensaje.getEmbed());
                    }
                    if (btn === 'opcion2') {
                        hanVotado.add(interaction.user.id);
                        votos['opcion2']++;
                        await interaction.editReply('Gracias por participar');
                        em = await actualizarPorcentaje(mensaje.getEmbed());

                    }
                    if (btn === 'opcion3') {
                        hanVotado.add(interaction.user.id);
                        votos['opcion3']++;
                        await interaction.editReply('Gracias por participar');
                        em = await actualizarPorcentaje(mensaje.getEmbed());
                    }
                    if (btn === 'opcion4') {
                        hanVotado.add(interaction.user.id);
                        votos['opcion4']++;
                        await interaction.editReply('Gracias por participar');
                        em = await actualizarPorcentaje(mensaje.getEmbed());
                    }
                    let r=mensaje.getRow();
                    let i= mensaje.getInteraction();
                    // console.log(r)
                    // console.log(i)
                    // console.log(em)
                    await i.editReply({ embeds: [em], components: [r] });
                }else{
                    await interaction.editReply('Ya has votado, gracias por participar')
                }
            } catch (error) {
                console.log(`Error en eventoEncuesta.js ${error}`)
            }

            

        }
    };


