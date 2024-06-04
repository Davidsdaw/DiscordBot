const Discord = require("discord.js")
const { execute } = require("./ping")

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName("di")
    .setDescription("El bot dirá lo que quieras")
    .addStringOption((opcion) => 
        opcion
            .setName("mensaje")
            .setDescription("Mensaje que dirá el bot")
            .setMinLength(3)
            .setMaxLength(2000)
            .setRequired(true)
        )
    .addStringOption((opcion2) => 
        opcion2
            .setName("idcanal")
            .setDescription("Id del canal que deseas poner mensaje")
            .setRequired(true)
    ),
        execute: async (interacion) => {
            const texto = interacion.options.getString("mensaje");
            const canalId = interacion.options.getString("idcanal")
            const canal = interacion.guild.channels.cache.get(canalId);

            if (canal) { 
                if(canal.type ==0){
                        // Enviar el mensaje al canal
                    canal.send(texto)
                    .then(() => interacion.reply("Mensaje enviado al canal correctamente."))
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

