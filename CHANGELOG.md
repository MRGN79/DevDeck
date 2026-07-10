# Changelog

Todos los cambios notables de este proyecto se documentan en este archivo.

El formato sigue [Keep a Changelog](https://keepachangelog.com/es/1.0.0/)
y el proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Catálogo de proyectos en grid de tarjetas, con datos estáticos en `src/data/projects.js`, ordenadas alfabéticamente por nombre
- Interfaz en inglés y castellano con selector de idioma
- Tema oscuro por defecto
- Foco de teclado visible en el selector de idioma
- Suite de tests (Vitest + React Testing Library) que cubre campos nulos, navegación por teclado y cambio de idioma
- Decisión de arquitectura documentada en `docs/decisions/ADR-001-stack-y-i18n.md` (React + Vite sin backend, i18n propio)
- Despliegue automático a GitHub Pages vía GitHub Actions (`.github/workflows/deploy.yml`) en cada push a `main`
- Estadísticas de GitHub en vivo por tarjeta (estrellas, lenguaje, commits, colaboradores, issues abiertas, licencia, tamaño del repo, topics, última actualización), obtenidas en build time (`scripts/fetch-github-stats.mjs`) sin exponer llamadas a la API desde el navegador
- Disparador `schedule` en el workflow de despliegue (cada 6 horas) para refrescar el sitio sin necesidad de un push
- Proyectos TerceroDePrimaria y TrailStats añadidos al catálogo, con repo, versión, stack y descripción reales
- Decisión de arquitectura documentada en `docs/decisions/ADR-002-datos-github-en-build.md` (fetch en build vs runtime, aproximación de "tamaño de repo" en vez de líneas de código reales)
- El enlace "Demo" apunta por defecto a la GitHub Pages del proyecto (`https://<owner>.github.io/<repo>/`, derivada de `repo`) cuando no se rellena `demo` a mano; un valor explícito en `demo` sigue teniendo prioridad
- Identidad visual por tarjeta: franja superior y degradado de fondo con los colores reales de cada proyecto (extraídos de su CSS desplegado), ver `docs/decisions/ADR-003-identidad-visual-por-tarjeta.md`
- Pie de página con la versión del manifiesto (`package.json`, un solo origen de verdad) y una descripción breve, en EN/ES

### Changed

- Cada proyecto incorpora un campo `id` estable (slug) como identificador
- `App` acepta una prop `projects` opcional (por defecto, el catálogo real) para facilitar tests aislados del contenido real del catálogo
- Datos de FobForge actualizados a su estado real (versión `0.3.0` → `1.0.0`, descripción y stack ya no reflejaban el proyecto actual — ahora es una web tool, no una herramienta de escritorio; se añade `SQL.js` al stack)

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
