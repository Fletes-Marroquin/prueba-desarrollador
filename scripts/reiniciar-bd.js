// Crea la base si no existe, borra las tablas y las vuelve a crear con los datos de prueba.
const fs = require('node:fs');
const path = require('node:path');
const { Pool } = require('pg');

const url = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/prueba_fms';

async function crearBaseSiFalta() {
  const destino = new URL(url);
  const nombre = destino.pathname.slice(1);
  destino.pathname = '/postgres';
  const admin = new Pool({ connectionString: destino.toString() });
  const { rowCount } = await admin.query('SELECT 1 FROM pg_database WHERE datname = $1', [nombre]);
  if (!rowCount) {
    await admin.query(`CREATE DATABASE "${nombre.replace(/"/g, '""')}"`);
    console.log('Base creada:', nombre);
  }
  await admin.end();
}

async function main() {
  await crearBaseSiFalta();
  const pool = new Pool({ connectionString: url });
  for (const archivo of ['schema.sql', 'seed.sql']) {
    const sql = fs.readFileSync(path.join(__dirname, '..', 'db', archivo), 'utf8');
    await pool.query(sql);
    console.log('Listo:', archivo);
  }
  await pool.end();
}

main().catch((error) => {
  console.error('No se pudo conectar o preparar la base:', error.message);
  console.error('Revisa que PostgreSQL esté encendido y que usuario/contraseña sean postgres/postgres.');
  process.exit(1);
});
