const crearApp = require('./app');
const pool = require('./db');

const puerto = process.env.PORT || 3000;

crearApp(pool).listen(puerto, () => {
  console.log(`Servidor en http://localhost:${puerto}`);
});
