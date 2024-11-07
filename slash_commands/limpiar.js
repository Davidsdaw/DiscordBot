const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('purge')
        .setDescription('🗑️ Gestión avanzada de limpieza de mensajes')
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Cantidad de mensajes a eliminar (1-99)')
                .setRequired(true))
        .addStringOption(option => 
            option.setName('reason')
                .setDescription('Razón de la limpieza (para el registro)')
                .setRequired(false)),

    async execute(interaction) {
        try {
            // Verificación de permisos
            if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#FF0000')
                            .setTitle('⛔ Acceso Denegado')
                            .setDescription('```diff\n- No tienes permisos para usar este comando\n```')
                            .setFooter({ text: 'Se requiere: Gestionar Mensajes' })
                    ],
                    ephemeral: true
                });
            }

            const amount = interaction.options.getInteger('amount');
            const reason = interaction.options.getString('reason') || 'No especificada';

            // Validación de cantidad
            if (amount < 1 || amount > 99) {
                return await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#FF7F50')
                            .setTitle('⚠️ Error de Validación')
                            .setDescription('```La cantidad debe estar entre 1 y 99 mensajes```')
                    ],
                    ephemeral: true
                });
            }

            // Obtener y filtrar mensajes
            let messages = await interaction.channel.messages.fetch({ limit: amount });

            // Eliminar mensajes
            const deleted = await interaction.channel.bulkDelete(messages, true);

            // Crear log detallado
            const logEmbed = new Discord.EmbedBuilder()
                .setColor('#00FF00')
                .setTitle('🧹 Limpieza Completada')
                .setDescription(`
                    **Detalles de la operación:**
                    
                    📊 Mensajes eliminados: ${deleted.size}
                    📝 Razón: ${reason}
                    ⏰ Tiempo: ${new Date().toLocaleString()}
                    
                `)
                .addFields(
                    { name: '🎯 Canal', value: `${interaction.channel}`, inline: true },
                    { name: '👤 Moderador', value: `${interaction.user}`, inline: true }
                )
                .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
                .setTimestamp();

            // Enviar mensaje de confirmación
            await interaction.reply({
                embeds: [logEmbed],
                ephemeral: true
            });


        } catch (error) {
            console.error('[ERROR]', error);
            
            // Si aún no se ha respondido a la interacción
            if (!interaction.replied && !interaction.deferred) {
                await interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor('#FF0000')
                            .setTitle('❌ Error')
                            .setDescription('Ha ocurrido un error al ejecutar el comando.')
                    ],
                    ephemeral: true
                });
            }
        }
    }
};
