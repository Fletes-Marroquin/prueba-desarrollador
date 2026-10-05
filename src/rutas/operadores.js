const express = require('express');

module.exports = function rutasOperadores(pool) {
  const router = express.Router();

  // Lista de operadores. Por omisión solo los activos.
  router.get('/', async (req, res, next) => {
    try {
      const incluirInactivos = req.query.inactivos === '1';
      const { rows } = await pool.query(
        `SELECT id, numero_empleado, nombre, activo
           FROM operadores
          WHERE ($1 OR activo)
          ORDER BY nombre`,
        [incluirInactivos]
      );
      res.json(rows);
    } catch (error) {
      next(error);
    }
  });

  return router;
};
