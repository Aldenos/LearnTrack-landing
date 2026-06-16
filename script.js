// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
  updateActiveNav();
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - navbar.offsetHeight - 8, behavior: 'smooth' });
      document.getElementById('main-nav').classList.remove('open');
    }
  });
});

// ── SCROLL SPY ──
const spySections = [
  { id: 'inicio',      nav: 'nav-inicio' },
  { id: 'beneficios',  nav: 'nav-beneficios' },
  { id: 'testimonios', nav: 'nav-testimonios' },
  { id: 'demo',        nav: 'nav-demo' },
  { id: 'precios',     nav: 'nav-precios' },
  { id: 'acerca',      nav: 'nav-acerca' },
  { id: 'equipo',      nav: 'nav-equipo' },
  { id: 'faq',         nav: 'nav-faq' },
  { id: 'contacto',    nav: 'nav-contacto' },
];

function updateActiveNav() {
  const scrollY = window.scrollY + navbar.offsetHeight + 40;
  let current = spySections[0].nav;
  spySections.forEach(({ id, nav }) => {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollY) current = nav;
  });
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeEl = document.getElementById(current);
  if (activeEl) activeEl.classList.add('active');
}

// ── HAMBURGER ──
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('main-nav').classList.toggle('open');
});

// ── MODE SWITCHER ──
const modeBtn      = document.getElementById('mode-btn');
const modeDropdown = document.getElementById('mode-dropdown');
const modeLabel    = document.getElementById('mode-label');

modeBtn.addEventListener('click', e => {
  e.stopPropagation();
  const isOpen = modeDropdown.classList.toggle('open');
  modeBtn.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', () => {
  modeDropdown.classList.remove('open');
  modeBtn.setAttribute('aria-expanded', false);
});

document.querySelectorAll('.mode-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    setMode(btn.dataset.mode);
    modeDropdown.classList.remove('open');
    modeBtn.setAttribute('aria-expanded', false);
  });
});

function setMode(mode) {
  const isEst = mode === 'estudiante';
  document.body.classList.toggle('mode-estudiante', isEst);
  modeLabel.textContent = isEst ? 'Estudiante' : 'Docente';

  document.querySelectorAll('.mode-opt').forEach(o => {
    o.classList.toggle('active', o.dataset.mode === mode);
  });

  // collapse all open FAQs on mode switch
  document.querySelectorAll('.faq-question').forEach(q => {
    q.setAttribute('aria-expanded', 'false');
    q.nextElementSibling.classList.remove('open');
  });

  try { localStorage.setItem('cpMode', mode); } catch (_) {}
}

// restore saved mode
(function () {
  try {
    const saved = localStorage.getItem('cpMode');
    if (saved === 'estudiante') setMode('estudiante');
  } catch (_) {}
})();

// ── FAQ ACCORDION ──
document.addEventListener('click', e => {
  const btn = e.target.closest('.faq-question');
  if (!btn) return;
  const isOpen = btn.getAttribute('aria-expanded') === 'true';
  // close all within same faq-list
  const list = btn.closest('.faq-list');
  list.querySelectorAll('.faq-question').forEach(b => {
    b.setAttribute('aria-expanded', 'false');
    b.nextElementSibling.classList.remove('open');
  });
  if (!isOpen) {
    btn.setAttribute('aria-expanded', 'true');
    btn.nextElementSibling.classList.add('open');
  }
});

// ── CONTACT FORM ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('btn-submit');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    document.getElementById('form-success').classList.add('show');
    e.target.reset();
    btn.textContent = 'Envía un mensaje';
    btn.disabled = false;
    setTimeout(() => document.getElementById('form-success').classList.remove('show'), 5000);
  }, 1200);
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', updateActiveNav);
