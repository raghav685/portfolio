/* Loader → swarm build → live site. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const html = document.documentElement;
  const status = $('#status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const params = new URLSearchParams(location.search);
  const useSwarm = !reduced && !params.has('noswarm');
  // clean slugs: /about/, /work/ ... open the one-page site on that section
  const section = (location.pathname.match(/^\/([a-z]+)\/?$/) || [])[1] || window.__section || '';
  const goTo = (id, smooth) => {
    const el = id && id !== 'home' ? document.getElementById(id) : null;
    const y = el ? el.getBoundingClientRect().top + scrollY - 20 : 0;
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
  };
  $$('[data-nav]').forEach((a) => a.addEventListener('click', (ev) => {
    if (ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
    ev.preventDefault();
    const id = a.dataset.nav;
    history.pushState({ id }, '', id === 'home' ? '/' : `/${id}/`);
    goTo(id, !reduced);
  }));
  addEventListener('popstate', () => goTo((location.pathname.match(/^\/([a-z]+)\/?$/) || [])[1] || 'home', !reduced));

  /* ---------- mode toggle ---------- */
  $$('[data-mode="paper"]').forEach((a) => a.addEventListener('click', () => { try { sessionStorage.setItem('mode', 'paper'); } catch (_) {} }));

  /* ---------- hero video ---------- */
  const vid = $('#heroVid');
  // portrait screens get a portrait cut (full 16:9 frame over a blurred fill) so the film's words never get cropped
  const portrait = innerHeight > innerWidth * 1.05;
  if (portrait) vid.poster = 'assets/img/hero-poster-mobile.jpg';
  vid.src = portrait ? 'assets/video/hero-mobile.mp4' : innerWidth < 900 ? 'assets/video/hero-720.mp4' : 'assets/video/hero-1080.mp4';
  vid.muted = true;
  vid.play().catch(() => {});
  const sndBtn = $('#heroSound');
  sndBtn.addEventListener('click', () => {
    vid.muted = !vid.muted;
    if (!vid.muted) vid.play().catch(() => {});
    sndBtn.setAttribute('aria-pressed', String(!vid.muted));
    sndBtn.textContent = vid.muted ? 'Sound off' : 'Sound on';
  });

  /* ---------- loader agents ---------- */
  const COLORS = ['#ff5e00', '#3be8ff', '#9be22d', '#a259ff'];
  const NAMES = ['Agent-01 layout', 'Agent-02 type', 'Agent-03 media', 'Agent-04 motion'];
  const host = $('.ld-agents');
  const arrow = (c) => `<svg width="18" height="22" viewBox="0 0 18 22"><path d="M1 1l15 9.5-6.6 1.6L6.2 19 1 1z" fill="${c}" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;
  const spots = [[.22, .3], [.68, .24], [.36, .62], [.74, .6]];
  const AG = spots.map(([fx, fy], i) => {
    const el = document.createElement('div');
    el.className = 'ag';
    el.style.setProperty('--c', COLORS[i]);
    el.innerHTML = `<div class="mq"><b>0 × 0</b></div><div class="cur">${arrow(COLORS[i])}<span>${NAMES[i]}</span></div>`;
    host.appendChild(el);
    gsap.set(el, { x: fx * innerWidth, y: fy * innerHeight });
    return { el, mq: $('.mq', el), lbl: $('.mq b', el), cur: $('.cur', el) };
  });
  const spawn = gsap.timeline();
  AG.forEach((a, i) => {
    const box = { w: 0, h: 0 };
    const W = 60 + Math.random() * 120, H = 36 + Math.random() * 70;
    spawn.set(a.mq, { opacity: 1 }, .2 + i * .35)
      .to(box, {
        w: W, h: H, duration: .55, ease: 'power2.out',
        onUpdate: () => { gsap.set(a.mq, { width: box.w, height: box.h }); gsap.set(a.cur, { x: box.w, y: box.h }); a.lbl.textContent = `${Math.round(box.w)} × ${Math.round(box.h)}`; }
      }, '<')
      .to(a.cur, { scale: 1, opacity: 1, duration: .4, ease: 'back.out(2.6)' }, '<')
      .to(a.mq, { opacity: 0, duration: .3 }, '>.1')
      .to(a.cur, { x: `+=${(Math.random() - .5) * 160}`, y: `+=${(Math.random() - .5) * 120}`, duration: 1.4, ease: 'sine.inOut', yoyo: true, repeat: -1 }, '>');
  });

  /* ---------- real progress ---------- */
  const once = (el, ev) => new Promise((r) => el.addEventListener(ev, r, { once: true }));
  const timeout = (ms) => new Promise((r) => setTimeout(r, ms));
  const tasks = [];
  const track = (p) => { const t = { done: false }; tasks.push(t); p.then(() => (t.done = true)); return p; };
  track(Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), timeout(2500)]));
  track(Promise.race([document.readyState === 'complete' ? Promise.resolve() : once(window, 'load'), timeout(6000)]));
  track(Promise.race([vid.readyState >= 3 ? Promise.resolve() : once(vid, 'canplay'), timeout(5000)]));
  track(timeout(1700)); // let the agents finish spawning

  let swarmReady = Promise.resolve();
  if (useSwarm) {
    window.__swarmGated = true;
    window.__swarmTransparentBg = true;
    window.__swarmHooks = { end: () => goLive() };
    // The swarm scans the DOM while the loader covers the screen.
    swarmReady = track(new Promise((resolve) => {
      const s = document.createElement('script');
      s.src = 'js/swarm-rebuild.js?v=32';
      s.onerror = () => resolve(false);
      s.onload = () => {
        const t0 = performance.now();
        const poll = () => {
          const app = window.__swarmRebuild && window.__swarmRebuild.app;
          if (app && app.engine && app.engine.ready) resolve(true);
          else if (performance.now() - t0 > 25000) resolve(false);
          else setTimeout(poll, 80);
        };
        poll();
      };
      // let the hero video paint a frame first so the snapshot has it
      Promise.race([once(vid, 'loadeddata'), timeout(2500)]).then(() => document.body.appendChild(s));
    }));
  }
  // keep the loader above the swarm overlay (same z-index, later in the document wins)
  const keepLoaderOnTop = () => { const l = $('#loader'); if (l && html.lastElementChild !== l) html.appendChild(l); };

  const shown = { v: 0 }, counter = $('#loader .ld-n'), cap = $('#loader .ld-cap');
  const tick = () => {
    keepLoaderOnTop();
    const real = tasks.filter((t) => t.done).length / tasks.length;
    shown.v = Math.max(shown.v, shown.v + (real - shown.v) * .06);
    counter.textContent = String(Math.min(99, Math.round(shown.v * 100))).padStart(3, '0');
  };
  gsap.ticker.add(tick);
  const caps = ['spawning agents', 'loading showreel', 'scanning layout', 'briefing the swarm'];
  let ci = 0; const capT = setInterval(() => { cap.textContent = caps[++ci % caps.length]; }, 900);

  const allDone = () => new Promise((r) => { const w = () => (tasks.every((t) => t.done) ? r() : setTimeout(w, 50)); w(); });
  swarmReady.then(allDone).then(open);

  function open() {
    gsap.ticker.remove(tick);
    clearInterval(capT);
    const swarmOk = useSwarm && window.__swarmRebuild && window.__swarmRebuild.app && window.__swarmRebuild.app.engine && window.__swarmRebuild.app.engine.ready;
    if (useSwarm && !swarmOk) { try { window.__swarmRebuild && window.__swarmRebuild.stop(false); } catch (_) {} }
    const host = document.querySelector('[data-swarm-rebuild]');
    html.classList.add('hero-clean');
    if (swarmOk) {
      // the snapshot is taken; hide the real page (except the showreel) and the overlay until the build starts
      html.classList.add('swarm-hide');
      if (host) host.style.setProperty('opacity', '0', 'important');
    } else if (!reduced) {
      gsap.set('.hero-kicker, .hero-name .ln, .hero-bottom > *, .hero-side, .hud', { autoAlpha: 0 });
    }
    keepLoaderOnTop();
    gsap.timeline()
      .to(shown, { v: 1, duration: .4, ease: 'power1.out', onUpdate: () => { counter.textContent = String(Math.round(shown.v * 100)).padStart(3, '0'); } })
      .to([counter, cap], { opacity: 0, duration: .25 }, '+=.15')
      .to(AG.map((a) => a.el), { opacity: 0, duration: .3 }, '<')
      .to('#loader .l', { xPercent: -101, duration: 1.2, ease: 'expo.inOut', force3D: true })
      .to('#loader .r', { xPercent: 101, duration: 1.2, ease: 'expo.inOut', force3D: true }, '<')
      .call(() => { html.classList.remove('locked'); status.textContent = 'showreel'; }, null, '-=.5')
      .call(() => { gsap.killTweensOf(AG.map((a) => a.cur)); $('#loader').remove(); })
      .to({}, { duration: reduced || section ? 0 : 3.6 }) // let the showreel breathe before anything is built over it (skipped on section links)
      .call(() => {
        html.classList.remove('hero-clean');
        if (swarmOk) {
          if (host) host.style.removeProperty('opacity');
          window.__swarmGated = false;
          status.textContent = 'swarm building';
          window.__swarmRebuild.app.engine.start();
          if (section) setTimeout(() => goTo(section, true), 400);
        } else openingThenLive();
      });
  }

  /* no swarm (mobile / reduced motion): a short type-in of the hero */
  function openingThenLive() {
    if (reduced) return goLive();
    gsap.timeline({ onComplete: goLive })
      .to('.hud, .hero-side', { autoAlpha: 1, duration: .6 })
      .fromTo('.hero-kicker', { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .5 }, '<')
      .fromTo('.hero-name .ln', { autoAlpha: 0, yPercent: 60 }, { autoAlpha: 1, yPercent: 0, stagger: .1, duration: .9, ease: 'power4.out' }, '-=.2')
      .fromTo('.hero-bottom > *', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: .1, duration: .6 }, '-=.5');
  }

  /* ---------- live site ---------- */
  let live = false;
  function goLive() {
    if (live) return;
    live = true;
    html.classList.remove('locked', 'swarm-hide', 'hero-clean');
    status.textContent = 'live';
    vid.play().catch(() => {});
    // secondary videos load only now, so they never compete with the swarm's scan
    const lazy = $$('video[data-src]');
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) { if (!v.src) v.src = v.dataset.src; v.play().catch(() => {}); }
      else if (v.src) v.pause();
    }), { rootMargin: '200px' });
    lazy.forEach((v) => io.observe(v));
    gsap.registerPlugin(ScrollTrigger);
    // reveal anything still below the fold (the swarm may have been skipped early)
    const fold = scrollY + innerHeight;
    $$('.s-head, .about > *, .row, .uni, .sk, .pj, .quote, .phil-p, .now, .job, .side > *, .life > *, .big-mail, .lnk, .credits dl').forEach((el) => {
      if (el.getBoundingClientRect().top + scrollY < fold) return;
      gsap.from(el, { opacity: 0, y: 40, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    gsap.to('.hero-name', { yPercent: 18, ease: 'none', scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true } });
    const pct = $('#pct');
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        gsap.set('.progress', { scaleX: s.progress });
        pct.textContent = s.progress > .995 ? 'BUILT ✓' : Math.round(s.progress * 100) + '%';
      }
    });
    ScrollTrigger.refresh();
    if (section && !useSwarm) setTimeout(() => goTo(section, true), 200);
  }
})();
