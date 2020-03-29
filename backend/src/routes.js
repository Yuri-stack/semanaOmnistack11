const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); 

routes.get('/ongs', OngController.index);   //Listando as ONGs

routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    }),

}) ,OngController.create); //Validando com o Celebrate e Gravando as ONGs 

routes.get('/profile', celebrate({

    [Segments.HEADERS]:Joi.object({
        Authorization: Joi.string().required(),
    }).unknown(),

}) ,ProfileController.index);

routes.post('/incidents', celebrate({

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
    }),

}) ,IncidentsController.create);  //Gravando os Casos

routes.get('/incidents', celebrate({

    [Segments.PARAMS]:Joi.object().keys({
        page: Joi.number(),
    }),

}) ,IncidentsController.index);   //Listando os Casos

routes.delete('/incidents/:id', celebrate({

    [Segments.PARAMS]:Joi.object().keys({
        id: Joi.number().required(),
    }), 

}) ,IncidentsController.delete);   //Apagando os Casos

module.exports = routes;