const connection = require('../database/connection');

module.exports = {

    async index(request,response){
        const { page = 1 } = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs','ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page -1 ) * 5)     //trazer sempre 5 casos
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email', 
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf']);

        response.header('X-Total-Count',count['count(*)']); //passa a quantia total de registros pelo header

        return response.json(incidents);
    },


    async create(request,response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;       //pega info o header da aplication

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,

            /*com o id indicado como nome, automaticamente será retornado 
            esse ID através do metodo Return, um ID gerado automativametne*/

        });

        return response.json({ id });

    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();   //para retornar o primeiro caso encontrado, que nessa situação é unico

        if(incidents.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }

        await connection('incidents').where('id',id).delete();

        return response.status(204).send();

    }
};