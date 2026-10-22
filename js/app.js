/**
 * ARIAE - Lógica Principal de la Aplicación
 * Manejo de navegación, catálogo de motores, soporte, tracking y panel de administración
 */

(function() {
  'use strict';

  // ==========================================
  // STATE MANAGEMENT
  // ==========================================
  const STORAGE_KEY = 'ariae_bugs_db';
  const AUTH_KEY = 'ariae_admin_auth';

  let bugs = [];
  let isAdminAuthenticated = false;
  let currentEngineId = 'turbofan';
  let attachedImageBase64 = null;
  let activeEditingBugId = null;

  // Initialize storage
  function initStorage() {
    const savedBugs = localStorage.getItem(STORAGE_KEY);
    if (!savedBugs) {
      bugs = [...INITIAL_BUGS];
      saveBugsToStorage();
    } else {
      try {
        bugs = JSON.parse(savedBugs);
      } catch (e) {
        bugs = [...INITIAL_BUGS];
        saveBugsToStorage();
      }
    }

    // Check admin session
    isAdminAuthenticated = sessionStorage.getItem(AUTH_KEY) === 'true';
  }

  function saveBugsToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bugs));
  }

  // ==========================================
  // DOM ELEMENTS
  // ==========================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mainHeader = document.getElementById('mainHeader');

  // Hero showcase
  const visualStage = document.getElementById('visualStage');
  const hotspotInfoBar = document.getElementById('hotspotInfoBar');
  const hotspotText = document.getElementById('hotspotText');
  const modeToggles = document.querySelectorAll('.btn-mode-toggle');
  const btnDownloadMock = document.getElementById('btnDownloadMock');

  // Engine explorer
  const engineTabs = document.querySelectorAll('.engine-tab');
  const engineDetailCard = document.getElementById('engineDetailCard');

  // Support tabs & form
  const tabBtnReportBug = document.getElementById('tabBtnReportBug');
  const tabBtnTrackTicket = document.getElementById('tabBtnTrackTicket');
  const tabBtnFaq = document.getElementById('tabBtnFaq');
  const paneReportBug = document.getElementById('paneReportBug');
  const paneTrackTicket = document.getElementById('paneTrackTicket');
  const paneFaq = document.getElementById('paneFaq');

  const bugReportForm = document.getElementById('bugReportForm');
  const fileDropZone = document.getElementById('fileDropZone');
  const bugScreenshotInput = document.getElementById('bugScreenshot');
  const dropZonePrompt = document.getElementById('dropZonePrompt');
  const dropPreviewContainer = document.getElementById('dropPreviewContainer');
  const imagePreview = document.getElementById('imagePreview');
  const btnRemoveImage = document.getElementById('btnRemoveImage');

  // Ticket tracking
  const trackInputCode = document.getElementById('trackInputCode');
  const btnSearchTicket = document.getElementById('btnSearchTicket');
  const ticketResultContainer = document.getElementById('ticketResultContainer');
  const btnTrackModalOpen = document.getElementById('btnTrackModalOpen');
  const btnTrackModalOpenMobile = document.getElementById('btnTrackModalOpenMobile');

  // FAQ
  const faqAccordion = document.getElementById('faqAccordion');

  // Admin Section
  const btnAdminAuthToggle = document.getElementById('btnAdminAuthToggle');
  const adminAuthStatusLabel = document.getElementById('adminAuthStatusLabel');
  const adminAuthIcon = document.getElementById('adminAuthIcon');
  const adminLockedGate = document.getElementById('adminLockedGate');
  const adminWorkspace = document.getElementById('adminWorkspace');
  const adminPinInput = document.getElementById('adminPinInput');
  const btnAdminUnlockSubmit = document.getElementById('btnAdminUnlockSubmit');
  const navAdminDot = document.getElementById('navAdminDot');

  const kpiTotal = document.getElementById('kpiTotal');
  const kpiPending = document.getElementById('kpiPending');
  const kpiInReview = document.getElementById('kpiInReview');
  const kpiResolved = document.getElementById('kpiResolved');
  const kpiCritical = document.getElementById('kpiCritical');
  const kpiCards = document.querySelectorAll('.kpi-card');

  const adminFilterStatus = document.getElementById('adminFilterStatus');
  const adminFilterSeverity = document.getElementById('adminFilterSeverity');
  const adminSearchInput = document.getElementById('adminSearchInput');
  const adminTableBody = document.getElementById('adminTableBody');
  const noBugsMessage = document.getElementById('noBugsMessage');

  const btnExportCsv = document.getElementById('btnExportCsv');
  const btnResetDemoData = document.getElementById('btnResetDemoData');

  // Modals
  const ticketSuccessModal = document.getElementById('ticketSuccessModal');
  const generatedTicketCode = document.getElementById('generatedTicketCode');
  const btnCopyTicketCode = document.getElementById('btnCopyTicketCode');
  const btnCloseSuccessModal = document.getElementById('btnCloseSuccessModal');

  const adminDetailModal = document.getElementById('adminDetailModal');
  const btnCloseAdminModal = document.getElementById('btnCloseAdminModal');
  const btnCancelAdminModal = document.getElementById('btnCancelAdminModal');
  const btnSaveAdminTicket = document.getElementById('btnSaveAdminTicket');
  const btnDeleteTicket = document.getElementById('btnDeleteTicket');

  const modalTicketCode = document.getElementById('modalTicketCode');
  const modalBugTitle = document.getElementById('modalBugTitle');
  const modalEngine = document.getElementById('modalEngine');
  const modalCategory = document.getElementById('modalCategory');
  const modalDevice = document.getElementById('modalDevice');
  const modalReporter = document.getElementById('modalReporter');
  const modalDate = document.getElementById('modalDate');
  const modalSeverityBadge = document.getElementById('modalSeverityBadge');
  const modalDescription = document.getElementById('modalDescription');
  const modalSteps = document.getElementById('modalSteps');
  const modalAttachmentSection = document.getElementById('modalAttachmentSection');
  const modalAttachmentImg = document.getElementById('modalAttachmentImg');
  const modalStatusSelect = document.getElementById('modalStatusSelect');
  const modalSeveritySelect = document.getElementById('modalSeveritySelect');
  const modalAdminReply = document.getElementById('modalAdminReply');
  const modalAdminNotes = document.getElementById('modalAdminNotes');

  // ==========================================
  // INITIALIZATION
  // ==========================================
  function init() {
    initStorage();
    setupNavbar();
    setupHeroShowcase();
    renderEngineDetails(currentEngineId);
    setupSupportTabs();
    setupBugForm();
    setupTicketTracker();
    renderFAQ();
    setupAdminSection();
    updateAdminUI();
  }

  // ==========================================
  // NAVBAR & NAVIGATION
  // ==========================================
  function setupNavbar() {
    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });

      // Close menu on link click
      const mobileLinks = mobileMenu.querySelectorAll('a, button');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
        });
      });
    }

    // Scroll active links
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        mainHeader.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
      } else {
        mainHeader.style.boxShadow = 'none';
      }

      const sections = ['inicio', 'motores', 'didactica', 'compatibilidad', 'soporte', 'admin-section'];
      let currentSection = '';

      sections.forEach(secId => {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            currentSection = secId;
          }
        }
      });

      if (currentSection) {
        const desktopLinks = document.querySelectorAll('.nav-link');
        desktopLinks.forEach(l => {
          const href = l.getAttribute('href');
          if (href === `#${currentSection}`) {
            l.classList.add('active');
          } else {
            l.classList.remove('active');
          }
        });
      }
    });

    // Mock Download Button
    if (btnDownloadMock) {
      btnDownloadMock.addEventListener('click', () => {
        alert('🛫 Iniciando descarga del paquete instalador:\nARIAE_v1.2.0_AeroEngines_ARCore.apk (48.5 MB)\n\n¡Gracias por utilizar la plataforma didáctica de motores aeronáuticos!');
      });
    }
  }

  // ==========================================
  // HERO SHOWCASE (SVG / AR INTERACTION)
  // ==========================================
  function setupHeroShowcase() {
    // Mode switcher buttons
    modeToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        modeToggles.forEach(b => b.classList.remove('active'));
        toggle.classList.add('active');

        const mode = toggle.getAttribute('data-view');
        applyShowcaseMode(mode);
      });
    });

    // Hotspot interaction
    const pins = document.querySelectorAll('.interactive-pin');
    pins.forEach(pin => {
      pin.addEventListener('mouseenter', () => {
        const info = pin.getAttribute('data-info');
        if (info && hotspotText) {
          hotspotText.innerHTML = `<strong>Componente Seleccionado:</strong> ${info}`;
        }
      });

      pin.addEventListener('click', () => {
        const info = pin.getAttribute('data-info');
        if (info && hotspotText) {
          hotspotText.innerHTML = `<strong>Componente Seleccionado:</strong> ${info}`;
        }
      });
    });
  }

  function applyShowcaseMode(mode) {
    const flowStream = document.getElementById('flowStreamGroup');
    const fanGroup = document.getElementById('fanBladesGroup');
    const compressor = document.getElementById('compressorGroup');
    const combustion = document.getElementById('combustionGroup');
    const turbine = document.getElementById('turbineStagesGroup');

    if (!flowStream) return;

    if (mode === 'thermal') {
      flowStream.style.opacity = '1';
      flowStream.style.filter = 'drop-shadow(0 0 12px #ff4500)';
      if (hotspotText) {
        hotspotText.innerHTML = `<strong>Modo Flujo Térmico Activo:</strong> Muestra la transformación de energía según el Ciclo Brayton (Azul: Aire comprimido -> Naranja: Expansión de llama a 1,750°C -> Violeta: Empuje neto).`;
      }
    } else if (mode === 'exploded') {
      flowStream.style.opacity = '0.15';
      if (compressor) compressor.style.transform = 'translate(-25px, -15px)';
      if (combustion) combustion.style.transform = 'translate(20px, 15px)';
      if (turbine) turbine.style.transform = 'translate(40px, -15px)';
      if (hotspotText) {
        hotspotText.innerHTML = `<strong>Modo Despiece de Álabes (Exploded View):</strong> Los componentes se separan axialmente para inspeccionar la holgura entre etapas rotóricas y estatóricas.`;
      }
    } else {
      // Normal cutaway
      flowStream.style.opacity = '0.45';
      flowStream.style.filter = 'none';
      if (compressor) compressor.style.transform = 'none';
      if (combustion) combustion.style.transform = 'none';
      if (turbine) turbine.style.transform = 'none';
      if (hotspotText) {
        hotspotText.innerHTML = `<strong>Modo Corte Transversal:</strong> Sección longitudinal que permite estudiar la relación de compresión y el flujo de aire primario y secundario.`;
      }
    }
  }

  // ==========================================
  // SECTION 2: ENGINES CATALOG EXPLORER
  // ==========================================
  function renderEngineDetails(engineId) {
    const data = ENGINES_DATA[engineId];
    if (!data || !engineDetailCard) return;

    // Build stats HTML
    const statsHtml = data.stats.map(s => `
      <div class="engine-stat-box">
        <span class="stat-lbl">${s.label}</span>
        <span class="stat-val">${s.value}</span>
      </div>
    `).join('');

    // Build sections HTML
    const sectionsHtml = data.sections.map((sec, idx) => `
      <div class="component-card-mini">
        <div class="component-name">${idx + 1}. ${sec.name}</div>
        <div class="component-desc">${sec.desc}</div>
      </div>
    `).join('');

    // Specific SVG visual for each engine type
    const visualSvgHtml = getEngineSvgVisual(engineId);

    engineDetailCard.innerHTML = `
      <div class="engine-card-layout">
        
        <!-- Left Column: Specs & Components -->
        <div class="engine-info-col">
          <span class="engine-badge-tag">${data.badge}</span>
          <h3>${data.name}</h3>
          <p class="engine-model-sub">${data.modelExample}</p>
          <p class="engine-desc">${data.description}</p>
          
          <div class="engine-stats-grid">
            ${statsHtml}
          </div>

          <h4 class="components-list-title">Componentes Principales en el Modelo 3D</h4>
          <div class="components-accordion">
            ${sectionsHtml}
          </div>
        </div>

        <!-- Right Column: Interactive Diagram -->
        <div class="engine-visual-col">
          <div class="visual-badge-overlay">
            <span>Simulador 3D: ${data.modelExample}</span>
          </div>

          <div class="engine-canvas-mock">
            ${visualSvgHtml}
          </div>

          <p class="text-sm text-secondary mt-3" style="font-size: 0.8rem; color: #64748b;">
            Disponible en el aula virtual con detección de plano horizontal y soporte para escala 1:1 y 1:10.
          </p>

          <div class="mt-4" style="margin-top: 18px;">
            <a href="#soporte" class="samsung-btn samsung-btn-outline btn-sm">
              ¿Problemas con este motor? Reportar aquí &rarr;
            </a>
          </div>
        </div>

      </div>
    `;

    // Handle tab change events
    engineTabs.forEach(tab => {
      const id = tab.getAttribute('data-engine');
      if (id === engineId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }

      tab.onclick = () => {
        currentEngineId = id;
        renderEngineDetails(id);
      };
    });
  }

  function getEngineSvgVisual(engineId) {
    if (engineId === 'turboprop') {
      return `
        <svg viewBox="0 0 400 240" class="w-full">
          <!-- Propeller -->
          <ellipse cx="60" cy="120" rx="12" ry="90" fill="#0284c7" opacity="0.8"/>
          <line x1="60" y1="30" x2="60" y2="210" stroke="#000000" stroke-width="4"/>
          <!-- Gearbox -->
          <rect x="75" y="90" width="45" height="60" rx="5" fill="#334155"/>
          <text x="97" y="125" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="bold">RGB</text>
          <!-- Exhaust duct forward -->
          <path d="M 125 80 L 150 40 L 180 50 L 160 90 Z" fill="#e2e8f0" stroke="#64748b"/>
          <!-- Power Turbine -->
          <rect x="160" y="95" width="20" height="50" rx="3" fill="#0284c7"/>
          <!-- Gas Generator Turbine -->
          <rect x="190" y="92" width="20" height="56" rx="3" fill="#ea580c"/>
          <!-- Centrifugal Impeller -->
          <ellipse cx="230" cy="120" rx="14" ry="45" fill="#64748b"/>
          <!-- Reverse Air Inlet Rear -->
          <path d="M 270 85 Q 350 90 350 120 Q 350 150 270 155 Z" fill="#cbd5e1" stroke="#475569"/>
          <text x="310" y="124" fill="#000000" font-size="9" text-anchor="middle" font-weight="bold">ENTRADA INVERTIDA</text>
        </svg>
      `;
    }

    if (engineId === 'turbojet') {
      return `
        <svg viewBox="0 0 400 240" class="w-full">
          <!-- Supersonic intake -->
          <polygon points="40,70 110,85 110,155 40,170" fill="#334155"/>
          <!-- 8-stage axial compressor -->
          <rect x="115" y="85" width="80" height="70" fill="#64748b" rx="4"/>
          <!-- Combustion chamber -->
          <rect x="200" y="80" width="50" height="80" fill="#dc2626" rx="6"/>
          <!-- Turbine -->
          <rect x="255" y="88" width="25" height="64" fill="#e11d48" rx="3"/>
          <!-- Afterburner channel -->
          <rect x="285" y="75" width="70" height="90" fill="#ea580c" opacity="0.9"/>
          <!-- Variable petal nozzle -->
          <polygon points="355,75 390,65 390,175 355,165" fill="#1e293b"/>
          <text x="320" y="124" fill="#ffffff" font-size="9" text-anchor="middle" font-weight="bold">POSTQUEMADOR</text>
        </svg>
      `;
    }

    if (engineId === 'turboshaft') {
      return `
        <svg viewBox="0 0 400 240" class="w-full">
          <!-- Output Shaft -->
          <rect x="30" y="112" width="60" height="16" fill="#059669" rx="3"/>
          <!-- FADEC unit -->
          <rect x="100" y="45" width="55" height="30" fill="#1e293b" rx="4"/>
          <text x="127" y="64" fill="#34d399" font-size="9" text-anchor="middle" font-weight="bold">FADEC</text>
          <!-- Casing -->
          <rect x="95" y="85" width="160" height="70" rx="8" fill="#475569"/>
          <!-- Centrifugal compressor -->
          <ellipse cx="140" cy="120" rx="16" ry="30" fill="#cbd5e1"/>
          <!-- Combustion with shaft injection -->
          <rect x="170" y="95" width="40" height="50" fill="#f97316" rx="4"/>
          <!-- Power turbine -->
          <rect x="220" y="98" width="18" height="44" fill="#10b981"/>
          <!-- Lateral Exhausts -->
          <path d="M 245 105 L 290 80 L 290 100 L 255 118 Z" fill="#e2e8f0"/>
          <path d="M 245 135 L 290 160 L 290 140 L 255 122 Z" fill="#e2e8f0"/>
          <text x="60" y="105" fill="#059669" font-size="8" font-weight="bold">A TRANSMISIÓN</text>
        </svg>
      `;
    }

    // Default turbofan
    return `
      <svg viewBox="0 0 400 240" class="w-full">
        <!-- Nacelle -->
        <path d="M 60 45 Q 160 30 250 35 Q 350 40 370 60 L 360 75 Q 260 55 160 50 L 70 65 Z" fill="#1e293b"/>
        <path d="M 60 195 Q 160 210 250 205 Q 350 200 370 180 L 360 165 Q 260 185 160 190 L 70 175 Z" fill="#1e293b"/>
        <!-- Big Fan -->
        <ellipse cx="95" cy="120" rx="12" ry="70" fill="#0057b8"/>
        <!-- Core Compressor -->
        <rect x="130" y="85" width="70" height="70" fill="#475569" rx="4"/>
        <!-- Combustor -->
        <rect x="205" y="88" width="35" height="64" fill="#ea580c" rx="4"/>
        <!-- Turbine -->
        <rect x="245" y="90" width="40" height="60" fill="#dc2626" rx="4"/>
        <!-- Bypass arrow -->
        <path d="M 120 58 Q 230 50 330 65" stroke="#00c6ff" stroke-width="4" fill="none" stroke-dasharray="6,4"/>
        <path d="M 120 182 Q 230 190 330 175" stroke="#00c6ff" stroke-width="4" fill="none" stroke-dasharray="6,4"/>
        <text x="230" y="125" fill="#ffffff" font-size="10" text-anchor="middle" font-weight="bold">NÚCLEO PRIMARIO</text>
      </svg>
    `;
  }

  // ==========================================
  // SECTION 5: SUPPORT HUB & TICKET TRACKER
  // ==========================================
  function setupSupportTabs() {
    const tabs = [
      { btn: tabBtnReportBug, pane: paneReportBug },
      { btn: tabBtnTrackTicket, pane: paneTrackTicket },
      { btn: tabBtnFaq, pane: paneFaq }
    ];

    tabs.forEach(item => {
      if (item.btn) {
        item.btn.addEventListener('click', () => {
          tabs.forEach(t => {
            t.btn.classList.remove('active');
            t.pane.classList.remove('active');
          });
          item.btn.classList.add('active');
          item.pane.classList.add('active');
        });
      }
    });

    // Quick open buttons from navbar
    if (btnTrackModalOpen) {
      btnTrackModalOpen.addEventListener('click', () => {
        window.location.hash = '#soporte';
        if (tabBtnTrackTicket) tabBtnTrackTicket.click();
      });
    }
    if (btnTrackModalOpenMobile) {
      btnTrackModalOpenMobile.addEventListener('click', () => {
        window.location.hash = '#soporte';
        if (tabBtnTrackTicket) tabBtnTrackTicket.click();
      });
    }
  }

  function setupBugForm() {
    if (!bugReportForm) return;

    // Screenshot file upload & preview
    if (bugScreenshotInput && fileDropZone) {
      bugScreenshotInput.addEventListener('change', handleFileSelect);

      // Drag and drop
      fileDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = 'var(--samsung-blue)';
      });

      fileDropZone.addEventListener('dragleave', () => {
        fileDropZone.style.borderColor = 'var(--samsung-border)';
      });

      fileDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        fileDropZone.style.borderColor = 'var(--samsung-border)';
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          processFile(e.dataTransfer.files[0]);
        }
      });
    }

    if (btnRemoveImage) {
      btnRemoveImage.addEventListener('click', (e) => {
        e.stopPropagation();
        attachedImageBase64 = null;
        if (bugScreenshotInput) bugScreenshotInput.value = '';
        dropPreviewContainer.style.display = 'none';
        dropZonePrompt.style.display = 'block';
      });
    }

    // Submit handler
    bugReportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('bugTitle').value.trim();
      const category = document.getElementById('bugCategory').value;
      const engineType = document.getElementById('bugEngine').value;
      const severity = document.querySelector('input[name="severity"]:checked')?.value || 'media';
      const device = document.getElementById('bugDevice').value.trim();
      const os = document.getElementById('bugOS').value.trim();
      const description = document.getElementById('bugDescription').value.trim();
      const stepsToReproduce = document.getElementById('bugSteps').value.trim();
      const reporterName = document.getElementById('reporterName').value.trim() || 'Estudiante / Docente';
      const reporterEmail = document.getElementById('reporterEmail').value.trim();
      const reporterInstitution = document.getElementById('reporterInstitution').value.trim();

      // Category labels mapping
      const categoryLabels = {
        tracking_ar: 'Tracking y Anclaje AR',
        renderizado: 'Fallo Gráfico / Renderizado 3D',
        cierre_inesperado: 'Cierre Inesperado / Crash',
        rendimiento: 'Rendimiento y Caída de FPS',
        didactico: 'Error en Contenido / Cuestionarios',
        camara: 'Permisos de Cámara y Sensores',
        otro: 'Otro Inconveniente'
      };

      // Generate unique ticket number
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const ticketCode = `ARIAE-ENG-${randomSuffix}`;
      const newId = `bug-${Date.now()}`;

      const newBug = {
        id: newId,
        ticketCode: ticketCode,
        title: title,
        category: category,
        categoryLabel: categoryLabels[category] || 'General',
        engineType: engineType,
        severity: severity,
        status: 'pendiente',
        reportedBy: {
          name: reporterName,
          email: reporterEmail,
          institution: reporterInstitution
        },
        deviceInfo: {
          device: device,
          os: os,
          appVersion: 'v1.2.0'
        },
        description: description,
        stepsToReproduce: stepsToReproduce,
        attachmentUrl: attachedImageBase64 || null,
        attachmentName: attachedImageBase64 ? 'evidencia_captura.png' : null,
        adminNotes: '',
        adminReply: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Add to array and save
      bugs.unshift(newBug);
      saveBugsToStorage();

      // Update admin UI if open
      updateAdminUI();

      // Show success modal
      if (generatedTicketCode) generatedTicketCode.textContent = ticketCode;
      if (ticketSuccessModal) ticketSuccessModal.style.display = 'flex';

      // Reset form
      bugReportForm.reset();
      attachedImageBase64 = null;
      if (dropPreviewContainer) dropPreviewContainer.style.display = 'none';
      if (dropZonePrompt) dropZonePrompt.style.display = 'block';
    });

    // Copy ticket code
    if (btnCopyTicketCode) {
      btnCopyTicketCode.addEventListener('click', () => {
        const code = generatedTicketCode.textContent;
        navigator.clipboard.writeText(code).then(() => {
          btnCopyTicketCode.textContent = '¡Copiado!';
          setTimeout(() => {
            btnCopyTicketCode.textContent = 'Copiar Código';
          }, 2000);
        });
      });
    }

    if (btnCloseSuccessModal) {
      btnCloseSuccessModal.addEventListener('click', () => {
        ticketSuccessModal.style.display = 'none';
      });
    }
  }

  function handleFileSelect(e) {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  }

  function processFile(file) {
    if (!file.type.match('image.*')) {
      alert('Por favor selecciona un archivo de imagen (PNG, JPG o WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      attachedImageBase64 = event.target.result;
      if (imagePreview) imagePreview.src = attachedImageBase64;
      if (dropZonePrompt) dropZonePrompt.style.display = 'none';
      if (dropPreviewContainer) dropPreviewContainer.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  }

  // ==========================================
  // TICKET TRACKER LOOKUP
  // ==========================================
  function setupTicketTracker() {
    if (btnSearchTicket) {
      btnSearchTicket.addEventListener('click', performTicketSearch);
    }
    if (trackInputCode) {
      trackInputCode.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performTicketSearch();
      });
    }

    // Demo pills
    const pills = document.querySelectorAll('.pill-code-example');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const code = pill.getAttribute('data-code');
        if (trackInputCode) {
          trackInputCode.value = code;
          performTicketSearch();
        }
      });
    });
  }

  function performTicketSearch() {
    const raw = trackInputCode ? trackInputCode.value.trim().toUpperCase() : '';
    if (!raw) {
      alert('Por favor introduce un código de ticket.');
      return;
    }

    const found = bugs.find(b => b.ticketCode.toUpperCase() === raw || b.id === raw.toLowerCase());

    if (!ticketResultContainer) return;

    if (!found) {
      ticketResultContainer.style.display = 'block';
      ticketResultContainer.innerHTML = `
        <div class="result-card-inner text-center" style="padding: 30px;">
          <p style="color: #ef4444; font-weight: 700; margin-bottom: 6px;">
            Ticket no encontrado (${raw})
          </p>
          <p style="font-size: 0.88rem; color: #64748b;">
            Verifica que el código tenga el formato correcto, por ejemplo <strong>ARIAE-ENG-8401</strong>.
          </p>
        </div>
      `;
      return;
    }

    // Render found ticket
    const statusMap = {
      pendiente: { label: 'Pendiente de Revisión', class: 'status-pendiente', step: 1 },
      en_revision: { label: 'En Investigación Técnica', class: 'status-en_revision', step: 2 },
      resuelto: { label: 'Solución Implementada', class: 'status-resuelto', step: 3 },
      descartado: { label: 'Descartado / Duplicado', class: 'status-descartado', step: 1 }
    };

    const statusInfo = statusMap[found.status] || statusMap.pendiente;

    // Build timeline stepper
    const step1Class = statusInfo.step >= 1 ? (statusInfo.step > 1 ? 'completed' : 'active') : '';
    const step2Class = statusInfo.step >= 2 ? (statusInfo.step > 2 ? 'completed' : 'active') : '';
    const step3Class = statusInfo.step >= 3 ? 'completed active' : '';

    const replySection = found.adminReply ? `
      <div class="ticket-reply-callout">
        <div class="callout-title">Respuesta Oficial del Equipo Docente / Desarrollador:</div>
        <p class="callout-text">${found.adminReply}</p>
      </div>
    ` : `
      <div class="ticket-reply-callout" style="border-left-color: #cbd5e1;">
        <div class="callout-title" style="color: #64748b;">Estado del Diagnóstico:</div>
        <p class="callout-text" style="color: #64748b; font-style: italic;">
          Tu ticket está en cola de revisión pedagógica. En breve se publicará una respuesta aquí.
        </p>
      </div>
    `;

    ticketResultContainer.style.display = 'block';
    ticketResultContainer.innerHTML = `
      <div class="result-card-inner">
        
        <div class="result-header-row">
          <div>
            <span class="result-code-badge">${found.ticketCode}</span>
            <span class="status-badge ${statusInfo.class}" style="margin-left: 10px;">
              ${statusInfo.label}
            </span>
          </div>
          <span style="font-size: 0.8rem; color: #64748b;">
            Fecha de Ingreso: ${new Date(found.createdAt).toLocaleDateString('es-ES')}
          </span>
        </div>

        <h4 style="font-size: 1.15rem; margin-bottom: 8px;">${found.title}</h4>
        <p style="font-size: 0.88rem; color: #475569; margin-bottom: 14px;">
          <strong>Motor:</strong> ${found.engineType} &bull; <strong>Dispositivo:</strong> ${found.deviceInfo.device} (${found.deviceInfo.os})
        </p>

        <!-- Stepper -->
        <div class="progress-stepper">
          <div class="step-node ${step1Class}">
            <div class="step-circle">1</div>
            <span class="step-lbl">Recibido</span>
          </div>
          <div class="step-node ${step2Class}">
            <div class="step-circle">2</div>
            <span class="step-lbl">En Análisis</span>
          </div>
          <div class="step-node ${step3Class}">
            <div class="step-circle">3</div>
            <span class="step-lbl">Resuelto</span>
          </div>
        </div>

        <!-- Details -->
        <div style="background-color: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.85rem; color: #334155;">
          <strong>Descripción reportada:</strong>
          <p style="margin-top: 4px; line-height: 1.45;">${found.description}</p>
        </div>

        ${replySection}

      </div>
    `;
  }

  // ==========================================
  // FAQ ACCORDION
  // ==========================================
  function renderFAQ() {
    if (!faqAccordion) return;

    faqAccordion.innerHTML = FAQ_ITEMS.map((item, idx) => `
      <div class="faq-item ${idx === 0 ? 'open' : ''}">
        <button class="faq-question">
          <span>${item.q}</span>
          <svg class="faq-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
        <div class="faq-answer">
          ${item.a}
        </div>
      </div>
    `).join('');

    const questions = faqAccordion.querySelectorAll('.faq-question');
    questions.forEach(btn => {
      btn.addEventListener('click', () => {
        const parent = btn.parentElement;
        parent.classList.toggle('open');
      });
    });
  }

  // ==========================================
  // SECTION 6: ADMIN PORTAL
  // ==========================================
  function setupAdminSection() {
    // PIN submission
    if (btnAdminUnlockSubmit) {
      btnAdminUnlockSubmit.addEventListener('click', handleAdminLogin);
    }
    if (adminPinInput) {
      adminPinInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleAdminLogin();
      });
    }

    // Toggle logout / login button
    if (btnAdminAuthToggle) {
      btnAdminAuthToggle.addEventListener('click', () => {
        if (isAdminAuthenticated) {
          if (confirm('¿Cerrar sesión del panel de administrador?')) {
            isAdminAuthenticated = false;
            sessionStorage.removeItem(AUTH_KEY);
            updateAdminUI();
          }
        } else {
          // Focus PIN input
          if (adminPinInput) adminPinInput.focus();
        }
      });
    }

    // Filters and Search
    if (adminFilterStatus) adminFilterStatus.addEventListener('change', renderAdminTable);
    if (adminFilterSeverity) adminFilterSeverity.addEventListener('change', renderAdminTable);
    if (adminSearchInput) adminSearchInput.addEventListener('input', renderAdminTable);

    // KPI Card Click filters
    kpiCards.forEach(card => {
      card.addEventListener('click', () => {
        const filterVal = card.getAttribute('data-filter');
        if (filterVal && adminFilterStatus) {
          if (filterVal === 'critica' && adminFilterSeverity) {
            adminFilterSeverity.value = 'critica';
            adminFilterStatus.value = 'todos';
          } else {
            adminFilterStatus.value = filterVal;
            if (adminFilterSeverity) adminFilterSeverity.value = 'todos';
          }
          renderAdminTable();
        }
      });
    });

    // Export CSV
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportToCsv);
    }

    // Reset Demo Data
    if (btnResetDemoData) {
      btnResetDemoData.addEventListener('click', () => {
        if (confirm('¿Restablecer los reportes originales de demostración? Se recargarán los 4 casos de estudio aeronáuticos.')) {
          bugs = [...INITIAL_BUGS];
          saveBugsToStorage();
          updateAdminUI();
          alert('Datos de demostración recargados correctamente.');
        }
      });
    }

    // Admin Modals
    if (btnCloseAdminModal) btnCloseAdminModal.addEventListener('click', closeAdminModal);
    if (btnCancelAdminModal) btnCancelAdminModal.addEventListener('click', closeAdminModal);
    if (btnSaveAdminTicket) btnSaveAdminTicket.addEventListener('click', saveAdminTicketChanges);
    if (btnDeleteTicket) btnDeleteTicket.addEventListener('click', deleteAdminTicket);
  }

  function handleAdminLogin() {
    const pin = adminPinInput ? adminPinInput.value.trim().toLowerCase() : '';
    const validPins = ['ariae2026', '1234', 'admin', 'admin123'];

    if (validPins.includes(pin)) {
      isAdminAuthenticated = true;
      sessionStorage.setItem(AUTH_KEY, 'true');
      if (adminPinInput) adminPinInput.value = '';
      updateAdminUI();
    } else {
      alert('Clave incorrecta. Por favor usa "ariae2026" o "1234".');
    }
  }

  function updateAdminUI() {
    if (isAdminAuthenticated) {
      if (adminLockedGate) adminLockedGate.style.display = 'none';
      if (adminWorkspace) adminWorkspace.style.display = 'block';
      if (adminAuthStatusLabel) adminAuthStatusLabel.textContent = 'Cerrar Sesión Admin';
      if (navAdminDot) navAdminDot.style.display = 'inline-block';
      renderKPIs();
      renderAdminTable();
    } else {
      if (adminLockedGate) adminLockedGate.style.display = 'block';
      if (adminWorkspace) adminWorkspace.style.display = 'none';
      if (adminAuthStatusLabel) adminAuthStatusLabel.textContent = 'Autenticarse como Admin';
      if (navAdminDot) navAdminDot.style.display = 'none';
    }
  }

  function renderKPIs() {
    const total = bugs.length;
    const pending = bugs.filter(b => b.status === 'pendiente').length;
    const inReview = bugs.filter(b => b.status === 'en_revision').length;
    const resolved = bugs.filter(b => b.status === 'resuelto').length;
    const critical = bugs.filter(b => b.severity === 'critica').length;

    if (kpiTotal) kpiTotal.textContent = total;
    if (kpiPending) kpiPending.textContent = pending;
    if (kpiInReview) kpiInReview.textContent = inReview;
    if (kpiResolved) kpiResolved.textContent = resolved;
    if (kpiCritical) kpiCritical.textContent = critical;
  }

  function renderAdminTable() {
    if (!adminTableBody) return;

    const statusFilter = adminFilterStatus ? adminFilterStatus.value : 'todos';
    const severityFilter = adminFilterSeverity ? adminFilterSeverity.value : 'todos';
    const searchQuery = adminSearchInput ? adminSearchInput.value.trim().toLowerCase() : '';

    let filtered = [...bugs];

    if (statusFilter !== 'todos') {
      filtered = filtered.filter(b => b.status === statusFilter);
    }
    if (severityFilter !== 'todos') {
      filtered = filtered.filter(b => b.severity === severityFilter);
    }
    if (searchQuery) {
      filtered = filtered.filter(b =>
        b.ticketCode.toLowerCase().includes(searchQuery) ||
        b.title.toLowerCase().includes(searchQuery) ||
        b.description.toLowerCase().includes(searchQuery) ||
        b.engineType.toLowerCase().includes(searchQuery) ||
        (b.deviceInfo.device && b.deviceInfo.device.toLowerCase().includes(searchQuery)) ||
        (b.reportedBy.name && b.reportedBy.name.toLowerCase().includes(searchQuery))
      );
    }

    if (filtered.length === 0) {
      adminTableBody.innerHTML = '';
      if (noBugsMessage) noBugsMessage.style.display = 'block';
      return;
    }

    if (noBugsMessage) noBugsMessage.style.display = 'none';

    const severityBadges = {
      baja: '<span style="color: #10b981; font-weight: 700;">Baja</span>',
      media: '<span style="color: #38bdf8; font-weight: 700;">Media</span>',
      alta: '<span style="color: #f59e0b; font-weight: 700;">Alta</span>',
      critica: '<span style="color: #f43f5e; font-weight: 800;">CRÍTICA</span>'
    };

    const statusBadges = {
      pendiente: '<span class="status-badge status-pendiente">Pendiente</span>',
      en_revision: '<span class="status-badge status-en_revision">En Revisión</span>',
      resuelto: '<span class="status-badge status-resuelto">Resuelto</span>',
      descartado: '<span class="status-badge status-descartado">Descartado</span>'
    };

    adminTableBody.innerHTML = filtered.map(b => `
      <tr>
        <td class="ticket-code-cell">${b.ticketCode}</td>
        <td>${statusBadges[b.status] || b.status}</td>
        <td>${severityBadges[b.severity] || b.severity}</td>
        <td>
          <div class="table-bug-title" title="${b.title}">${b.title}</div>
        </td>
        <td>${b.engineType}</td>
        <td>
          <div class="table-device-text">${b.deviceInfo.device}</div>
        </td>
        <td>${b.reportedBy.name || 'Anónimo'}</td>
        <td>${new Date(b.createdAt).toLocaleDateString('es-ES')}</td>
        <td class="text-right">
          <button class="btn-inspect" data-id="${b.id}">
            Gestionar &rarr;
          </button>
        </td>
      </tr>
    `).join('');

    // Attach inspect buttons
    const inspectBtns = adminTableBody.querySelectorAll('.btn-inspect');
    inspectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openAdminModal(id);
      });
    });
  }

  // ==========================================
  // ADMIN MODAL & EDIT LOGIC
  // ==========================================
  function openAdminModal(bugId) {
    const bug = bugs.find(b => b.id === bugId);
    if (!bug || !adminDetailModal) return;

    activeEditingBugId = bugId;

    if (modalTicketCode) modalTicketCode.textContent = bug.ticketCode;
    if (modalBugTitle) modalBugTitle.textContent = bug.title;
    if (modalEngine) modalEngine.textContent = bug.engineType;
    if (modalCategory) modalCategory.textContent = bug.categoryLabel || bug.category;
    if (modalDevice) modalDevice.textContent = `${bug.deviceInfo.device} (${bug.deviceInfo.os})`;
    if (modalReporter) modalReporter.textContent = `${bug.reportedBy.name} ${bug.reportedBy.email ? `(${bug.reportedBy.email})` : ''} - ${bug.reportedBy.institution || ''}`;
    if (modalDate) modalDate.textContent = new Date(bug.createdAt).toLocaleString('es-ES');
    if (modalSeverityBadge) modalSeverityBadge.textContent = bug.severity.toUpperCase();
    if (modalDescription) modalDescription.textContent = bug.description;
    if (modalSteps) modalSteps.textContent = bug.stepsToReproduce || 'No se detallaron pasos específicos.';

    // Screenshot
    if (bug.attachmentUrl && modalAttachmentSection && modalAttachmentImg) {
      modalAttachmentSection.style.display = 'block';
      modalAttachmentImg.src = bug.attachmentUrl;
    } else if (modalAttachmentSection) {
      modalAttachmentSection.style.display = 'none';
    }

    // Editable form
    if (modalStatusSelect) modalStatusSelect.value = bug.status;
    if (modalSeveritySelect) modalSeveritySelect.value = bug.severity;
    if (modalAdminReply) modalAdminReply.value = bug.adminReply || '';
    if (modalAdminNotes) modalAdminNotes.value = bug.adminNotes || '';

    adminDetailModal.style.display = 'flex';
  }

  function closeAdminModal() {
    if (adminDetailModal) adminDetailModal.style.display = 'none';
    activeEditingBugId = null;
  }

  function saveAdminTicketChanges() {
    if (!activeEditingBugId) return;

    const idx = bugs.findIndex(b => b.id === activeEditingBugId);
    if (idx === -1) return;

    bugs[idx].status = modalStatusSelect ? modalStatusSelect.value : bugs[idx].status;
    bugs[idx].severity = modalSeveritySelect ? modalSeveritySelect.value : bugs[idx].severity;
    bugs[idx].adminReply = modalAdminReply ? modalAdminReply.value.trim() : '';
    bugs[idx].adminNotes = modalAdminNotes ? modalAdminNotes.value.trim() : '';
    bugs[idx].updatedAt = new Date().toISOString();

    saveBugsToStorage();
    renderKPIs();
    renderAdminTable();
    closeAdminModal();
    alert('Reporte actualizado correctamente.');
  }

  function deleteAdminTicket() {
    if (!activeEditingBugId) return;

    if (confirm('¿Estás seguro de eliminar este reporte de forma permanente?')) {
      bugs = bugs.filter(b => b.id !== activeEditingBugId);
      saveBugsToStorage();
      renderKPIs();
      renderAdminTable();
      closeAdminModal();
      alert('Reporte eliminado de la base de datos.');
    }
  }

  // ==========================================
  // CSV EXPORT UTILITY
  // ==========================================
  function exportToCsv() {
    if (!bugs || bugs.length === 0) {
      alert('No hay reportes para exportar.');
      return;
    }

    const headers = ['CodigoTicket', 'Titulo', 'Estado', 'Severidad', 'Motor', 'Dispositivo', 'SO', 'ReportadoPor', 'Email', 'Institucion', 'Fecha', 'RespuestaAdmin'];
    const rows = bugs.map(b => [
      `"${b.ticketCode}"`,
      `"${b.title.replace(/"/g, '""')}"`,
      `"${b.status}"`,
      `"${b.severity}"`,
      `"${b.engineType}"`,
      `"${b.deviceInfo.device}"`,
      `"${b.deviceInfo.os}"`,
      `"${(b.reportedBy.name || '').replace(/"/g, '""')}"`,
      `"${b.reportedBy.email || ''}"`,
      `"${(b.reportedBy.institution || '').replace(/"/g, '""')}"`,
      `"${b.createdAt}"`,
      `"${(b.adminReply || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `ARIAE_Reportes_Bugs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
