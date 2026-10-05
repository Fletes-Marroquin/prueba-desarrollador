// Resumen mensual por operador: viajes y evidencias recibidas.
// `mes` viene validado como AAAA-MM.
async function resumenDelMes(pool, mes) {
  const { rows } = await pool.query(
    `SELECT o.id AS operador_id,
            o.nombre,
            COUNT(v.id) AS viajes,
            COUNT(e.id) AS evidencias
       FROM operadores o
       JOIN viajes v ON v.operador_id = o.id
       LEFT JOIN evidencias e ON e.viaje_id = v.id
      WHERE v.salida >= ($1 || '-01')::date
        AND v.salida < (($1 || '-01')::date + interval '1 month')
      GROUP BY o.id, o.nombre
      ORDER BY viajes DESC, o.nombre
      LIMIT 50`,
    [mes]
  );
  return rows;
}

module.exports = { resumenDelMes };
