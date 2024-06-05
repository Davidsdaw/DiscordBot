const Discord = require('discord.js');
const votos = require('./votos');


let colores = {
    opcion1: '#5865F2',
    opcion2: '#248046',
    opcion3: '#DA373C',
    opcion4: '#4E5058',
}

module.exports.actualizarPorcentaje = async function(embed){
   
    // Calcular el total de votos y el porcentaje de votos para cada opción
    let totalVotos = votos['opcion1']+votos['opcion2']+votos['opcion3']+votos['opcion4'];
    let porcentaje1 = totalVotos !== 0 ? Math.round(votos['opcion1'] / totalVotos * 100) : 0;
    let porcentaje2 = totalVotos !== 0 ? Math.round(votos['opcion2'] / totalVotos * 100) : 0;
    let porcentaje3 = totalVotos !== 0 ? Math.round(votos['opcion3'] / totalVotos * 100) : 0;
    let porcentaje4 = totalVotos !== 0 ? Math.round(votos['opcion4'] / totalVotos * 100) : 0;

    // Crear la barra de progreso total
    let totalBloques = 25;
    let bloquesLlenos1 = Math.round(porcentaje1 / 100 * totalBloques);
    let bloquesLlenos2 = Math.round(porcentaje2 / 100 * totalBloques);
    let bloquesLlenos3 = Math.round(porcentaje3 / 100 * totalBloques);
    let bloquesLlenos4 = Math.round(porcentaje4 / 100 * totalBloques);
    let bloquesVacios = totalBloques - bloquesLlenos1 - bloquesLlenos2 - bloquesLlenos3 - bloquesLlenos4;

    let barraProgresoTotal = '🔵'.repeat(bloquesLlenos1) + '🟢'.repeat(bloquesLlenos2) + 
    '🔴'.repeat(bloquesLlenos3) + '⚫'.repeat(bloquesLlenos4) + '⬜'.repeat(bloquesVacios);
    // Añadir la barra de progreso total al embed
    embed.addFields({name: 'Votos',value:  `${barraProgresoTotal} `});
    console.log(`${barraProgresoTotal} ${totalVotos}%`)

    return embed, barraProgresoTotal;
   
}



