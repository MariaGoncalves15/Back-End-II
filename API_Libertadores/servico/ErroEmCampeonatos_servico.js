import pool from './conexao.js';

export async function ErroEmCapeonatos(){
    const conexao = await pool.getConnection();
    const query = 
    console.log(resposta);
    conexao.release();
    return campeonatos;
}

export async function ErroEmCampeonatosID(){
    const conexao = await pool.getConnection();
    const query =
    console.log(resposta);
    conexao.release();
    return campeonatos; 
}