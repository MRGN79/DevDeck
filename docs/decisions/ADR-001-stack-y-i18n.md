# ADR-001: Stack (React + Vite, sin backend) y solución i18n propia

**Fecha:** 2026-07-09
**Estado:** Aceptado
**Decidido por:** Arquitecto

---

## Contexto

DevDeck es un catálogo personal de proyectos de desarrollo. Los datos son un
conjunto pequeño, curado a mano y de baja frecuencia de cambio (hoy 3 proyectos),
que vive como array estático en `src/data/projects.js`. No hay usuarios múltiples,
ni autenticación, ni escritura de datos, ni necesidad de persistencia dinámica: es
una aplicación de solo lectura que se compila a estáticos.

El scaffold exige multiidioma desde el día uno (EN + ES, EN por defecto). Con un
volumen de claves reducido y sin pluralización compleja, formateo de fechas/números
ni interpolación avanzada, hace falta decidir entre una librería i18n consolidada o
una solución propia mínima.

Las fuerzas en juego: mantener la superficie de dependencias pequeña (principio de
simplicidad y de evitar lock-in), tiempo de arranque bajo y una arquitectura que
Frontend pueda operar sin ambigüedad.

## Decisión

**Stack:** React 18 + Vite 5, sin backend. Los datos se sirven como módulo estático
importado en build time. El despliegue es de archivos estáticos.

**i18n:** solución propia mínima basada en React Context (`I18nProvider` +
`useI18n`) que carga diccionarios JSON (`locales/en/common.json`,
`locales/es/common.json`) y resuelve claves anidadas con el patrón
`namespace.componente.elemento`. Sin `react-i18next` ni `i18next`. El idioma por
defecto se detecta del navegador con fallback a EN; la clave sin traducción se
devuelve tal cual (fallback visible) en vez de romper el render.

**Modelo de datos:** cada proyecto incorpora un campo `id` estable (slug) como
identidad canónica, independiente de `name` (que es texto de presentación). `id` es
la key de React y el futuro anclaje de rutas o enlaces profundos.

## Consecuencias

**Positivas:**
- Cero dependencias runtime más allá de React: menos superficie de seguridad,
  licencias y actualizaciones major que revisar.
- Arranque y build muy rápidos; despliegue estático trivial (cualquier CDN/hosting).
- La solución i18n es ~30 líneas legibles, sin API que aprender; añadir un idioma es
  añadir un JSON, sin tocar código (cumple la regla del scaffold).
- `id` desacopla identidad de nombre: renombrar un proyecto no rompe keys ni enlaces.

**Negativas / trade-offs:**
- La i18n propia no cubre pluralización, formateo ICU, interpolación ni carga
  perezosa de locales. Si el producto los necesita, habrá que migrar a `i18next`.
- Los diccionarios se empaquetan en el bundle (no hay lazy-load por idioma); aceptable
  con el volumen actual, revisar si crece mucho.
- Sin backend, todo dato es público en el bundle: `isPublic: false` es un filtro de
  presentación, NO una garantía de confidencialidad (ver Riesgos).

**Riesgos:**
- **Datos "privados" expuestos:** los proyectos con `isPublic: false` (p. ej.
  FobForge) viajan en el JS compilado y son visibles inspeccionando el bundle. Mientras
  no exista backend, no se deben incluir en `projects.js` datos que deban permanecer
  secretos. Deuda registrada para el Analista/Jefe.
- Crecimiento del catálogo o necesidad de edición dinámica invalidaría el "sin backend";
  sería un nuevo ADR, no un parche.

## Alternativas consideradas

### Opción A — react-i18next / i18next
**Por qué se descarta:** potente pero sobredimensionado para el volumen de claves
actual. Añade dependencias, configuración y una API que aprender sin beneficio real
hoy. Contradice el principio de simplicidad. Queda como ruta de migración documentada
si aparecen pluralización o formateo ICU.

### Opción B — Next.js / stack con backend o SSR
**Por qué se descarta:** no hay datos dinámicos, autenticación ni SEO crítico que
justifiquen SSR o un servidor. Introduciría infraestructura, coste y complejidad
operativa para un catálogo estático de solo lectura.

### Opción C — Mantener `name` como identidad (sin `id`)
**Por qué se descarta:** `name` es texto de presentación y puede repetirse o
renombrarse; usarlo como key de React y como identidad es frágil. Un `id` slug estable
cuesta casi nada y previene colisiones y roturas futuras de enlaces.

---
