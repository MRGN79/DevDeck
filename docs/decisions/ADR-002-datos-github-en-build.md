# ADR-002: Estadísticas de GitHub obtenidas en build time, no en el navegador

**Fecha:** 2026-07-09
**Estado:** Aceptado
**Decidido por:** Arquitecto

---

## Contexto

El usuario pidió que los datos de cada proyecto se lean automáticamente de GitHub en lugar de
mantenerlos a mano en `src/data/projects.js`, y aclaró que le importa más no tener que tocar nada
que la frescura al segundo del dato.

ADR-001 fijó "sin backend" como restricción de arquitectura. Cualquier solución debe respetarla.

## Decisión

Los datos de GitHub (estrellas, lenguaje principal, nº de commits, nº de colaboradores, issues
abiertas, licencia, tamaño del repo, topics, fecha del último push) se obtienen en **build time**,
no en el navegador del visitante:

1. `scripts/fetch-github-stats.mjs` consulta la API REST de GitHub para cada proyecto con `repo`
   apuntando a un `https://github.com/<owner>/<repo>`, y escribe el resultado en
   `src/data/github-stats.generated.json`.
2. `npm run build` ejecuta ese script automáticamente antes de compilar (`prebuild`), y
   `src/data/mergedProjects.js` combina esos datos con los manuales de `projects.js` por slug de
   repo.
3. El workflow de despliegue (`.github/workflows/deploy.yml`) añade un disparador `schedule`
   (cada 6 horas) además del `push` a `main` — así el sitio se refresca solo, sin necesidad de que
   el usuario toque código.
4. `src/data/github-stats.generated.json` se commitea con un placeholder vacío (`{}`) para que el
   import nunca falle si el script no se ha ejecutado (p.ej. `npm run dev` local sin red); el
   workflow lo regenera en cada ejecución y no se conserva entre despliegues.

## Alternativas consideradas

### Opción A — Fetch en el navegador (runtime, en cada visita)
**Por qué se descarta:** la API de GitHub sin autenticación limita a 60 peticiones/hora **por IP**,
compartidas entre todos los visitantes detrás de la misma red. Con varios proyectos por tarjeta
(varias llamadas cada uno) se agota rápido. Además acopla el tiempo de carga del sitio a la
disponibilidad de la API de GitHub, y complica el "sin backend" al introducir estado de carga,
errores de red visibles y caché en el cliente. Sí sería "tiempo real" literal, pero el usuario
priorizó no tener que mantener nada por encima de la frescura al segundo.

### Opción B — Backend/proxy propio
**Por qué se descarta:** contradice ADR-001 sin necesidad. Añadiría infraestructura, coste y
superficie de mantenimiento para resolver un problema (rate limiting) que el build time ya resuelve
gratis.

## Decisiones de detalle

- **"Líneas de código" real:** requeriría clonar cada repo y ejecutar una herramienta como `cloc`
  dentro del workflow — más lento, más pesado (dependencia binaria extra) y fràgil para repos
  grandes. En su lugar se usa `size` (KB), el tamaño del repositorio que la propia API de GitHub ya
  devuelve sin coste adicional — es una aproximación, no un conteo real, y se etiqueta como "tamaño
  del repo", no como "líneas de código".
- **Nº de commits / colaboradores:** GitHub no expone un contador directo. Se obtiene pidiendo 1
  resultado por página (`?per_page=1`) y leyendo el número de página de la cabecera `Link: rel="last"`
  — una petición barata, sin paginar la lista completa.
- **Repos privados:** si algún proyecto (p.ej. FobForge) resulta tener el repo en privado, el fetch
  sin autenticar devuelve 404/403. El script no rompe el build por ello (guarda los datos previos si
  los había y sigue). Para leer datos de un repo privado haría falta un token con permiso de lectura
  guardado como secret de GitHub Actions (`GH_STATS_TOKEN`, ya soportado por el script) — su alta
  requiere visto bueno de Seguridad y del Abogado antes de configurarlo, por el alcance de acceso que
  otorga.
- **Resiliencia:** un fallo de red o de rate limit en un repo concreto no rompe el build ni afecta a
  los demás proyectos — se conserva el último dato bueno conocido para ese repo y se continúa.

## Consecuencias

**Positivas:**
- El usuario no vuelve a tocar manualmente estrellas, commits, lenguaje, etc.
- Se mantiene "sin backend": el navegador del visitante nunca llama a la API de GitHub.
- Resiliente a caídas puntuales de la API o de un repo concreto.

**Negativas / trade-offs:**
- No es "tiempo real" literal — el dato tiene hasta 6 horas de desfase (o hasta el siguiente push a
  `main`, lo que ocurra antes). Asumido explícitamente por el usuario.
- Campos que no puede inferir de GitHub (`description`, `status`, `demo`) siguen siendo manuales.
- Repos privados necesitan configuración adicional (token secret) que no viene activada por
  defecto.
