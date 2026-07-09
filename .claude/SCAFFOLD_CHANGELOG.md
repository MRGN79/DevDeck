# Scaffold Changelog

## [1.15.0] — 2026-07-04

Versión combinada proyecto + scaffold, visible en cada proyecto como referencia interna del usuario.

### Formato y superficies
- **Formato:** `X.Y.Z — scaffold A.B.C` (ej.: `2.3.1 — scaffold 1.14.1`) — nueva subsección en CLAUDE.md §Versionado
- **Dónde aparece:** en el resumen de estado del Jefe al iniciar sesión y siempre que reporte versión en el chat (jefe.md), y en la línea "Versión actual" de `docs/backlog.md` (plantilla actualizada)
- **Dónde NO aparece nunca:** manifiesto (rompería SemVer), UI, changelog de usuarios ni ningún artefacto desplegado — coherente con la regla de confidencialidad de v1.14.0
- **Mantenimiento automático:** Documentación actualiza la parte del proyecto al cerrar cada release (documentacion.md); la sincronización actualiza la parte del scaffold en cada adopción/actualización (sync.md, ambos modos)

---

## [1.14.1] — 2026-07-04

Novena ronda de auditoría: simetría de la capa de confidencialidad (v1.14.0) y barrido mecánico de todas las referencias cruzadas del repo. 9 hallazgos corregidos.

### Capa de confidencialidad afinada
- **El grep del artefacto de DevOps era absoluto** ("cero resultados esperados") y habría bloqueado apps legítimas ("scaffold" como término de dominio, dependencias con ese nombre en el bundle, comentarios de licencia de terceros) — el criterio es ahora semántico: solo bloquea lo que realmente revela el proceso; los falsos positivos se anotan y no bloquean
- **seguridad.md**: la nueva área quedó sin número entre la 3 y la 4 (renumerada como 4, las siguientes 5 y 6), no tenía hueco en la plantilla de output del gate (añadido — sin slot se podía omitir en silencio) y un bullet duplicaba A05 (ahora remite)
- **Los autores del código desplegable no tenían la regla**: nueva sección "Confidencialidad del proceso" en frontend.md, backend.md y maquetador.md — la detección era solo downstream (Seguridad/DevOps); ahora quienes pueden evitar introducir la fuga tienen el recordatorio
- **La advertencia de repo público omitía las PRs** en jefe.md y el checklist (solo CLAUDE.md las mencionaba, pero es el Jefe quien advierte): el historial de PRs con sus checkboxes de gates también expone la maquinaria

### Barrido de referencias cruzadas (~70 verificadas, 2 rotas)
- El índice de flujos citaba "Revert de una feature desplegada" (el título real lleva "ya")
- CLAUDE.md citaba "el checklist de cierre" de jefe.md, cuyo título real es "Checklist antes de marcar como listo"
- Todo lo demás resuelve: 14 referencias "ver X", ~40 rutas citadas (todas con creador definido), nombres de flujos y de los 17 agentes, y sin menciones de versión del scaffold con riesgo de obsolescencia

---

## [1.14.0] — 2026-07-04

Confidencialidad del scaffold en los despliegues: la información del proceso (qué agentes, cómo se relacionan, flujos) nunca debe publicarse.

### Dos capas de protección explícitas
- **CLAUDE.md — "Archivos Privados"**: nueva motivación de la sección (los archivos revelan la maquinaria interna) y segunda capa de la regla — el **código desplegable** está libre de referencias al scaffold: ningún comentario, string, mensaje de error, nombre de variable o metadato del build menciona agentes, flujos o el scaffold; los agentes escriben el código como lo escribiría un equipo humano anónimo (también en Estándares Generales)
- **seguridad.md**: nueva área de revisión "Fuga de información del proceso interno" — referencias al scaffold en código, exclusión de archivos privados, mensajes de error sin rutas internas
- **devops.md**: nueva comprobación en el checklist pre-deploy — grep del artefacto construido buscando referencias al scaffold, cero resultados esperados

### El repositorio público como decisión consciente
- La exclusión protege los despliegues, no el repo: si se hace público, `.claude/`, `CLAUDE.md` y `docs/` son visibles en GitHub. Nueva advertencia en CLAUDE.md, jefe.md (el Jefe la traslada y el usuario decide: privado, exposición aceptada, o copia limpia) y el checklist de init

---

## [1.13.2] — 2026-07-03

Octava ronda de auditoría (parcial — dos de tres auditorías; la tercera en curso): hechos y constantes repetidos entre archivos, y simulación integral de ciclo de vida con las reglas acumuladas. 7 hallazgos corregidos.

### Fricciones detectadas simulando un ciclo de vida completo
- **Micro-cambio bloqueado en silencio**: con una PR de feature abierta que toca ficheros compartidos (CSS raíz, changelog), la política de ramas paralelas frena el micro-cambio — el flujo ahora lo explicita y el Jefe informa al usuario de la espera
- **La entrada de changelog de un hotfix de infraestructura no tenía ruta a main**: CHANGELOG.md no es meta-archivo y este hotfix no genera rama — la entrada viaja ahora en la siguiente rama que toque el changelog o en una rama `docs/post-mortem-descripcion` vía PR (CLAUDE.md + documentacion.md)
- **Revert en fase 0.y.z**: "eliminar funcionalidad publicada = MAJOR" habría forzado un salto a 1.0.0 que señalaría estabilidad — en 0.y.z el revert es MINOR
- **Revert con cambios posteriores encima** (p.ej. un experimento consolidado sobre la feature revertida): los conflictos se resuelven conservando los cambios posteriores y Tester amplía la regresión

### Simetría pendiente de v1.13.1
- experimentacion.md conservaba 3 menciones de 2 valores ("ship/rollback") — unificadas a los 4 (ship/rollback/extender/iterar), con la aclaración de que extender/iterar no tocan flags; jefe.md también
- El discriminador de contexto de jefe.md no cubría el caso ambiguo (residuos de clon con señales de ambos): se trata como proyecto y se recomienda la sincronización

### Auditoría de hechos y constantes — sin hallazgos materiales
- Verificados y consistentes: WCAG 2.1 AA (4 archivos), umbrales 24h/48h (el del Abogado es deliberado), fechas y artículos legales (EAA 2019/882, RDL 1/2023, RD 1112/2018, edades 14/16), rutas de locales y ADRs, constantes estadísticas (80%/α=0.05), tipos de rama (8), formato de tags y ventana sensible

---

## [1.13.1] — 2026-07-03

Séptima ronda de auditoría: simetría de v1.13.0, lectura integral de CLAUDE.md con ojos nuevos tras 7 versiones de parches, y coherencia interna de los 9 agentes más modificados. 20 hallazgos corregidos.

### Deadlock en sync.md (grave)
- La salvaguarda de v1.13.0 y la limpieza de clon de v1.12.0 usaban las mismas señales (`releasedAt`, `SCAFFOLD_CHANGELOG.md`), y como la salvaguarda corre primero, un proyecto contaminado por un clon quedaba bloqueado para siempre — la autocuración era código muerto. El discriminador ahora usa `adoptedAt`: si existe, es un proyecto y la limpieza procede; si no existe y hay señales de scaffold, aborta remitiendo al Paso 0 del checklist

### El hotfix de infraestructura contradecía al resto del sistema
- Los pasos de bump/tag del flujo y la nota "el hotfix va por PR" asumían siempre una rama — ahora están acotados al vector código, y el vector infraestructura queda definido: sin rama, PR, bump ni tag; post-mortem de DevOps y registro en changelog
- devops.md tiene ahora la sección "Hotfix de infraestructura" (su propio checklist pre-deploy exigía PR+CI para un camino que no los tiene) y la sección "En pausa del proyecto" (apagar infraestructura + lista de reanudación)
- documentacion.md sabe registrar un incidente sin commit de código ([Unreleased], Fixed, desde el post-mortem)

### Deriva por parches acumulados en CLAUDE.md
- "extender" aparecía solo en el flujo Experimento — unificado a 4 valores (ship/rollback/extender/iterar) en la tabla de contratos y documentacion.md
- La tabla de contratos no reflejaba responsabilidades añadidas: Arquitecto (valoración de reverts + migraciones down), DevOps (pausa, post-mortem), Growth (caducidad del dictamen por pivote); coordinación lateral Arquitecto↔Backend añadida
- El punto de confirmación del deploy difería entre Feature (autorizaba PR, el deploy ocurría solo) y Bug Fix — unificado: la confirmación cubre PR+merge+deploy, y Bug Fix menciona ahora la PR explícitamente
- `scaffold.json` tenía tres categorizaciones incompatibles (meta-archivo editable / gestionado por sync / no listado) — aclarado: la excepción regula cómo se committea, el contenido lo gestiona la sincronización
- La regla i18n "una petición en un idioma actualiza ambos locales" vivía solo en el flujo Micro-cambio — subida a la sección Internacionalización
- Índice de los 10 flujos al inicio de "Flujos de Trabajo Estándar" (el documento supera las 600 líneas)
- Títulos citados de sección corregidos a "Estrategia de Ramas y PRs" en tres archivos

### Coherencia interna de agentes
- jefe.md: la lista de gates de "Tu rol" era absoluta y contradecía sus propios flujos de bug fix/hotfix (un Jefe literal habría bloqueado un hotfix esperando QA) — ahora remite a los gates del tipo de flujo; el párrafo del límite de 3 features estaba insertado en medio de la lista de pending-actions — movido a su propia subsección; "producción o staging" para experimentos
- experimentacion.md: el "nunca detener antes de la muestra" absoluto contradecía su propia parada de seguridad por guardián — ahora enumera las dos excepciones legítimas (guardián violado, pausa del proyecto)
- abogado.md: los dos bloques de "Menores" separados por el apartado de IA (con DSA art. 28 duplicado) — fusionados
- documentacion.md: el description no incluía LICENSE ni docs/experiments/; analista-funcional.md: "Tu rol" no mencionaba la propiedad del backlog; typo en devops.md

---

## [1.13.0] — 2026-07-03

Sexta ronda de auditoría, con lente nueva: el usuario habla solo con el Jefe y el Jefe activa al resto. Tres auditores (manual del Jefe, 12 conversaciones simuladas usuario→Jefe, simetría v1.12.0). 24 hallazgos corregidos.

### Crítico — sync.md podía autodestruir el scaffold
- Ejecutar sync.md dentro del propio repo scaffold con versión local ≠ remota (el estado normal durante el desarrollo) entraba en MODO B y borraba `SCAFFOLD_CHANGELOG.md`, `migrations/` y reescribía el `releasedAt` legítimo. FASE 1 tiene ahora una salvaguarda: si el scaffold.json local lleva `releasedAt` o existe el changelog, aborta con mensaje explícito

### Dos flujos nuevos — operaciones hacia atrás (inexistentes hasta ahora)
- **Revert de una feature desplegada**: identificación del commit con confirmación en lenguaje llano, valoración MAJOR y migraciones down por el Arquitecto, rama `revert/` (añadida a la nomenclatura), regresión, gates y changelog "Removed"
- **Pausar el proyecto**: inventario de lo abierto, WIP commiteado, PRs a draft, decisión del usuario sobre experimentos en vuelo (pararlos antes de la muestra invalida el resultado), DevOps apaga la infraestructura con coste y registra la lista de reanudación en pending-actions

### El manual del Jefe cubría los flujos de código pero no los de fase/decisión
- Nueva sección "Otros flujos que tú disparas" en jefe.md: Experimento (ofrecerlo cuando el usuario dude — no sabe que Experimentación existe; enrutar informe a Documentación al cierre), Decisión de Arquitectura, Revert, Pausa, Micro-cambio, consultas de dependencia (Abogado+Arquitecto en paralelo), consultas multi-especialista (consolidar una sola respuesta no técnica), handoffs de Growth estratega (no lanzar a UX-UI a diseñar conversión sin el brief), DevOps consultivo, y ejecución de la actualización del scaffold explicada sin jerga
- Detección de proyecto sin inicializar al arrancar: el Jefe coordina project-init-checklist.md en vez de tratar el primer requisito como feature, y verifica su "Definición de inicializado"
- La versión del estado se lee del manifiesto (antes no se decía de dónde)

### Triaje y vectores que faltaban
- **Criterio Bug Fix vs Hotfix** (CLAUDE.md + jefe.md): producción + bloqueo a usuarios ahora = hotfix; en duda, pregunta en lenguaje llano — la elección cambia los gates
- **Hotfix de infraestructura**: una caída no siempre es código — DevOps como vector (servidor, certificados, DNS, deploy roto), sin rama si no hay cambio de código
- **Micro-cambio** (flujo nuevo): rama `chore/` y gates exprés para textos/estilos; una petición en un idioma actualiza ambos locales, confirmando el otro idioma si cambia el significado

### Simetría v1.12.0 y otros
- El checklist asignaba a Documentación crear LICENSE pero documentacion.md no lo sabía (ni abogado.md en modo Día 0 decía determinar la licencia del proyecto) — ambos propagados
- `deny: "Bash(rm -rf /*)"` era sobre-amplio y bloqueaba el `rm -rf /tmp/scaffold-sync` que la propia sync.md instruye — restringido a la raíz exacta
- La descripción de safe-commit.sh en CLAUDE.md no mencionaba la rama de monotonía ni el fallback de hora real — matizada
- growth.md: activación del modo estratega a mitad de proyecto (lo construido no se reabre en bloque; retrofits como features priorizadas)
- jefe.md: "Decisiones Pendientes" se committea en main como el resto del backlog

---

## [1.12.0] — 2026-07-03

Quinta ronda de auditoría (simetría de v1.11.0, infraestructura ejecutable, simulación del checklist de inicialización). 26 hallazgos corregidos.

### Infraestructura ejecutable (primera auditoría del código real)
- **safe-commit.sh no funcionaba en macOS/BSD**: `date -d "yesterday"` es GNU-only — ahora hay fallback `date -v-1d` y, si ambos fallan, el commit sale con hora real avisando en vez de generar un timestamp malformado
- **safe-commit.sh producía historial no monotónico**: dos commits en la misma sesión recibían horas aleatorias independientes (el hijo podía quedar fechado antes que el padre). Ahora se compara con el epoch del commit padre y, si el candidato es anterior, se fecha 1–10 min después del padre
- **Offset DST**: el offset de la víspera se calcula para la víspera, no para hoy
- **settings.json**: lista `deny` mínima (rm -rf /, git push -f/--force)
- **README.md creado en la raíz** — el repo no tenía forma de explicarse a un visitante; el punto de entrada (sync.md) estaba enterrado en `.claude/`

### Checklist de inicialización reescrito (simulación end-to-end)
- **Paso 0 nuevo — instanciar el proyecto**: el checklist no decía cómo se crea el proyecto. Ahora: adopción vía sync.md (nunca clonar), verificación de `adoptedAt`, y limpieza si se partió de un clon (el clon heredaba `releasedAt` y `SCAFFOLD_CHANGELOG.md`, con lo que el discriminador de contexto de jefe.md trataría al proyecto como si FUERA el scaffold — anulando la protección de v1.11.0)
- **Excepción de bootstrap documentada** (checklist + CLAUDE.md): los commits de inicialización van a main hasta activar la branch protection — antes, la protección exigía un CI que aún no existía y el checklist se auto-bloqueaba
- **Dueño en cada paso** (más de la mitad eran huérfanos), branch protection movida tras el CI verde, creación del fichero LICENSE (antes solo se "validaba" un fichero que nadie creaba), "primer commit público" definido, manifiesto con versión inicial 0.1.0 y tag v0.1.0, verificación de exclusión de archivos privados en el primer deploy, y sección final "Definición de inicializado" verificada por el Jefe
- **Excepción AF→Arquitecto**: a Día 0 el Arquitecto elige stack sin specs (documentado en checklist y jefe.md)
- **sync.md**: el ADR de adopción usa ahora numeración `ADR-NNN` y la estructura de la plantilla (convivían dos convenciones); la limpieza de MODO B elimina también `SCAFFOLD_CHANGELOG.md` y corrige `releasedAt`→`adoptedAt` heredados de un clon; deduplicación determinista del hook pre-marca (evita el aviso duplicado al actualizar desde ≤v1.10)

### Simetría de v1.11.0
- **La excepción del backlog-en-main no llegó a growth.md ni experimentacion.md** — los otros dos escritores del backlog seguían committeando en rama, reintroduciendo el conflicto que se quiso eliminar; `docs/growth/plan.md` incorporado a la lista de meta-archivos
- **jefe.md no sabía que debe reinvocar a Growth tras un pivote** (CLAUDE.md y growth.md se lo asignaban)
- tester.md y seguridad.md documentan ahora su rol pre-deploy en hotfix; referencia interna imprecisa de jefe.md corregida; fórmula del fallback del Abogado unificada en maquetador.md

### Otros
- Template de backlog: nota de que es meta-archivo committeado en main
- bug_report.md: campo "Área o componente afectado" (el vector que el Jefe usa para asignar el diagnóstico)

---

## [1.11.0] — 2026-07-03

Cuarta ronda de auditoría, parte 2: verificación de simetría de v1.10.0, doble contexto de jefe.md en proyectos, y caza adversarial de colisiones entre reglas. 16 hallazgos corregidos.

### El doble contexto de jefe.md (crítico)
- jefe.md se copia verbatim a los proyectos, pero "Cuando el scaffold recibe una mejora aprobada" instruía a incrementar `scaffold.json`, escribir en `SCAFFOLD_CHANGELOG.md` y editar los archivos del scaffold — ejecutado dentro de un proyecto violaba la inmutabilidad, corrompía el versionado de adopción y creaba un archivo fantasma. Ahora la sección discrimina el contexto (el scaffold tiene `SCAFFOLD_CHANGELOG.md` y `releasedAt`; un proyecto tiene `adoptedAt`): en el scaffold se aplica directamente; en un proyecto se registra en `scaffold-suggestions.md` y se genera el prompt de traslado
- La lista de meta-archivos del Jefe marca `SCAFFOLD_CHANGELOG.md` como exclusivo del repo scaffold e incluye `docs/backlog.md`

### Colisiones entre reglas resueltas
- **El backlog no tenía modelo de branching** (editarlo en ramas paralelas = conflicto garantizado; editarlo en main = prohibido): nueva excepción de meta-archivos de proceso en la Estrategia de Ramas — `docs/backlog.md`, `pending-actions.md`, `scaffold-suggestions.md` y `scaffold.json` se commitean directamente en `main`; analista-funcional.md, qa.md y jefe.md actualizados
- **Un hotfix quedaba bloqueado por la política de ramas paralelas** (siempre toca changelog y manifiesto): la política exime a `hotfix/` — prioridad de merge, y el rebase lo asume la feature abierta
- **Hotfix en ventana sensible**: la urgencia prevalece — se informa del timestamp real y se procede, sin esperar la decisión de postponer (CLAUDE.md, jefe.md, devops.md)
- **Los hooks del scaffold en settings.json eran inactualizables** ("hooks propios se preservan" sin marca de procedencia): los hooks del scaffold llevan ahora la marca `# scaffold-hook` en su comando y la sincronización los sobreescribe; los del proyecto se preservan
- **El límite de 3 items en Trabajo Activo no tenía ejecutor**: el Jefe lo hace cumplir (señala, propone cerrar/pausar/encolar); el Analista solo mantiene la tabla
- **El implementador no tenía fallback mientras el Abogado revisa una licencia**: no integra la dependencia (ni provisionalmente) pero continúa con otra parte del trabajo — CLAUDE.md, frontend.md, backend.md, maquetador.md
- **Deslinde pending-actions vs. "Decisiones Pendientes"**: acción definida y diferida en el tiempo → pending-actions; pregunta de negocio abierta → backlog (jefe.md)
- **Umbral de la Consulta Puntual**: responder es leer y explicar; cualquier modificación de archivos — incluso un typo — es trabajo de flujo y se remite al Jefe
- **El dictamen de Growth no caducaba**: un pivote de audiencia/mercado/modelo lo invalida y re-dispara el modo consultor (CLAUDE.md, growth.md)

### Simetría de v1.10.0 completada
- El flujo Hotfix no decía quién crea la rama `hotfix/` — el Jefe, como en los demás flujos (CLAUDE.md, jefe.md)
- jefe.md orquestaba el hotfix sin la intervención pre-merge de Documentación (bump PATCH + changelog en la rama) — el orquestador contradecía a los tres archivos ejecutores
- abogado.md no reconocía su gate obligatorio pre-lanzamiento de variantes de experimento — nuevo modo documentado
- qa.md no mencionaba el gate de cierre del ship de experimento — añadido

---

## [1.10.1] — 2026-07-02

Cuarta ronda de auditoría, parte 1: simulación en seco de `.claude/sync.md` (adopción y actualización, archivo por archivo). 9 hallazgos, 6 críticos.

### Adopción (MODO A)
- **FASE 3 no cubría el caso más común**: un proyecto con CLAUDE.md propio, sin marcadores ni `## Sistema de Agentes`, no encajaba en ninguna rama del algoritmo de fusión — nueva rama explícita: añadir el bloque scaffold al final envuelto en marcadores, preservando íntegro el contenido del proyecto
- **El ADR de adopción no se creaba sin `docs/`** y el `git add` de FASE 7 no incluía `docs/` — ahora se crea el directorio si falta y el commit lo incluye
- `sync.md` **no se copiaba a sí mismo** al proyecto — la regla de inmutabilidad listaba un archivo inexistente y el proyecto no podía re-sincronizarse desde su propia copia; FASE 2 lo copia siempre

### Actualización (MODO B)
- **`.dockerignore` congelado**: la ampliación de 3 a 5 entradas vivía solo en la fase de adopción — los proyectos actualizados filtraban `.github/` y `CHANGELOG.md` a sus deploys para siempre; ahora se completa en ambos modos (solo añade, nunca elimina entradas propias del proyecto)
- **GitHub templates congelados**: MODO B nunca tocaba `.github/` — el PR template viejo (con `perf`, sin `hotfix`) quedaba para siempre; ahora PR e issue templates se sobreescriben en ambos modos y pasan a la lista de archivos gestionados por el scaffold
- **Sin fase de limpieza**: `adopt.md` y `.claude/migrations/` de eras anteriores sobrevivían como zombis con instrucciones contradictorias; FASE 2 los elimina en MODO B
- **El fallback legacy de FASE 3 borraba contenido del proyecto**: "reemplazar hasta el final del archivo" se comía cualquier contenido propio posterior al bloque scaffold viejo — ahora el reemplazo se acota al final de `## Añadir Nuevos Agentes` y pide confirmación ante la duda

### CLAUDE.md
- La lista de inmutabilidad incluye los GitHub templates y las 5 entradas garantizadas de `.dockerignore`; la descripción de la sincronización refleja la limpieza de obsoletos

---

## [1.10.0] — 2026-07-02

Tercera ronda de auditoría (simetría v1.9.1, capas meta, simulación end-to-end de flujos) + nueva regla de inmutabilidad del scaffold en los proyectos.

### Nueva regla: los archivos del scaffold no se modifican en los proyectos
- **CLAUDE.md**: nueva subsección — los archivos gestionados por el scaffold (agentes, scripts, templates, sync.md, checklist, bloque marcado de CLAUDE.md) son de solo lectura en los proyectos; la sincronización los sobreescribe. Si un proyecto detecta una inconsistencia o bug, lo registra en `scaffold-suggestions.md` y el Jefe lo comunica al usuario para aplicarlo en el repo scaffold original — nunca se arregla en local
- **jefe.md**: instrucción explícita de no corregir archivos del scaffold en local y canalizar el reporte al usuario

### Huecos de flujo corregidos
- **Creación de rama sin dueño (crítico)**: el Jefe crea la rama `tipo/descripcion` al confirmar el alcance, antes del primer commit de cualquier agente — nueva subsección "Quién crea la rama" en CLAUDE.md, paso explícito en los flujos Nueva Feature y Bug Fix, y el Analista Funcional registra la rama en la columna "Rama" de Trabajo Activo
- **El Experimento saltaba los gates y la Regla del Abogado (grave)**: gates pre-lanzamiento acotados a las variantes (Tester con flag on/off, Seguridad si tocan auth/datos/tracking, Accesibilidad si tocan UI, Abogado siempre) antes del rollout; en ship, el diff consolidado pasa gates de cierre (QA, Resp. Social, Documentación con changelog + versión, Abogado) — actualizados CLAUDE.md, experimentacion.md y devops.md (nueva categoría "experimento" en su checklist)
- **Versionado del hotfix incoherente (grave)**: Documentación añade el bump PATCH y el changelog mínimo en la rama del hotfix ANTES del merge — el artefacto desplegado lleva la versión correcta y el tag apunta al commit desplegado; corregidos CLAUDE.md (flujo), documentacion.md y devops.md
- **Bug Fix**: rama `fix/` explícita y resolución del vector ambiguo (el Jefe asigna por dónde se manifiesta el error y reasigna si el diagnóstico revela otra capa)
- **Documentación como gate paralelo**: si otro gate ⚠️ fuerza cambios de código tras su veredicto, el Jefe re-notifica a Documentación para reverificar changelog/versión/release notes
- **Trabajo Activo**: el disparador del Analista Funcional era autocontradictorio ("al cerrar... implementación iniciada") — ahora dos movimientos explícitos: al arrancar → Trabajo Activo; al cerrar → Historial
- **Decisión de Arquitectura**: el ADR sin feature activa va en rama `docs/` vía PR
- **Nueva Feature**: línea opcional de Growth consultor y aclaración del caso sin backend (Frontend define el contrato de datos)

### Contradicción de modos de acceso resuelta
- **Tabla de agentes**: Frontend/Backend/Tester/QA pasan a "Vía Jefe en flujos; directo para consultas"; el Abogado a "Automático en cada release; bajo demanda para licencias de dependencias"; nota explícita bajo la tabla y en el flujo Consulta Puntual — la marca regula la delegación de trabajo en flujos, no las consultas

### Capas meta
- **documentacion.md**: la description decía que crea ADRs (los crea el Arquitecto — Documentación verifica); sección ADR reencuadrada como verificación; ruta unificada `docs/decisions/`; el formato canónico de changelog es la plantilla `.claude/templates/CHANGELOG.md` (el ejemplo inline divergía — le faltaba "Removed"); nueva prohibición explícita en "Lo que NO haces"
- **PR template**: eliminado el tipo `perf` (no existe en los estándares); añadido `hotfix`
- **jefe.md**: la estructura del scaffold en el prompt de mejoras ahora lista las 3 plantillas y el hook de settings.json
- **qa.md y experimentacion.md**: sus escrituras en `docs/backlog.md` referencian `safe-commit.sh`
- **experimentacion.md**: el paso 8 incluía al Tester solo en rollback (ahora ship y rollback); la limpieza de flags es al cierre del experimento, no "en el sprint siguiente"

---

## [1.9.1] — 2026-07-02

Segunda ronda de auditoría (3 auditores en paralelo: infraestructura, agentes de detalle, verificación de v1.9.0). 17 hallazgos corregidos.

### Críticos (rompían la promesa del scaffold)
- **sync.md FASE 5**: el `.dockerignore` que genera en adopciones solo excluía 3 de las 5 rutas de "Archivos Privados — No Desplegar" — añadidos `.github/` y `CHANGELOG.md`
- **`.claude/migrations/`**: eliminados `v1.1.0.md`–`v1.5.0.md` — el README afirmaba desde v1.8.0 que ya no existían, pero la limpieza había quedado a medias
- **Revisión de licencia al añadir dependencia**: CLAUDE.md lo exigía pero ningún agente lo ejecutaba — abogado.md tiene ahora un tercer modo ("revisión de licencia bajo demanda"); frontend.md, backend.md y maquetador.md notifican al Abogado en el momento de añadir, no en el gate
- **Limpieza post-experimento**: CLAUDE.md asignaba a Frontend/Backend limpiar código y flag tras ship/rollback, pero sus .md no lo recogían — añadido en ambos (DevOps desactiva la flag en plataforma; ellos la borran del código)

### Contradicciones de redacción
- **Ventana sensible (CLAUDE.md)**: decía que el agente ejecutor informa al usuario directamente; el modelo real (jefe.md, devops.md) es ejecutor → Jefe → usuario — texto alineado
- **accesibilidad.md**: la autodefinición aún decía "Experto en Accesibilidad" — ahora "agente Accesibilidad"; y el canal directo con el Maquetador (semántica HTML/ARIA) estaba descrito solo por el lado del Maquetador
- **project-init-checklist.md**: el backlog inicial lo crea el Analista Funcional (su propietario), no el proceso de init
- **jefe.md**: checklist de cierre añade verificación del backlog (feature movida a "Historial", "Trabajo Activo" al día); eliminada la referencia obsoleta a `.claude/migrations/` en meta-archivos

### Completitud
- **Tabla de contratos**: Analista Funcional refleja la propiedad del backlog; Abogado incluye el modo bajo demanda
- **arquitecto.md**: responsabilidades explícitas de revisar actualizaciones major de dependencias y atender consultas de impacto arquitectónico
- **Flujo Experimento (CLAUDE.md)**: Tester verifica la limpieza también en ship, no solo en rollback
- **Política de Dependencias**: el implementador incluye al Maquetador
- **Reglas de Autonomía**: excepción explícita para el borrado de la rama de feature tras squash merge (cubierto por la confirmación de la PR)
- **Estrategia de PRs**: aclarado que el PR es el vehículo del merge y del CI — los gates ocurren antes en el flujo
- **sync.md**: nota sobre contenido fuera de marcadores (Filosofía, contexto) como propiedad del proyecto; aclarado que safe-commit.sh es convención, no hook forzado

---

## [1.9.0] — 2026-07-02

Corrección de 19 inconsistencias detectadas en una auditoría de la relación entre agentes (inputs/outputs), los flujos de trabajo y la documentación del backlog.

### Tabla de Contratos de Agente (CLAUDE.md) — correcciones
- **DevOps**: inputs y outputs estaban invertidos — es DevOps quien abre la PR, hace el squash merge y crea el tag; su input real es el trabajo con gates aprobados + confirmación del usuario + propuesta de versión
- **Maquetador**: "sistema de diseño en código" era su output, no su input; añadido "diseño técnico del Arquitecto" como input real
- **Frontend**: añadido "specs del Analista Funcional" como input (su .md lo declara obligatorio); aclarada la fuente del contrato de API (OpenAPI de Backend como fuente de verdad, contrato inicial del Arquitecto como fallback)
- **Backend**: output ampliado con "especificación OpenAPI publicada y mantenida (fuente de verdad del contrato de API)"
- **Arquitecto**: "contrato de API" → "contrato de API inicial"; añadida consulta previa a Seguridad para autenticación/autorización/criptografía
- **Seguridad**: "contexto de arquitectura" → "descripción de cambios del Analista Funcional" (lo que el agente realmente pide)
- **Accesibilidad**: input corregido a "especificaciones de UX-UI" + Backend cuando hay endpoints con impacto en UX
- **Documentación**: los ADRs no son su output — verifica que existen; los crea el Arquitecto (corregido también en la tabla de roles)
- **Analista Funcional**: output ampliado con métricas de negocio cuando Growth está activo en modo estratega
- **Growth (estratega)**: aclarado que la primera vez crea el Plan de Growth él mismo; el plan activo solo es input en iteraciones
- **Experimentación**: puede actuar desde el diseño (feedback orientativo); "feature en producción/staging" solo se exige para lanzar experimentos
- **Abogado**: añadido el modo Día 0 (inicialización) con su input/output propio

### Coordinaciones laterales directas (CLAUDE.md)
- Nueva subsección tras el diagrama de jerarquía: Arquitecto↔Seguridad, UX-UI↔Accesibilidad, Maquetador↔Accesibilidad y Abogado↔Accesibilidad pueden coordinarse sin pasar por el Jefe, informándole del resultado

### Flujos (CLAUDE.md)
- Decisión de Arquitectura: añadido el paso de verificación del ADR por Documentación
- Inicialización de Proyecto: documentado el modo Día 0 del Abogado (regulación aplicable, documentos legales, LICENSE) que ya existía en el checklist pero no tenía punto de entrada en CLAUDE.md

### Propiedad del backlog (docs/backlog.md)
- **Analista Funcional**: propietario único del archivo — solo él lo crea y mueve features entre secciones
- **Jefe**: ya no crea el backlog (lo pide al Analista Funcional); dueño de la sección "Decisiones Pendientes"
- **QA**: dueño de la sección "Deuda Técnica" — registra problemas que no bloquean release
- **Growth**: registra sus hipótesis en la sección "Hipótesis de Experimentación"
- **Experimentación**: lee esa sección y marca hipótesis como validadas/refutadas al cierre
- Template actualizado con los propietarios por sección en el encabezado

### Gates en Bug Fix
- **accesibilidad.md** y **responsabilidad-social.md**: documentado el comportamiento condicional en bug fix — si el fix no toca interfaz ni flujos de usuario, declaran N/A y lo devuelven al Jefe sin revisar

### Referencias cruzadas
- "Experto en Accesibilidad" → "agente Accesibilidad" en ux-ui.md, maquetador.md y responsabilidad-social.md (nombre oficial unificado)
- Canal Abogado↔Accesibilidad alineado: coordinación directa informando al Jefe (antes accesibilidad.md decía escalar vía Jefe y abogado.md decía coordinar directo)

---

## [1.8.1] — 2026-07-02

Marcadores explícitos en CLAUDE.md para delimitar el bloque scaffold.

### Cambios en CLAUDE.md
- Añadido `<!-- SCAFFOLD:START -->` justo antes de `## Sistema de Agentes`
- Añadido `<!-- SCAFFOLD:END -->` al final del archivo
- El contenido del proyecto puede ir libremente antes o después de estos marcadores sin riesgo de ser sobreescrito en futuras sincronizaciones

### Cambios en sync.md (FASE 3)
- La lógica de merge de CLAUDE.md usa los marcadores como delimitadores precisos en lugar del límite implícito `## Sistema de Agentes`→fin de archivo
- Compatibilidad hacia atrás: si los marcadores no existen (proyecto adoptado con versión anterior), busca `## Sistema de Agentes` como fallback e inserta los marcadores en ese momento

---

## [1.8.0] — 2026-07-02

Sincronización unificada: un solo prompt para adoptar o actualizar desde cualquier versión.

### Cambios en sync.md
- **Enfoque de sincronización completa**: sync.md ya no aplica migraciones incrementales — copia directamente los archivos actuales del scaffold sobre el proyecto, independientemente de la versión de partida
- **MODO A y MODO B unificados**: el código de detección es el mismo; la diferencia está solo en los pasos de primera adopción (GitHub templates, .dockerignore, ADR) que se ejecutan únicamente en MODO A
- **Regla de CLAUDE.md simplificada**: el límite entre contenido del proyecto y contenido scaffold es siempre `## Sistema de Agentes`; todo lo que viene antes es del proyecto, todo lo que viene después se sobreescribe con la versión actual del scaffold

### Archivos eliminados
- **`.claude/migrations/v1.6.0.md`** y **`v1.7.0.md`**: ya no se usan; sync.md hace la sincronización completa sin necesidad de prompts intermedios

### Actualizaciones en CLAUDE.md
- Sección "Versión del Scaffold": renombrado "Cuándo se crea una migración" → "Cuándo se actualiza el scaffold"; texto actualizado para reflejar que no hay archivos de migración
- Sección "Adoptar o actualizar": descripción actualizada alineada con el nuevo comportamiento de sync.md

### Actualizaciones en jefe.md
- Eliminado el paso "Escribe el prompt de migración en `.claude/migrations/vX.Y.Z.md`" y su bloque de formato
- "Cuando el scaffold recibe una mejora aprobada": ahora indica solo actualizar scaffold.json, changelog y los archivos afectados directamente
- Template de scaffold: `.claude/migrations/` reemplazado por `.claude/sync.md`

### Actualizaciones en migrations/README.md
- Explicación del cambio de modelo: ya no hay archivos `vX.Y.Z.md`; sync.md es el único mecanismo

---

## [1.7.0] — 2026-07-02

Contratos de agente explícitos y backlog como memoria viva del proyecto.

### Actualizaciones en CLAUDE.md
- **Contratos de Agente**: nueva sección con tabla completa de input/output por agente — el Jefe la consulta al delegar para asegurarse de que el agente receptor tiene todo lo que necesita antes de arrancar

### Nueva plantilla
- **`.claude/templates/backlog.md`**: plantilla estándar de backlog de proyecto con secciones para contexto, trabajo activo, backlog priorizado, decisiones pendientes, deuda técnica, hipótesis de experimentación e historial

### Actualizaciones en agentes
- **jefe.md**: lee `docs/backlog.md` al iniciar cada sesión (junto con `pending-actions.md`), resume el estado del proyecto en una línea, y crea el backlog si no existe
- **analista-funcional.md**: mantiene `docs/backlog.md` actualizado al cerrar cada feature (mueve items entre Backlog → Trabajo Activo → Historial)

### Actualizaciones en project-init-checklist.md
- Nuevo ítem: crear `docs/backlog.md` con la plantilla como parte de la documentación inicial del proyecto

---

## [1.6.0] — 2026-06-30

Refuerzo de obligatoriedad de los flujos de trabajo, motivado por observar que pasos sin artefacto visible inmediato (actualización de versión, en particular) se omitían en silencio en proyectos basados en el scaffold.

### Actualizaciones en CLAUDE.md
- **Reglas de Autonomía**: nueva sección "Los flujos definidos en este documento no son opcionales" — los flujos y pasos de cada agente son comportamiento por defecto, no sugerencias; solo se omiten cuando el flujo lo indica expresamente o el usuario lo autoriza explícitamente; un agente bloqueado para completar un paso lo dice explícitamente, nunca lo omite en silencio

### Actualizaciones en jefe.md
- **Tu rol**: la línea de "guardián del flujo" ahora exige repasar explícitamente el checklist de cierre, sin asumir que un paso se cumplió porque nadie dijo lo contrario
- Nueva sección "Checklist antes de marcar como listo": lista explícita de verificación (gates, cambio de versión, ADRs, acciones pendientes, claves i18n, veredicto del Abogado) que el Jefe repasa antes de presentar cualquier trabajo como terminado

---

## [1.5.0] — 2026-06-16

Mejoras derivadas de la retrospectiva del proyecto TrailStats.

### Actualizaciones en CLAUDE.md
- **Tabla de agentes — Jefe**: descripción ampliada con comportamiento de reporte proactivo en tareas largas (informa al delegar, reporta al completar sin esperar pregunta)
- **Estrategia de Ramas y PRs**: nueva sección "Ramas en paralelo — política de conflictos" — prohíbe crear ramas nuevas mientras hay PRs abiertos que tocan ficheros compartidos; exige `git rebase origin/main` antes de abrir la PR si se crea una rama en paralelo conscientemente
- **Reglas de Autonomía**: nuevo apartado "Protocolo de recuperación cuando un subagente se queda sin contexto" — instrucciones para recuperar trabajo perdido de subagentes (git diff/status, identificar qué estaba completo, continuar desde ese estado, informar al usuario)
- **Política de Dependencias**: el Abogado revisa licencias de nuevas dependencias **en el momento de añadirlas**, no solo en el gate pre-release

### Actualizaciones en project-init-checklist.md
- **Legal y privacidad**: sección ampliada con contexto de intención comercial para el Abogado; nuevo ítem explícito para revisión del fichero `LICENSE` antes del primer commit público; revisión de licencias de dependencias separada como ítem propio

---

## [1.4.0] — 2026-06-05

Flujo de hotfix, path de rollback de experimento y correcciones de coordinación en múltiples agentes.

### Flujos añadidos en CLAUDE.md
- **Hotfix (producción rota, urgencia inmediata):** nuevo workflow con gates reducidos pre-deploy (solo Tester, Seguridad si aplica, Abogado) y gates post-deploy en el siguiente ciclo normal (QA, Accesibilidad, Responsabilidad Social, Documentación)
- **Rollback de experimento:** path explícito en el flujo Experimento — DevOps revierte flag al 0%, Frontend/Backend limpian código de variantes, Tester ejecuta tests de regresión para verificar estabilidad

### Actualizaciones en CLAUDE.md
- Nomenclatura de ramas: `hotfix/` añadido como tipo de rama permitido
- Diagrama de jerarquía: Growth reposicionado antes de Analista Funcional (refleja su invocación al inicio del proyecto)

### Actualizaciones en agentes
- **jefe.md**: sección explícita de orquestación de hotfix (gates pre/post-deploy diferenciados)
- **devops.md**: checklist pre-deploy diferenciado entre release normal y hotfix; versión SemVer en hotfix clarificada
- **documentacion.md**: comportamiento en hotfix — solo changelog mínimo pre-deploy, resto post-deploy
- **abogado.md**: revisión acotada en hotfix, con escalado si hay riesgo mayor
- **experimentacion.md**: Tester mencionado en el path de rollback; responsabilidad de limpieza de código clarificada (DevOps gestiona flag, Frontend/Backend limpian código)
- **accesibilidad.md**: nota explícita — en hotfix actúa post-deploy
- **responsabilidad-social.md**: nota explícita — en hotfix actúa post-deploy
- **tester.md**: tests de feature flags ampliados — cubre ciclo activo y re-ejecución post-limpieza
- **analista-funcional.md**: paso de coordinación con Growth antes de marcar specs como listas
- **seguridad.md**: nota sobre controles de servidor implementados por Backend

### Actualizaciones en infraestructura
- **PR template**: gates anotados con comportamiento en hotfix (`_(en hotfix: se revisa post-deploy)_`)
- **adopt.md**: flujo Hotfix añadido a la lista de flujos de FASE 6; check de git init en FASE 1; versión actualizada a v1.4.0

---

## [1.3.0] — 2026-06-04

Nuevo agente Growth para análisis de potencial comercial y estrategia de monetización.

### Agentes añadidos
- **Growth** — opera en dos modos: (1) consultor externo al inicio del proyecto, analiza el potencial de monetización con datos de mercado reales y emite un dictamen 🟢/🟡/🟠/🔴; (2) estratega activo si el usuario decide explorar la vía comercial — define North Star metric, modelo de monetización, funnel, brief de conversión para UX-UI y backlog de hipótesis para Experimentación. Incluye guardianes éticos (coordina con Responsabilidad Social y Abogado).

### Flujos añadidos en CLAUDE.md
- **Análisis de potencial comercial (Growth):** nuevo workflow que cubre el modo consultor, el dictamen y la transición opcional a modo estratega

### Actualizaciones en CLAUDE.md
- Tabla de agentes: Growth añadido entre Experimentación y Backend
- Diagrama de jerarquía: Growth como rama consultor/estratega

### Actualizaciones en jefe.md
- Flujo de gestión: Jefe invoca Growth (modo consultor) al inicio de proyectos con interfaz de usuario o audiencia externa, antes de Analista Funcional
- Template de scaffold: lista de agentes actualizada con Growth y Experimentación

---

## [1.2.0] — 2026-06-04

Nuevo agente Experimentación para A/B tests, feature flags y análisis estadístico.

### Agentes añadidos
- **Experimentación** — diseño de experimentos (A/B, MVT, holdout), cálculo de tamaño de muestra, análisis estadístico, gestión del ciclo de vida de feature flags y decisión de ship/rollback. Coordina con UX-UI para variantes, Frontend/Backend para implementación y DevOps para flags. Incluye guardianes éticos (coordina con Responsabilidad Social y Abogado antes de lanzar si aplica).

### Flujos añadidos en CLAUDE.md
- **Experimento (A/B test o validación de hipótesis):** nuevo workflow estándar que cubre desde el diseño del plan hasta la limpieza de flags tras la decisión

### Actualizaciones en CLAUDE.md
- Tabla de agentes: Experimentación añadido entre Frontend y Backend
- Diagrama de jerarquía: Experimentación como rama opcional sobre features en producción
- Sección "Inicialización de Proyecto": añadida subsección de adopción para proyectos existentes

### Herramientas añadidas
- **`.claude/adopt.md`** — prompt autocontenido para adoptar el scaffold en un proyecto existente que no nació del scaffold. Inventaria el stack, copia agentes y scripts, crea o fusiona CLAUDE.md preservando convenciones existentes, y pide confirmación antes del commit.

---

## [1.1.0] — 2026-06-03

Split del agente Desarrollador en tres agentes especializados + corrección de inconsistencias internas.

### Agentes añadidos
- **Maquetador** — capa visual: HTML semántico, CSS, sistema de diseño, identidad visual, micro-interacciones. Itera con UX-UI hasta aprobación visual antes de entregar al Frontend
- **Frontend** — lógica cliente: componentes con comportamiento, estado, integración con APIs, routing, i18n. Agente de desarrollo por defecto en proyectos sin backend
- **Backend** — servidor: APIs REST/GraphQL, base de datos, autenticación, caché, colas

### Agentes eliminados
- **Desarrollador** — sustituido por los tres agentes anteriores

### Correcciones
- Flujo Bug Fix: Abogado ahora siempre obligatorio (no condicional); añadidos gates de Seguridad y Documentación
- Jerarquía: referencias al Tester, Maquetador/Frontend/Backend y flujos de trabajo actualizadas en todos los agentes
- jefe.md: lista de agentes en template del scaffold y lista de gates en "Cuándo registrar sugerencia" actualizadas
- tester.md: paso 6 ahora menciona los 5 gates paralelos
- CHANGELOG.md: descripción corregida de "historial interno" a "historial de versiones visible en GitHub"
- maquetador.md: referencia explícita a coordinación con el Experto en Accesibilidad
- responsabilidad-social.md y abogado.md: corrección de "QA y Accesibilidad" → todos los gates paralelos

---

## [1.0.0] — 2025-06-03

Versión inicial completa del scaffold.

### Agentes (13)
Jefe, Analista Funcional, Arquitecto, UX-UI, Desarrollador, Tester, QA,
Accesibilidad, Abogado, Responsabilidad Social, Seguridad, DevOps, Documentación

### Estándares y flujos documentados en CLAUDE.md
- Flujo completo: 5 gates paralelos (QA, Accesibilidad, Resp. Social, Seguridad, Documentación) → Abogado → DevOps deploy
- Internacionalización obligatoria: EN + ES desde el día 1
- Estrategia de ramas y PRs con SemVer
- Política de dependencias
- Archivos privados excluidos de despliegue
- Control de visibilidad de actividad en GitHub (ventana sensible lun-vie 08-19h Madrid)
- Mecanismo de retroalimentación scaffold ↔ proyecto

### Configuración
- `.claude/settings.json`: permisos máximos + hook UserPromptSubmit para pendientes
- `.claude/scripts/safe-commit.sh`: wrapper git commit con control de horario
- `.claude/pending-actions.md`: log de acciones diferidas
- `.claude/scaffold-suggestions.md`: sugerencias proyecto → scaffold
- `.claude/project-init-checklist.md`: checklist día cero
- `.dockerignore` + `.gitignore` configurados

### Templates
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/bug_report.md`
- `.github/ISSUE_TEMPLATE/feature_request.md`
- `.claude/templates/adr.md`
