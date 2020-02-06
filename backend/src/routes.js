const { Router } = require('express');
const axios = require('axios');
const Dev = require('./models/Dev');
// Methods HTTP: GET, POST, PUT, DELETE

// Query Params: req.body (Filtros, ordenação, paginação)
// Route Params: req.params (Identificar um recurso na alteração ou remoção)
// Body: req.body (Dados para criação ou alteração de algum registro)

const routes = Router();
routes.post('/dev', async (req, res) => {
  const { github_username, techs } = req.body;
  const result = await axios.get(
    `https://api.github.com/users/${github_username}`
  );
  const { name = login, avatar_url, bio } = result.data;
  const techsArray = techs.split(',').map(tech => tech.trim());

  const dev = await Dev.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  });

  res.json(dev);
});

module.exports = routes;
