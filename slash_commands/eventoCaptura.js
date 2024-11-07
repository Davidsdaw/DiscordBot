const Discord = require("discord.js")
module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("eventocaptura")
    .setDescription("El bot dirá lo que quieras")
    .setDefaultMemberPermissions(Discord.PermissionFlagsBits.Administrator)
    .addStringOption((opcion1) => 
        opcion1
            .setName("descripcion")
            .setDescription("Descripcion del evento")
            .setRequired(true)
    )
    .addStringOption((opcion9) => 
        opcion9
            .setName("pokemon")
            .setDescription("Que pokemon capturar")
            .setRequired(true)
    )
    .addStringOption((opcion10) => 
        opcion10
            .setName("zona")
            .setDescription("En que zona aparece el pokemon")
            .setRequired(true)
    )
    .addStringOption((opcion11) => 
        opcion11
            .setName("region")
            .setDescription("En que region aparece el pokemon")
            .addChoices(
                { name: 'Kanto', value: 'Kanto' },
                { name: 'Johto', value: 'Johto' },
                { name: 'Hoenn', value: 'Hoenn' },
                { name: 'Sinnoh', value: 'Sinnoh' },
                { name: 'Teselia', value: 'Teselia' }
            )
            .setRequired(true)
    )
    .addStringOption((opcion2) => 
        opcion2
            .setName("premios")
            .setDescription("Separa los premios por ','")
            .setRequired(true)
    )
    .addStringOption((opcion8) => 
        opcion8
            .setName("acabar")
            .setDescription("Donde ir al acabar")
            .setRequired(true)
    )
    .addStringOption((opcion3) => 
        opcion3
            .setName("empieza")
            .setDescription("Cuando empieza el evento")
            .setRequired(true)
    )
    .addStringOption((opcion4) => 
        opcion4
            .setName("duracion")
            .setDescription("Cuanto dura el evento")
            .setRequired(true)
    )
    .addStringOption((opcion5) => 
        opcion5
            .setName("host")
            .setDescription("Quien hostea el evento")
            .setRequired(true)
    )
    .addStringOption((opcion6) => 
        opcion6
            .setName("participantes")
            .setDescription("Quien puede participar")
            .addChoices(
                { name: 'Lab1', value: 'Lab1' },
                { name: 'Lab2', value: 'Lab2' },
                { name: 'NWO', value: 'NWO' },
                { name: 'MGMA', value: 'MGMA' },
                { name: 'Todos', value: '@everyone' }
            )
            .setRequired(true)
    )
    .addStringOption((opcion7) => 
        opcion7
            .setName("requisitos")
            .setDescription("Requisitos para participar")
            .addChoices(
                { name: 'Nuevos pueden participar', value: '¡ Todos pueden participar !' },
                { name: '1 Semana', value: ' Debes llevar mas de 1 semana' },
                { name: '2 Semanas', value: 'Debes llevar mas de 2 semanas' },
                { name: '3 Semanas', value: 'Debes llevar mas de 3 semanas' },
                { name: '1 Mes', value: 'Debes llevar mas de 1 mes' }
            )
            .setRequired(true)
    ),
    execute: async (interacion) => {
        const canalId = "1247333756197408830";
        const descripcion = interacion.options.getString("descripcion");
        const pokemon = interacion.options.getString("pokemon");
        const zona = interacion.options.getString("zona");
        const region = interacion.options.getString("region");
        const premios = interacion.options.getString("premios");
        const empieza = interacion.options.getString("empieza");
        const duracion = interacion.options.getString("duracion");
        const host = interacion.options.getString("host");
        const participantes = interacion.options.getString("participantes");
        const requisitos = interacion.options.getString("requisitos");
        const acabar = interacion.options.getString("acabar");
        const canal = interacion.guild.channels.cache.get(canalId);
        const userAvatar = interacion.user.displayAvatarURL({ dynamic: true });

        let premiosArray = premios.split(",");
        let premioFormato = premiosArray.join("\n");

        if (canal.type === 0) {

            // Convertimos empieza y duracion a fecha y hora
            const fechaInicio = new Date(empieza);
            const duracionMs = parseDuration(duracion); // Convertimos la duración a milisegundos

            if (!isNaN(fechaInicio) && !isNaN(duracionMs)) {
                const fechaFin = new Date(fechaInicio.getTime() + duracionMs);
                
                // Crear timestamp para mostrar en embed
                const timestampEmpieza = Math.floor(fechaInicio.getTime() / 1000);
                const timestampFin = Math.floor(fechaFin.getTime() / 1000);

                const mensajeEvento = new Discord.EmbedBuilder()
                    .setColor(0x674EA7)
                    .setTitle("🍺¡ Evento **Captura** !🍺")
                    .setDescription(descripcion)
                    .setThumbnail(userAvatar)
                    .addFields(
                        { name: ' POKEMON ', value: pokemon, inline: true },
                        { name: ' ZONA ', value: zona, inline: true },
                        { name: ' REGION ', value: region, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: ' 💰 PREMIOS 💰 ', value: premioFormato, inline: true },
                        { name: ' 🗺️ Al acabar 🗺️ ', value: acabar, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: ' EMPIEZA 🕛 ', value: `<t:${timestampEmpieza}:F>`, inline: true }, // Usa timestamp
                        { name: ' DURACION ⏲️ ', value: duracion, inline: true },
                        { name: ' HOST 🤖 ', value: host, inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: ' TERMINA 🕛 ', value: `<t:${timestampFin}:F>`, inline: true } // Timestamp de fin
                    )
                    .setImage("https://www.gifsanimados.org/data/media/562/linea-imagen-animada-0538.gif")
                    .addFields(
                        { name: ' 🎮 Pueden participar 🎮 ', value: participantes },
                        { name: ' ⚒️ Requisitos ⚒️ ', value: requisitos, inline: true },
                    )
                    .setTimestamp()
                    .setFooter({
                        text: "Realizado por : " + interacion.user.username,
                        iconURL: userAvatar
                    });

                // Enviar el mensaje al canal
                canal.send({ embeds: [mensajeEvento] })
                interacion.reply({ content: "Mensaje enviado correctamente.", ephemeral: true })
                    .then(sentMessage => {
                        setTimeout(() => { sentMessage.delete().catch(console.error) }, 10000);
                    })
                    .catch(console.error);

                // Calcula el tiempo hasta la finalización y programa el mensaje final
                const tiempoHastaFin = fechaFin.getTime() - Date.now();
                if (tiempoHastaFin > 0) {
                    setTimeout(() => {
                        canal.send(`EVENTO DE ${pokemon} FINALIZO`);
                    }, tiempoHastaFin);
                }
            } else {
                console.error("Error: La fecha de inicio o la duración no son válidas.");
            }

        } else {
            interacion
                .reply({ content: "El canal con la ID proporcionada no es un canal de texto.", ephemeral: true })
                .then(sentMessage => { setTimeout(() => { sentMessage.delete().catch(console.error) }, 30000); })
                .catch(console.error);
        }

    }
};

// Función auxiliar para convertir duraciones como "1d 1h 30m 45s" a milisegundos
function parseDuration(duracion) {
    const durationRegex = /(?:(\d+)\s*d\s*)?(?:(\d+)\s*h\s*)?(?:(\d+)\s*m\s*)?(?:(\d+)\s*s\s*)?/;
    const match = duracion.match(durationRegex);
    if (!match) return NaN;

    const days = parseInt(match[1]) || 0;
    const hours = parseInt(match[2]) || 0;
    const minutes = parseInt(match[3]) || 0;
    const seconds = parseInt(match[4]) || 0;

    return (days * 24 * 60 * 60 * 1000) + (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
}
