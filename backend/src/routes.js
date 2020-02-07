const { Router } = require('express');
const DevController = require('./controllers/DevController');
// Methods HTTP: GET, POST, PUT, DELETE

// Query Params: req.body (Filtros, ordenação, paginação)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de algum registro)

const routes = Router();
routes.get('/dev', DevController.index);
routes.post('/dev', DevController.store);

routes.get('/dev/search', DevController.search);

module.exports = routes;
