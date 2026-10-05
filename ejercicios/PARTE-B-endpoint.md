# Parte B: un endpoint nuevo (20 min)

Implementa `GET /viajes/sin-evidencia` en `src/rutas/viajes.js`. Devuelve los viajes **que no tienen ninguna evidencia**.

Parámetros (en la URL):

| Parámetro | Obligatorio | Descripción |
|---|---|---|
| `desde` | sí | Fecha `AAAA-MM-DD`. Viajes con salida desde ese día. |
| `hasta` | sí | Fecha `AAAA-MM-DD`. Viajes con salida hasta ese día, **incluido**. |
| `limite` | no | Máximo 100. Por omisión, 20. |

Respuesta: una lista de viajes con `id`, `operador` (nombre), `cliente`, `destino`, `estatus` y `salida`.

Reglas:
- Si falta un parámetro o es inválido, responde 400 con un mensaje claro.
- Los viajes `cancelado` no se incluyen.
- Ordena del más reciente al más antiguo.

Escribe **una o dos pruebas** en `test/` (hay un ejemplo en `test/operadores.test.js`).
Si te sobra tiempo, agrega paginación.
