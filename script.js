// NorfolkAI — small bits of progressive enhancement.

(function () {
  // Year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll(
    '.section-head, .card, .steps li, .metric, .quote, .cta-card, .enterprise-grid, .foot-grid'
  );
  revealEls.forEach((el) => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  // Animated metric counters
  const metricNums = document.querySelectorAll('.m-num');
  const animateNumber = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(target * eased).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && metricNums.length) {
    const mio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateNumber(entry.target);
            mio.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    metricNums.forEach((el) => mio.observe(el));
  } else {
    metricNums.forEach((el) => (el.textContent = el.dataset.target));
  }

  // Audit form — front-end only handler
  const form = document.querySelector('.audit-form');
  const status = document.querySelector('.form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const email = (data.get('email') || '').toString().trim();
      if (!name || !email) {
        if (status) status.textContent = 'Please add your name and email so we can reach you.';
        return;
      }
      if (status) status.textContent = `Thanks, ${name.split(' ')[0]} — your audit request is in. We'll reply within one working day.`;
      form.reset();
    });
  }
})();
