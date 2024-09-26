const express = require('express');
const colecaoUf = require('./dados/dados');

const app = express();

app.get('/ufs', (req, res) => {
    res.json(colecaoUf.colecaoUf)
});

app.listen(8080, () => {
    console.log('Servidor Iniciado na porta 8080');
});