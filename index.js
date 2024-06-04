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
Client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand()){
        const command = Client.commands.get(interaction.commandName);
        command.execute(interaction).catch(console.error);
    }
})

//Conexion
Client.login(process.env.CLIENT_TOKEN)