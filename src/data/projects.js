export const projects = [
  {
    id: 'selfforge',
    name: 'Selfforge',
    description:
      'Rastreador de hábitos personal con seguimiento de rachas, métricas de progreso y recordatorios diarios.',
    status: 'active',
    version: '1.4.0',
    scaffoldVersion: '1.12.0',
    stack: ['React', 'Vite', 'Supabase'],
    repo: 'https://github.com/MRGN79/SelfForge',
    demo: null,
  },
  {
    id: 'fobforge',
    name: 'FobForge',
    description:
      'Herramienta de escritorio para leer, clonar y gestionar tags RFID del sistema domótico BTicino.',
    status: 'paused',
    version: '0.3.0',
    scaffoldVersion: null,
    stack: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/MRGN79/fobforge',
    demo: null,
  },
  {
    id: 'devdeck',
    name: 'DevDeck',
    description: 'Catálogo personal de proyectos de desarrollo — esta misma aplicación.',
    status: 'in-progress',
    version: '0.1.0',
    scaffoldVersion: '1.15.0',
    stack: ['React', 'Vite'],
    repo: 'https://github.com/MRGN79/DevDeck',
    demo: null,
  },
  {
    id: 'terceroDePrimaria',
    name: 'TerceroDePrimaria',
    description:
      'Web de ejercicios y juegos educativos para 3º de primaria (8-9 años), 100% estática y sin backend.',
    // status pendiente de confirmación del usuario — dato objetivo tomado de package.json:
    // último commit 2026-07-09, actividad reciente, probablemente ya no es solo "idea".
    status: 'idea',
    version: '0.3.0',
    scaffoldVersion: '1.15.0',
    stack: ['React', 'Vite', 'TypeScript'],
    repo: 'https://github.com/MRGN79/TerceroDePrimaria',
    demo: null,
  },
  {
    id: 'trailstats',
    name: 'TrailStats',
    description:
      'Analiza tu historial de exportaciones de Strava o Garmin localmente en el navegador — estadísticas y tendencias agregadas, sin backend, sin que el dato salga del dispositivo.',
    // status pendiente de confirmación del usuario — dato objetivo tomado de package.json:
    // último commit 2026-06-19, probablemente ya no es solo "idea".
    status: 'idea',
    version: '0.12.0',
    scaffoldVersion: '1.4.0',
    stack: ['React', 'Vite', 'TypeScript', 'Recharts'],
    repo: 'https://github.com/MRGN79/TrailStats',
    demo: null,
  },
];
