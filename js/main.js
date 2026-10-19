/**
 * MANOHARI KULKARNI — Academic Research Portfolio
 * Core Client-side Interactivity & Visual Demonstrations
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Theme Toggle (Light / Dark Mode) ---
  const themeToggle = document.getElementById('theme-toggle');
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  const root = document.documentElement;

  // Check saved preference or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    setTheme('dark');
  } else {
    setTheme('light');
  }

  function setTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
      localStorage.setItem('theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
      localStorage.setItem('theme', 'light');
    }
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // --- 2. Mobile Menu Toggle ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile nav when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- 3. ScrollSpy for Active Navigation Pill ---
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-link');

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          if (item.getAttribute('href') === `#${id}`) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));

  // --- 4. Interactive Scratch Assay Pipeline Simulation ---
  const timePills = document.querySelectorAll('.time-pill');
  const toggleMask = document.getElementById('toggle-mask');
  const woundContour = document.getElementById('wound-contour');
  const maskOverlay = document.getElementById('mask-overlay');
  const closureStat = document.getElementById('closure-stat');
  const woundSvgText = document.getElementById('wound-svg-text');
  const cellLeft = document.getElementById('cell-left');
  const cellRight = document.getElementById('cell-right');

  // Timepoint data points based on Manohari's MDA-MB-231 thesis data
  const timepointData = {
    '0': {
      closure: '0.0% (Baseline)',
      leftWidth: 120,
      rightX: 280,
      woundPath: 'M 120 0 Q 135 120 120 240 L 280 240 Q 265 120 280 0 Z',
      areaPct: '100% Open'
    },
    '8': {
      closure: '28.4% (Early Influx)',
      leftWidth: 145,
      rightX: 255,
      woundPath: 'M 145 0 Q 155 120 145 240 L 255 240 Q 245 120 255 0 Z',
      areaPct: '71.6% Remaining'
    },
    '24': {
      closure: '88.7% (Near-Complete)',
      leftWidth: 185,
      rightX: 215,
      woundPath: 'M 185 0 Q 192 120 185 240 L 215 240 Q 208 120 215 0 Z',
      areaPct: '11.3% Remaining'
    },
    '48': {
      closure: '99.4% (Closed Monolayer)',
      leftWidth: 198,
      rightX: 202,
      woundPath: 'M 198 0 Q 200 120 198 240 L 202 240 Q 200 120 202 0 Z',
      areaPct: '0.6% Scar'
    }
  };

  timePills.forEach(pill => {
    pill.addEventListener('click', () => {
      timePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const time = pill.getAttribute('data-time');
      const data = timepointData[time];

      // Update SVG coordinates
      woundContour.setAttribute('d', data.woundPath);
      maskOverlay.setAttribute('d', data.woundPath);
      cellLeft.setAttribute('width', data.leftWidth);
      cellRight.setAttribute('x', data.rightX);
      cellRight.setAttribute('width', 400 - data.rightX);

      // Update readouts
      closureStat.innerHTML = `${data.closure}`;
      woundSvgText.textContent = `Wound Area: ${data.areaPct}`;
    });
  });

  if (toggleMask) {
    toggleMask.addEventListener('change', (e) => {
      maskOverlay.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  // --- 5. Modal Lightbox for Genuine Thesis Figures ---
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalCaption = document.getElementById('modal-caption');
  const modalClose = document.getElementById('modal-close');

  const figureData = {
    'modal-wb': {
      src: 'assets/images/msc_western_blot_and_mcf7_scratch_1.jpg',
      title: 'M.Sc. Thesis Fig 3.4 — Western Blot of NSMCE2 vs β-actin',
      caption: 'Immunoblot validation across MCF-7, MDA-MB-231, and MDA-MB-468 cell lines. Demonstrates prominent NSMCE2 protein expression (~28-29 kDa) in TNBC lines compared to luminal MCF-7 control, with uniform loading confirmed by β-actin (~40 kDa).'
    },
    'modal-qpcr': {
      src: 'assets/images/msc_qpcr_expression_1.png',
      title: 'M.Sc. Thesis Fig 3.3 — Quantitative Real-Time PCR (RT-qPCR)',
      caption: 'Relative gene expression of NSMCE2 using 18S rRNA and GAPDH as reference housekeeping genes. Normalized against GAPDH, NSMCE2 showed 52.7-fold upregulation in MDA-MB-468 and 21.6-fold upregulation in MDA-MB-231 compared to MCF-7.'
    },
    'modal-scratch': {
      src: 'assets/images/msc_scratch_mdamb231_2.jpg',
      title: 'M.Sc. Thesis Fig 3.7 — Wound Healing Scratch Assay (MDA-MB-231)',
      caption: 'Microscopic time-lapse series of MDA-MB-231 cells at 0h, 4h, 8h, 22h, and 24h comparing Vehicle Control vs Olaparib (1000 nM working concentration) treated cultures.'
    },
    'modal-smc': {
      src: 'assets/images/msc_sumoylation_cascade_1.jpg',
      title: 'M.Sc. Thesis Fig 1.2 — The SUMOylation Enzymatic Cascade',
      caption: 'Graphical representation of the multi-step SUMOylation pathway: Step 1 (Maturation by SENP proteases), Step 2 (ATP-dependent activation by SAE1/SAE2 heterodimer), Step 3 (Conjugation to UBC9), Step 4 (Ligation to substrate by E3 ligases including NSMCE2, PIAS1-4), and Step 5 (DeSUMOylation).'
    },
    'modal-fsem': {
      src: 'assets/images/bsc_fsem_trial2_spheres_1.png',
      title: 'B.Sc. Thesis Fig 4.12 b — FESEM Micrograph of Trial 2 PEG-PLGA Nanoparticles',
      caption: 'Field Emission Scanning Electron Microscopy (FESEM) micrograph of Trial 2 formulation. Shows well-defined spherical morphology and nanometer-scale particle dimensions synthesized via the solvent-antisolvent nanoprecipitation method.'
    },
    'modal-synthesis': {
      src: 'assets/images/bsc_nanoparticle_synthesis_flow_1.png',
      title: 'B.Sc. Thesis Fig 3.4 — Nanoparticle Synthesis Experimental Workflow',
      caption: 'Schematic representation of the solvent-antisolvent nanoprecipitation protocol: syringe pump infusion of PEG-PLGA + Rutin in organic solvent into aqueous PVA solution, followed by continuous magnetic stirring, cooling centrifugation, and vacuum drying.'
    },
    'modal-docking': {
      src: 'assets/images/bsc_docking_mtorc1_rutin_1.jpg',
      title: 'B.Sc. Thesis Fig 4.5 a — Molecular Docking of mTORC1 with Rutin',
      caption: '3D surface representation and 2D interaction map of Rutin docked within the ATP-binding cleft of mTORC1 (PDB ID: 8ER6), demonstrating an exceptional binding energy of -10.6 kcal/mol.'
    },
    'modal-mlsd': {
      src: 'assets/images/bsc_mlsd_docking_binding_3.jpg',
      title: 'B.Sc. Thesis Fig 4.6 c — Multi-Ligand Simultaneous Docking (MLSD)',
      caption: 'Synergistic inter-ligand interactions between Rutin and PP242 in mTORC1 binding pockets, yielding an enhanced combined MLSD score of -13.558 kcal/mol.'
    }
  };

  document.querySelectorAll('.figure-thumbnail').forEach(thumb => {
    thumb.addEventListener('click', () => {
      const modalKey = thumb.getAttribute('data-modal');
      const item = figureData[modalKey];
      if (item) {
        modalImg.src = item.src;
        modalTitle.textContent = item.title;
        modalCaption.textContent = item.caption;
        modal.style.display = 'flex';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // --- 6. Citation Copy Functionality ---
  const copyBtn = document.getElementById('btn-copy-citation');
  const bibtexBtn = document.getElementById('btn-copy-bibtex');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const citation = copyBtn.getAttribute('data-citation');
      navigator.clipboard.writeText(citation).then(() => {
        showToast('APA citation copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy. Please copy manually.');
      });
    });
  }

  if (bibtexBtn) {
    bibtexBtn.addEventListener('click', () => {
      const bibtex = `@incollection{kulkarni2026epigenetics,
  author    = {Kulkarni, Manohari M.},
  title     = {The Role of Epigenetics in Cancer Progression},
  booktitle = {Cancer Targets: Novel Therapies and Emerging Research Directions (Part 1)},
  publisher = {Bentham Science Publishers},
  year      = {2026},
  month     = {apr},
  doi       = {10.2174/9798898814113126010006}
}`;
      navigator.clipboard.writeText(bibtex).then(() => {
        showToast('BibTeX entry copied to clipboard!');
      }).catch(() => {
        showToast('Failed to copy. Please copy manually.');
      });
    });
  }
});
