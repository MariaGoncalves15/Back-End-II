import express from 'express';
import { historicoIPCA, buscarDadosPorAno, buscarDadosPorId, calcularValorFornecido } from './servico/servico.js';

const app = express();

app.get('/historicoIPCA', (req, res) => {
    const ano = req.query.busca;/*req=requisição, query=o que vai ser passado para a requisição, busca=*/ 
    const resultado = ano ? buscarDadosPorAno(ano) : historicoIPCA();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({"erro": "Nenhuma ano encontrado"});
    }
});

app.get('/historicoIPCA/:iduf', (req, res) => {
    const ano = buscarUfPorId(req.params.iduf);

    if (ano) {
        res.json(ano);
    }  else if (isNaN(parseInt(req.params.iduf))) {
        res.status(404).send({"erro": "Requisição inválida"});
    }  else {
        res.status(404).send({"Erro": "UF não encontrada" });
    }
});
        
app.listen(8080, () => {
    console.log('Servidor Iniciado na porta 8080');
}); 