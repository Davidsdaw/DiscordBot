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


const eventoEncuesta= require('./events/eventoEncuesta');

//Eventos de comandos 
Client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = Client.commands.get(interaction.commandName);
        if (command) {
            try {
                await command.execute(interaction, Client);
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'Hubo un error ejecutando el comando.', ephemeral: true });
            }
        }
    } else if (interaction.isButton()) {
        // Aquí es donde manejarías las interacciones de los botones
        await eventoEncuesta.execute(interaction);
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
Client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.cache.find(ch => ch.id === config.gbId);
    if (!channel) return;
    const embed = new Discord.EmbedBuilder()
        .setTitle('¡Hasta Luego!')
        .setDescription(`¡Adiós ${member.displayName}! Sentiremos tu ausencia. Esperamos verte de nuevo pronto.`)
        .setColor(0xe74c3c)
        .setThumbnail('https://www.shutterstock.com/image-vector/farewell-goodbye-vector-illustration-speech-260nw-1677893592.jpg')
        .addFields(
            { name: 'Nos Vemos', value: 'Esperamos que hayas disfrutado tu tiempo aquí.' },
            { name: 'Roles', value: 'Tu contribución siempre será recordada.' },
            { name: 'ID del Usuario', value: `${member.id}`, inline: true },
            { name: 'Roles del Usuario', value: `${member.roles.cache.map(role => role.name).join(', ')}`, inline: true }
        )
        .setFooter({ text: `El usuario se unió el ${member.joinedAt.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}` });

    channel.send({ embeds: [embed] });
});


//Conexion
Client.login(process.env.CLIENT_TOKEN)