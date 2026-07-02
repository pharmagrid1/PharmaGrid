/* ============================================================
   PharmaGrid — Landing Page JS (clean, minimal)
   ============================================================ */

/* ── SCROLL REVEAL ── */
const reveals = document.querySelectorAll('.hero-text, .hero-preview, .value-item, .contact-inner');
reveals.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById('btn-text');
  const success = document.getElementById('form-success');

  btn.textContent = 'Submitting…';

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 900);
}

/* ── CHART BAR ENTRANCE ── */
const bars = document.querySelectorAll('.cb');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const finalH = target.style.getPropertyValue('--h');
      target.style.setProperty('--h', '0%');
      requestAnimationFrame(() => {
        setTimeout(() => {
          target.style.transition = 'height 0.7s cubic-bezier(0.34,1.56,0.64,1)';
          target.style.setProperty('--h', finalH);
          target.style.height = finalH;
        }, 100);
      });
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });
bars.forEach(bar => barObserver.observe(bar));
