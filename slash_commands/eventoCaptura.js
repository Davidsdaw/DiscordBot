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
            const descripcion = interacion.options.getString("descripcion")
            const premios = interacion.options.getString("premios")
            const empieza = interacion.options.getString("empieza")
            const duracion = interacion.options.getString("duracion")
            const host = interacion.options.getString("host")
            const participantes = interacion.options.getString("participantes")
            const requisitos = interacion.options.getString("requisitos")
            const acabar = interacion.options.getString("acabar")
            const canal = interacion.guild.channels.cache.get(canalId);
            const userAvatar = interacion.user.displayAvatarURL({ dynamic: true });

            let premiosArray = premios.split(",");
            let premioFormato="";

            for (let i = 0; i < premiosArray.length; i++) {
                if((i+1)==premiosArray.length){
                   premioFormato+=premiosArray[i]
                }else 
                premioFormato+=premiosArray[i]+" \n"
                
            }
            

                if(canal.type ==0){

                    const mensajeEvento = new Discord.EmbedBuilder()
                    .setColor(0x674EA7)
                    .setTitle("🍺¡ Evento **Captura** !🍺")

                    .setDescription(descripcion)
                    .setThumbnail(userAvatar)
                    .addFields(
                        { name: '\u200B', value: '\u200B' },
                        { name: ' 💰 Premios 💰 ', value: premioFormato},
                        { name: '\u200B', value: '\u200B' },
                        { name: ' 🗺️ Al acabar 🗺️ ', value: acabar,inline: true },
                        { name: '\u200B', value: '\u200B' },
                        { name: ' EMPIEZA 🕛 ', value: empieza, inline: true },
                        { name: ' DURACION ⏲️ ', value: duracion, inline: true },
                        { name: ' HOST 🤖 ', value: host, inline: true },
                        { name: '\u200B', value: '\u200B' },
                    )
                    .setImage("https://www.gifsanimados.org/data/media/562/linea-imagen-animada-0538.gif")
                    .addFields(
                        { name: ' 🎮 Pueden participar 🎮 ', value: participantes },
                        { name: ' ⚒️ Requisitos ⚒️ ', value: requisitos, inline: true  },
                    )
                    .setTimestamp()
                    .setFooter({
                        text: "Realizado por : "+ interacion.user.username ,
                        iconURL: userAvatar
                    });

                        // Enviar el mensaje al canal
                    canal.send({embeds: [mensajeEvento]})
                    interacion.reply({ content: "Mensaje enviado correctamente.", ephemeral: true })
                    .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 10000)})
                    .catch(console.error);
                }else{
                    interacion
                    .reply({ content: "El canal con la ID proporcionada no es un canal de texto.", ephemeral: true })
                    .then(sentMessage => {setTimeout(() => {sentMessage.delete().catch(console.error)}, 30000)})
                    .catch(console.error);
                }
                
            }
                
            }
        
;
