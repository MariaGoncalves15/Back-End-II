import pool from "./conexao.js";

export async function cadastrarUsuários(nome, email, telefone) {
    const conexao = await pool.getConnection();
    const query = 'INSERT INTO usuarios (nome, email, telefone) VALUES (?, ?, ?)';
    const [resposta] = await conexao.execute(query, [nome, email, telefone]);
    console.log(resposta);
    conexao.release();
    return resposta;
};