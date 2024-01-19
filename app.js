let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = []; //arreglo, vector o array. No queremos volver a jugar con numeros ya sorteados.
let numeroMaximo = 10;

//Función para asignar cualquier texto a cualquier elemento (ya sea título o párrafo) ('h1' o 'p')
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return; //Solo es por buena práctica, si no retorna nada, no es necesario.
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //antes le asignamos un 'id' en html al input
    
    console.log(intentos);
    if(numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else{
        //El usuario no asertó.
        if(numeroDeUsuario > numeroSecreto){

            asignarTextoElemento('p','El número secreto es menor.');
        } else{
            asignarTextoElemento('p','El número secreto es mayor.');
        }
    }
    intentos++;
    limpiarCaja();
}

function limpiarCaja() {
    //Aquí seleccionamos la caja pero con querySelector (nota el numeral) y le damos un valor de "vacío"
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Preguntamos si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles.');
    }else{
    
        //Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            //RECURSIVIDAD. Llamamos otra vez a la función.
            return generarNumeroSecreto();

        } else{
            //Incluimos el número en la lista y retornamos el número aleatorio.
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function condicionesIniciales(){

    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    intentos = 1;
    numeroSecreto = generarNumeroSecreto();
}

function reiniciarJuego(){

    //Debemos limpiar la caja
    limpiarCaja();

    //Indicar mensaje de intervalo de números (1 al 10 por ej)
    //Inicializar el número de intentos
    //Generar el número aleatorio
    condicionesIniciales();
    
    //Deshabilitar el botón de Nuevo Juego (porque solo se habilita cuando ganas)   
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();


