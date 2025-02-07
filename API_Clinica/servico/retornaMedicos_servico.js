import pool from "./conexao.js";

export async function retornarTodosOsMedicos(){
    const conexao= await pool.getConnection();
    const query= `SELECT 
    medicos.id,
    medicos.nome,
    medicos.telefone,
    medicos.email,
    especialidades.especialidade 
    FROM 
        medicos
    INNER JOIN 
        especialidades ON especialidades.id = medicos.especialidade
        order by medicos.nome
    `
    const medicos =executaQuery(conexao,query)
    conexao.release()
    return medicos;
}

export async function retornarMedicosPorNome(nome){
    const conexao = await pool.getConnection();
    const query = `SELECT 
    medicos.nome,
    medicos.telefone,
    medicos.email,
    especialidades.especialidade
    FROM 
        medicos
    INNER JOIN 
        especialidades ON especialidades.id = medicos.especialidade
    WHERE 
        medicos.nome like '%${nome}%'
    ORDER BY 
        medicos.nome;
        `
    const medicos= executaQuery(conexao,query)
    conexao.release();
    return medicos 
}

export async function retornarMedicosPorEspecialidade(especialidade){
    const conexao= await pool.getConnection()
    const query=`SELECT 
        medicos.nome,
        medicos.telefone,
        medicos.email,
        especialidades.especialidade
    FROM 
        medicos
    INNER JOIN 
        especialidades ON especialidades.id = medicos.especialidade
    WHERE 
        especialidades.especialidade like '%${especialidade}%'
    ORDER BY 
        medicos.nome;
        `
    const medicos= executaQuery(conexao,query)
    conexao.release();
    return medicos 
    
}

export async function executaQuery(conexao,query){
    const resultado_query= await conexao.query(query)
    const resposta= resultado_query[0]
    return resposta;


}