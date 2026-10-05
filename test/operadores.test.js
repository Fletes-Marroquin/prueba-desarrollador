const test = require('node:test');
const assert = require('node:assert/strict');
const { arrancar } = require('./ayuda');

test('GET /operadores devuelve solo los activos', async (t) => {
  const api = await arrancar();
  t.after(() => api.cerrar());

  const { status, cuerpo } = await api.get('/operadores');

  assert.equal(status, 200);
  assert.equal(cuerpo.length, 180);
  assert.ok(cuerpo.every((operador) => operador.activo));
});
