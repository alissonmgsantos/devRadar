import React, { useState, useEffect } from 'react';
import './style.css';

function DevForm({ onSubmit }) {
  const [github_username, setGithub_username] = useState('');
  const [techs, setTechs] = useState([]);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { longitude, latitude } = position.coords;
        setLongitude(longitude);
        setLatitude(latitude);
      },
      error => console.log(error),
      { timeout: 30000 }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });
    setGithub_username('');
    setTechs('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithub_username(e.target.value)}
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            onChange={e => setLatitude(e.target.value)}
            name="latitude"
            id="latitude"
            type="number"
            required
            value={latitude}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            onChange={e => setLongitude(e.target.value)}
            name="longitude"
            id="longitude"
            type="number"
            required
            value={longitude}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
