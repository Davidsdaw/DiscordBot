const Discord = require("discord.js")

module.exports = {
    data: new Discord.SlashCommandBuilder()
    .setName('miembro')
    .setDescription('muestra informacion del miembro')
    .addUserOption(option=>option.setName('usuario').setDescription('usuario del server')),

    async execute(mensaje){
        const usuario=mensaje.options.getUser('usuario')
        const member= await mensaje.guild.members.fetch(usuario.id)
        
        if(!member) return mensaje.reply('usuario no valido');

        const avatar=member.user.displayAvatarURL({size: 512})
        const embed=new Discord.EmbedBuilder()
            .setColor('Blurple')
            .setTitle(`Avatar de ${member.user.displayName}`)
            .setImage(avatar)
            .setFooter({ text: `El usuario de unio el ${member.joinedAt.toLocaleString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}`});
        
        mensaje.reply({embeds: [embed]})
        console.log(embed)
    }
}