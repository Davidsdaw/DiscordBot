const Discord = require("discord.js")

module.exports = {
    Data: new Discord.SlashCommandBuilder()
    .setName('miembro')
    .setDescription('muestra informacion del miembro')
    .addUserOption(option=>option.setName('usuario').setDescription('usuario del server')),

    async execute(mensaje){
        const usuario=mensaje.options.getUser('usuario')
        const member= await mensaje.guild.members.fetch(usuario.id)
        
        if(!member) return mensaje.reply('usuario no valido');

        const avatar=member.getUser.displayAvatarURL({size: 512})
        const embed=new Discord.EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`Avatar de ${member.user.displayName}`)
            .setImage(avatar);
        
        mensaje.reply({embeds: [embed]})
        
    }
}