DROP TABLE IF EXISTS evidencias;
DROP TABLE IF EXISTS viajes;
DROP TABLE IF EXISTS operadores;

CREATE TABLE operadores (
  id SERIAL PRIMARY KEY,
  numero_empleado TEXT NOT NULL,
  nombre TEXT NOT NULL,
  activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE viajes (
  id SERIAL PRIMARY KEY,
  operador_id INTEGER NOT NULL REFERENCES operadores(id),
  cliente TEXT NOT NULL,
  origen TEXT NOT NULL,
  destino TEXT NOT NULL,
  estatus TEXT NOT NULL CHECK (estatus IN ('abierto', 'cerrado', 'cancelado')),
  salida TIMESTAMPTZ NOT NULL
);

CREATE TABLE evidencias (
  id SERIAL PRIMARY KEY,
  viaje_id INTEGER NOT NULL REFERENCES viajes(id),
  tipo TEXT NOT NULL CHECK (tipo IN ('carta_porte', 'foto_unidad', 'firma')),
  url TEXT NOT NULL,
  subida_en TIMESTAMPTZ NOT NULL
);
