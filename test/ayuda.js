// Arranca la app en un puerto libre contra la base de prueba.
const crearApp = require('../src/app');
const pool = require('../src/db');

async function arrancar() {
  const servidor = crearApp(pool).listen(0);
  await new Promise((resolver) => servidor.once('listening', resolver));
  const base = `http://localhost:${servidor.address().port}`;

  return {
    async get(ruta) {
      const respuesta = await fetch(base + ruta);
      return { status: respuesta.status, cuerpo: await respuesta.json() };
    },
    async cerrar() {
      await new Promise((resolver) => servidor.close(resolver));
      await pool.end();
    },
  };
}

module.exports = { arrancar };
