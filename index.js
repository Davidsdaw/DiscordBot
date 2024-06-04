//Dependencias
require('dotenv').config();
const Discord = require("discord.js")
const fs = require("fs")
const config = require("./config.json")

//Cliente de discord
const Client = new Discord.Client({
    intents: 3276799,
})

//Cargar comandos
Client.commands = new Discord.Collection();

fs.readdirSync("./slash_commands").forEach((commandfile) => {
    const command = require(`./slash_commands/${commandfile}`);
    Client.commands.set(command.data.name, command);
});

//Registrar comandos
const REST = new Discord.REST().setToken(process.env.CLIENT_TOKEN);
(async () => {
    try {
        await REST.put(
            Discord.Routes.applicationGuildCommands(config.clientId, config.serverId),
            {
                body: Client.commands.map((cmd) => cmd.data.toJSON()),
            }
        );
        console.log(`Han cargado ${Client.commands.size} comandos {/}`)

    } catch (error){
        console.log(`Error al cargar los comandos {/}`)
    }
})();


//Contenido (events)
Client.on("ready", async() => {
    console.log("Ando ready")
})

//Eventos de comandos 
Client.on('interactionCreate', async (interaction) => {
    if (interaction.isChatInputCommand()) {
        const command = Client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction, Client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Hubo un error ejecutando el comando.', ephemeral: true });
            }
        }
    }
});


Client.on('guildMemberAdd', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === config.welcomeId);
    if (!channel) return;
    const embed = new Discord.EmbedBuilder()
        .setTitle('¡Bienvenido a Nuestro Servidor!')
        .setDescription(`¡Hola ${member} ! Estamos emocionados de tenerte aquí. Asegúrate de leer las reglas y presentarte en el canal #presentaciones.`)
        .setColor(0x2ecc71)
        .setThumbnail('https://www.shutterstock.com/image-vector/spanish-language-vector-template-welcome-600nw-1792430023.jpg')
        .addFields(
            { name: 'Reglas del Servidor', value: 'Puedes encontrar nuestras reglas en el canal #reglas.' },
            { name: 'Canales Importantes', value: '#anuncios, #general, #soporte' },
            { name: 'Roles', value: '¡Reacciona en el canal #roles para obtener roles adicionales!' },
            { name: 'ID', value: `${member.id}`,inline:true},
            { name: 'IDXD', value: `${member.roles}`,inline:true }
        )
        .setFooter(
            { text: `El usuario de unio el ${member.joinedAt.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}` }
        )
        
    channel.send({ embeds: [embed] });
});

//EVENTO PARA CUANDO SE SALE
// Client.on('guildMemberAdd', member => {
//     const channel = member.guild.channels.cache.find(ch => ch.id === config.gbId);
//     if (!channel) return;
//     channel.send(`¡Hola ${member}, bienvenido a nuestro servidor de Discord!`);
// });


//Conexion
Client.login(process.env.CLIENT_TOKEN)