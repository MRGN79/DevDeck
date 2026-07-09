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
**Entornos:** Ninguno desplegado (sitio estático sin build de producción publicado)

---

## Trabajo Activo

| Feature | Agente(s) activo(s) | Estado | Rama |
|---|---|---|---|
| Catálogo inicial de proyectos | Analista Funcional (specs retroactivas) | Documentación funcional completada; pendiente gates | claude/devdeck-project-catalog-el95gw |

> Specs y criterios de aceptación: `docs/acceptance-criteria.md` (en la rama de feature).

---

## Backlog

### Alta prioridad
- [ ] Persistencia real de datos (edición/alta desde la propia UI) — hoy el catálogo es de solo
  lectura sobre `projects.js`.

### Media prioridad
- [ ] Búsqueda por nombre o stack.
- [ ] Ordenar tarjetas por fecha de última actividad o por estado.

### Baja prioridad / Exploración
- [ ] Despliegue público del catálogo (GitHub Pages / Vercel).

---

## Decisiones Pendientes

- [ ] ¿Se despliega DevDeck públicamente? — bloqueante para el gate del Abogado (exposición de
  `.claude/`, `CLAUDE.md` y `docs/` si el repo se hace público) y para Seguridad (los proyectos con
  `isPublic: false` viajan en el bundle del cliente: el "modo público" es un filtro de presentación,
  no un control de acceso).

---

## Deuda Técnica

- [ ] Sin suite de tests automatizados — impacto: Medio.
- [ ] `filters.publicModeHint` ("Show only public projects") definida en ambos locales pero no
  renderizada en `Filters.jsx` — impacto: Bajo.
- [ ] `card.stack` ("Stack") definida pero no usada (las etiquetas de stack se renderizan sin
  encabezado) — impacto: Bajo.
- [ ] `aria-label="Language"` del conmutador de idioma hardcodeado en inglés en `App.jsx`, no vía
  clave i18n — impacto: Bajo (incumple la regla de "ningún string asistivo hardcodeado").

---

## Hipótesis de Experimentación

_(sin hipótesis registradas — Growth 🔴, sin vía comercial)_

---

## Historial (últimas 5 features completadas)

| Feature | Versión | Fecha | Notas |
|---|---|---|---|
| _(sin features cerradas todavía)_ | — | — | El catálogo inicial sigue en Trabajo Activo hasta que pasen los gates y se cierre |
