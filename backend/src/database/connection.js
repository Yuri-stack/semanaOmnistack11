const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development); //criando a conexão de desenvolvimento do BD

module.exports = connection;