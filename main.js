'use strict';

// ===== NAV =====
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== HERO IMAGE PARALLAX + LOAD =====
const heroImg = document.querySelector('.hero-img');
if (heroImg) {
  heroImg.classList.add('loaded');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) heroImg.style.transform = `scale(1) translateY(${y * 0.25}px)`;
  }, { passive: true });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    // close mobile nav if open
    navLinks.style.display = '';
  });
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('[data-target]');
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    let start = 0;
    const step = () => {
      start = Math.min(start + Math.ceil(target / 28), target);
      el.textContent = start;
      if (start < target) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObserver.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => countObserver.observe(c));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.scard, .gstat, .pstep, .acred, .hook-copy, .about-copy, .cs-panel').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== DISPLAY CARDS — stacked interactive =====
const cards = document.querySelectorAll('.display-card');
const panels = { robert: 'cs-robert', gerlach: 'cs-gerlach', next: 'cs-next' };

function showPanel(clientKey) {
  Object.values(panels).forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('cs-panel--hidden');
  });
  const target = document.getElementById(panels[clientKey]);
  if (target) {
    target.classList.remove('cs-panel--hidden');
    // re-trigger animation
    target.style.animation = 'none';
    void target.offsetWidth;
    target.style.animation = '';
  }
}

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    const client = card.dataset.client;
    showPanel(client);
    cards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');
  });
  card.addEventListener('mouseleave', () => {
    card.classList.remove('active');
  });
  card.addEventListener('click', () => {
    const client = card.dataset.client;
    showPanel(client);
  });
});

// Default: show Robert Davis panel
showPanel('robert');

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');
burger.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  if (open) {
    navLinks.style.cssText = '';
  } else {
    navLinks.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:72px;left:0;right:0;background:rgba(10,22,40,0.97);backdrop-filter:blur(16px);padding:20px 28px 32px;gap:4px;border-bottom:1px solid rgba(255,255,255,0.06);z-index:199';
  }
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const business = document.getElementById('business').value;
  const goal = document.getElementById('goal').value;
  const subject = encodeURIComponent(`Discovery Call Request — ${name}`);
  const body = encodeURIComponent(`Hi Evans,\n\nI'd like to book a discovery call.\n\nName: ${name}\nBusiness: ${business}\n\nMain bottleneck:\n${goal}\n\nEmail: ${email}`);
  window.location.href = `mailto:diaz.diazconsultingfirm@gmail.com?subject=${subject}&body=${body}`;
});
