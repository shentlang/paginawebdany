/**
 * ARIAE - Datos Iniciales y Modelos Didácticos
 * Aplicación de Realidad Aumentada en Motores Aeronáuticos
 */

const INITIAL_BUGS = [
  {
    id: "bug-101",
    ticketCode: "ARIAE-ENG-8401",
    title: "Desalineación de álabes del Turbofán CFM56 sobre superficies pulidas",
    category: "tracking_ar",
    categoryLabel: "Tracking y Anclaje AR",
    engineType: "Turbofán de Alto Índice de Derivación (CFM56)",
    severity: "alta",
    status: "en_revision",
    reportedBy: {
      name: "Prof. Carlos Mendoza",
      email: "cmendoza@aeronautica.edu",
      institution: "Instituto Universitario de Aeronáutica"
    },
    deviceInfo: {
      device: "Samsung Galaxy S23 Ultra",
      os: "Android 14 (One UI 6.1)",
      appVersion: "v1.2.0"
    },
    description: "Al proyectar el modelo del Turbofán CFM56 en el aula de motores sobre mesas metálicas con reflejo, el anclaje de realidad aumentada vibra y se desplaza hacia abajo al activar el corte transversal del compresor de alta presión (HPC).",
    stepsToReproduce: "1. Abrir ARIAE en Galaxy S23 Ultra.\n2. Seleccionar 'Turbofán CFM56' -> 'Vista AR en Vivo'.\n3. Apuntar hacia superficie de mesa de hangar y pulsar 'Colocar'.\n4. Presionar el botón 'Corte Transversal 3D'.\n5. El modelo pierde el plano de referencia y oscila.",
    attachmentUrl: null,
    attachmentName: "captura_tracking_desplazado.png",
    adminNotes: "Sensibilidad detectada en superficies con reflejo especular en ARCore. Estamos refinando el algoritmo de oclusión y recomendando el modo 'Detección por Marcador QR de Banco'.",
    adminReply: "Estimado Prof. Mendoza: Se ha identificado la causa raíz en la estimación de iluminación. La corrección se incluirá en la actualización v1.2.1.",
    createdAt: "2026-10-18T10:15:00.000Z",
    updatedAt: "2026-10-19T14:30:00.000Z"
  },
  {
    id: "bug-102",
    ticketCode: "ARIAE-ENG-8402",
    title: "Caída de tasa de refresco (FPS) al activar postcombustión en Turborreactor",
    category: "rendimiento",
    categoryLabel: "Rendimiento y Caída de FPS",
    engineType: "Turborreactor Puro con Postquemador (J85)",
    severity: "media",
    status: "pendiente",
    reportedBy: {
      name: "Ing. Sofía Valenzuela",
      email: "svalenzuela@aerotech.org",
      institution: "Facultad de Ingeniería Mecánica y Aeronáutica"
    },
    deviceInfo: {
      device: "Samsung Galaxy A54 5G",
      os: "Android 13",
      appVersion: "v1.2.0"
    },
    description: "Durante la simulación de vectores de gas a más de 1400°C en el canal de postcombustión del motor J85, los cuadros por segundo caen de 60 a 18 FPS en dispositivos de gama media.",
    stepsToReproduce: "1. Abrir módulo 'Ciclo Brayton del Turborreactor'.\n2. Activar palanca de postcombustor al 100% de potencia.\n3. Habilitar capas de 'Vectores de Calor CFD'.\n4. Se observa ralentización severa.",
    attachmentUrl: null,
    attachmentName: null,
    adminNotes: "El shader de partículas de emisión térmica necesita nivel de detalle (LOD) dinámico para GPUs Mali.",
    adminReply: "",
    createdAt: "2026-10-19T16:40:00.000Z",
    updatedAt: "2026-10-19T16:40:00.000Z"
  },
  {
    id: "bug-103",
    ticketCode: "ARIAE-ENG-8403",
    title: "Cierre inesperado (Crash) al cambiar idioma en el Cuestionario del Turbohélice",
    category: "cierre_inesperado",
    categoryLabel: "Cierre Inesperado / Crash",
    engineType: "Turbohélice de Turbina Libre (PT6A)",
    severity: "critica",
    status: "resuelto",
    reportedBy: {
      name: "Andrés Morales",
      email: "andres.m@estudiante.edu",
      institution: "Escuela Técnica de Aviación Civil"
    },
    deviceInfo: {
      device: "Samsung Galaxy Tab S8+",
      os: "Android 14",
      appVersion: "v1.1.9"
    },
    description: "Al responder la pregunta didáctica sobre la caja reductora y la turbina de potencia libre en el motor PT6A, al cambiar a inglés la app se congela y se cierra de inmediato.",
    stepsToReproduce: "1. Ir a 'Evaluación Didáctica' -> 'Módulo Turbohélice'.\n2. Avanzar a pregunta 4.\n3. Cambiar selector de idioma a 'English'.\n4. La app se cierra.",
    attachmentUrl: null,
    attachmentName: "crash_log_pt6a.txt",
    adminNotes: "Solucionado: Clave de traducción faltante en el JSON de localización en_US. Corregido y desplegado.",
    adminReply: "Hola Andrés, el problema ha sido resuelto en la versión v1.2.0. Por favor actualiza desde el repositorio.",
    createdAt: "2026-10-15T09:20:00.000Z",
    updatedAt: "2026-10-17T11:00:00.000Z"
  },
  {
    id: "bug-104",
    ticketCode: "ARIAE-ENG-8404",
    title: "Textura oscura en tobera de escape bajo luz solar directa en exteriores",
    category: "renderizado",
    categoryLabel: "Fallo Gráfico / Renderizado 3D",
    engineType: "Turboeje de Helicóptero (Arriel 2D)",
    severity: "baja",
    status: "en_revision",
    reportedBy: {
      name: "Lic. Martín Herrera",
      email: "mherrera@alasdelsur.com",
      institution: "Centro de Entrenamiento de Vuelo"
    },
    deviceInfo: {
      device: "Samsung Galaxy Z Fold5",
      os: "Android 14",
      appVersion: "v1.2.0"
    },
    description: "Al practicar en el helipuerto al aire libre con sol directo, el shader de titanio de la tobera de escape se oscurece completamente en lugar de mostrar brillo metálico satinado.",
    stepsToReproduce: "1. Ejecutar en exteriores bajo iluminación superior a 70.000 lux.\n2. Cargar modelo del motor Turboeje Arriel 2D.\n3. Observar la tobera trasera oscurecida.",
    attachmentUrl: null,
    attachmentName: null,
    adminNotes: "Calibración del Environmental Probe de ARCore para lux superior a 80,000 en progreso.",
    adminReply: "En revisión por el equipo técnico de shaders gráficos.",
    createdAt: "2026-10-20T12:00:00.000Z",
    updatedAt: "2026-10-21T08:15:00.000Z"
  }
];

const ENGINES_DATA = {
  turbofan: {
    id: "turbofan",
    name: "Turbofán de Alto Índice de Derivación",
    modelExample: "CFM56-7B / CFM LEAP-1B",
    badge: "Aviación Comercial de Gran Alcance",
    application: "Equipa aeronaves como Boeing 737 MAX y Airbus A320neo",
    description: "El motor turbofán es el pilar de la aviación comercial contemporánea. Emplea un rotor frontal gigante (Fan) que desvía la mayor parte del aire alrededor del núcleo (flujo secundario), generando más del 80% del empuje total con una notable reducción de ruido y consumo de combustible.",
    stats: [
      { label: "Índice de Derivación", value: "11:1 a 12:1" },
      { label: "Empuje Máximo", value: "32,000 lbf" },
      { label: "Régimen Térmico", value: "1,750 °C" },
      { label: "Eficiencia", value: "44% Global" }
    ],
    sections: [
      { name: "Fan Frontal", desc: "Álabes de titanio 3D monolíticos de alta resistencia a impacto de aves." },
      { name: "Compresor de Alta Presión (HPC)", desc: "9 etapas axiales con relación de compresión de hasta 40:1." },
      { name: "Cámara Anular TAPS", desc: "Mezcla estequiométrica con emisiones ultra reducidas de NOx." },
      { name: "Turbina de Alta y Baja Presión", desc: "Álabes monocristalinos con microcanales de refrigeración interna." }
    ],
    color: "#0057b8",
    svgType: "turbofan"
  },
  turboprop: {
    id: "turboprop",
    name: "Turbohélice de Turbina Libre",
    modelExample: "Pratt & Whitney Canada PT6A-67P",
    badge: "Aviación Regional y Utilitaria",
    application: "Equipa aeronaves como Beechcraft King Air y Cessna Grand Caravan",
    description: "Reconocido mundialmente por su revolucionaria arquitectura de flujo invertido: el aire ingresa por la sección posterior del motor y los gases calientes se expulsan por los laterales delanteros. Su turbina de potencia desacoplada permite variar el paso de la hélice con total suavidad.",
    stats: [
      { label: "Potencia al Eje", value: "1,200 SHP" },
      { label: "Velocidad Turbina", value: "33,000 RPM" },
      { label: "Velocidad Hélice", value: "1,900 RPM" },
      { label: "Separador Inercial", value: "Anti-FOD 99%" }
    ],
    sections: [
      { name: "Admisión Invertida Trasera", desc: "Diseño con separador inercial que desvía partículas de hielo y arena." },
      { name: "Compresor Axial-Centrífugo", desc: "3 etapas axiales seguidas de un potente impulsor centrífugo de titanio." },
      { name: "Turbina Libre de Potencia", desc: "Gira mecánicamente independiente del compresor de gas." },
      { name: "Caja Reductora Planetaria", desc: "Convierte las altas revoluciones de la turbina en torque útil para la hélice." }
    ],
    color: "#0284c7",
    svgType: "turboprop"
  },
  turbojet: {
    id: "turbojet",
    name: "Turborreactor Puro con Postcombustión",
    modelExample: "General Electric J85-GE-21",
    badge: "Combate Táctico y Entrenamiento Supersónico",
    application: "Equipa aeronaves supersónicas como el Northrop F-5 y T-38 Talon",
    description: "El fundamento teórico del Ciclo Brayton directo en propulsión a chorro pura. Todo el flujo másico de aire atraviesa el compresor axial, la cámara de combustión y la tobera de escape supersónica con inyección de postcombustión para doblar el empuje instantáneo.",
    stats: [
      { label: "Empuje con Postquemador", value: "5,000 lbf" },
      { label: "Relación Empuje/Peso", value: "7.3:1" },
      { label: "Velocidad de Escape", value: "Mach 1.8+" },
      { label: "Etapas Compresor", value: "8 Axiales" }
    ],
    sections: [
      { name: "Ducto Supersónico", desc: "Desacelera el flujo de entrada para una compresión eficiente sin ondas de choque." },
      { name: "Estatores de Ángulo Variable", desc: "Regulan el ángulo del flujo de aire para evitar el bombeo (compressor stall)." },
      { name: "Cámara Can-Annular", desc: "Tubos de combustión independientes interconectados por tubos de llama." },
      { name: "Tobera de Pétalos Variables", desc: "Ajusta la sección convergente-divergente según la presión de salida." }
    ],
    color: "#e11d48",
    svgType: "turbojet"
  },
  turboshaft: {
    id: "turboshaft",
    name: "Turboeje para Aeronaves de Ala Rotatoria",
    modelExample: "Safran Helicopter Engines Arriel 2D",
    badge: "Helicópteros Civiles y de Rescate",
    application: "Equipa helicópteros como Airbus H125 Écureuil y H130",
    description: "Motor turboeje diseñado para entregar potencia en forma de torque rotacional continuo hacia la caja de transmisión principal del helicóptero. Incorpora control electrónico digital bicanal FADEC para asegurar revoluciones constantes en el rotor ante cambios bruscos de paso colectivo.",
    stats: [
      { label: "Potencia de Despegue", value: "952 SHP" },
      { label: "Control FADEC", value: "Canal Dual 32-bit" },
      { label: "Inyección Centrífuga", value: "Sin Inyectores de Tobera" },
      { label: "Intervalo TBO", value: "5,000 Horas" }
    ],
    sections: [
      { name: "Eje de Transmisión Principal", desc: "Acoplamiento estriado a la transmisión de rotor MGB con embrague de rueda libre." },
      { name: "Compresor Centrífugo Mecanizado", desc: "Monobloque de titanio forjado resistente a la erosión por polvo y salitre." },
      { name: "Inyección Centrífuga por Eje", desc: "El queroseno se distribuye por centrifugación eliminando problemas de coquización." },
      { name: "Toberas Laterales en Y", desc: "Canalizan los gases de escape a los costados del fuselaje del helicóptero." }
    ],
    color: "#059669",
    svgType: "turboshaft"
  }
};

const FAQ_ITEMS = [
  {
    q: "¿Qué requisitos mínimos debe cumplir mi teléfono o tablet para usar ARIAE?",
    a: "ARIAE requiere Android 10.0 o superior con compatibilidad oficial para Google Play Services for AR (ARCore), o iOS 14+ con ARKit. Se recomienda un procesador de 8 núcleos, mínimo 4 GB de memoria RAM y cámara con soporte para enfoque automático."
  },
  {
    q: "¿Por qué el motor en Realidad Aumentada se mueve o pierde el suelo?",
    a: "El sistema de anclaje de ARCore requiere superficies con textura visible y buena iluminación ambiental. Evite proyectar sobre pisos o mesas con reflejo extremo (como vidrio o acero pulido). Si está en un laboratorio, puede usar el modo alternativo 'Marcador Impreso QR de Banco'."
  },
  {
    q: "¿Cómo puedo reportar un bug que encontré durante una práctica?",
    a: "En esta misma página, diríjase al apartado 'Centro de Soporte' y complete el formulario detallando el motor aeronáutico involucrado, el modelo de su dispositivo y los pasos para reproducir el error. El sistema le entregará un código de ticket único (ej. ARIAE-ENG-8401) para hacer seguimiento."
  },
  {
    q: "¿Puedo consultar el estado de mi ticket de soporte técnico?",
    a: "Sí. Ingrese su código de ticket en la barra de 'Rastrear Ticket' en el Centro de Soporte para ver si su reporte está Pendiente, En Revisión o Resuelto, junto a los comentarios de los ingenieros y docentes administradores."
  },
  {
    q: "¿Dónde descargo la última versión de la aplicación didáctica ARIAE?",
    a: "La versión v1.2.0 está disponible en formato APK para dispositivos Android y en enlace institucional para tablets de laboratorio aeronáutico en los botones de descarga de esta landing page."
  }
];
