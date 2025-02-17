import pool from "./conexao.js";

export async function deletaCampeonato(id) {
    const conexao = await pool.getConnection();/*Cria a conexão no banco de dados atraves da variavel conexão*/ 
    const query = 'DELETE FROM campeonatos WHERE id = ?';/*linha da pesquisa:query que vai deletar algo em campeonatos*/
    const [resposta] = await conexao.execute(query, [id]);/*executa no banco de dados a resposta da pesquisa:query que queremos, guardando a variavel resposta*/
    console.log(resposta);
    conexao.release();
    return resposta;
}