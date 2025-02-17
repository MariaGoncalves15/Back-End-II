import express from 'express';
import cors from 'cors';
import { cadastrarUsuários } from  "./servico/cadastrarUsuários_servico.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post('/usuários', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    await cadastrarUsuários(nome, email, telefone);
    res.status(204).send({"Mensagem": "Cadastro efetivo com sucesso!"});
    
})

// app.get('/campeonatos', async (req, res) => {
//     let campeonatos;

//     const ano = req.query.ano;
//     const time = req.query.time;

//     if (typeof ano === 'undefined' && typeof time === 'undefined') {
//         campeonatos = await retornaCampeonatos();
//     }
//     else if (typeof ano !== 'undefined' ){
//         campeonatos = await retornacampeonatosPorAno(ano);
//     } 
//     else if (typeof time !== 'undefined' ){
//         campeonatos = await retornaCampeonatosPorTime(time);
//     }    

//     if (campeonatos.length > 0) {
//         res.json(campeonatos);
//     } else {
//         res.status(404).json({ mensagem: "Nenhum campeonato encontrado"});
//     }
// });

// app.get('/campeonatos/:id', async (req, res) => {
//     const id = parseInt(req.params.id);
//     const campeonato = await retornaCampeonatosPorId(id);
//     if (campeonato.length > 0) {
//         res.json(campeonato);
//     } else {
//         res.status(404).json({mensagem: "Nenhum campeonato encontrado"});
//     }
// });

// app.listen(9000, async () => {
//     const data = new Date();
//     console.log("Servidor node iniciado em: "+data)
// });