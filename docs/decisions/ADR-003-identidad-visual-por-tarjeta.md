# ADR-003: Fondo de tarjeta basado en la identidad visual real de cada proyecto

**Fecha:** 2026-07-10
**Estado:** Aceptado
**Decidido por:** Maquetador (con UX-UI)

---

## Contexto

El usuario pidió una iteración visual del catálogo: "más diferencial y menos estandarizado,
originalidad sin perder profesionalidad", y preguntó explícitamente si el fondo de cada tarjeta
podría basarse en el "background" de cada proyecto.

Tras aclarar la ambigüedad con el usuario (¿lenguaje de programación? ¿paleta temática
inventada? ¿patrón generado por hash?), la respuesta fue literal: **leer el CSS real de cada
proyecto desplegado y traducirlo a la tarjeta**. Se intentó primero contra el sitio desplegado
(GitHub Pages de cada proyecto), pero la política de red del entorno de esta sesión no permite
alcanzar `*.github.io` (solo `api.github.com` está en la lista de hosts permitidos). Se resolvió
añadiendo los cuatro repos a la sesión (`add_repo`) y clonándolos para leer su CSS directamente.

## Decisión

Cada tarjeta del catálogo lleva un acento de color (franja superior de 3px) y un degradado de
fondo sutil (`radial-gradient`, baja opacidad) extraídos a mano de la hoja de estilos real de
cada proyecto, aplicados vía atributo `data-project="<id>"` en `.project-card` y reglas CSS
scoped en `src/App.css`. La base de la tarjeta sigue siendo la superficie oscura del catálogo
(`--bg-elevated`) — no se reproduce el tema completo de cada proyecto (algunos son claros, como
TerceroDePrimaria), solo un eco de sus colores de marca sobre el sistema visual del catálogo.
Esto preserva la consistencia y el contraste del catálogo como conjunto.

**Paletas extraídas (julio 2026):**

| Proyecto | Fuente | Acento | Nota |
|---|---|---|---|
| DevDeck | `src/App.css` (este mismo repo) | `#7c9eff` (azul, ya existente) | Es la app; usa su propio tema tal cual |
| FobForge | `css/main.css` | `#00d4a0` (menta/teal) | Negro casi puro + acento técnico, RFID/domótica |
| Selfforge | `src/index.css` (Tailwind `@theme`) | `#f97316` (naranja, su propio focus-ring) | Paleta "forja": óxido/ascua sobre carbón — el nombre lo dice literalmente |
| TerceroDePrimaria | `src/styles/tokens.css` | `#ff9e80` (coral) | "Isla viva": coral + sol + turquesa; paleta original es clara, aquí se traduce a eco cálido sobre fondo oscuro |
| TrailStats | `src/styles/app.css` | `#fc5200` (naranja ascua, estilo Strava) | Verde abeto + musgo + ascua — trail running |

Un proyecto sin bloque `[data-project="..."]` propio cae al fallback neutro (borde superior del
color de borde estándar, sin degradado) — no rompe el catálogo, solo no se distingue hasta que
alguien le asigna su paleta.

## Alternativas consideradas

### Opción A — Color por lenguaje de programación (convención GitHub)
**Por qué se descarta (para esto):** ya disponible como dato (`github.language`) y 100%
automático, pero es el patrón más reconocible y "estandarizado" que existe (el puntito de color
de GitHub) — justo lo opuesto a lo que pedía el usuario.

### Opción B — Paleta temática inventada por interpretación editorial
**Por qué se descarta:** habría sido una suposición mía sobre "de qué trata" cada proyecto, no
su identidad real. El usuario pidió explícitamente leer el CSS real en vez de esto.

### Opción C — Patrón generado por hash del id del proyecto
**Por qué se descarta:** único y automático para cualquier proyecto nuevo sin configuración,
pero sin relación real con el proyecto — estética pura, no identidad.

## Consecuencias

**Positivas:**
- Cada tarjeta es reconocible a simple vista sin leer el nombre, y refleja la marca real del
  proyecto, no una convención genérica.
- El catálogo entero sigue leyéndose como un único sistema (misma tipografía, misma estructura,
  mismo tema oscuro base) — la personalización es un acento, no una fragmentación visual.

**Negativas / trade-offs:**
- **No es automático**: a diferencia de las estadísticas de GitHub, esto exige revisar a mano el
  CSS de cada proyecto nuevo y traducirlo a un acento + degradado. Un proyecto sin tema propio
  simplemente no se distingue hasta que se hace ese trabajo — no es un error, es deuda de diseño
  pendiente (registrada en `docs/backlog.md`).
- Para proyectos con tema claro (TerceroDePrimaria), el resultado es una interpretación —no una
  réplica— de su paleta, adaptada a la base oscura del catálogo. Si el usuario prefiere fidelidad
  total (p.ej. una tarjeta con fondo claro para ese proyecto), es una decisión de diseño distinta
  y mayor (rompería la consistencia tonal del catálogo) que no se ha tomado aquí.
- El acceso al CSS real requirió clonar los repos en esta sesión (bloqueado el acceso directo al
  sitio desplegado por política de red) — la próxima vez que un proyecto cambie su paleta, hay que
  repetir el proceso a mano para mantener la tarjeta alineada con el diseño real.
