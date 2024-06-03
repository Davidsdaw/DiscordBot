//Dependencias
const Discord = require("discord.js")

//Cliente de discord
const Client = new Discord.Client({
    intents: 3276799,
})

//Contenido (events)
Client.on("ready", async(client) => {
    console.log("Ando ready")
})

//Conexion
Client.login("MTI0NzMyMDk3Mzk0NjkxMjc3MA.GsN0Ix.URKCn9VSbSuIhwQjAsHDVksSc3iaYVFPY9RC_o")