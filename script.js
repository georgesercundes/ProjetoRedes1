//Variáveis Globais

/*Array contendo as posições em que um jogador seria consagrado vencedor*/
const posicoesGanharJogo = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
/*Array contendo as casas do tabuleiro*/
const casas = Array.from(document.getElementsByClassName("casa"));
/*Símbolo para o Jogador*/
const jogador = "X";
/*Sìmbolo para a "IA" do jogo*/
const computador = "O";

/*Chamada para a função que irá inicializar o tabuleiro*/
ativarEventListeners();

/*Funções para ativar e remover a opção de receber um clique nas casas do jogo*/
function ativarEventListeners () {
    casas.forEach(casa => casa.addEventListener("click", clique));
} 

function desativarEventListener (){
    casas.forEach(casa => casa.removeEventListener("click", clique));
}

/*Função para executar a jogada após o clique se o elemento HTML da casa clicada estiver vazia*/
function clique(event){
    const target = event.target;
    if(target.innerHTML == ""){
        turnoJogador(idToNumber(target), jogador);
        //Se o jogador não for o ganhador, passa a jogada para a "IA" jogar.
        if(!temosUmGanhador() && !empate()){
            turnoOponente(); 
        }          
    }
}

/*Insere o símbolo na casa do tabuleiro usando o indíce e o símbolo passados como parâmetros*/
function turnoJogador (indice, letra){
    casas[indice].innerHTML = letra;
}

/*Função para executar a jogada da "IA"*/
function turnoOponente (){
    //Desativa a opção de receber clique nas casas para o jogador não clicar enquanto a "IA" está jogando
    desativarEventListener();
    //Executar a função após a espera de meio segundo
    window.setTimeout(function(){
        turnoJogador(escolhaDoOponente(), computador)
        //Se o computador não for o ganhador, ativa novamente a opção de clique nas casas para a próxima jogada do jogador
        if(!temosUmGanhador() && !empate()){
            ativarEventListeners();
        }        
    }, 500);
}
/*Função que faz a escolha de qual casa a "IA" vai jogar*/
function escolhaDoOponente(){
    //Faz uma escolha randômica entre as casas vazias do tabuleiro
    let resultado = idToNumber (casasVazias()[Math.floor(Math.random() * casasVazias().length)]);
    /*Verifica dentre todas as combinações que ganhariam o jogo se está faltando apenas uma casa para completar e escolhe,
    o índice dessa posição. Primeiro verifica as posições que o computador seria ganhador e depois verifica as que o 
    jogador seria ganhador, tentando assim terminar o jogo ou impedir o jogador de o fazer*/
    posicoesGanharJogo.forEach (combinacao => {
        const casasLocal = casas;
        const sequencia = [casasLocal[combinacao[0]],casasLocal[combinacao[1]], casasLocal[combinacao[2]]];
        const casasVaziasSequencia = sequencia.filter(casa => casa.innerHTML == "");
        const casasOcupadasSequencia = sequencia.filter(casa => casa.innerHTML != "");
        if(casasVaziasSequencia.length == 1 && casasOcupadasSequencia.every(casa => casa.innerHTML == computador)){
            resultado = idToNumber(casasVaziasSequencia[0]);
        }
            
        if(casasVaziasSequencia.length == 1 && casasOcupadasSequencia.every(casa => casa.innerHTML == jogador)){
            resultado = idToNumber(casasVaziasSequencia[0]);
        }
    })
    return resultado;
}
/*Função que verifica se há um ganhador no jogo*/
function temosUmGanhador(){
    let vitoria = false;
    //Verifica dentre todas as combinações que ganhariam o jogo, se alguma possui todos elementos HTML com o mesmo símbolo
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
/*Função que verifica o empate do jogo*/
function empate(){
    if(casasVazias().length == 0){
        //Retorna true se for clicado em OK e false se for clicado em cancelar
        const confirma = window.confirm("Empate! Clique para jogar novamente");
        if(confirma){
            limparTela();
        }
        return true;
    }
    return false;
}
/*Função para declarar o fim do jogo*/
function fimDoJogo (sequenciaGanhadora){
    sequenciaGanhadora.forEach(casa => casa.setAttribute("Style", "Color: Red"));
    desativarEventListener();
    var confirma;
    //Verifica quem ganhou o jogo e recomeça o jogo se for clicado em OK
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

/*Remove o nome "casa" da id do elemento HTML passado como parâmetro e transforma a string contendo o número da casa 
em um inteiro para ser usado como índice posteriormente*/
function idToNumber (elemento){
    return Number.parseInt(elemento.id.replace("casa", ""));
}
/*Retorna um array contendo todas as casas do tabuleiro que estão vazias*/
function casasVazias(){
    return casas.filter(casa => casa.innerHTML == "");
}
/*Remove as jogadas das casas do tabuleiro*/
function limparTela (){
    casas.forEach(casa => casa.innerHTML = "");
}
/*Retorna um booleano se todos os elementos HTML do array passado como parâmetro possuem o mesmo símbolo nas casas (X ou O) 
e se não forem casas vazias*/
function iguais (array){
    return array.every(casa => casa.innerHTML == array[0].innerHTML && casa.innerHTML != "");
}