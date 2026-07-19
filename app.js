document.addEventListener('DOMContentLoaded', function () {
  // ===== STICKY HEADER & HERO FADE =====
  const header = document.getElementById('main-header');
  const hero = document.getElementById('hero');

  window.addEventListener('scroll', function () {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (header) header.classList.toggle('scrolled', currentScroll > 80);
    
    if (hero) {
      const heroHeight = hero.offsetHeight;
      const opacity = Math.max(0, 1 - currentScroll / (heroHeight * 1.2));
      hero.style.opacity = opacity;
      hero.classList.toggle('fade-out', opacity <= 0.1);
    }
  });

  // ===== MENU MOBILE =====
  const toggle = document.getElementById('menu-toggle');
  const body = document.body;
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  if (toggle) {
    toggle.addEventListener('click', function () {
      body.classList.toggle('nav-open');
      this.classList.toggle('open');
    });
  }

  dropdownToggles.forEach(function (toggler) {
    toggler.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const parentDropdown = this.closest('.dropdown');
        if (parentDropdown) parentDropdown.classList.toggle('active');
      }
    });
  });

  document.querySelectorAll('.nav-list > li > a:not(.dropdown-toggle), .dropdown-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        body.classList.remove('nav-open');
        if (toggle) toggle.classList.remove('open');
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 768 && body.classList.contains('nav-open')) {
      if (!e.target.closest('.main-nav') && !e.target.closest('.hamburger')) {
        body.classList.remove('nav-open');
        if (toggle) toggle.classList.remove('open');
      }
    }
  });

  // ===== CONTADOR DE ESTATÍSTICAS (Suporta decimais e sufixos) =====
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length > 0) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-count'));
          const suffix = el.getAttribute('data-suffix') || '';
          const prefix = el.getAttribute('data-prefix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 2000;
          const increment = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += increment;
            if (current < target) {
              el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.ceil(current)) + suffix;
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
            }
          };

          updateCounter();
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  // ===== SCROLL REVEAL ANIMATION =====
  const revealElements = document.querySelectorAll('.animate-on-scroll');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => revealObserver.observe(el));
});