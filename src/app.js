const express = require('express');
const rutasOperadores = require('./rutas/operadores');
const rutasViajes = require('./rutas/viajes');

function crearApp(pool) {
  const app = express();
  app.use(express.json());

  app.get('/salud', (req, res) => res.json({ ok: true }));
  app.use('/operadores', rutasOperadores(pool));
  app.use('/viajes', rutasViajes(pool));

  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  });

  return app;
}

module.exports = crearApp;
