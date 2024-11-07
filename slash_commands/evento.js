const Discord = require("discord.js")
module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("evento")
    .setDescription("El bot dirá lo que quieras")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((opcion) => 
        opcion
            .setName("mensaje")
            .setDescription("Tipo de evento")
            .addChoices(
                { name: 'Captura', value: 'Captura' },
                { name: 'Metronomo', value: 'Metronomo' },
                { name: 'PvP', value: 'PvP' },
            )
            .setRequired(true)
        )
    .addStringOption((opcion2) => 
        opcion2
            .setName("descripcion")
            .setDescription("Descripcion del evento")
            .setRequired(true)
    )
    .addStringOption((opcion3) => 
        opcion3
            .setName("premios")
            .setDescription("Separa los premios por ','")
            .setRequired(true)
    )
    .addStringOption((opcion4) => 
        opcion4
            .setName("empieza")
            .setDescription("Cuando empieza el evento")
            .setRequired(true)
    )
    .addStringOption((opcion5) => 
        opcion5
            .setName("duracion")
            .setDescription("Cuanto dura el evento")
            .setRequired(true)
    )
    .addStringOption((opcion6) => 
        opcion6
            .setName("host")
            .setDescription("Quien hostea el evento")
            .setRequired(true)
    )
    .addStringOption((opcion7) => 
        opcion7
            .setName("participantes")
            .setDescription("Quien puede participar")
            .addChoices(
                { name: 'Lab1', value: 'Lab1' },
                { name: 'Lab2', value: 'Lab2' },
                { name: 'NWO', value: 'NWO' },
                { name: 'MGMA', value: 'MGMA' },
                { name: 'Todos', value: 'Todos' }
            )
            .setRequired(true)
    ),
        execute: async (interacion) => {
            const texto = interacion.options.getString("mensaje");
            const canalId = "1247333756197408830";
            const descripcion = interacion.options.getString("descripcion")
            const premios = interacion.options.getString("premios")
            const empieza = interacion.options.getString("empieza")
            const duracion = interacion.options.getString("duracion")
            const host = interacion.options.getString("host")
            const participantes = interacion.options.getString("participantes")
            const canal = interacion.guild.channels.cache.get(canalId);
            const userAvatar = interacion.user.displayAvatarURL({ dynamic: true });
            

            if (canal) { 
                if(canal.type ==0){

                    const mensajeEvento = new Discord.EmbedBuilder()
                    .setColor(0x674EA7)
                    .setTitle("🍺¡ Evento "+texto+" !🍺")
                    // .setAuthor({
                    //     name: "Realizado por : "+ interacion.user.username,
                    //     // iconURL: userAvatar
                    // })
                    .setDescription(descripcion)
                    .setThumbnail(userAvatar)
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: 'Premios', value: '1 Millon \n500K' },
                        { name: '\u200B', value: '\u200B' },
                        { name: 'EMPIEZA', value: 'Ya', inline: true },
                        { name: 'DURACION', value: '2h', inline: true },
                        { name: 'HOST', value: 'UmbreonOT', inline: true },
                    )
                    .addFields(
                        { name: 'Pueden participar', value: 'TODOS' }
                    )
                    .setTimestamp()
                    .setFooter({
                        text: "Realizado por : "+ interacion.user.username ,
                        iconURL: userAvatar
                    });

                        // Enviar el mensaje al canal
                    canal.send({embeds: [mensajeEvento]})
                    interacion.reply("Mensaje enviado al canal correctamente.")
                    .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 10000)})
                    .catch(console.error);
                }else{
                    interacion
                    .reply({ content: "El canal con la ID proporcionada no es un canal de texto.", ephemeral: true })
                    .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 30000)})
                    .catch(console.error);
                }
                
            } else {
                // Responder si el canal no existe o no es un canal de texto válido y se borra a los 30 segundos
                interacion
                .reply({ content: "No se pudo encontrar el canal con la ID proporcionada o no es un canal de texto válido. Asegúrate de ingresar una ID de canal válida.", ephemeral: true })
                .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 30000)})
                .catch(console.error);
                
            }
        },
};
//XD
