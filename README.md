<<<<<<< HEAD
# paginawebdany
=======
# ARIAE - Landing Page & Portal de Reportes

> **APLICACIÓN DE LA REALIDAD AUMENTADA (AR) COMO HERRAMIENTA DIDÁCTICA EN LA ENSEÑANZA DE MOTORES AERONÁUTICOS**  
> Trabajo Final de Grado &bull; Facultad Politécnica, Universidad Nacional de Asunción (FP-UNA)

---

## 🛫 Estructura del Proyecto

1. **[`index.html`](file:///c:/Users/danny/OneDrive/Escritorio/Ariare/index.html)**: Landing page principal moderna, limpia y responsive desarrollada con **HTML5 y Tailwind CSS**, siguiendo con total fidelidad las 7 secciones académicas y estéticas requeridas:
   - **1. Encabezado y Navegación (Navbar)**: Logo ARIAE, menú (*Inicio*, *Características*, *Requisitos*, *Autores*, *Descarga*) y botón directo para abrir el **Centro de Reportes en una nueva ventana**.
   - **2. Sección Principal (Hero Section)**: Título oficial, subtítulo pedagógico, botones CTA (*Descargar APK* y *Ver Manual / Marcador AR*) y maqueta realista de smartphone proyectando en 3D un motor turbofán sobre el Image Target físico.
   - **3. Características y Modos Principales de la App**: Cuadrícula de 3 tarjetas detalladas:
     - *Modo Despiece* (separación virtual 3D, reinicio/ensamblado y audio sync).
     - *Modo Funcionamiento* (conjuntos N1 y N2, partículas de combustión y flujo Brayton).
     - *Modo Información* (inspección táctil con etiquetas y síntesis de voz por IA).
   - **4. Requisitos Técnicos del Sistema**: Especificaciones de Android 11.0+, cámara trasera, conexión a Internet, Image Target impreso y recomendaciones para renderizado a 30 FPS.
   - **5. Autores y Créditos Académicos**:
     - *Autores*: Jazmín Raquel Arguello Villalba y Jesús Felipe Nery Bobadilla (*Ingeniería en Aeronáutica*).
     - *Institución*: Facultad Politécnica, Universidad Nacional de Asunción (FP-UNA), San Lorenzo &mdash; Paraguay.
     - *Orientadores*: Prof. Ing. Adolfo Javier Jara Céspedes, Mst. Ph.D. (*Tutor Técnico*) y Prof. Ing. María Soledad Ayala Rodríguez, Mst. (*Asesora Metodológica*).
     - *Tecnologías*: Unity 6, Vuforia Engine, C# y Blender.
   - **6. Sección de Descarga Final**: Título *"Lleva el laboratorio de motores a la palma de tu mano"*, descarga directa de APK, descarga del Marcador AR en PDF e invitación a soporte.
   - **7. Pie de Página (Footer)**: Derechos de autor © 2026 ARIAE, mención institucional FP-UNA y enlace a soporte.

2. **[`soporte.html`](file:///c:/Users/danny/OneDrive/Escritorio/Ariare/soporte.html)**: Portal de Soporte Técnico y Administración que se abre en una **nueva ventana / pestaña**:
   - **Apartado de Reporte de Bugs para Alumnos**:
     - Formulario con título, categoría, etapa del motor, severidad, modelo del dispositivo, versión de Android, pasos y carga de capturas de pantalla con vista previa.
     - Generación automática de número de ticket (`ARIAE-ENG-XXXX`).
   - **Consultar Estado de Ticket**:
     - Rastreador en tiempo real con línea de tiempo (*Recibido -> En Diagnóstico -> Solucionado*) y lectura de la respuesta oficial del docente.
   - **Panel de Administrador (Para leerlos tú mismo)**:
     - Protegido por PIN / Contraseña docente: **`ariae2026`** o **`1234`**.
     - Métricas en tiempo real (Total, Pendientes, En Revisión, Solucionados, Críticos).
     - Filtros por estado, severidad y búsqueda en vivo.
     - Modal para inspeccionar el reporte, ver la captura adjunta en tamaño ampliado, actualizar el estado, escribir la respuesta oficial al usuario y notas internas.
     - Exportación de reportes a archivo **CSV** para planillas.
     - Persistencia automática en `localStorage` (sin necesidad de configurar base de datos).

---

## 💻 Cómo Abrir el Proyecto

Solo haz doble clic en [`index.html`](file:///c:/Users/danny/OneDrive/Escritorio/Ariare/index.html) en tu explorador de Windows para abrir la página en cualquier navegador web moderno (Chrome, Edge, Firefox, Safari).
Al hacer clic en **"Soporte & Reportes"**, el sistema abrirá automáticamente [`soporte.html`](file:///c:/Users/danny/OneDrive/Escritorio/Ariare/soporte.html) en una **nueva ventana**.
>>>>>>> f4572a5 (prueba)
