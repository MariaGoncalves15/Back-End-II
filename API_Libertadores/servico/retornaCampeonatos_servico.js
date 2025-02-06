import pool from "./conexao.js";

export async function retornaCampeonatos() {
    const conexao = await pool.getConnection();
    const query = 'SELECT id, campeao, vice ano FROM campeonatos';
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosPorId(id) {
    const conexao = await pool.getConnection();
    const query = ('SELECT id, campeao, vice ano FROM campeonatos'+id);
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export async function retornacampeonatosPorAno(ano) {
    const conexao = await pool.getConnection();
    const query = ('SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = '+ano);
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export  async function retornaCampeonatosPorTime(time) {
    const conexao = await pool.getConnection();
    const query = (
    "SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao like '%" + time + "%'");
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

async function executaQuery(conexao, query) {
    const resultado_query = await conexao.execute(query);
    const resposta = resultado_query[0];
    return resposta;
}