# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
y el proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Catálogo de proyectos en grid de tarjetas, con datos estáticos en `src/data/projects.js`
- Toggle "Modo público" que filtra solo los proyectos con `isPublic: true`
- Filtro por estado (`active` / `in-progress` / `paused` / `idea`)
- Interfaz en inglés y castellano con selector de idioma
- Tema oscuro por defecto
- Texto de ayuda bajo el toggle "Modo público" que aclara que solo filtra la vista
- Foco de teclado visible en los filtros y el selector de idioma
- Suite de tests (Vitest + React Testing Library) que cubre filtrado, modo público, campos nulos, estado vacío, navegación por teclado y cambio de idioma
- Decisión de arquitectura documentada en `docs/decisions/ADR-001-stack-y-i18n.md` (React + Vite sin backend, i18n propio)
- Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`

### Changed

- Cada proyecto incorpora un campo `id` estable (slug) como identificador

### Fixed

- El `aria-label` del selector de idioma ahora se localiza mediante clave i18n
- Color de superficie de las tarjetas unificado en una variable CSS
- 404 en GitHub Pages: el `base` de Vite usaba minúsculas (`/devdeck/`) y no coincidía
  con la capitalización real del repositorio (`/DevDeck/`), que GitHub Pages respeta
  tal cual

### Removed

### Security

---
<!-- Guía rápida:
  - Mover [Unreleased] → [X.Y.Z] — AAAA-MM-DD en cada release (lo hace Documentación)
  - Added: nuevas funcionalidades
  - Changed: cambios en funcionalidades existentes
  - Fixed: correcciones de bugs
  - Removed: funcionalidades eliminadas
  - Security: parches de seguridad
  - Nunca editar entradas ya publicadas — solo añadir al principio
-->
