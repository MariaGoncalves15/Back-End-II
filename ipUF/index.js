import express from 'express';
import { buscarUfs, buscarUfPorId, buscarUfsPorNome } from './servico/servico.js';

const app = express();

const buscarUfsPorNome = (nomeUf) => {
    return colecaoUf.filter(uf => uf.nome.toLowerCase().includes(nomeUf.toLowerCase()));

}

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;/*req=requisição, query=o que vai ser passado para a requisição, busca=*/ 
    const resultado = nomeUf ? buscarUfsPorNome(nomeUf) : buscarUfs();
    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({"erro": "Nenhuma UF encontrada"});
    }
});

app.get('/ufs/:iduf', (req, res) => {
    const uf = buscarUfPorId(req.params.iduf);

    if (uf) {
        res.json(uf);
    }  else if (isNaN(parseInt(req.params.iduf))) {
        res.status(404).send({"erro": "Requisição inválida"});
    }  else {
        res.status(404).send({"Erro": "UF não encontrada" });
    }
});
        
app.listen(8080, () => {
    console.log('Servidor Iniciado na porta 8080');
}); 