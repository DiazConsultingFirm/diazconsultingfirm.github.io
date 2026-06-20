// Nav scroll effect
const navWrapper = document.querySelector('.nav-wrapper');
window.addEventListener('scroll', () => {
  navWrapper.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});

// Scroll-reveal fade-up
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .stat-card, .case-study, .process-step, .credential, .hook-copy, .about-copy'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Contact form — simple mailto fallback
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const business = document.getElementById('business').value;
  const goal = document.getElementById('goal').value;

  const subject = encodeURIComponent(`Discovery Call Request — ${name}`);
  const body = encodeURIComponent(
    `Hi Evans,\n\nI'd like to book a discovery call.\n\nName: ${name}\nBusiness type: ${business}\n\nMain bottleneck:\n${goal}\n\nBest email to reach me: ${email}`
  );
  window.location.href = `mailto:diaz.diazconsultingfirm@gmail.com?subject=${subject}&body=${body}`;
});

// Mobile menu toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
mobileBtn.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? '' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '68px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'rgba(15,35,51,0.98)';
  navLinks.style.padding = '16px 24px 24px';
  navLinks.style.gap = '4px';
  if (open) navLinks.removeAttribute('style');
});
