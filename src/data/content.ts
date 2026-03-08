export const siteMeta = {
  siteName: "1618 LAB",
  siteUrl: "https://1618lab.com",
  title: "1618 LAB — Diseño de sistemas, tecnología cultural y experiencias digitales",
  description:
    "1618 LAB es un laboratorio de diseño, sistemas visuales, tecnología cultural y experiencias digitales. Diseñamos plataformas, interfaces, artefactos editoriales, visualización de información y prototipos donde convergen estructura, narrativa, aprendizaje y experimentación.",
  location: "Colombia",
  email: "hola@1618lab.com",
  availability: "Proyectos selectivos, consultoría, dirección creativa y prototipos",
  legalNote:
    "El sitio presenta capacidades, artefactos propios, prototipos y casos abstractos. No publica proyectos sujetos a reserva, confidencialidad o restricciones institucionales.",
};

export const navigation = [
  { label: "Inicio", path: "/" },
  { label: "Systems", path: "/payloads" },
  { label: "Case Abstracts", path: "/patch-notes" },
  { label: "Lab", path: "/lab" },
  { label: "Method", path: "/method" },
  { label: "Manifesto", path: "/manifesto" },
  { label: "About", path: "/about" },
  { label: "Artifacts", path: "/artifacts" },
  { label: "Contact", path: "/contact" },
];

export const sitemap = [
  {
    id: "home",
    title: "Home",
    path: "/",
    purpose:
      "Presentar 1618 LAB como laboratorio de diseño de sistemas, tecnología cultural y experiencias digitales, mostrando capacidades, evidencia propia y acceso rápido al laboratorio.",
    primaryCTA: "Ver sistemas",
    secondaryCTA: "Explorar el laboratorio",
    modules: [
      "Hero con posicionamiento",
      "Áreas de práctica",
      "Artefactos destacados",
      "Casos abstractos",
      "Método resumido",
      "Bloque de contacto"
    ]
  },
  {
    id: "systems",
    title: "Systems",
    path: "/payloads",
    purpose:
      "Explicar qué sabe construir 1618 LAB sin depender de clientes visibles: plataformas, visualización, IA aplicada, identidades, experiencias interactivas y prototipos.",
    primaryCTA: "Iniciar conversación",
    modules: ["Catálogo de capacidades", "Detalle de entregables", "Stack y criterios", "Acceso a briefing"]
  },
  {
    id: "case-abstracts",
    title: "Case Abstracts",
    path: "/patch-notes",
    purpose:
      "Demostrar experiencia a través de problemas resueltos redactados como casos abstractos, sin exponer instituciones, marcas o material reservado.",
    primaryCTA: "Solicitar un sistema similar",
    modules: ["Grid de casos", "Ficha ampliada", "Impacto narrado", "Cierre de contacto"]
  },
  {
    id: "lab",
    title: "Lab",
    path: "/lab",
    purpose:
      "Mostrar líneas activas de investigación, prototipado y exploración propia del estudio.",
    primaryCTA: "Ver exploraciones",
    modules: ["Programas del laboratorio", "Preguntas activas", "Prototipos", "Estado de desarrollo"]
  },
  {
    id: "method",
    title: "Method",
    path: "/method",
    purpose:
      "Explicar cómo 1618 LAB diagnostica, estructura, prototipa y convierte complejidad en sistemas claros y memorables.",
    primaryCTA: "Leer el método",
    modules: ["Fases", "Principios", "Criterios", "Despliegue"]
  },
  {
    id: "manifesto",
    title: "Manifesto",
    path: "/manifesto",
    purpose:
      "Exponer la postura del estudio frente al diseño, la tecnología, la educación, la visualización y la producción cultural.",
    primaryCTA: "Explorar la visión",
    modules: ["Principios", "Tesis", "Frases eje", "Cierre autoral"]
  },
  {
    id: "about",
    title: "About",
    path: "/about",
    purpose:
      "Presentar a 1618 LAB como estudio/laboratorio liderado por Andrés Camilo Romero Salgado, con una estructura flexible de colaboración especializada.",
    primaryCTA: "Conversemos",
    modules: ["Perfil", "Modo de trabajo", "Red de colaboración", "Ámbitos de acción"]
  },
  {
    id: "artifacts",
    title: "Artifacts",
    path: "/artifacts",
    purpose:
      "Agrupar sistemas visuales, frameworks, demos, kits y activos propios que expresan la capacidad del laboratorio sin depender de terceros.",
    primaryCTA: "Ver artefactos",
    modules: ["Colección", "Estado", "Uso potencial", "Acceso futuro"]
  },
  {
    id: "contact",
    title: "Contact",
    path: "/contact",
    purpose:
      "Canal de entrada para proyectos, auditorías, prototipos o colaboraciones, con un formulario serio y una capa visual coherente con la identidad del sitio.",
    primaryCTA: "Enviar briefing",
    modules: ["Introducción", "Formulario", "Criterios de entrada", "Cierre"]
  }
];

export const homeContent = {
  hero: {
    eyebrow: "LABORATORIO DE DISEÑO Y TECNOLOGÍA CULTURAL",
    title: "1618 LAB",
    subtitle:
      "Diseño de sistemas, tecnología cultural y experiencias digitales con pensamiento visual, rigor técnico y narrativa.",
    description:
      "Creamos plataformas, interfaces, visualización de información, artefactos editoriales y prototipos interactivos donde convergen estructura, símbolo, aprendizaje, datos y experimentación. Trabajamos entre la precisión institucional y la imaginación radical, sin sacrificar claridad.",
    primaryCTA: { label: "Ver systems", path: "/payloads" },
    secondaryCTA: { label: "Entrar al lab", path: "/lab" },
  },
  pillars: [
    {
      title: "Sistemas digitales",
      text: "Arquitecturas web, plataformas, herramientas narrativas, dashboards, micrositios y experiencias modulares diseñadas para crecer con criterio."
    },
    {
      title: "Visualización e interfaz",
      text: "Mapas, líneas de tiempo, esquemas, capas narrativas y sistemas UI que vuelven legible la complejidad sin volverla plana."
    },
    {
      title: "Laboratorio y prototipos",
      text: "Exploraciones visuales, frameworks, artefactos interactivos y pruebas de concepto que nacen desde el estudio y alimentan futuros sistemas."
    }
  ],
  proofStrip: [
    "Capacidades públicas sin exponer clientes restringidos",
    "Casos abstractos, artefactos propios y método visible",
    "Diseño autoral con orientación a sistema"
  ],
};

export const manifestoContent = {
  title: "Diseñar no es decorar. Es estructurar sentido.",
  intro:
    "1618 LAB entiende el diseño como una forma de pensamiento aplicado. La interfaz no es una piel: es una decisión epistemológica. La visualización no es adorno: es lectura. La tecnología no se incorpora por novedad, sino por pertinencia.",
  principles: [
    "La claridad puede ser intensa sin ser obvia.",
    "Lo institucional no tiene por qué ser frío ni genérico.",
    "La interfaz también educa.",
    "Un sistema visual debe pensar, no solo impresionar.",
    "La complejidad merece estructura, no simplificación vacía.",
    "Lo experimental tiene más valor cuando puede operar en el mundo real."
  ],
  closing:
    "Trabajamos en la zona donde el diseño organiza, la narrativa orienta, la tecnología habilita y la forma deja de ser superficie para convertirse en sistema."
};

export const methodContent = {
  title: "Método",
  subtitle: "Opus Magnum Digital",
  intro:
    "1618 LAB aborda cada sistema como una Gran Obra alquímica. No es solo construcción, es transmutación: de la complejidad caótica (Nigredo) a la claridad estructural (Albedo), pasando por la forma (Citrinitas) hasta la integración vital (Rubedo) y su proyección final.",
  phases: [
    {
      id: "nigredo",
      title: "I. Nigredo // Lectura",
      subtitle: "Decomposición y Caos",
      desc: "La fase negra. Enfrentamos la materia prima en su estado caótico. Auditamos, deconstruimos y separamos lo esencial de lo superfluo. Es el reconocimiento profundo de la complejidad del problema.",
      icon: "Search",
      steps: [
        "Auditoría de Caos (Contexto)",
        "Deconstrucción de Usuario",
        "Mapeo de Sombras (Restricciones)",
        "Extracción de Esencia (Core)",
        "Análisis Heurístico",
        "Evaluación de Materia Prima"
      ]
    },
    {
      id: "albedo",
      title: "II. Albedo // Estructura",
      subtitle: "Purificación y Lógica",
      desc: "La fase blanca. Lavamos las impurezas para revelar la estructura subyacente. Definimos la arquitectura, los flujos y la lógica que sostendrá el sistema. La claridad emerge de la reducción.",
      icon: "Layers",
      steps: [
        "Arquitectura de Información",
        "Purificación de Flujos",
        "Esqueletos de Interfaz (Wireframes)",
        "Cristalización Taxonómica",
        "Selección de Stack Tecnológico",
        "Alineación Estructural"
      ]
    },
    {
      id: "citrinitas",
      title: "III. Citrinitas // Prototipo",
      subtitle: "Despertar y Forma",
      desc: "La fase amarilla. La luz entra en la materia. Convertimos la estructura abstracta en forma tangible, color y movimiento. El sistema empieza a tener consciencia de sí mismo a través de la interacción.",
      icon: "PenTool",
      steps: [
        "Transmutación Visual (UI)",
        "Inyección de Luz (Color/Estilo)",
        "Despertar del Movimiento (Motion)",
        "Forjado de Componentes",
        "Chispa Interactiva (Demos)",
        "Pruebas de Realidad"
      ]
    },
    {
      id: "rubedo",
      title: "IV. Rubedo // Sistema",
      subtitle: "Coagulación y Vida",
      desc: "La fase roja. La culminación de la obra. Integramos diseño, código y contenido en una unidad viva. El sistema alcanza su estado final de coherencia y potencia operativa.",
      icon: "Cpu",
      steps: [
        "Coagulación Sistémica (Dev)",
        "Fusión Código-Diseño",
        "Inyección Vital (Contenido)",
        "Adaptación Responsiva",
        "Alquimia de Rendimiento",
        "Integración Final"
      ]
    },
    {
      id: "projectio",
      title: "V. Projectio // Despliegue",
      subtitle: "Multiplicación y Realidad",
      desc: "La proyección de la piedra filosofal. El sistema toca la realidad y transforma su entorno. Lanzamos, documentamos y aseguramos que la obra pueda operar autónomamente.",
      icon: "Rocket",
      steps: [
        "Liberación al Éter (Deploy)",
        "Estabilización de Entorno",
        "Grimorio de Documentación",
        "Transferencia de Conocimiento",
        "Guardas de Analítica",
        "Propagación Global"
      ]
    },
    {
      id: "ouroboros",
      title: "VI. Ouroboros // Retorno",
      subtitle: "El Eterno Retorno",
      desc: "El ciclo se cierra y vuelve a empezar. El sistema se alimenta de su propia operación para evolucionar. Monitoreamos, aprendemos y refinamos la obra en un ciclo infinito de mejora.",
      icon: "Repeat",
      steps: [
        "Análisis Cíclico (Feedback)",
        "Integración de Bucles",
        "Iteración Evolutiva",
        "Sanación Sistémica",
        "Expansión de Consciencia",
        "Renacimiento del Código"
      ]
    }
  ]
};

export const aboutContent = {
  title: "About",
  lead:
    "1618 LAB es un laboratorio de diseño, sistemas visuales, tecnología cultural y experiencias digitales liderado por Andrés Camilo Romero Salgado.",
  body:
    "El estudio trabaja en la intersección entre estructura, interfaz, visualización, narrativa, aprendizaje y prototipado. Puede operar como dirección creativa, arquitectura de contenido, diseño de información, desarrollo de prototipos o articulación entre esas capas. Según el proyecto, convoca una red flexible de colaboración especializada en desarrollo, motion, 3D, investigación, ilustración, contenido y producción.",
  capabilities: [
    "Dirección creativa y sistema visual",
    "Arquitectura de contenido y narrativa",
    "UI/UX y prototipos interactivos",
    "Visualización e información compleja",
    "IA aplicada y diseño conversacional",
    "Frameworks y artefactos de laboratorio"
  ]
};

export const labPrograms = [
  {
    id: "editorial-interfaces",
    title: "Interfaces editoriales vivas",
    desc: "Exploraciones donde la web se comporta como un sistema editorial expandido: narrativa, ritmo, capas y materialidad visual.",
    subtitle: "NARRATIVA_WEB",
    deliverables: ["Sitios inmersivos", "Scrollytelling", "Tipografía reactiva"],
    tech: "WebGL, GSAP, React, Sanity"
  },
  {
    id: "symbolic-systems",
    title: "Sistemas simbólicos contemporáneos",
    desc: "Investigación visual sobre geometría, arquetipos, grabado, visualidad ritual y su traducción a lenguajes digitales contemporáneos.",
    subtitle: "RITUAL_DIGITAL",
    deliverables: ["Arte generativo", "Simbolismo UI", "Experiencias rituales"],
    tech: "P5.js, Three.js, SVG, Canvas"
  },
  {
    id: "interactive-learning",
    title: "Aprendizaje interactivo",
    desc: "Prototipos pedagógicos, simulaciones, juegos y experiencias donde el conocimiento se construye mediante interacción y no solo exposición.",
    subtitle: "PEDAGOGÍA_ACTIVA",
    deliverables: ["Simuladores", "Juegos educativos", "Explorables"],
    tech: "R3F, Physics engines, Interactive Video"
  },
  {
    id: "knowledge-structures",
    title: "Estructuras de conocimiento",
    desc: "Modelos de consulta, organización documental, interfaces para lectura compleja y sistemas de memoria asistida.",
    subtitle: "ARQUITECTURA_INFO",
    deliverables: ["Grafos de conocimiento", "Búsqueda semántica", "Wikis visuales"],
    tech: "Neo4j, D3.js, Vector DBs, Next.js"
  }
];

export const artifacts = [
  {
    id: "style-systems",
    title: "Style Systems",
    desc: "Bibliotecas visuales, sistemas de composición, reglas de tono y marcos gráficos listos para adaptarse a productos, campañas o plataformas.",
    type: "DESIGN_SYSTEM",
    price: "CONTACT",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "prompt-frameworks",
    title: "Prompt Frameworks",
    desc: "Prompts canónicos y estructuras de dirección visual para acelerar producción sin perder criterio ni consistencia.",
    type: "AI_TOOL",
    price: "OPEN_SOURCE",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "content-architectures",
    title: "Content Architectures",
    desc: "Mapas de información, taxonomías, sitemaps y módulos de CMS pensados para sitios, laboratorios y sistemas narrativos.",
    type: "STRATEGY",
    price: "CONTACT",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "interactive-demos",
    title: "Interactive Demos",
    desc: "Piezas autónomas que prueban atmósferas, navegación, datos, sonido, visualización o interacción antes del desarrollo completo.",
    type: "PROTOTYPE",
    price: "VIEW",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
  }
];

// Compatible with the current template page /payloads
export const payloads = [
  {
    id: "systems-digital-platforms",
    title: "SYSTEMS / DIGITAL PLATFORMS",
    desc: "Diseño y desarrollo de plataformas, micrositios, dashboards, herramientas narrativas y arquitecturas web pensadas como sistemas, no como piezas aisladas.",
    fullDesc:
      "Construimos infraestructuras digitales donde contenido, interfaz y tecnología funcionan como una sola unidad. El objetivo no es publicar páginas sueltas, sino diseñar entornos claros, memorables y mantenibles que puedan crecer con criterio. Este frente incluye sitios editoriales, plataformas de consulta, sistemas UI, dashboards, micrositios, herramientas internas y experiencias modulares que exigen precisión técnica y una dirección visual consistente.",
    tech: ["React", "TypeScript", "Vite", "Arquitectura de contenido"],
    stats: { enfoque: "SISTÉMICO", claridad: "ALTA", escalabilidad: "REAL" },
    deliverables: [
      "Arquitectura de información",
      "Sistema UI y componentes",
      "Frontend modular",
      "Documentación de continuidad"
    ],
    icon: "Globe"
  },
  {
    id: "interactive-learning-experiences",
    title: "INTERACTIVE / LEARNING EXPERIENCES",
    desc: "Experiencias educativas, simuladores, juegos, recorridos y dispositivos de mediación donde aprender implica explorar, comparar y tomar decisiones.",
    fullDesc:
      "Diseñamos experiencias donde la interacción no es maquillaje, sino método pedagógico. Transformamos contenido complejo en trayectorias comprensibles mediante juego, simulación, narrativa, visualización y feedback. Esta línea es útil para proyectos culturales, educativos, científicos o museográficos que necesitan una experiencia más profunda que una simple página informativa.",
    tech: ["UX pedagógico", "Prototipado", "Narrativa interactiva", "Frontend creativo"],
    stats: { mediacion: "ACTIVA", engagement: "ALTO", legibilidad: "GRADUAL" },
    deliverables: [
      "Flujos de experiencia",
      "Prototipos interactivos",
      "Assets y pantallas",
      "Criterios pedagógicos"
    ],
    icon: "Cpu"
  },
  {
    id: "visualization-information-territory",
    title: "VISUALIZATION / INFORMATION & TERRITORY",
    desc: "Mapas, capas, tableros, líneas de tiempo y sistemas de lectura compleja para volver visible lo que normalmente se percibe fragmentado.",
    fullDesc:
      "Trabajamos la visualización como estructura narrativa y no solo como decoración estadística. Diseñamos dispositivos para leer información compleja: relaciones espaciales, secuencias temporales, comparativas, taxonomías, capas y patrones. Este trabajo exige balance entre densidad, precisión, jerarquía y experiencia de usuario, especialmente en contextos públicos, educativos o técnicos.",
    tech: ["Visualización", "Mapeo conceptual", "Diseño de información", "Dashboards"],
    stats: { legibilidad: "CRÍTICA", narrativa: "INTEGRADA", rigor: "ALTO" },
    deliverables: [
      "Sistemas de visualización",
      "Mapas y capas narrativas",
      "Dashboards editoriales",
      "Guías de lectura"
    ],
    icon: "Activity"
  },
  {
    id: "identity-art-direction",
    title: "IDENTITY / ART DIRECTION",
    desc: "Sistemas visuales, lenguajes editoriales, campañas y bibliotecas de assets para marcas, estudios, plataformas y proyectos culturales.",
    fullDesc:
      "No trabajamos la identidad como logo aislado, sino como un sistema de decisiones formales, tonales y compositivas capaz de sostener interfaces, publicaciones, campañas, piezas y futuros artefactos. Esta línea reúne branding, dirección de arte, bibliotecas visuales, reglas de composición, marcos estéticos y producción de assets para ecosistemas de comunicación complejos.",
    tech: ["Brand systems", "Dirección de arte", "Sistemas visuales", "Assets"],
    stats: { coherencia: "ALTA", singularidad: "VISIBLE", adaptabilidad: "AMPLIA" },
    deliverables: [
      "Sistema visual",
      "Biblioteca de assets",
      "Guía de dirección de arte",
      "Plantillas y aplicaciones"
    ],
    icon: "Zap"
  },
  {
    id: "applied-ai-knowledge-structures",
    title: "APPLIED AI / KNOWLEDGE STRUCTURES",
    desc: "Asistentes especializados, organización documental, diseño conversacional y sistemas de consulta donde la IA sirve a la claridad y no al ruido.",
    fullDesc:
      "Aplicamos IA cuando mejora una tarea real: consultar, filtrar, explicar, organizar, recuperar o acompañar procesos cognitivos. Nos interesa menos la promesa vacía de automatización total y más el diseño serio de experiencia, fuente, contexto, tono y límites. Esta línea incluye estructuras RAG, asistentes temáticos, flujos pedagógicos, memoria de proyecto y diseño de interacción conversacional.",
    tech: ["RAG", "LLMs", "Diseño conversacional", "Sistemas documentales"],
    stats: { pertinencia: "ALTA", utilidad: "CONTEXTUAL", control: "HUMANO" },
    deliverables: [
      "Arquitectura de consulta",
      "Prompt system",
      "Flujos conversacionales",
      "Criterios de gobernanza"
    ],
    icon: "Shield"
  },
  {
    id: "lab-rd-prototypes",
    title: "LAB / R&D PROTOTYPES",
    desc: "Prototipos, experimentos, marcos visuales, artefactos web y líneas de investigación-creación que nacen desde el estudio.",
    fullDesc:
      "1618 LAB no funciona solo por encargo. También produce investigación aplicada, experimentación visual, frameworks y prototipos que prueban futuros lenguajes, sistemas y productos. Esta capa alimenta la singularidad del estudio y permite desarrollar piezas autónomas: demos, exploraciones, assets, objetos conceptuales, herramientas y formatos híbridos entre diseño, publicación, interfaz y cultura visual.",
    tech: ["Prototipado", "Experimentación visual", "Frameworks", "Web creativa"],
    stats: { autonomia: "ALTA", riesgo: "CONTROLADO", exploracion: "CONTINUA" },
    deliverables: [
      "Demos y pruebas de concepto",
      "Frameworks reutilizables",
      "Artefactos visuales",
      "Sistemas en evolución"
    ],
    icon: "Globe"
  }
];

// Compatible with the current template page /patch-notes
export const patchNotes = [
  {
    id: "CASE_01",
    title: "DOCUMENT INTELLIGENCE INTERFACE",
    category: "CASE_ABSTRACT // KNOWLEDGE_SYSTEM",
    year: "ONGOING",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    client: "CONFIDENTIAL_CONTEXT",
    challenge:
      "Un corpus documental amplio, técnico y heterogéneo exigía una forma de consulta más clara que la búsqueda manual y más confiable que una interfaz genérica de chat.",
    solution:
      "Se estructuró un sistema de consulta asistida con criterios de fuente, tono, contexto y trazabilidad. La experiencia se diseñó para responder con pertinencia temática, mantener control sobre el conocimiento y reducir fricción cognitiva.",
    impact: { claridad: "ALTA", acceso: "ÁGIL", pertinencia: "CONTEXTUAL" },
    stack: ["RAG", "Python", "UI conversacional", "Arquitectura documental"]
  },
  {
    id: "CASE_02",
    title: "INTERACTIVE LEARNING PLATFORM",
    category: "CASE_ABSTRACT // PEDAGOGY",
    year: "2025",
    image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
    client: "EDUCATIONAL_CONTEXT",
    challenge:
      "Contenido complejo y altamente especializado requería una experiencia de aprendizaje más participativa, capaz de traducir conceptos difíciles en recorridos comprensibles.",
    solution:
      "Se diseñó una plataforma modular con narrativa, interacción y visualización, donde el usuario aprende explorando, comparando y respondiendo. El sistema priorizó claridad secuencial, tono accesible y una dirección visual coherente con la naturaleza del contenido.",
    impact: { mediacion: "ACTIVA", engagement: "ALTO", progresion: "CLARA" },
    stack: ["React", "Diseño instruccional", "UX", "Assets interactivos"]
  },
  {
    id: "CASE_03",
    title: "TERRITORIAL READING SYSTEM",
    category: "CASE_ABSTRACT // VISUALIZATION",
    year: "2025",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?auto=format&fit=crop&w=1200&q=80",
    client: "PUBLIC_INFORMATION_CONTEXT",
    challenge:
      "La información espacial y temporal aparecía fragmentada en múltiples fuentes y formatos, dificultando la lectura pública y la construcción de relaciones significativas.",
    solution:
      "Se planteó un sistema editorial de capas, mapas y secuencias temporales que organiza la información como narrativa navegable. La visualización se diseñó para hacer visible la relación entre contexto, escala y transformación.",
    impact: { legibilidad: "ELEVADA", sintesis: "FUERTE", narrativa: "INTEGRADA" },
    stack: ["Diseño de información", "Mapeo", "UI editorial", "Frontend modular"]
  },
  {
    id: "CASE_04",
    title: "MODULAR EXPERIENCE FOR EXPLORATION",
    category: "CASE_ABSTRACT // INTERACTIVE_SYSTEM",
    year: "2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    client: "CULTURAL_TECH_CONTEXT",
    challenge:
      "Era necesario transformar un conjunto disperso de contenidos y acciones en una experiencia coherente, visualmente potente y fácil de recorrer.",
    solution:
      "Se desarrolló una lógica modular de pantallas, componentes y microinteracciones que convierte la navegación en una secuencia clara de exploración. El sistema permitió articular contenido, atmósfera y función sin sacrificar mantenibilidad.",
    impact: { cohesion: "ALTA", experiencia: "FLUIDA", sistema: "ESCALABLE" },
    stack: ["UI system", "Motion", "Prototipado", "Frontend"]
  },
  {
    id: "CASE_05",
    title: "THINKING FRAMEWORK VISUAL SYSTEM",
    category: "CASE_ABSTRACT // IDENTITY",
    year: "2025",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    client: "STRATEGIC_COMMUNICATION_CONTEXT",
    challenge:
      "Una organización con alta carga conceptual necesitaba una identidad y un sistema gráfico capaces de comunicar rigor, contemporaneidad y densidad política sin caer en clichés institucionales.",
    solution:
      "Se construyó un lenguaje visual con criterios editoriales, estructura de marca, jerarquías y aplicaciones multiplataforma. El sistema permitió sostener piezas, discurso, presencia web y consistencia futura.",
    impact: { coherencia: "SÓLIDA", diferenciacion: "ALTA", adaptacion: "AMPLIA" },
    stack: ["Brand system", "Dirección de arte", "Arquitectura de marca", "Assets"]
  },
  {
    id: "CASE_06",
    title: "AUTHORIAL LAB WEBSITE",
    category: "CASE_ABSTRACT // SELF_INITIATED",
    year: "2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    client: "SELF_DIRECTED_SYSTEM",
    challenge:
      "El estudio necesitaba una plataforma capaz de mostrar capacidad real sin depender de proyectos reservados ni de un portafolio clásico basado en logos.",
    solution:
      "Se definió una arquitectura editorial basada en systems, case abstracts, method, lab y artifacts. La evidencia pública se trasladó desde los clientes visibles hacia el método, los artefactos propios y las tipologías de problema resuelto.",
    impact: { posicionamiento: "MÁS NÍTIDO", riesgo: "CONTROLADO", autoria: "VISIBLE" },
    stack: ["Content strategy", "Sitemap", "Copy system", "React template"]
  }
];

export const contactContent = {
  title: "Trae una idea, un sistema por ordenar o una interfaz por construir.",
  intro:
    "1618 LAB trabaja en proyectos selectivos donde diseño, tecnología, narrativa y estructura necesitan operar de forma integrada. Puedes escribir para una auditoría, un prototipo, una dirección visual, una arquitectura de contenido o un desarrollo por fases.",
  note:
    "El estudio no publica proyectos reservados. La conversación inicial puede comenzar desde un briefing general y avanzar bajo acuerdos de confidencialidad cuando sea necesario.",
  fields: [
    "Nombre",
    "Correo",
    "Proyecto u organización",
    "Tipo de sistema",
    "Rango presupuestal",
    "Horizonte temporal",
    "Mensaje"
  ]
};
