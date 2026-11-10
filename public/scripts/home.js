// Home page interactions: parallax, active nav, scroll reveal, counter animation, card tilt
// Extracted from inline script in index.astro

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* Parallax ringan pada gambar hero (satu listener pasif + rAF) */
  const heroImg = document.querySelector('.hero-image img');
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    if (heroImg && !reduceMotion && y < window.innerHeight * 1.2) {
      heroImg.style.transform = `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();

  /* Navigasi aktif mengikuti section yang terlihat */
  const nav = document.getElementById('main-nav');
  const navLinks = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
  const linkById = new Map(navLinks.map((a) => [a.getAttribute('href')?.slice(1) ?? '', a]));
  const trackedSections = [...linkById.keys()]
    .map((id) => document.getElementById(id))
    .filter((el) => el !== null);

  if ('IntersectionObserver' in window && trackedSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          a.classList.remove('is-active');
          a.removeAttribute('aria-current');
        });
        const link = linkById.get(entry.target.id);
        if (link) {
          link.classList.add('is-active');
          link.setAttribute('aria-current', 'location');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    trackedSections.forEach((section) => navObserver.observe(section));
  }

  /* Scroll reveal */
  const revealTargets = document.querySelectorAll(
    '.section-title, .program-card, .benefit-card, .requirement-item, .gallery-item, .faq-list details, .about-grid, .legal-grid, .pricing-card, .table-wrap'
  );

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 3) * 70}ms`;
      revealObserver.observe(el);
    });
  }

  /* Counter statistik — angka final sudah ada di HTML; animasi hanya kosmetik */
  const counters = document.querySelectorAll('[data-count]');
  const fmt = new Intl.NumberFormat('id-ID');

  const runCounter = (el) => {
    const target = parseInt(el.dataset.count ?? '0', 10);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1400;
    const start = performance.now();

    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = fmt.format(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          runCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* Tilt 3D kartu materi (hanya pointer presisi) */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll('.program-card').forEach((card) => {
      let frame = 0;

      card.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const rx = ((r.height / 2) - (e.clientY - r.top)) / 22;
          const ry = ((e.clientX - r.left) - (r.width / 2)) / 22;
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        });
      });

      card.addEventListener('mouseleave', () => {
        cancelAnimationFrame(frame);
        card.style.transform = '';
      });
    });
  }
})();