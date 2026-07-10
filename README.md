# DevDeck

## ¿Qué es esto?

DevDeck es un catálogo personal de proyectos de desarrollo. Muestra cada proyecto como
una tarjeta con su versión, stack tecnológico, enlaces y estadísticas en vivo de GitHub
(estrellas, lenguaje, commits, colaboradores...).

No tiene backend: los datos manuales de cada proyecto viven en el propio código, y las
estadísticas de GitHub se obtienen automáticamente en cada build — ver
[Estadísticas de GitHub](#estadísticas-de-github-en-vivo).

## Stack

- React 18
- Vite 5
- CSS plano (sin librería de componentes)
- i18n propio (EN/ES) sin dependencias externas

## Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

## Instalación

```bash
npm install
```

## Variables de entorno

Ninguna. La aplicación no tiene backend ni claves de API.

## Cómo ejecutar

```bash
npm run dev
```

Abre `http://localhost:5173`.

## Tests

Suite de tests con [Vitest](https://vitest.dev) y
[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
(entorno jsdom). Cubre el orden alfabético del catálogo, el render de campos nulos y de las
estadísticas de GitHub, la navegación por teclado, el cambio de idioma EN/ES y las funciones
puras del script de estadísticas de GitHub.

```bash
npm test        # ejecuta la suite una vez
npm run test:watch   # modo watch durante el desarrollo
```

## Estructura del proyecto

```
src/
  data/projects.js                  Datos manuales de cada proyecto (fuente de verdad)
  data/github-stats.generated.json  Estadísticas de GitHub — generado en build, no editar a mano
  data/mergedProjects.js            Combina projects.js + github-stats.generated.json
  components/                       ProjectCard
  i18n/                             Provider y hook de internacionalización
  App.jsx                           Composición de la vista principal
locales/
  en/common.json         Textos de interfaz en inglés
  es/common.json         Textos de interfaz en castellano
scripts/
  fetch-github-stats.mjs        Consulta la API de GitHub y escribe github-stats.generated.json
  github-stats-helpers.mjs      Funciones puras (parseo de URL, cabecera Link, mapeo de respuesta)
```

Para añadir un proyecto al catálogo, añade un objeto a `src/data/projects.js` con los
campos: `id` (slug estable), `name`, `description`, `version`, `scaffoldVersion`, `stack`,
`repo`, `demo`. Si `repo` es una URL de GitHub (`https://github.com/<owner>/<repo>`), sus
estadísticas se rellenan solas en el siguiente build — ver la siguiente sección. `demo`
también se rellena solo si lo dejas en `null` (ver "Enlace de demo" más abajo); pon un valor
explícito solo si el proyecto está alojado en otro sitio.

## Enlace de demo

Por defecto, el enlace "Demo" de cada tarjeta apunta a la GitHub Pages del propio proyecto
(`https://<owner>.github.io/<repo>/`, derivada de `repo`) — no hace falta rellenar `demo` a
mano. Si un proyecto está desplegado en otro sitio (Vercel, Netlify, un dominio propio...),
pon esa URL explícitamente en `demo` en `src/data/projects.js` y esa pasa a tener prioridad
sobre el valor por defecto. Si `repo` es `null` o no es de GitHub y `demo` tampoco se rellena,
el enlace se muestra deshabilitado como hasta ahora.

Este valor por defecto es una suposición razonable, no una verificación: si el repo no tiene
GitHub Pages activado, el enlace generado dará 404 hasta que actualices `demo` a mano o
actives Pages en ese repo.

## Estadísticas de GitHub en vivo

Cuando el campo `repo` de un proyecto apunta a `https://github.com/<owner>/<repo>`, la
tarjeta muestra automáticamente: estrellas, lenguaje principal, nº de commits, nº de
colaboradores, issues abiertas, licencia, tamaño del repo y fecha del último push, además
de sus topics como etiquetas. Si `repo` es `null` o no es una URL de GitHub, esa sección
simplemente no aparece.

Estos datos **no se editan a mano**: `npm run build` ejecuta primero
`scripts/fetch-github-stats.mjs` (hook `prebuild`), que consulta la API de GitHub y escribe
`src/data/github-stats.generated.json`. El workflow de despliegue además corre cada 6 horas
(`schedule` en `.github/workflows/deploy.yml`), así que el sitio se refresca solo aunque no
haya ningún commit nuevo. El `git log` no crece por esto — el JSON no se guarda entre
ejecuciones, se regenera desde cero en cada build.

Detalles a tener en cuenta:
- **No es tiempo real al segundo** — el dato puede tener hasta 6 horas de desfase (ver
  `docs/decisions/ADR-002-datos-github-en-build.md` para la justificación completa).
- **"Tamaño del repo" no es "líneas de código"** — es el tamaño en KB que reporta la propia
  API de GitHub, una aproximación barata sin clonar el repositorio.
- **Repos privados** fallan la petición sin autenticar (403/404) y simplemente no muestran
  estadísticas — no rompen el build. Para leerlos hace falta un token con permiso de lectura
  guardado como secret `GH_STATS_TOKEN` en GitHub Actions (visto bueno de Seguridad y del
  Abogado requerido antes de darlo de alta, por el alcance de acceso que otorga).
- Sin `GH_STATS_TOKEN`, las peticiones son sin autenticar (60/hora por IP) — de sobra para
  un catálogo de unos pocos proyectos refrescado cada 6 horas.

Para forzar un refresco manual en local: `npm run fetch-stats`.

## Identidad visual por tarjeta

Cada tarjeta lleva una franja superior y un degradado sutil de fondo con los colores reales
del propio proyecto (no un tema genérico ni derivado de datos de GitHub) — un eco de su
identidad visual real, sobre la base oscura del catálogo. Se define en `src/App.css` con
selectores `.project-card[data-project="<id>"]` (el atributo `data-project` lo pone
`ProjectCard.jsx` a partir de `project.id`).

Añadir el tema de un proyecto nuevo es manual: hay que mirar su CSS/paleta reales y traducirlos
a un acento + degradado. Un proyecto sin bloque propio cae automáticamente al estilo neutro por
defecto — no rompe nada, simplemente no se distingue visualmente hasta que se le da su color.
Detalle de la decisión y de qué proyectos ya tienen tema: `docs/decisions/ADR-003-identidad-visual-por-tarjeta.md`.

## Aviso sobre datos sensibles (importante)

DevDeck no tiene backend: todo el contenido de `src/data/projects.js` se compila dentro
del bundle JavaScript de `dist/` y es visible para cualquiera que inspeccione el sitio
desplegado (código fuente, DevTools o el propio archivo servido). No pongas ahí nada que
no puedas publicar: URLs de repos privados, notas internas, enlaces sensibles, etc.

## Desplegar

```bash
npm run build
```

Genera un sitio estático en `dist/`, desplegable en cualquier hosting estático
(Vercel, Netlify, GitHub Pages, etc.).

### GitHub Pages

El repositorio incluye `.github/workflows/deploy.yml`: en cada push a `main` ejecuta
tests, build y publica `dist/` en GitHub Pages automáticamente.

Para que el despliegue funcione hace falta activar Pages una sola vez en el
repositorio: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
A partir de ahí, cada merge a `main` despliega solo.

El sitio se publica como project page (`https://mrgn79.github.io/DevDeck/`), en la
misma capitalización exacta del nombre del repositorio — GitHub Pages la respeta tal
cual, no la normaliza a minúsculas. Por eso `vite.config.js` fija `base: '/DevDeck/'`.
Si el repositorio cambia de nombre, ese valor debe actualizarse junto con él.

## Contribuir

Proyecto personal — sin proceso de contribución externa por ahora.
