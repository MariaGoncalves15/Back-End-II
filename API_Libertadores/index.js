import express from 'express';
import pool from './servico/conexao.js';
import { retornaCampeonatos, retornaCampeonatosPorId } from './servico/retornaCampeonatos_servico.js';

const app = express();

app.get('/campeonatos', async (req, res) => {
    const campeonatos = await retornaCampeonatos();
    res.json(campeonatos);
})

app.get('/campeonatos/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const campeonato = await retornaCampeonatosPorId(id);
    res.json(campeonato);
})

app.listen(9000, async () => {
    const data = new Date();
    console.log("Servidor node iniciado em: "+data)

    /*const conexao = await pool.getConnection();
    
    console.log(conexao.threadId);

    conexao.release();*/
})

    