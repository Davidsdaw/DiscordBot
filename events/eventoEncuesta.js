let hanVotado= new Set();

module.exports = async (interaction) =>{
    if(!interaction.isButton() ||  !interaction.customId) return;

    try{
        let btn=interaction.customId

        await interaction.deferReplay({ephermeral: true});
        if (!hanVotado.has(interaction.user.id)) {
            if(btn=='opcion1'){
                
            }
        }
    }catch{
        console.log(`Error en eventoEncuesta.js ${error}`)
    }
}