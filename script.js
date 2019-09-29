//Variáveis Globais

const posicoesGanharJogo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
const casas = Array.from(document.getElementsByClassName("casa"));
const jogador = "X";
const computador = "O";

//Inicializar o tabuleiro
ativarEventListeners();

//Funções para ativar e remover a opção de receber um clique nas casas do jogo
function ativarEventListeners () {
    casas.forEach(casa => casa.addEventListener("click", clique));
} 

function desativarEventListener (){
    casas.forEach(casa => casa.removeEventListener("click", clique));
}

//Função para executar a jogada após o clique
function clique(event){
    const target = event.target;
    if(target.innerHTML == ""){
        turnoJogador(idToNumber(target), jogador);
        if(!temosUmGanhador() && !empate()){
            turnoOponente(); // Passa a jogada pro computador
        }
            
    }
}

function turnoOponente (){
    desativarEventListener();
    window.setTimeout(function(){
        turnoJogador(escolhaDoOponente(), computador)
        if(!temosUmGanhador() && !empate()){
            ativarEventListeners();
        }        
    }, 500);
}

function escolhaDoOponente(){
    let resultado = idToNumber (casasVazias()[Math.floor(Math.random() * casasVazias().length)]);
    posicoesGanharJogo.forEach (combinacao => {
        const casasLocal = casas;
        const sequencia = [casasLocal[combinacao[0]],casasLocal[combinacao[1]], casasLocal[combinacao[2]]];
        const casasVaziasSequencia = sequencia.filter(casa => casa.innerHTML == "");
        const casasSobrando = sequencia.filter(casa => casa.innerHTML != "");
        if(casasVaziasSequencia.length == 1 && casasSobrando.every(casa => casa.innerHTML == computador)){
            resultado = idToNumber(casasVaziasSequencia[0]);
        }
            
        if(casasVaziasSequencia.length == 1 && casasSobrando.every(casa => casa.innerHTML == jogador)){
            resultado = idToNumber(casasVaziasSequencia[0]);
        }
           

    })
   
    return resultado;
    
}

function temosUmGanhador(){
    let vitoria = false;
    posicoesGanharJogo.forEach(combinacao =>{
        const casasLocal = casas;
        const sequencia = [casasLocal[combinacao[0]],casasLocal[combinacao[1]], casasLocal[combinacao[2]]];
        if(iguais(sequencia)){
            vitoria = true;
            fimDoJogo(sequencia);
        }
    })
    return vitoria;
} 

function empate(){
    if(casasVazias().length == 0){
        const confirma = window.confirm("Empate! Clique para jogar novamente");
        if(confirma){
            limparTela();
        }
        return true;
    }
    return false;
}

function fimDoJogo (sequenciaGanhadora){
    sequenciaGanhadora.forEach(casa => casa.setAttribute("Style", "Color: Red"));
    desativarEventListener();
    var confirma;
    window.setTimeout(function(){
        if(sequenciaGanhadora[0].innerHTML == jogador){
            confirma = window.confirm ("Você Ganhou o Jogo! Clique para jogar novamente!");
            if(confirma){
                sequenciaGanhadora.forEach(casa => casa.removeAttribute("Style"));
                limparTela();
                ativarEventListeners();
            }
                
        }
        else {
            confirma = window.confirm("Você Perdeu o Jogo! Clique para jogar novamente!");
            if(confirma){
                sequenciaGanhadora.forEach(casa => casa.removeAttribute("Style"));
                limparTela();
                ativarEventListeners();
            }
        }
    }, 500);

}

//Funções auxiliares

function idToNumber (elemento){
    return Number.parseInt(elemento.id.replace("casa", ""));
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