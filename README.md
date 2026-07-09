# Scaffold de Agentes Claude

Plantilla base para proyectos gestionados por un equipo de 17 agentes de Claude Code
(Jefe, Analista Funcional, Arquitecto, UX-UI, Maquetador, Frontend, Backend, Tester, QA,
Accesibilidad, Responsabilidad Social, Seguridad, DevOps, Documentación, Growth,
Experimentación y Abogado), con flujos de trabajo, gates de calidad y estándares definidos.

## Cómo usarlo en tu proyecto

1. Abre Claude Code en tu proyecto (nuevo o existente, con o sin scaffold previo)
2. Copia el contenido de [`.claude/sync.md`](.claude/sync.md) y pégalo en el chat
3. Claude detecta automáticamente si es una adopción o una actualización, aplica todos los
   cambios y pide confirmación antes del commit

**No clones este repositorio para crear un proyecto** — la adopción vía `sync.md` copia solo
lo necesario. Un clon hereda el historial y los meta-archivos del scaffold, que no pertenecen
a ningún proyecto. Para el arranque completo de un proyecto nuevo, sigue después
[`.claude/project-init-checklist.md`](.claude/project-init-checklist.md).

## Qué contiene

- `CLAUDE.md` — documento maestro: sistema de agentes, flujos de trabajo, estándares
- `.claude/agents/` — definiciones de los 17 agentes
- `.claude/sync.md` — prompt único de adopción y actualización (el punto de entrada)
- `.claude/project-init-checklist.md` — checklist de inicio de proyecto
- `.claude/scripts/safe-commit.sh` — wrapper de commit con control de visibilidad de timestamps
- `.claude/templates/` — plantillas de ADR, changelog y backlog
- `.github/` — plantillas de PR e issues

## Versión

La versión actual vive en `.claude/scaffold.json`; el historial completo de cambios en
`.claude/SCAFFOLD_CHANGELOG.md`.
