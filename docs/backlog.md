# DevDeck — Backlog

## Contexto del Proyecto

**Qué es:** Este proyecto es un catálogo personal de proyectos de desarrollo que muestra estado, versión, stack y enlaces de cada proyecto para tener visibilidad rápida del portfolio.
**Problema que resuelve:** Centraliza en una vista única qué proyectos personales existen, en qué estado están y cuáles son presentables públicamente.
**Usuarios objetivo:** El propio desarrollador (uso personal); potencialmente visitantes externos en modo público.
**Stack:** React 18 + Vite 5, sin backend, i18n propio (EN/ES).
**Versión actual:** 0.1.0 — scaffold 1.15.0
**Estado:** En desarrollo
**Entornos:** Ninguno desplegado todavía (sitio estático sin build de producción publicado)

---

## Trabajo Activo

| Feature | Agente(s) activo(s) | Estado | Rama |
|---|---|---|---|
| Catálogo inicial de proyectos | Frontend | En revisión | claude/devdeck-project-catalog-el95gw |

---

## Backlog

### Alta prioridad
- [ ] Persistencia real de datos (edición desde la propia UI) — actualmente el catálogo es de solo lectura sobre `projects.js`

### Media prioridad
- [ ] Búsqueda por nombre o stack
- [ ] Ordenar tarjetas por fecha de última actividad

### Baja prioridad / Exploración
- [ ] Despliegue público del catálogo (GitHub Pages / Vercel)

---

## Decisiones Pendientes

- [ ] ¿Se despliega DevDeck públicamente? — bloqueante para: revisión del Abogado sobre exposición de `.claude/`, `CLAUDE.md` y `docs/` en el repositorio si se hace público

---

## Deuda Técnica

- [ ] Sin suite de tests automatizados — impacto: Medio

---

## Hipótesis de Experimentación

_(sin hipótesis registradas)_

---

## Historial (últimas 5 features completadas)

| Feature | Versión | Fecha | Notas |
|---|---|---|---|
| Catálogo inicial: grid, modo público, filtro por estado, i18n EN/ES | 0.1.0 | 2026-07-09 | Implementado directamente sin backend, datos estáticos en `src/data/projects.js` |
