/* ==========================================================================
   MAIN SCRIPT: small, independent features. Each one can be removed safely.
   Settings live in config.js.
   ========================================================================== */
(function () {
  const SITE = window.SITE || {};
  const $$ = (sel) => document.querySelectorAll(sel);
  document.documentElement.classList.remove('no-js');

  /* ---- Theme toggle (initial theme is set inline in <head> to avoid a flash) ---- */
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const sync = () => { toggle.textContent = document.documentElement.dataset.theme === 'dark' ? '☀' : '☾'; };
    sync();
    toggle.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) {}
      sync();
    });
  }

  /* ---- Decorative barcode ---- */
  const barcode = document.getElementById('barcode');
  if (barcode && SITE.barcode) {
    SITE.barcode.split('').forEach((w, i) => {
      const bar = document.createElement('span');
      bar.style.cssText = `width:${w * 2}px;height:100%;background:${i % 2 ? 'transparent' : '#161513'}`;
      barcode.appendChild(bar);
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('in'));
  }

  /* ---- Currency: INR in India, USD elsewhere ---- */
  const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone) || '';
  const useInr = (SITE.inrTimezones || []).includes(tz);
  $$('[data-usd]').forEach((el) => {
    const value = useInr ? el.dataset.inr : el.dataset.usd;
    const prefix = el.dataset.prefix ? `<small>${el.dataset.prefix} </small>` : '';
    if (value) el.innerHTML = prefix + value;
  });

  /* ---- WhatsApp links: any element with class "wa" ---- */
  if (SITE.whatsapp) {
    $$('.wa').forEach((a) => {
      const plan = a.dataset.plan;
      const msg = plan ? SITE.messages.plan.replace('{plan}', plan) : SITE.messages.default;
      a.href = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`;
      a.target = '_blank';
      a.rel = 'noopener';
    });
  }

  /* ---- Email links: any element with data-email ---- */
  if (SITE.email) {
    $$('[data-email]').forEach((a) => {
      const subject = a.dataset.subject ? `?subject=${encodeURIComponent(a.dataset.subject)}` : '';
      a.href = `mailto:${SITE.email}${subject}`;
    });
  }

  /* ---- Footer year ---- */
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
