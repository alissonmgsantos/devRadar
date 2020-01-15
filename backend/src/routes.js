const { Router } = require('express');

// Methods HTTP: GET, POST, PUT, DELETE

// Query Params: req.body (Filtros, ordenação, paginação)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de algum registro)

const routes = Router();
routes.get('/', (req, res) => {
  res.json({ message: 'Hello Wolrd' });
});

module.exports = routes;
