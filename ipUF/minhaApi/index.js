const express = require('express');
const colecaoTheBests = require('express');

const app = express();

app.get('/theBests', (req, res) => {
    res.json(colecaoTheBests.colecaoTheBests);
});

app.get()