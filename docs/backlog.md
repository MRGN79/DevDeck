# DevDeck — Backlog

## Contexto del Proyecto

**Qué es:** Catálogo personal de proyectos de desarrollo. Muestra estado, versión, stack, versión
de scaffold y enlaces de cada proyecto en una cuadrícula de tarjetas, con filtro por estado y un
modo público que oculta los proyectos no presentables.
**Problema que resuelve:** Centraliza en una vista única qué proyectos personales existen, en qué
estado están y cuáles son presentables a terceros.
**Usuarios objetivo:** El propio desarrollador (uso personal). Potenciales visitantes externos solo
si se despliega en modo público.
**Potencial comercial:** 🔴 sin potencial (dictamen Growth consultor) — herramienta interna, no un
producto. Growth no vuelve a intervenir salvo pivote.
**Stack:** React 18 + Vite 5, sin backend. Datos estáticos en `src/data/projects.js`. i18n propio
(EN/ES). Catálogo de solo lectura en esta versión.
**Versión actual:** 0.1.0 — scaffold 1.15.0
**Estado:** En desarrollo (fase 0.y.z — sin garantías de estabilidad)
**Entornos:** GitHub Pages, vía `.github/workflows/deploy.yml` (deploy automático en cada push a `main`; requiere activar Pages → Source: "GitHub Actions" una vez en Settings)

---

## Trabajo Activo

| Feature | Agente(s) activo(s) | Estado | Rama |
|---|---|---|---|
| Catálogo inicial de proyectos | — | Todos los gates aprobados (QA ✅, Accesibilidad ✅ AA, Responsabilidad Social ✅, Seguridad ✅, Abogado ✅); pendiente de confirmación del usuario para abrir PR y mergear | claude/devdeck-project-catalog-el95gw |

> Specs y criterios de aceptación: `docs/acceptance-criteria.md` (en la rama de feature).
> ADR: `docs/decisions/ADR-001-stack-y-i18n.md` (en la rama de feature).

---

## Backlog

### Alta prioridad
- [ ] Persistencia real de datos (edición/alta desde la propia UI) — hoy el catálogo es de solo
  lectura sobre `projects.js`.

### Media prioridad
- [ ] Búsqueda por nombre o stack.
- [ ] Ordenar tarjetas por fecha de última actividad o por estado.

### Baja prioridad / Exploración

---

## Decisiones Pendientes

- [x] ~~¿Se despliega DevDeck públicamente?~~ — resuelto: el usuario confirmó el despliegue a GitHub
  Pages. El Abogado ya dictaminó ✅ para el estado actual (sin datos de terceros, sin PII). El
  hallazgo de Seguridad sobre `isPublic` (filtro de presentación, no control de acceso) ya está
  documentado en el README y en el copy de la UI.
- [ ] ¿Se hace público el repositorio de GitHub (además del sitio desplegado)? — GitHub Pages vía
  Actions solo publica el artefacto `dist/`, no el repositorio. Si además se hace público el repo,
  el Jefe debe advertir que `.claude/`, `CLAUDE.md` y `docs/` quedarían visibles en GitHub (regla de
  Archivos Privados).

---

## Deuda Técnica

- [x] ~~Sin suite de tests automatizados~~ — resuelto: 28 tests (Vitest + React Testing Library)
  cubriendo los criterios de aceptación.
- [x] ~~`aria-label="Language"` hardcodeado~~ — resuelto: localizado vía clave `app.languageLabel`.
- [x] ~~Toggle "Modo público" no comunicaba su efecto~~ — resuelto: hint visible y aclarado que es
  solo un filtro de presentación.
- [ ] `card.stack` ("Stack") definida en i18n pero no usada como encabezado visible sobre las
  etiquetas de stack — impacto: Bajo.
- [ ] `description` de cada proyecto en `src/data/projects.js` está hardcodeada en castellano; en
  modo EN la tarjeta mezcla interfaz en inglés con descripción en español — impacto: Bajo. Requiere
  decisión: ¿traducir descripciones o aceptar que el contenido del catálogo no sigue el mismo
  régimen i18n que la interfaz?
- [ ] Enlaces deshabilitados de repo/demo son `<span>` sin `aria-disabled="true"` — impacto: Bajo,
  mejora de claridad semántica (Accesibilidad).
- [ ] Sin `prefers-reduced-motion` para las transiciones de hover de las tarjetas — impacto: Bajo.
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
