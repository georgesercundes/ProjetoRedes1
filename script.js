//Variáveis Globais

const posicoesGanharJogo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
const casas = Array.from(document.getElementsByClassName("casa"));
const jogador = "X";
const computador = "O";

//Inicializar o tabuleiro
ativarEventListeners();

//Funções para ativar e remover a opção de receber um clique nas casas do jogo
function ativarEventListeners () {
    casas.forEach(casa => casa.addEventListener("click", Clique));
} 

function desativarEventeListener (){
    casas.forEach(casa => casa.removeEventListener("click", Clique));
}

//Função para executar a jogada após o clique
function Clique(event){
    const target = event.target;
    console.log(target)
    if(target.innerHTML == ""){
        turnoJogador(idToNumber(target.id), jogador)
        if(!temosUmGanhador() && !empate())
            turnoOponente() // Passa a jogada pro computador
    }
}

function empate(){
    if(casasVazias.length == 0){
        const confirma = window.confirm("Empate! Clique para jogar novamente");
        if(confirma)
            limparTela;
        return true;
    }
    return false;
}

//Funções auxiliares

function idToNumber (id){
    return Number.parseInt(id.replace("casa", ""));
}

function casasVazias(){
    return casas.filter(casa => casa.innerHTML == "");
}

function limparTela (){
    casas.forEach(casa => casa.innerHTML = "");
}

function iguais (array){
    return array.every(casa => casa.innerHTML == array[0].innerHTML && casa.innerHTML != "");
}

function turnoJogador (indice, letra){
    casas[indice].innerHTML = letra;
}