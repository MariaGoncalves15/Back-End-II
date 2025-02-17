import cors from 'cors';
import express from 'express';
import { retornaCampeonatos, retornaCampeonatosPorId, retornacampeonatosPorAno, retornaCampeonatosPorTime} from './servico/retornaCampeonatos_servico.js';
import { cadastrarCampeonato } from './servico/cadastroCampeonato_servico.js';
import { atualizaCampeonatoParcial, atualizarCampeonato } from './servico/atualizaCampeonato_servico.js';
import { deletaCampeonato } from './servico/deletaCampeonatos_servico.js';

const app = express();
app.use(cors());
app.use(express.json()); //Suport para JSON no corpo da requisição   *Para usar no projeto de Front end: para ter o cors =>   npm install cors depois disso, importar o cors import cors from 'cors' e dps colocar o app.use(cors()); //

app.delete('/campeonatos/:id', async (req, res) => {
    const {id} = req.params;
    const resultado = await deletaCampeonato(id);
     if (resultado.affectedRows > 0) {
        res.status(202).send('Registro deletado com sucesso!');
     } else {
        res.status(404).send('Registro não encontrado!');
     }
})

app.patch('/campeonatos/:id', async (req, res) => { 
    const {id} = req.params; //desestruturação
    const {campeao, vice, ano} = req.body; //desestruturação o id como parametro

    const camposAtualizar = {};
    if (campeao) camposAtualizar.campeao = campeao;
    if (vice) camposAtualizar.vice = vice;
    if (ano) camposAtualizar.ano = ano;

    if (Object.keys (camposAtualizar).length === 0) {
        res.status(400).send('Nenhum campo válido foi preenchido para a atualização!')
    } else {
        const resultado = await atualizaCampeonatoParcial(id, camposAtualizar)
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso')
            
        } else {
            res.status(400).send('Registro não encontrado')
        }
    }
})

app.put('/campeonatos/:id', async (req, res) => {
    const {id} = req.params; //desconstrução
    const {campeao, vice, ano} = req.body; //desconstrução

    if (campeao == undefined || vice == undefined || ano == undefined) {
        res.status(400).send('Todos os campos precisam ser definidos!')
    } else {
        const resultado = await atualizarCampeonato(id, campeao, vice, ano);
        if (resultado.affectedRows > 0) {
            res.status(202).send('Registro atualizado com sucesso')
        } else {
            res.status(400).send('Registro não encontrado!')
        }
    }
})

app.post('/campeonatos', async (req, res) => {
    const campeao = req.body.campeao;
    const vice = req.body.vice;
    const ano = req.body.ano;

    await cadastrarCampeonato(campeao, vice, ano);
    res.status(204).send({"Mensagem": "Cadastro efetivo com sucesso!"});
    
})

app.get('/campeonatos', async (req, res) => {
    let campeonatos;

    const ano = req.query.ano;
    const time = req.query.time;

    if (typeof ano === 'undefined' && typeof time === 'undefined') {
        campeonatos = await retornaCampeonatos();
    }
    else if (typeof ano !== 'undefined' ){
        campeonatos = await retornacampeonatosPorAno(ano);
    } 
    else if (typeof time !== 'undefined' ){
        campeonatos = await retornaCampeonatosPorTime(time);
    }    

    if (campeonatos.length > 0) {
        res.json(campeonatos);
    } else {
        res.status(404).json({ mensagem: "Nenhum campeonato encontrado"});
    }
});

app.get('/campeonatos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const campeonato = await retornaCampeonatosPorId(id);
    if (campeonato.length > 0) {
        res.json(campeonato);
    } else {
        res.status(404).json({mensagem: "Nenhum campeonato encontrado"});
    }
});

app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em: "+data)

    /*const conexao = await pool.getConnection();
    
    console.log(conexao.threadId);

    conexao.release();*/
});

    