const express = require('express');
const { resumenDelMes } = require('../consultas/resumen');

module.exports = function rutasViajes(pool) {
  const router = express.Router();

  // Resumen por operador de un mes (formato AAAA-MM): viajes y evidencias recibidas.
  router.get('/resumen', async (req, res, next) => {
    try {
      const mes = req.query.mes;
      if (!/^\d{4}-\d{2}$/.test(mes || '')) {
        return res.status(400).json({ error: 'mes debe tener el formato AAAA-MM' });
      }

      const rows = await resumenDelMes(pool, mes);
      res.json(rows);
    } catch (error) {
      next(error);
    }
  });

  // Viajes que todavía no tienen ninguna evidencia, en un rango de fechas.
  router.get('/sin-evidencia', async (req, res) => {
    res.status(501).json({ error: 'Pendiente de implementar' });
  });

  return router;
};
