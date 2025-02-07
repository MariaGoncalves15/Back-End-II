import express from 'express';
import { retornarTodosOsMedicos, retornarMedicosPorNome, retornarMedicosPorEspecialidade } from './servico/retornaMedicos_servico.js';

const app= express()

app.get('/medicos', async (req, res) => {
    let medicos;
    const nome = req.query.nome;
    const especialidade = req.query.especialidade;

    try {
        if (typeof especialidade === 'undefined' && typeof nome === 'undefined') {
            medicos = await retornarTodosOsMedicos();
        } 
        else if (typeof nome !== 'undefined') {
            medicos = await retornarMedicosPorNome(nome);
        } 
        else if (typeof especialidade !== 'undefined') {
            medicos = await retornarMedicosPorEspecialidade(especialidade);
        }

        if (!medicos || medicos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum médico encontrado." });
        }
        res.json(medicos);

    } catch (erro) {
        console.log("Erro ao buscar médicos:", erro);
        res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
});



app.listen(9000, async()=>{
    const data= new Date()
    console.log("Servidor iniciado em: "+data)

})
