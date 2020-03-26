const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {

    //listando
    async index(request, response){
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    
    },

    //gravando
    async create(request, response){
        const { name, email, whatsapp, city, uf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');   //criando um id com recurso q gera 4 bytes aleatorios e converte para string e hexadecimal

        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })

        return response.json({id});
    }
}