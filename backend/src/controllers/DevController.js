const axios = require('axios');
const Dev = require('../models/Dev');

module.exports = {
  async index(request, response) {
    let dev = await Dev.find();
    response.json(dev);
  },

  async search(request, response) {
    const { latitude, longitude, techs } = request.query;
    const techsArray = techs.split(',').map(tech => tech.trim());

    let devs = await Dev.find({
      techs: { $in: techsArray },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });
    response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const result = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      const { name, avatar_url, bio } = result.data;
      const techsArray = techs.split(',').map(tech => tech.trim());

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    response.json(dev);
  }
};
