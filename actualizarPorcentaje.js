const Discord = require('discord.js');
const votos = require('./votos');


let colores = {
    opcion1: '#5865F2',
    opcion2: '#248046',
    opcion3: '#DA373C',
    opcion4: '#8A2BE2',
}
let cont = true;
module.exports.actualizarPorcentaje = async function(embed){
   
    // Calcular el total de votos y el porcentaje de votos para cada opción
    let totalVotos = votos['opcion1']+votos['opcion2']+votos['opcion3']+votos['opcion4'];
    let porcentaje1 = totalVotos !== 0 ? (votos['opcion1'] * 100 / totalVotos ) : 0;
    let porcentaje2 = totalVotos !== 0 ? (votos['opcion2'] * 100 / totalVotos ) : 0;
    let porcentaje3 = totalVotos !== 0 ? (votos['opcion3'] * 100 / totalVotos ) : 0;
    let porcentaje4 = totalVotos !== 0 ? (votos['opcion4'] * 100 / totalVotos ) : 0;

    // Crear la barra de progreso total
    let totalBloques = 24;
    let bloquesLlenos1 = Math.floor((porcentaje1 * totalBloques)/ 100 );
    let bloquesLlenos2 = Math.floor((porcentaje2 * totalBloques)/ 100 );
    let bloquesLlenos3 = Math.floor((porcentaje3 * totalBloques)/ 100 );
    let bloquesLlenos4 = Math.floor((porcentaje4 * totalBloques)/ 100 );
    let bloquesLlenos=bloquesLlenos1 + bloquesLlenos2 + bloquesLlenos3 + bloquesLlenos4;
    let bloquesVacios = totalBloques - bloquesLlenos;


    const compararVotos = (b1,b2,b3,b4) =>{
        let bloques= [b1, b2, b3 ,b4];
        bloques.sort();
        bloques.reverse();
        let a1= bloques[0];
        for (const i of bloques) {
            if(a1!=i && i>0)
                return false;
        }
        return true;
    }


    let bloques= [bloquesLlenos1, bloquesLlenos2, bloquesLlenos3, bloquesLlenos4];
    if(bloquesVacios>0){
        if(compararVotos(bloquesLlenos1, bloquesLlenos2, bloquesLlenos3, bloquesLlenos4)){
            for (let i=0; i<bloques.length; i++) {
                if(bloques[i]>0)
                    bloques[i]++;
            }
            
        } else {
            // Encontrar los bloques con más votos
            let maxVotos = Math.max(...bloques);
            let indicesBloquesMasVotos = [];
            for (let i = 0; i < bloques.length; i++) {
                if (bloques[i] === maxVotos) {
                    indicesBloquesMasVotos.push(i);
                }
            }
        
            // Determinar cuántos bloques se pueden agregar a cada bloque con más votos sin exceder 24
            let bloquesDisponibles = totalBloques - bloquesLlenos; // Suma total de bloques ya asignados
            let bloquesParaAgregarPorBloque = Math.floor(bloquesVacios / indicesBloquesMasVotos.length);
        
            // Agregar los bloques a cada bloque con más votos
            for (let indice of indicesBloquesMasVotos) {
                bloques[indice] += bloquesParaAgregarPorBloque;
                bloquesVacios -= bloquesParaAgregarPorBloque;
            }
        }
        
        
        bloquesVacios=0;
    }
    
  
    if(totalVotos==0)
        bloquesVacios=totalBloques;

    let barraProgresoTotal = '🔵'.repeat(bloques[0]) + '🟢'.repeat(bloques[1]) + 
    '🔴'.repeat(bloques[2]) + '🟣'.repeat(bloques[3]) + '⚪'.repeat(bloquesVacios);

    // Añadir la barra de progreso total al embed
    if(cont==true){
        embed.addFields({name: 'Votos',value:  `${barraProgresoTotal} `});
        embed.addFields({name: 'Porcentajes',value:  `${porcentaje1.toFixed(1)}% ${porcentaje2.toFixed(1)}% ${porcentaje3.toFixed(1)}% ${porcentaje4.toFixed(1)}%`});
        cont=false;
    }else{
        const indiceCampo = embed.data.fields.findIndex(field => field.name === 'Votos');
        embed.spliceFields(indiceCampo, 1, { name: 'Votos', value: `${barraProgresoTotal}` });   
        embed.spliceFields((indiceCampo+1), 1, {name: 'Porcentajes',value:  `${porcentaje1.toFixed(1)}% ${porcentaje2.toFixed(1)}% ${porcentaje3.toFixed(1)}% ${porcentaje4.toFixed(1)}%`});       
    }
    console.log(`${barraProgresoTotal}`)
    return embed;
   
}



