const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () =>{
    beforeEach(async () => {
        await connection.migrate.rollback();    //desfaz as mudanças anteriores
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
        .post('/ongs')
        //.set('authorization':"fbd71e4b") para testes com o authorizarion
        .send({
            name:"APAD3",
	        email:"contato@gmail.com",
	        whatsapp:"11912345678",
	        city:"Rio Grande do Sul",
	        uf:"SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);

    });
});