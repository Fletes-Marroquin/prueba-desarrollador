# Prueba para desarrolladores

Es una prueba de 1 hora, sin prisa. Los datos son de ejemplo, no son reales.

Puedes usar IA (Claude, Copilot, lo que quieras) y buscar en internet. Lo que nos importa es que
entiendas lo que haces y nos vayas contando cómo piensas.

## Para arrancar

Necesitas Node 20 o más nuevo y PostgreSQL (usuario `postgres`, contraseña `postgres`, puerto 5432).

```bash
npm install
npm run bd:reiniciar
npm test
```

`bd:reiniciar` crea la base `prueba_fms` con sus tablas y datos. Si en algún momento quieres
dejarla como al inicio, lo corres otra vez. `npm test` debe pasar 1 prueba.

Si tu Postgres tiene otra contraseña u otro puerto, antes de correr los comandos escribe esto
en la misma terminal (solo dura en esa terminal):

```powershell
$env:DATABASE_URL="postgres://postgres:TU_CONTRASEÑA@localhost:5432/prueba_fms"
```

Para escribir SQL puedes usar `psql -U postgres prueba_fms` o pgAdmin / DBeaver
(servidor `localhost`, puerto 5432, base `prueba_fms`).

## Qué hay que hacer

1. [Parte A: base de datos](ejercicios/PARTE-A-sql.md) (15 min)
2. [Parte B: un endpoint nuevo](ejercicios/PARTE-B-endpoint.md) (20 min)
3. [Parte C: un reporte de Calidad](ejercicios/PARTE-C-reporte.md) (15 min)

No tienes que terminar todo. Al final nos enseñas lo que hiciste y platicamos de por qué
lo hiciste así. Trabaja en tu copia, sin fork ni Pull Requests.
