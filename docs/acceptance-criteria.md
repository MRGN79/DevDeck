# DevDeck — Especificación funcional y criterios de aceptación

> Documentación funcional del **catálogo inicial de proyectos**.
> Redactada retroactivamente por el Analista Funcional sobre la implementación ya existente
> (rama `claude/devdeck-project-catalog-el95gw`). Las specs describen el comportamiento que
> el código debe cumplir; sirven de referencia para Tester, QA y futuras iteraciones.
>
> Los textos de interfaz se documentan por **clave i18n + valor EN de referencia**
> (idioma por defecto), verificados contra `locales/en/common.json`.

---

## Contexto

DevDeck es un catálogo personal de proyectos de desarrollo (React 18 + Vite 5, sin backend).
Los datos viven estáticos en `src/data/projects.js` — el catálogo es de **solo lectura** en esta
versión. Dictamen de Growth (consultor): 🔴 sin potencial comercial (herramienta interna).

Cada proyecto del modelo de datos manual (`src/data/projects.js`) tiene: `name`, `description`,
`status` (`active` | `in-progress` | `paused` | `idea`), `version`, `scaffoldVersion` (o `null`),
`stack` (array de strings), `repo` (url de GitHub o `null`), `demo` (url o `null`). Cuando `repo`
es una URL de GitHub, `src/data/mergedProjects.js` añade un campo `github` (objeto o `null`) con
estadísticas obtenidas en build time — ver US-7.

> **Nota (revert/public-mode-toggle):** el modo público/privado (`isPublic`, US-3 original)
> se eliminó — no aportaba valor real y toda la sección correspondiente se ha retirado de
> esta spec. Si se recupera en el futuro, se documentará como una nueva user story.

---

## US-1 — Ver el catálogo de proyectos

```
Como desarrollador propietario del portfolio
Quiero ver todos mis proyectos como una cuadrícula de tarjetas
Para tener visibilidad rápida del estado de cada uno sin abrir cada repositorio
```

**Criterios de aceptación**

- CA-1.1 — Dado el catálogo cargado, cuando abro la aplicación sin aplicar filtros, entonces se
  muestra una tarjeta por cada proyecto de `src/data/projects.js`.
- CA-1.2 — Dada una tarjeta de proyecto, cuando se renderiza, entonces muestra: nombre, insignia de
  estado, descripción, versión, versión de scaffold, etiquetas de stack y enlaces a repositorio y
  demo.
- CA-1.3 — Dado el título de la aplicación, cuando se renderiza la cabecera, entonces muestra
  `app.title` ("DevDeck") y `app.subtitle` ("Your personal development project catalog").
- CA-1.4 (accesibilidad) — Dado que el usuario solo usa teclado, cuando navega la página, entonces
  puede alcanzar y activar todos los controles interactivos (filtros de estado, switch de idioma,
  enlaces activos de repo/demo) mediante Tab y Enter/Espacio, sin ratón.
- CA-1.5 — Dado el catálogo, cuando se renderiza (con o sin filtro de estado aplicado), entonces
  las tarjetas aparecen ordenadas alfabéticamente por `name` (case-insensitive,
  `localeCompare`) — independientemente del orden en que estén declaradas en `projects.js`.
  Decisión explícita del usuario: alfabético puro, sin agrupar por estado ni por actividad
  reciente (por ahora — puede revisitarse).

---

## US-2 — Filtrar proyectos por estado

```
Como desarrollador
Quiero filtrar las tarjetas por estado del proyecto
Para centrarme solo en los proyectos activos, en progreso, pausados o en fase de idea
```

**Criterios de aceptación**

- CA-2.1 — Dado el conjunto de proyectos, cuando abro la aplicación, entonces el filtro activo por
  defecto es "All" (`filters.statusAll`) y se muestran todos los proyectos.
- CA-2.2 — Dado el filtro en "All", cuando pulso una píldora de estado (`active`, `in-progress`,
  `paused`, `idea`), entonces solo se muestran los proyectos cuyo `status` coincide y esa píldora
  queda marcada como activa (`filter-pill--active`).
- CA-2.3 — Dado un estado seleccionado, cuando pulso "All", entonces vuelven a mostrarse todos los
  proyectos.
- CA-2.4 (accesibilidad) — Dado el grupo de filtros de estado, cuando un lector de pantalla lo
  recorre, entonces se anuncia como grupo etiquetado con `filters.statusLabel` ("Status")
  (`role="group"` + `aria-label`).

**Textos de interfaz (i18n)**

| Clave | Valor EN de referencia |
|---|---|
| `filters.statusLabel` | "Status" |
| `filters.statusAll` | "All" |
| `status.active` | "Active" |
| `status.in-progress` | "In progress" |
| `status.paused` | "Paused" |
| `status.idea` | "Idea" |

---

## US-4 — Consultar los metadatos de cada proyecto

```
Como desarrollador
Quiero ver versión, scaffold, stack y enlaces en cada tarjeta
Para conocer el detalle técnico de un proyecto de un vistazo
```

**Criterios de aceptación**

- CA-4.1 — Dada una tarjeta, cuando se renderiza, entonces muestra la etiqueta `card.version`
  ("Version") con el valor de `version`, y `card.scaffold` ("Scaffold") con el valor de
  `scaffoldVersion`.
- CA-4.2 — Dado un proyecto con `scaffoldVersion: null`, cuando se renderiza su tarjeta, entonces
  el campo scaffold muestra `card.notAvailable` ("Not available") en lugar de un valor vacío.
- CA-4.3 — Dado el `stack` de un proyecto, cuando se renderiza, entonces cada tecnología del array
  aparece como una etiqueta independiente.
- CA-4.4 — Dado un proyecto con `repo` no nulo, cuando se renderiza el enlace de repositorio,
  entonces es un `<a>` con `target="_blank"` y `rel="noreferrer"` que abre la URL; dado `repo:
  null`, entonces el enlace se muestra deshabilitado (`project-link--disabled`, sin navegación).
- CA-4.5 — Igual que CA-4.4 aplicado al campo `demo`.

**Textos de interfaz (i18n)**

| Clave | Valor EN de referencia |
|---|---|
| `card.version` | "Version" |
| `card.scaffold` | "Scaffold" |
| `card.repo` | "Repository" |
| `card.demo` | "Demo" |
| `card.notAvailable` | "Not available" |

---

## US-5 — Cambiar el idioma de la interfaz

```
Como usuario
Quiero cambiar entre inglés y castellano
Para leer la interfaz en mi idioma preferido
```

**Criterios de aceptación**

- CA-5.1 — Dada la aplicación recién cargada, cuando se muestra la interfaz, entonces el idioma por
  defecto es inglés (EN).
- CA-5.2 — Dado el idioma EN, cuando pulso "ES" en el conmutador, entonces todos los textos visibles
  cambian a castellano (`locales/es/common.json`) y el botón ES queda marcado como activo.
- CA-5.3 — Dado un cambio de idioma, cuando se reevalúa la interfaz, entonces las insignias de
  estado, etiquetas de tarjeta, filtros y estado vacío se traducen de forma consistente sin claves
  sin resolver visibles.

---

## US-6 — Estado vacío tras filtrar

```
Como usuario
Quiero un mensaje claro cuando ningún proyecto cumple los filtros
Para entender que la lista está vacía por elección propia, no por un error
```

**Criterios de aceptación**

- CA-6.1 — Dada una combinación de filtros que no deja ningún proyecto visible, cuando se recalcula
  la lista, entonces se oculta la cuadrícula y se muestra el estado vacío con `empty.title` ("No
  projects match these filters") y `empty.hint` ("Try a different status").
- CA-6.2 — Dado el estado vacío, cuando relajo el filtro de estado hasta que vuelve a haber
  coincidencias, entonces la cuadrícula reaparece y el estado vacío desaparece.

**Textos de interfaz (i18n)**

| Clave | Valor EN de referencia |
|---|---|
| `empty.title` | "No projects match these filters" |
| `empty.hint` | "Try a different status" |

---

## US-7 — Consultar estadísticas de GitHub en vivo

```
Como desarrollador
Quiero que cada tarjeta muestre datos de GitHub (estrellas, commits, lenguaje...)
Para no tener que actualizarlos yo mismo cada vez que cambia algo en el proyecto
```

**Criterios de aceptación**

- CA-7.1 — Dado un proyecto con `repo` apuntando a `https://github.com/<owner>/<repo>`, cuando
  `npm run build` corre, entonces `scripts/fetch-github-stats.mjs` consulta la API de GitHub y
  `src/data/github-stats.generated.json` incluye una entrada para ese `<owner>/<repo>`.
- CA-7.2 — Dado un proyecto con estadísticas de GitHub disponibles, cuando se renderiza su tarjeta,
  entonces muestra (cuando el dato existe): estrellas (`github.stars`), lenguaje principal
  (`github.language`), nº de commits (`github.commits`), nº de colaboradores
  (`github.contributors`), issues abiertas (`github.openIssues`), licencia (`github.license`),
  tamaño del repo en KB (`github.size`), fecha del último push (`github.lastUpdate`) y sus topics
  como etiquetas independientes.
- CA-7.3 — Dado un proyecto con `repo: null` o con una URL que no es de GitHub, cuando se renderiza
  su tarjeta, entonces no aparece la sección de estadísticas de GitHub ni la de topics.
- CA-7.4 — Dado un campo individual de `github` ausente o `null` (p.ej. sin `license`), cuando se
  renderiza la tarjeta, entonces esa etiqueta concreta se omite sin romper el resto de la sección.
- CA-7.5 — Dado un fallo de red o de la API para un repo concreto durante el fetch, cuando
  `fetch-github-stats.mjs` corre, entonces conserva el último dato bueno conocido de ese repo (si
  lo había) y el build no falla por ello.
- CA-7.6 — Dado el workflow de despliegue, cuando pasan 6 horas sin ningún push a `main`, entonces
  el disparador `schedule` vuelve a ejecutar el build y republica el sitio con datos frescos.

**Textos de interfaz (i18n)**

| Clave | Valor EN de referencia |
|---|---|
| `github.sectionLabel` | "GitHub stats" |
| `github.stars` | "Stars" |
| `github.language` | "Language" |
| `github.commits` | "Commits" |
| `github.contributors` | "Contributors" |
| `github.openIssues` | "Open issues" |
| `github.license` | "License" |
| `github.size` | "Repo size" |
| `github.lastUpdate` | "Last update" |

**Fuera de alcance de esta US:** líneas de código reales (se usa `size` en KB como aproximación,
ver ADR-002), actualización en tiempo real al segundo (hasta 6h de desfase, asumido por el
usuario), y datos de repos privados sin token configurado (`GH_STATS_TOKEN`, pendiente de decisión
— ver `docs/backlog.md`).

---

## Casos edge identificados

| # | Escenario | Comportamiento esperado | Estado |
|---|---|---|---|
| E-1 | `scaffoldVersion: null` (p.ej. FobForge) | Muestra "Not available" (`card.notAvailable`) | Cubierto (CA-4.2) |
| E-2 | `repo: null` | Enlace de repo deshabilitado, sin navegación | Cubierto (CA-4.4) |
| E-3 | `demo: null` | Enlace de demo deshabilitado, sin navegación | Cubierto (CA-4.5) |
| E-4 | Filtro que deja 0 proyectos (p.ej. estado `idea`, sin proyectos con ese estado) | Estado vacío visible | Cubierto (CA-6.1) |
| E-6 | `stack` vacío `[]` | No se renderiza ninguna etiqueta; la tarjeta no rompe | A verificar por Tester (hoy ningún proyecto tiene stack vacío) |
| E-7 | `name` duplicado entre proyectos | La `key` de React (`project.name`) colisiona → riesgo de render | A vigilar: la unicidad del nombre es un invariante implícito del modelo de datos |
| E-8 | URL de `repo`/`demo` malformada | El navegador intenta abrirla tal cual; no hay validación de formato | Aceptado — dato de confianza del propietario |
| E-9 | `repo` es una URL válida pero no de `github.com` (p.ej. GitLab) | No se intenta fetch; `github: null`, sin sección de estadísticas | Cubierto (CA-7.3, `parseGithubSlug` devuelve `null`) |
| E-10 | Repo de GitHub privado o inexistente (404/403 al hacer fetch) | Se conserva el dato previo si lo había; si nunca se pudo obtener, `github: null` para ese proyecto | Cubierto (CA-7.5) |
| E-11 | Licencia `NOASSERTION` (repo sin licencia declarada reconocida por GitHub) | Se trata como ausente (`license: null`), no se muestra la etiqueta | Cubierto (`buildStatsFromRepoResponse`) |

---

## Fuera de alcance (esta versión)

- Edición o alta de proyectos desde la propia UI (persistencia real) — el catálogo es de solo
  lectura sobre `projects.js`.
- Búsqueda por nombre o stack.
- Ordenación de tarjetas (por fecha, estado, etc.).
- Autenticación / control de acceso.
- Fetch de datos de GitHub en el navegador del visitante (descartado por rate limiting — ver
  ADR-002; se hace en build time).
- Conteo real de líneas de código (descartado por requerir clonar cada repo — ver ADR-002; se usa
  `size` en KB como aproximación).

---

## Requisitos no funcionales

- **Rendimiento:** el filtrado es en memoria sobre un array pequeño (`useMemo`). El navegador del
  visitante nunca hace llamadas de red para obtener datos — las estadísticas de GitHub ya vienen
  horneadas en el bundle desde el build.
- **Seguridad / privacidad:** sin backend, todo el contenido de `projects.js` y de
  `github-stats.generated.json` viaja en el bundle JS servido al cliente — no debe incluirse en él
  ningún dato que no pueda hacerse público. El sitio ya está desplegado en GitHub Pages
  (`https://mrgn79.github.io/DevDeck/`). El token `GH_STATS_TOKEN` (si se configura) vive solo como
  secret de GitHub Actions, nunca en el bundle ni en el repositorio.

---

## Base jurídica del tratamiento de datos

La feature **no trata datos personales de terceros**: los datos son metadatos de proyectos del
propio desarrollador, introducidos manualmente. No hay recogida, tracking ni almacenamiento de
datos de usuarios. No aplica base jurídica RGPD art. 6 en esta versión.

---

## Dependencias

- Modelo de datos manual `src/data/projects.js` como fuente de verdad de los campos que GitHub no
  puede darnos.
- API REST de GitHub (`api.github.com`), consultada solo en build time por
  `scripts/fetch-github-stats.mjs` — no en el navegador del visitante.
- Solución i18n propia (`src/i18n/`) con locales `locales/en` y `locales/es`.
- Ninguna dependencia de backend.

---

## Métricas de negocio

No aplican — dictamen de Growth 🔴 (herramienta interna sin vía comercial). No se instrumentan
eventos de negocio.

---

## Discrepancias i18n detectadas (para Frontend / Maquetador)

Durante la verificación de las specs contra el código y los locales, se detectó una
inconsistencia menor que conviene resolver en una futura iteración de limpieza (`chore/`):

1. **`card.stack`** ("Stack") está definida pero **no se usa**: las etiquetas de stack se renderizan
   sin encabezado. O se añade la etiqueta, o se elimina la clave.

No bloquea la aceptación de la feature; queda registrada como deuda técnica (ver `docs/backlog.md`).
