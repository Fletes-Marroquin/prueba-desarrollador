const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/prueba_fms',
  // Igual que el servidor de producción: la sesión trabaja en UTC.
  options: '-c timezone=UTC',
});

module.exports = pool;
