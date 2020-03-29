const crypto = require('crypto');

module.exports = function generateUniqueId(){
    return crypto.randomBytes(4).toString('HEX');   //criando um id com recurso q gera 4 bytes aleatorios e converte para string e hexadecimal
}