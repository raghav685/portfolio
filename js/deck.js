// Revolving project deck: coverflow ring with autoplay, drag, keys and buttons.
(() => {
  document.querySelectorAll('[data-deck]').forEach(init);
  function init(deck) {
  const cards = [...deck.querySelectorAll('.dk-card')];
  const N = cards.length;
  const rail = [...deck.querySelectorAll('.dk-rail i')];
  const cur = deck.querySelector('[data-cur]');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fade = getComputedStyle(deck).getPropertyValue('--dk-fade').trim() === '1'; // light themes fade instead of darken
  let pos = 0, drag = null, timer = null, visible = false, hover = false;
  const wrap = (d) => ((d % N) + N + N / 2) % N - N / 2; // signed circular offset
  function layout(f = pos) {
    const step = parseFloat(getComputedStyle(cards[0]).width) * (innerWidth < 600 ? 0.5 : 0.72);
    cards.forEach((c, i) => {
      const d = wrap(i - f), a = Math.abs(d);
      c.style.transform = `translate3d(${d * step}px, ${a * 18}px, ${-a * 170}px) rotateY(${-Math.sign(d) * Math.min(a, 2.2) * 24}deg)`;
      const out = a > 2.6 ? 0 : 1 - Math.max(0, a - 1.6) * 0.9;
      c.style.opacity = fade ? Math.min(out, 1 - Math.min(a, 2) * 0.22) : out;
      c.style.filter = fade ? `saturate(${1 - Math.min(a, 1) * 0.5})` : `brightness(${1 - Math.min(a, 2) * 0.32}) saturate(${1 - Math.min(a, 1) * 0.35})`;
      c.style.zIndex = String(100 - Math.round(a * 10));
      c.style.visibility = a > 3.2 ? 'hidden' : 'visible';
    });
    const front = ((Math.round(f) % N) + N) % N;
    cards.forEach((c, i) => { c.classList.toggle('is-front', i === front); c.setAttribute('aria-hidden', i === front ? 'false' : 'true'); c.querySelectorAll('a').forEach((a) => { a.tabIndex = i === front && !a.classList.contains('dk-media') ? 0 : -1; }); });
    rail.forEach((r, i) => r.classList.toggle('on', i === front));
    if (cur) cur.textContent = String(front + 1).padStart(2, '0');
  }
  const stageEl = deck.querySelector('.deck-stage');
  const go = (n) => {
    pos = Math.round(n); layout();
    if (reduce) { const c = cards[((pos % N) + N) % N]; stageEl.scrollTo({ left: c.offsetLeft - (stageEl.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' }); }
  };
  if (reduce) {
    // in the scroll-row fallback, the counter follows whichever card is centred
    let raf = 0;
    stageEl.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => {
      const mid = stageEl.scrollLeft + stageEl.clientWidth / 2;
      let best = 0, bd = Infinity; cards.forEach((c, i) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = i; } });
      if (best !== ((pos % N) + N) % N) { pos = best; layout(); }
    }); }, { passive: true });
  }
  const step = (d) => { go(pos + d); restart(); };
  function tick() { if (visible && !hover && !drag && !document.hidden) go(pos + 1); }
  function restart() { clearInterval(timer); if (!reduce) timer = setInterval(tick, 4800); }
  deck.querySelectorAll('.dk-btn').forEach((b) => b.addEventListener('click', () => step(+b.dataset.dir)));
  deck.addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') { e.preventDefault(); step(1); } if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); } });
  cards.forEach((c, i) => c.addEventListener('click', (e) => { if (drag && drag.moved) return; if (!c.classList.contains('is-front')) { e.preventDefault(); go(pos + wrap(i - pos)); restart(); } }));
  deck.addEventListener('pointerenter', () => { hover = true; });
  deck.addEventListener('pointerleave', () => { hover = false; });
  deck.addEventListener('focusin', () => { hover = true; });
  deck.addEventListener('focusout', () => { hover = false; });
  if (!reduce) {
    const stage = deck.querySelector('.deck-stage');
    stage.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      drag = { x: e.clientX, start: pos, moved: false, w: parseFloat(getComputedStyle(cards[0]).width) * 0.6 };
    });
    window.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) < 6) return;
      if (!drag.moved) { drag.moved = true; deck.classList.add('is-drag'); }
      layout(drag.start - dx / drag.w);
    });
    window.addEventListener('pointerup', (e) => {
      if (!drag) return;
      const moved = drag.moved, dx = e.clientX - drag.x;
      deck.classList.remove('is-drag');
      if (moved) { const f = drag.start - dx / drag.w; pos = Math.round(f + (Math.abs(dx) > 40 && Math.round(f) === drag.start ? -Math.sign(dx) : 0)); layout(); restart(); }
      setTimeout(() => { drag = null; }, 0);
    });
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0.35 }).observe(deck);
    addEventListener('resize', () => layout());
  }
  // equal card heights from the tallest card's natural content (no clipped titles at any width)
  function fit() {
    deck.style.removeProperty('--ch');
    const prev = cards.map((c) => c.style.height);
    cards.forEach((c) => { c.style.height = 'auto'; });
    const h = Math.max(...cards.map((c) => c.scrollHeight));
    cards.forEach((c, i) => { c.style.height = prev[i]; });
    deck.style.setProperty('--ch', h + 'px');
  }
  fit();
  addEventListener('resize', fit);
  if (document.fonts) document.fonts.ready.then(fit);
  cards.forEach((c) => c.querySelector('img')?.addEventListener('load', fit, { once: true }));
  layout();
  restart();
  }
})();
