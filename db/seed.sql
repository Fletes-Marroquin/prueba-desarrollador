-- Datos inventados. El resultado es siempre el mismo (semilla fija).
SELECT setseed(0.42);

INSERT INTO operadores (numero_empleado, nombre, activo)
SELECT
  'E' || lpad(n::text, 4, '0'),
  'Operador ' || n,
  n % 10 <> 0
FROM generate_series(1, 200) AS n;

INSERT INTO viajes (operador_id, cliente, origen, destino, estatus, salida)
SELECT
  1 + floor(random() * 200)::int,
  (ARRAY['Toyota', 'Nissan', 'Kia', 'Ford', 'Mazda'])[1 + floor(random() * 5)::int],
  (ARRAY['Monterrey', 'Veracruz', 'Lázaro Cárdenas', 'Silao', 'Saltillo'])[1 + floor(random() * 5)::int],
  (ARRAY['CDMX', 'Guadalajara', 'Puebla', 'Querétaro', 'Mérida'])[1 + floor(random() * 5)::int],
  (ARRAY['cerrado', 'cerrado', 'cerrado', 'abierto', 'cancelado'])[1 + floor(random() * 5)::int],
  timestamptz '2026-06-01 00:00:00-06' + random() * interval '121 days'
FROM generate_series(1, 400000);

-- Cerca de 3 de cada 4 viajes tienen entre 1 y 3 evidencias.
INSERT INTO evidencias (viaje_id, tipo, url, subida_en)
SELECT
  v.id,
  (ARRAY['carta_porte', 'foto_unidad', 'firma'])[k],
  'https://archivos.ejemplo.test/v' || v.id || '/' || k || '.jpg',
  v.salida + interval '2 hours' * k
FROM viajes v
CROSS JOIN generate_series(1, 3) AS k
WHERE v.id % 4 <> 0 AND k <= 1 + (v.id % 3);

-- Algunas evidencias se subieron dos veces (mismo viaje, tipo y archivo).
INSERT INTO evidencias (viaje_id, tipo, url, subida_en)
SELECT viaje_id, tipo, url, subida_en + interval '5 minutes'
FROM evidencias
WHERE id % 97 = 0;
