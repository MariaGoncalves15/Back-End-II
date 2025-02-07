import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '#Mduda14',
    database: 'clinica'
});

export default pool;

