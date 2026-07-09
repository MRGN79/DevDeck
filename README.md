# DevDeck

## ¿Qué es esto?

DevDeck es un catálogo personal de proyectos de desarrollo. Muestra cada proyecto como
una tarjeta con su estado, versión, stack tecnológico y enlaces, con un modo público que
filtra solo los proyectos marcados como visibles y un filtro por estado.

No tiene backend: todos los proyectos viven como datos estáticos en el propio código.

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
(entorno jsdom). Cubre el filtrado por estado, el modo público y su combinación,
el render de campos nulos, el estado vacío, la navegación por teclado y el cambio
de idioma EN/ES.

```bash
npm test        # ejecuta la suite una vez
npm run test:watch   # modo watch durante el desarrollo
```

## Estructura del proyecto

```
src/
  data/projects.js       Datos de los proyectos del catálogo
  components/            ProjectCard, StatusBadge, Filters
  i18n/                  Provider y hook de internacionalización
  App.jsx                Composición de la vista principal
locales/
  en/common.json         Textos de interfaz en inglés
  es/common.json         Textos de interfaz en castellano
```

Para añadir un proyecto al catálogo, añade un objeto a `src/data/projects.js` con los
campos: `id` (slug estable), `name`, `description`, `status` (`active` / `in-progress` /
`paused` / `idea`), `version`, `scaffoldVersion`, `stack`, `repo`, `demo`, `isPublic`.

## Sobre `isPublic` y el "Modo público" (importante)

`isPublic: false` **no oculta ni protege los datos de un proyecto**: solo controla si su
tarjeta se muestra cuando el "Modo público" está activado. Como DevDeck no tiene backend,
todo el contenido de `src/data/projects.js` —incluidos los proyectos marcados como
privados— se compila dentro del bundle JavaScript de `dist/` y es visible para cualquiera
que inspeccione el sitio (código fuente, DevTools o el propio archivo servido).

Por tanto, **no pongas en `src/data/projects.js` nada que no puedas publicar**: URLs de
repos privados, notas internas, enlaces sensibles, etc. El "Modo público" es una comodidad
de visualización, no un control de acceso.

## Desplegar

```bash
npm run build
```

Genera un sitio estático en `dist/`, desplegable en cualquier hosting estático
(Vercel, Netlify, GitHub Pages, etc.).

## Contribuir

Proyecto personal — sin proceso de contribución externa por ahora.
