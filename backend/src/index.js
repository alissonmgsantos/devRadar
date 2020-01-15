const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

mongoose.connect(
  'mongodb+srv://omnistack:omnistack@estudos-1jiop.mongodb.net/Estudos?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use(express.json());
app.use(routes);

// Methods HTTP: GET, POST, PUT, DELETE

// Query Params: req.body (Filtros, ordenação, paginação)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de algum registro)

app.listen(3333);
