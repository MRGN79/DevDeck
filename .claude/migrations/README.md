# Migraciones del Scaffold

> **Nota (v1.8.0+):** Los archivos de migración individuales (`vX.Y.Z.md`) ya no existen.
> El mecanismo de actualización ha cambiado: `.claude/sync.md` hace una sincronización
> completa de estado — independientemente de la versión de partida, aplica el estado
> actual del scaffold de una vez, sin prompts intermedios.

## Cómo actualizar un proyecto al scaffold más reciente

Pega el contenido de `.claude/sync.md` en Claude Code abierto en tu proyecto.
El prompt detecta automáticamente si necesitas adopción completa (primera vez) o
actualización (ya tienes el scaffold en cualquier versión anterior) y ejecuta
el proceso que corresponda en una sola sesión.

No hace falta saber de qué versión vienes ni buscar migraciones intermedias.

## Qué versión tiene mi proyecto

```bash
cat .claude/scaffold.json
```

## Historial de versiones

Ver `.claude/SCAFFOLD_CHANGELOG.md`.
