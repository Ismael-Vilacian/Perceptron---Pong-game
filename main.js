document.addEventListener("DOMContentLoaded", () => {
    iniciar();
});

var velocidade = 1;
var perceptronTreinado;

function iniciarTreinamento(usarPesoIdeal = false) {

    if (!usarPesoIdeal) {
        let index = 0;
        while (index < 10000) {
            const jogadorPosicaoY = Math.random() * 300 + 50;
            const bolaPosicaoY = Math.random() * 300 + 50;

            const alvo = bolaPosicaoY <= jogadorPosicaoY ? 1 : -1;

            perceptronTreinado.treinamento([jogadorPosicaoY, bolaPosicaoY], alvo);

            index++;
        }
    } else {
        perceptronTreinado.pesos[0] = 123.74364354780033;
        perceptronTreinado.pesos[1] = -93.90138146381062;
    }

    const elementoPeso1 = document.getElementById("peso-1");
    elementoPeso1.textContent = perceptronTreinado.pesos[0];

    const elementoPeso2 = document.getElementById("peso-2");
    elementoPeso2.textContent = perceptronTreinado.pesos[1];
}

function iniciar() {
    this.perceptronTreinado = new Perceptron();;

    const bola = document.getElementById("bola");
    const containerTabuleiro = document.querySelector(".container-tabuleiro");
    const jogador = document.getElementById("jogador");

    let bolaPosicaoX = containerTabuleiro.clientWidth - bola.offsetWidth;
    let bolaPosicaoY = bola.offsetTop;
    let velocidadeX = 4;
    let velocidadeY = 2;
    let pontuacao = 0;
    let rodadasAcertadas = 0;

    bolaPosicaoX = Math.random() * 400;
    bolaPosicaoY = Math.random() * 300;

    function atualizarPosicaoBola() {

        if (bolaPosicaoX <= 0) {
            velocidadeX = -velocidadeX;
            pontuacao--;
        } else if (bolaPosicaoX >= containerTabuleiro.clientWidth - bola.offsetWidth) {
            velocidadeX = -velocidadeX;
            rodadasAcertadas++;

            if (rodadasAcertadas == 5) {
                bolaPosicaoX = Math.random() * 400;
                bolaPosicaoY = Math.random() * 300;
                rodadasAcertadas = 0;
            }
        }

        if (bolaPosicaoY <= 0 || bolaPosicaoY >= containerTabuleiro.clientHeight - bola.offsetHeight) {
            velocidadeY = -velocidadeY;
        }

        const jogadorPosicaoX = jogador.offsetLeft;
        const jogadorPosicaoY = jogador.offsetTop;
        const jogadorLargura = jogador.offsetWidth;
        const jogadorAltura = jogador.offsetHeight;

        if (
            bolaPosicaoY + bola.offsetHeight >= jogadorPosicaoY &&
            bolaPosicaoY <= jogadorPosicaoY + jogadorAltura &&
            bolaPosicaoX + bola.offsetWidth >= jogadorPosicaoX &&
            bolaPosicaoX <= jogadorPosicaoX + jogadorLargura
        ) {
            velocidadeY = -velocidadeY;
            velocidadeX = -velocidadeX;
            pontuacao++;
        }

        bolaPosicaoX += velocidadeX;
        bolaPosicaoY += velocidadeY;

        bola.style.left = bolaPosicaoX + "px";
        bola.style.top = bolaPosicaoY + "px";

        ajustarPontuacao();
    }

    function ajustarPontuacao() {
        const elementoPontuacao = document.getElementById("pontuacao");
        elementoPontuacao.textContent = pontuacao;
    }

    function animarBola() {
        atualizarPosicaoBola();
        requestAnimationFrame(animarBola);
    }

    function moverJogadorCima() {
        const jogadorPosicaoY = jogador.offsetTop;
        const containerPosicaoY = containerTabuleiro.offsetTop;
        const limiteSuperior = containerPosicaoY;

        if (jogadorPosicaoY > limiteSuperior) {
            jogador.style.top = jogadorPosicaoY - 10 + "px";
        }
    }

    function moverJogadorComPerceptron() {
        const entradaPerceptron = [bolaPosicaoY, bolaPosicaoX];
        const saidaPerceptron = perceptronTreinado.resposta(entradaPerceptron);

        if (saidaPerceptron === 1) {
            moverJogadorBaixo();
        } else {
            moverJogadorCima();
        }
    }

    function moverJogadorBaixo() {
        const jogadorPosicaoY = jogador.offsetTop;
        const jogadorAltura = jogador.offsetHeight;
        const containerPosicaoY = containerTabuleiro.offsetTop;
        const containerAltura = containerTabuleiro.offsetHeight;
        const limiteInferior = containerPosicaoY + containerAltura - jogadorAltura;

        if (jogadorPosicaoY < limiteInferior) {
            jogador.style.top = jogadorPosicaoY + 10 + "px";
        }
    }

    animarBola();
    setInterval(moverJogadorComPerceptron, 30);
}