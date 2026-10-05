# Parte A: base de datos (15 min)

Todas las fechas de negocio son **hora de Monterrey** (`America/Monterrey`).
Escribe tus respuestas en `ejercicios/respuestas.sql` (con comentarios si quieres explicar algo).

1. **Consulta.** Por cada operador activo, muestra cuántos viajes **cerrados** hizo en septiembre de 2026
   y cuántos de esos viajes tienen al menos una evidencia. Ordena de mayor a menor número de viajes.

2. **Duplicados.** Algunas evidencias se subieron dos veces (mismo viaje, mismo tipo y mismo archivo).
   Encuéntralas y cuéntalas. Si te da tiempo: bórralas dejando la más antigua y evita que vuelva a pasar.

3. **Opcional, si sobra tiempo.** Ejecuta esto con `EXPLAIN (ANALYZE)` y dinos cómo lo mejorarías:

   ```sql
   SELECT e.*
     FROM evidencias e
     JOIN viajes v ON v.id = e.viaje_id
    WHERE v.operador_id = 57
      AND v.salida >= '2026-09-01'
    ORDER BY e.subida_en DESC;
   ```
