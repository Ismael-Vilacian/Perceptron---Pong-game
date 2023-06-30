class Perceptron {
    pesos = [0, 0];
    lr = 0.1;

    constructor() {
        for (let index = 0; index < this.pesos.length; index++) {
            this.pesos[index] = Math.random() * 2 - 1; // Correção: Math.random() retorna um número entre 0 e 1, então é necessário ajustar o intervalo para -1 a 1
        }
    }

    resposta(entradas) {
        let soma = 0;

        for (let index = 0; index < this.pesos.length; index++) {
            soma += entradas[index] * this.pesos[index];
        }

        return this.ajustarPesos(soma);
    }

    treinamento(entradas, target) {
        const resposta = this.resposta(entradas);
        const erro = target - resposta;

        for (let index = 0; index < this.pesos.length; index++) {
            this.pesos[index] += erro * entradas[index] * this.lr;
        }
    }

    ajustarPesos(resposta) {
        return resposta >= 0 ? 1 : -1;
    }
}
