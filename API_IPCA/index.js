import express from 'express';
import historicoInflacao from './dados/dados.js';
import { buscarDadosPorAno, historicoIPCA } from './servicos/servico.js';

const app = express();

app.get('/historicoIPCA/calculo', (req, res) => {
  console.log('Rota de cálculo chamada com parâmetros:', req.query);

  const valorInicial = parseFloat(req.query.valor);
  const mesInicial = parseInt(req.query.mesInicial);
  const anoInicial = parseInt(req.query.anoInicial);
  const mesFinal = parseInt(req.query.mesFinal);
  const anoFinal = parseInt(req.query.anoFinal);


  if (
    isNaN(valorInicial) || isNaN(mesInicial) || isNaN(anoInicial) ||
    isNaN(mesFinal) || isNaN(anoFinal) ||
    mesInicial < 1 || mesInicial > 12 || mesFinal < 1 || mesFinal > 12 ||
    anoInicial > anoFinal || anoFinal > 2024||
    anoFinal > anoFinal || anoInicial < 2015
  ) {
    return res.status(400).json({ error: 'Parâmetros inválidos ou fora do intervalo permitido.' });
  }

  const periodo = historicoInflacao.filter(dado => {
    return (
      (dado.ano > anoInicial || (dado.ano === anoInicial && dado.mes >= mesInicial)) &&
      (dado.ano < anoFinal || (dado.ano === anoFinal && dado.mes <= mesFinal))
    );
  });

  if (periodo.length === 0) {
    return res.status(404).json({ error: 'Nenhum dado encontrado para o período especificado.' });
  }

  let valorReajustado = valorInicial;
  periodo.forEach(dado => {
    valorReajustado *= (1 + dado.ipca / 100);
  });

  res.json({
    valorInicial,
    valorReajustado: valorReajustado.toFixed(2),
  });
});

app.get('/historicoIPCA', (req, res) => {
  const ano = parseInt(req.query.ano);
  const resultado = ano ? buscarDadosPorAno(ano): historicoIPCA();
  if (resultado.length > 0) {
    res.json(resultado);
  } else {
      res.status(404).json({ error: 'Nenhum dado encontrado para este ano específico.' });
  }
});

app.get('/historicoIPCA/:id', (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Seu ID não foi encontrado.' });
  }

  const resultado = historicoInflacao.find(dado => dado.id === id);

  return resultado
    ? res.json(resultado)
    : res.status(404).json({ error: 'Elemento não encontrado.' });
});

app.listen(8080, () => {
    console.log('Servidor Iniciado na porta 8080');
});