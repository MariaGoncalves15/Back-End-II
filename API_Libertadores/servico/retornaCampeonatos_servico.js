import pool from "./conexao.js";

export async function retornaCampeonatos() {
    const conexao = await pool.getConnection();
    const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano from campeonatos');
    const campeonatos = campeonatos_tb[0];
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosPorId(id) {
    const conexao = await pool.getConnection();
    const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano from campeonatos WHERE id ='+id);
    const campeonatos = campeonatos_tb[0];
    conexao.release();
    return campeonatos;
}

export async function retornacampeonatosPorAno(ano) {
    const conexao = await pool.getConnection();
    const campeonatos_tb = await conexao.query(
    'SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = '+ano);
    const campeonatos = campeonatos_tb[0];
    conexao.release();
    return campeonatos;
}

export  async function retornaCampeonatosPorTime(time) {
    const conexao = await pool.getConnection();
    const campeonatos_tb = await conexao.query(
    'SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao = "' + time + '"');
    const campeonatos = campeonatos_tb[0];
    conexao.release();
    return campeonatos;
}