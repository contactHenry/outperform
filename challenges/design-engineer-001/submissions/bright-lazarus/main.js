const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
const siteHeader = document.querySelector('.site-header');
const heroHeadline = document.getElementById('hero-headline');
const heroSubtitle = document.getElementById('hero-subtitle');

let rafScheduled = false;
const syncHeaderState = () => {
  if (!siteHeader) return;
  siteHeader.classList.toggle('is-scrolled', window.scrollY > 8);
};

window.addEventListener('scroll', () => {
  if (rafScheduled) return;
  rafScheduled = true;
  requestAnimationFrame(() => {
    syncHeaderState();
    rafScheduled = false;
  });
});

syncHeaderState();

const setHeadlineVariant = (variant) => {
  if (!heroHeadline || !heroSubtitle) return;
  heroHeadline.textContent = heroHeadline.dataset[`variant${variant.toUpperCase()}`] || heroHeadline.textContent;
  heroSubtitle.textContent = heroSubtitle.dataset[`variant${variant.toUpperCase()}`] || heroSubtitle.textContent;

  for (const button of document.querySelectorAll('.variant-btn')) {
    const isActive = button.dataset.variant === variant;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }
};

for (const button of document.querySelectorAll('.variant-btn')) {
  button.addEventListener('click', () => {
    const variant = button.dataset.variant;
    if (!variant) return;
    setHeadlineVariant(variant);
  });
}

const setVisualVariant = (variant) => {
  for (const button of document.querySelectorAll('.visual-btn')) {
    const isActive = button.dataset.visual === variant;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  }

  for (const panel of document.querySelectorAll('.hero-visual-panel')) {
    panel.classList.toggle('is-active', panel.dataset.visualPanel === variant);
  }
};

for (const button of document.querySelectorAll('.visual-btn')) {
  button.addEventListener('click', () => {
    const variant = button.dataset.visual;
    if (!variant) return;
    setVisualVariant(variant);
  });
}

if (mobileToggle && nav) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!nav.contains(target) && !mobileToggle.contains(target)) {
      nav.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

for (const link of document.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (event) => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    nav?.classList.remove('open');
    mobileToggle?.setAttribute('aria-expanded', 'false');
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  },
  { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
);

for (const item of document.querySelectorAll('.reveal-up')) {
  revealObserver.observe(item);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const el = entry.target;
      if (!(el instanceof HTMLElement)) continue;
      const target = Number(el.dataset.count || '0');
      const suffix = el.dataset.suffix || '';
      const useDecimal = el.dataset.decimal === 'true';
      const duration = 1400;
      const started = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - started) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = `${useDecimal ? value.toFixed(1) : Math.round(value)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  },
  { threshold: 0.45 }
);

for (const counter of document.querySelectorAll('[data-count]')) {
  counterObserver.observe(counter);
}

const boardChart = document.querySelector('.board-chart');
if (boardChart) {
  const chartObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        boardChart.classList.add('animate');
        chartObserver.unobserve(boardChart);
      }
    },
    { threshold: 0.3 }
  );
  chartObserver.observe(boardChart);
}

const scoreVisual = document.querySelector('.score-visual');
if (scoreVisual) {
  const scoreObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        scoreVisual.classList.add('animate');
        scoreObserver.unobserve(scoreVisual);
      }
    },
    { threshold: 0.3 }
  );
  scoreObserver.observe(scoreVisual);
}

const yearNode = document.getElementById('year');
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
