const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());    //mostra que as respostas vão usar JSON
app.use(routes);
app.use(errors());          //tratamento de erros

module.exports = app;

