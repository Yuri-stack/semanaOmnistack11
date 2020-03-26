const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); 

routes.get('/ongs', OngController.index);   //Listando as ONGs
routes.post('/ongs', OngController.create); //Gravando as ONGs

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentsController.create);  //Gravando os Casos
routes.get('/incidents', IncidentsController.index);   //Listando os Casos
routes.delete('/incidents/:id', IncidentsController.delete);   //Apagando os Casos

module.exports = routes;