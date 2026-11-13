/**
 * Estúdio Forma — Arquitetura & Design de Interiores
 * Scripts de Interatividade e Experiência do Usuário
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Tema Claro / Escuro
  const themeBtn = document.getElementById('themeBtn');
  const themeIcon = document.getElementById('themeIcon');
  const savedTheme = localStorage.getItem('forma-theme') || 'light';

  function setTheme(t) {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('forma-theme', t);
    if (themeIcon) {
      themeIcon.textContent = t === 'dark' ? '☀️' : '🌙';
    }
  }

  setTheme(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      setTheme(isDark ? 'light' : 'dark');
    });
  }

  // 2. Menu Mobile
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-active');
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('is-active');
      });
    });
  }

  // 3. Filtro de Projetos
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. Modal de Detalhes do Projeto
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalArea = document.getElementById('modalArea');
  const modalLoc = document.getElementById('modalLoc');
  const modalYear = document.getElementById('modalYear');
  const modalDesc = document.getElementById('modalDesc');

  document.querySelectorAll('.open-project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if (!card || !modal) return;

      const title = card.querySelector('.project-title')?.textContent;
      const desc = card.getAttribute('data-detail') || card.querySelector('.project-desc')?.textContent;
      const area = card.getAttribute('data-area') || '—';
      const loc = card.getAttribute('data-loc') || 'São Paulo, SP';
      const year = card.getAttribute('data-year') || '2025/2026';
      const imgSrc = card.querySelector('.project-thumb img')?.src;

      if (modalTitle) modalTitle.textContent = title;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalArea) modalArea.textContent = area;
      if (modalLoc) modalLoc.textContent = loc;
      if (modalYear) modalYear.textContent = year;
      if (modalImg && imgSrc) modalImg.src = imgSrc;

      modal.style.display = 'flex';
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

  // 5. Simulador de Projeto Interativo
  const simType = document.getElementById('simType');
  const simArea = document.getElementById('simArea');
  const simRooms = document.getElementById('simRooms');
  const simOutputTime = document.getElementById('simOutputTime');
  const simOutputSummary = document.getElementById('simOutputSummary');

  function calculateEstimate() {
    if (!simType || !simArea || !simRooms) return;

    const type = simType.value;
    const area = parseFloat(simArea.value) || 70;
    const rooms = parseInt(simRooms.value) || 3;

    let baseWeeks = 4;
    let typeName = 'Projeto Residencial';

    if (type === 'comercial') {
      baseWeeks = 3;
      typeName = 'Projeto Comercial / Corporativo';
    } else if (type === 'consultoria') {
      baseWeeks = 2;
      typeName = 'Consultoria de Interiores Express';
    }

    // Cálculo proporcional de semanas
    const calculatedWeeks = Math.max(2, Math.round(baseWeeks + (area / 45) + (rooms * 0.4)));

    if (simOutputTime) {
      simOutputTime.textContent = `${calculatedWeeks} a ${calculatedWeeks + 2} semanas`;
    }

    if (simOutputSummary) {
      simOutputSummary.textContent = `${typeName} com aproximadamente ${area}m² e ${rooms} ambientes. Inclui estudo preliminar 3D, especificações executivas de marcenaria, iluminação e detalhamento completo de acabamentos.`;
    }
  }

  [simType, simArea, simRooms].forEach(el => {
    if (el) el.addEventListener('change', calculateEstimate);
    if (el) el.addEventListener('input', calculateEstimate);
  });

  calculateEstimate();

  // 6. Formulário de Contato
  const contactForm = document.getElementById('formaContactForm');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando solicitação...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Solicitação Enviada com Sucesso ✓';
        }
        if (formFeedback) {
          formFeedback.style.display = 'block';
          formFeedback.textContent = 'Obrigado pelo contato! Nossa equipe de arquitetura retornará em até 24 horas úteis para agendar sua reunião de briefing.';
        }
      }, 900);
    });
  }
});
