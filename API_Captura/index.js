import express from 'express';
import cors from 'cors';
import { cadastrarUsuários } from  "./servico/cadastro_servico.js";
import { cadastrarNome, cadastrarEmail, cadastrarTelefone} from "./validacao/valida.js";
import { ValidaUsuario } from './validacao/valida.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/usuarios', async (req, res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;

    const usuarioValido = ValidaUsuario(nome, email, telefone);
    if (usuarioValido.status) {
        await cadastrarUsuários(nome, email, telefone);
        res.status(204).end();
    } else {
        res.status(400).send({mensagem: usuarioValido.mensagem});
    }

    if (!cadastrarNome(nome)) {
        return res.status(400).send('Não foi possível validar seu nome! retorne com pelo menos 2 caracteres.');
    } 
    if (!cadastrarEmail(email)) {
        return res.status(400).send('Não foi possível validar seu email! retorne dessa forma: email@provedor.com');
    } 
    if (!cadastrarTelefone(telefone)) {
        return res.status(400).send('Não foi possível validar seu telefone! retorne dessa forma: (XX) XXXXX-XXXX');
    } 

    try {
        const resultado = await cadastrarUsuários(nome, email, telefone);
        if (resultado.affectedRows > 0) {
            return res.status(201).send('Cadastro registrado com sucesso!');
        } 
        return res.status(400).send('Ocorreu um erro ao cadastrar usuário!');

    } catch (error) {
        console.error("Erro ao cadastrar no banco de dados:", error);
        return res.status(500).send('Erro interno no servidor.');
    }
});


app.listen(9000, async () => {
    const data = new Date();
    console.log('Servidor node iniciado em: ' + data);
})
    
