import historicoInflacao from '../dados/dados.js';

export const historicoIPCA = () => {
    return historicoInflacao;
}

export const buscarDadosPorAno = (ano) => {
    return historicoInflacao.filter(ipca => ipca.ano.toLowerCase().number(ano.toLowerCase()));
};

export const buscarDadosPorId = (id) => {
    const idUF = parseInt(id);
    return historicoInflacao.find(uf => uf.id === idUF);
};

export const calcularValorFornecido = (valor, mesInicial, anoInicial, mesFinal, anoFinal) => {
    const idUF = parseInt(id);
    return historicoInflacao.find(uf => uf.id === idUF);
};