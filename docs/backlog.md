# DevDeck — Backlog

## Contexto del Proyecto

**Qué es:** Catálogo personal de proyectos de desarrollo. Muestra versión, stack, versión de
scaffold, enlaces y estadísticas de GitHub en vivo de cada proyecto en una cuadrícula de tarjetas.
**Problema que resuelve:** Centraliza en una vista única qué proyectos personales existen y sus
métricas de GitHub sin mantenimiento manual.
**Usuarios objetivo:** El propio desarrollador (uso personal). El sitio está desplegado públicamente
en GitHub Pages, así que cualquier visitante puede verlo.
**Potencial comercial:** 🔴 sin potencial (dictamen Growth consultor) — herramienta interna, no un
producto. Growth no vuelve a intervenir salvo pivote.
**Stack:** React 18 + Vite 5, sin backend. Datos manuales estáticos en `src/data/projects.js`;
estadísticas de GitHub obtenidas en build time (`scripts/fetch-github-stats.mjs`) y combinadas en
`src/data/mergedProjects.js`. i18n propio (EN/ES). Catálogo de solo lectura en esta versión.
**Versión actual:** 0.1.0 — scaffold 1.15.0
**Estado:** En desarrollo (fase 0.y.z — sin garantías de estabilidad)
**Entornos:** GitHub Pages, vía `.github/workflows/deploy.yml` (deploy automático en cada push a
`main` y cada 6h por `schedule`, para refrescar las estadísticas de GitHub sin necesidad de push;
requiere activar Pages → Source: "GitHub Actions" una vez en Settings)

---

## Trabajo Activo

| Feature | Agente(s) activo(s) | Estado | Rama |
|---|---|---|---|
| Resincronizar datos del catálogo contra los repos reales (versión, scaffoldVersion) | — | Implementado y testeado; pendiente de confirmación del usuario para abrir PR y mergear | claude/actualizar-info-proyectos-0n4g6z |
| Identidad visual "consola/terminal" sobria (tipografía monoespaciada, acento verde discreto, barrido de escaneo, esquinas HUD en hover) + versión/scaffold/estadísticas de GitHub numéricas con conteo animado al montar | — | Implementado y testeado; pendiente de confirmación del usuario para abrir PR y mergear | claude/actualizar-info-proyectos-0n4g6z |

Mergeadas ya en `main`: eliminación del modo público/privado, estadísticas de GitHub en vivo,
orden alfabético, demo por defecto a GitHub Pages, identidad visual por tarjeta, pie de página,
datos reales de TerceroDePrimaria/TrailStats, eliminación del campo `status`, datos reales de
FobForge y sincronización previa del catálogo completo (PRs #4 a #9).

> Specs y criterios de aceptación: `docs/acceptance-criteria.md`.
> ADR: `docs/decisions/ADR-001-stack-y-i18n.md`, `docs/decisions/ADR-002-datos-github-en-build.md`, `docs/decisions/ADR-003-identidad-visual-por-tarjeta.md`.

---

## Backlog

### Alta prioridad
- [ ] Persistencia real de datos (edición/alta desde la propia UI) — hoy el catálogo es de solo
  lectura sobre `projects.js`.

### Media prioridad
- [ ] Búsqueda por nombre o stack.
- [ ] Ordenar tarjetas por fecha de última actividad (alternativa al orden alfabético actual).

### Baja prioridad / Exploración

---

## Decisiones Pendientes

- [x] ~~¿Se despliega DevDeck públicamente?~~ — resuelto: el usuario confirmó el despliegue a GitHub
  Pages. El Abogado ya dictaminó ✅ para el estado actual (sin datos de terceros, sin PII).
- [ ] ¿Se hace público el repositorio de GitHub (además del sitio desplegado)? — GitHub Pages vía
  Actions solo publica el artefacto `dist/`, no el repositorio. Si además se hace público el repo,
  el Jefe debe advertir que `.claude/`, `CLAUDE.md` y `docs/` quedarían visibles en GitHub (regla de
  Archivos Privados).
- [x] ~~`repo` (owner/repo de GitHub) de Selfforge, FobForge y TerceroDePrimaria~~ — resuelto: el
  usuario los facilitó, y de paso añadió TrailStats como quinto proyecto del catálogo. Los 5
  proyectos ya apuntan a su repo real (`MRGN79/SelfForge`, `MRGN79/fobforge`, `MRGN79/DevDeck`,
  `MRGN79/TerceroDePrimaria`, `MRGN79/TrailStats`).
- [x] ~~Datos manuales de TerceroDePrimaria y TrailStats (`description`, `version`, `stack`)~~ —
  resuelto: se leyeron directamente de su `package.json`/`.claude/scaffold.json` real (repos
  clonados temporalmente en esta sesión). `description`, `version` y `scaffoldVersion` ya
  reflejan el dato real.
- [x] ~~`status` de TerceroDePrimaria y TrailStats~~ — ya no aplica: el usuario pidió eliminar el
  campo `status` por completo ("no aporta nada"). Se fue con él la insignia de estado, el filtro
  y el estado vacío (dependían solo de `status`) — ver la nota de contexto en
  `docs/acceptance-criteria.md`.
- [ ] Si algún repo (p.ej. FobForge) resulta estar en privado, hace falta decidir si se da de alta
  el secret `GH_STATS_TOKEN` (con permiso de lectura sobre ese repo) — requiere visto bueno de
  Seguridad y del Abogado antes de configurarlo, por el alcance de acceso que otorga.

---

## Deuda Técnica

- [x] ~~Sin suite de tests automatizados~~ — resuelto: 28 tests (Vitest + React Testing Library)
  cubriendo los criterios de aceptación.
- [x] ~~`aria-label="Language"` hardcodeado~~ — resuelto: localizado vía clave `app.languageLabel`.
- [x] ~~Toggle "Modo público" no comunicaba su efecto~~ — obsoleto: el toggle se eliminó por completo
  (no aportaba valor real). Si se recupera en el futuro, se documentará como feature nueva.
- [ ] `card.stack` ("Stack") definida en i18n pero no usada como encabezado visible sobre las
  etiquetas de stack — impacto: Bajo.
- [ ] `description` de cada proyecto en `src/data/projects.js` está hardcodeada en castellano; en
  modo EN la tarjeta mezcla interfaz en inglés con descripción en español — impacto: Bajo. Requiere
  decisión: ¿traducir descripciones o aceptar que el contenido del catálogo no sigue el mismo
  régimen i18n que la interfaz?
- [ ] Enlaces deshabilitados de repo/demo son `<span>` sin `aria-disabled="true"` — impacto: Bajo,
  mejora de claridad semántica (Accesibilidad).
- [x] ~~El "Demo" por defecto de FobForge es una suposición sin verificar~~ — resuelto: su propio
  `index.html` declara `<link rel="canonical" href="https://mrgn79.github.io/fobforge/">`, que
  coincide exactamente con el default calculado. Confirmado real, no una suposición.
- [x] ~~El "Demo" por defecto (GitHub Pages derivada de `repo`) de TerceroDePrimaria y TrailStats
  sigue sin verificar~~ — resuelto: ambos repos despliegan a GitHub Pages con el mismo `base`
  (case-sensitive) que el default calculado. TrailStats lo confirma con su propio
  `<link rel="canonical">` a `https://mrgn79.github.io/TrailStats/`; TerceroDePrimaria lo confirma
  con `base: "/TerceroDePrimaria/"` en `vite.config` junto a su `deploy.yml` a Pages.
- [x] ~~Sin `prefers-reduced-motion` para las transiciones de hover de las tarjetas~~ — resuelto: al
  añadir animaciones nuevas (cursor de terminal, barrido de escaneo, conteo de versiones y
  estadísticas), se añadió un reset global en `App.css` que reduce toda animación/transición a
  0.01ms cuando el sistema pide movimiento reducido. Cubre también el conteo animado, que además
  se salta por completo (muestra el valor final directamente) en vez de solo acortarse.
- [ ] El tema visual por tarjeta (`ADR-003`) es manual: cualquier proyecto nuevo que se añada al
  catálogo cae al estilo neutro por defecto hasta que alguien revise su CSS real y le asigne un
  bloque `[data-project="..."]` en `src/App.css`. No es un bug, es el trade-off aceptado de esta
  decisión — pero conviene recordarlo al añadir proyectos.
- [ ] Para TerceroDePrimaria, el acento de tarjeta es una interpretación de su paleta clara
  ("isla viva") adaptada a la base oscura del catálogo, no una réplica fiel. Si el usuario prefiere
  fidelidad total (p.ej. esa tarjeta con fondo claro), es una decisión de diseño mayor pendiente —
  rompería la consistencia tonal del resto del catálogo.
- [ ] 5 vulnerabilidades en devDependencies transitivas (cadena esbuild→vite→vitest, severidad
  1 crítica/1 alta/3 moderate) — solo afectan al dev server local, no al build de producción. Fix
  requiere `vite@8` / `vitest@3` (breaking) — necesita revisión del Arquitecto antes de actualizar.

---

## Hipótesis de Experimentación

_(sin hipótesis registradas — Growth 🔴, sin vía comercial)_

---

## Historial (últimas 5 features completadas)

| Feature | Versión | Fecha | Notas |
|---|---|---|---|
| _(sin features cerradas todavía)_ | — | — | El catálogo inicial pasó todos los gates; sigue en Trabajo Activo hasta el merge — pendiente de confirmación del usuario para abrir PR |
