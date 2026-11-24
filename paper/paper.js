/* Paper mode: a quiet, readable render of window.SITE. */
(() => {
  const S = window.SITE;
  const e = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const P = (u) => (/^https?:/.test(u) ? u : '../' + u);
  const pad = (n) => String(n).padStart(2, '0');
  const ext = (u) => (u ? ` href="${e(P(u))}" target="_blank" rel="noopener"` : '');
  const tags = (a, cls = '') => `<div class="tags ${cls}">${a.map((t) => `<span>${e(t)}</span>`).join('')}</div>`;
  const head = (title, sub, side) => `<header class="sh rv"><div><h2>${e(title)} <span class="sl">/</span></h2>${sub ? `<p class="mono sub">${e(sub)}</p>` : ''}</div>${side ? `<span class="mono side">${e(side)}</span>` : ''}</header>`;
  const I = {
    out: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    in: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v16H4zM8 10v6M8 7v.01M12 16v-6M12 12.5c0-1.5 1-2.5 2.2-2.5S16 11 16 12.5V16"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18v12H3zM3 7l9 6 9-6"/></svg>',
    doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/></svg>',
    music: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zM20 16a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"/></svg>'
  };
  const name = `${S.first} ${S.last}`;
  document.getElementById('navRole').textContent = 'Marketing Manager';
  document.getElementById('toAnim').addEventListener('click', () => { try { sessionStorage.setItem('mode', 'animated'); } catch (_) {} });

  const hero = `
  <section id="home" class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="mono acc rv">${e(S.tagline)}</p>
        <h1 class="rv">${e(S.first)}<br>${e(S.last)}</h1>
        <p class="pref mono rv">Preferred name — <b>${e(S.preferred)}</b></p>
        <p class="lead rv">${e(S.intro)}</p>
        <div class="cta rv">
          <a class="btn" href="${e(P(S.cv))}" target="_blank" rel="noopener">Get CV →</a>
          <a class="ico" href="${e(S.socials[0].url)}" target="_blank" rel="noopener" aria-label="LinkedIn">${I.in}</a>
          <a class="ico" href="mailto:${e(S.email)}" aria-label="Email">${I.mail}</a>
        </div>
      </div>
      <figure class="hero-ph rv"><img src="../assets/img/me.jpg" alt="${e(S.preferred)} on the Thames at night, London"><figcaption class="mono">${e(S.preferred.toUpperCase())}_2026</figcaption></figure>
    </div>
    <a class="down mono" href="/paper/" data-go="about" aria-label="Scroll to About">↓</a>
  </section>`;

  const about = `
  <section id="about" class="sec">
    <div class="wrap">
      ${head('Who am I')}
      <div class="about">
        <figure class="ph rv"><img src="../assets/img/hero-poster.jpg" alt="${e(S.preferred)} walking along the Thames, from the EVERYTHING showreel" loading="lazy"></figure>
        <div class="bio">${S.about.map(([k, t]) => `<p class="rv"><span class="k mono">${e(k)}</span>${e(t)}</p>`).join('')}</div>
      </div>
      <div class="cols3">
        <div class="rv"><h3 class="lbl mono">/ Languages</h3>${S.languages.map(([l, v], i) => `<div class="row"><span>${e(l)}</span><span class="mono"><b>${pad(i + 1)}</b> ${e(v)}</span></div>`).join('')}</div>
        <div class="rv"><h3 class="lbl mono">/ Background</h3>${S.education.map((x) => `<div class="edu"><span class="mono">${e(x.tag)}</span><strong>${e(x.school)}</strong><span>${e(x.course)}</span></div>`).join('')}</div>
        <div class="rv"><h3 class="lbl mono">/ Awards</h3>${S.awards.map(([k, v]) => `<div class="row tall"><span>${e(v)}</span><span class="mono">${e(k)}</span></div>`).join('')}</div>
      </div>
    </div>
  </section>`;

  const skills = `
  <section id="skills" class="sec">
    <div class="wrap">
      ${head('Skills', '', '/ What I do')}
      <div class="kn">${S.skills.map((s, i) => `
        <div class="kn-row rv"><span class="kn-n">${pad(i + 1)}</span><h3>${e(s.t)}</h3><div><p>${e(s.d)}</p>${tags(s.tags, 'sm')}</div></div>`).join('')}
      </div>
    </div>
  </section>`;

  const works = S.works.filter((w) => !w.pending && w.place !== 'life');
  const fit = S.works.find((w) => w.place === 'life');
  const work = `
  <section id="work" class="sec">
    <div class="wrap">
      ${head('Selected work', 'Search, content and websites — built and grown by me')}
      <div class="pj${works.length % 2 ? ' odd' : ''}">${works.map((w, i) => `
        <article class="pj-c rv">
          <a class="pj-img"${ext(w.url)}><img src="${e(P(w.img))}" alt="${e(w.t)}" loading="lazy"></a>
          <div class="pj-top mono"><span>PRJ_${String(i + 1).padStart(3, '0')} · ${e(w.k)}</span>${w.url ? `<a${ext(w.url)} aria-label="Open ${e(w.t)}">${I.out}</a>` : ''}</div>
          <h3>${e(w.t)}</h3>
          <p>${e(w.d)}</p>
          ${tags(w.tags, 'sm')}
        </article>`).join('')}
      </div>
    </div>
  </section>`;

  const phil = `
  <section id="philosophy" class="sec band">
    <div class="wrap phil">
      <div class="rv">
        <p class="mono acc">— Today and tomorrow</p>
        <h2 class="q">${S.quote.map((q) => e(q)).join('<br>')}</h2>
        <p class="man">${e(S.manifesto)}</p>
      </div>
      <div class="now rv"><p class="mono lbl">Currently working on</p>${tags(S.now, 'pill')}</div>
    </div>
  </section>`;

  const exp = `
  <section id="experience" class="sec">
    <div class="wrap">
      ${head('Experience')}
      <div class="exp">
        <div class="rv">
          <h3 class="lbl mono">/ Work</h3>
          ${S.jobs.map((j) => `<div class="job"><div><strong>${e(j.r)}</strong><span>${e(j.o)} · ${e(j.when)}</span><p>${e(j.d)}</p></div><span class="mono tag">${e(j.tag)}</span></div>`).join('')}
          ${S.freelance.map((f) => `<div class="job"><div><strong>${e(f.r)}</strong><span>${e(f.o)}</span></div><span class="mono tag">Freelance</span></div>`).join('')}
        </div>
        <div class="side">
          <div class="rv"><h3 class="lbl mono">/ Soft skills</h3>${tags(S.soft)}</div>
          <div class="rv"><h3 class="lbl mono">/ Certifications</h3>${tags(S.certs, 'hot')}</div>
        </div>
      </div>
    </div>
  </section>`;

  const L = S.life, W = S.writing;
  const tiles = [
    { img: L.poster, t: 'Deadlifts', s: 'Strength / Discipline', cls: 'w2' },
    { img: L.photos[0], t: 'Training', s: 'Gym / Mindset', cls: 'h2' },
    { img: 'assets/img/reel-annaizu-poster.jpg', t: 'Keep the Licence', s: 'Reel / Annaizu', cls: 'h2', href: S.reels[0].src },
    { img: L.photos[1], t: 'Leg day', s: 'Strength / Routine' },
    { img: 'assets/img/reel-veggigo-poster.jpg', t: "86'd", s: 'Reel / VeggiGo', href: S.reels[1].src },
    { img: W.pages[0], t: 'MAANAV', s: 'Script writing / Film', href: W.pdf, cls: 'w2 doc' },
    ...(fit ? [{ img: fit.img, t: fit.t, s: 'Personal project / Built by me', href: fit.url, cls: 'w2 paperpg' }] : [])
  ];
  const life = `
  <section id="life" class="sec">
    <div class="wrap">
      <header class="sh center rv"><div><h2>My life <span class="sl">/</span></h2><p class="mono sub">Training, film and stories</p></div></header>
      <div class="grid">${tiles.map((t) => `
        <${t.href ? `a href="${e(P(t.href))}" target="_blank" rel="noopener"` : 'figure'} class="tile rv ${t.cls || ''}">
          <img src="${e(P(t.img))}" alt="${e(t.t)}" loading="lazy">
          <span class="cap"><strong>${e(t.t)}</strong><span class="mono">${e(t.s)}</span></span>
        </${t.href ? 'a' : 'figure'}>`).join('')}
      </div>
    </div>
  </section>`;

  const writing = `
  <section id="writing" class="sec chap">
    <div class="wrap">
      ${head('Deep dive', 'Script writing')}
      <article class="book rv">
        <a class="stack" href="${e(P(W.pdf))}" target="_blank" rel="noopener" aria-label="Open the ${e(W.k)} script">
          ${W.pages.slice(1).reverse().map((p, i) => `<img class="p${3 - i}" src="${e(P(p))}" alt="" loading="lazy">`).join('')}
          <img class="cv" src="${e(P(W.pages[0]))}" alt="${e(W.k)} title page" loading="lazy">
        </a>
        <div>
          <p class="mono bk"><span class="acc">${e(W.k)}</span><span>${e(W.ver)}</span></p>
          <h3>${e(W.t)}</h3>
          <p>${e(W.d)}</p>
          ${tags(W.tags, 'sm')}
          <a class="btn line" href="${e(P(W.pdf))}" target="_blank" rel="noopener">Read the script (PDF) ↗</a>
        </div>
      </article>
    </div>
  </section>`;

  const player = `<section id="music" class="sec chap"><div class="wrap"><header class="sh rv"><div><h2>On repeat <span class="sl">/</span></h2><p class="mono sub">What the work is made to</p></div></header><div class="np rv" data-player></div></div></section>`;

  const rows = [
    { i: I.in, t: 'LinkedIn', s: S.socials[0].handle, u: S.socials[0].url },
    { i: I.mail, t: 'Email', s: S.email, u: `mailto:${S.email}` },
    { i: I.doc, t: 'CV', s: 'Two pages, UK format', u: P(S.cv) },
    { i: I.music, t: 'Spotify', s: S.music.label, u: S.music.url }
  ];
  const contact = `
  <section id="contact" class="sec">
    <div class="wrap">
      ${head("Let's connect", 'Open to new opportunities')}
      <div class="exp">
        <div class="rv">${rows.map((r) => `<a class="ct" href="${e(r.u)}"${/^mailto:/.test(r.u) ? '' : ' target="_blank" rel="noopener"'}><span class="ct-i">${r.i}</span><span><strong>${e(r.t)}</strong><span class="mono">${e(r.s)}</span></span><span class="ct-o">${I.out}</span></a>`).join('')}</div>
        <div class="rv"><h3 class="lbl mono">/ Hobbies</h3>${tags(S.hobbies)}</div>
      </div>
    </div>
  </section>
  <footer class="foot"><div class="wrap mono"><span>© ${new Date().getFullYear()} ${e(name)}</span><a href="../" class="acc" id="toAnim2">Animated mode ↗</a></div></footer>`;

  const ticker = `<div class="ticker" aria-label="Skills and tools">${[[S.ticker, ''], [S.tools, ' rev']].map(([list, dir]) => `<div class="trk${dir}" style="--n:${list.length}">${[...list, ...list].map((t, i) => `<span${i >= list.length ? ' aria-hidden="true"' : ''}>${e(t)}</span><i aria-hidden="true">/</i>`).join('')}</div>`).join('')}</div>`;
  document.getElementById('paper').innerHTML = hero + about + ticker + skills + work + phil + exp + life + writing + player + contact;
  document.getElementById('toAnim2').addEventListener('click', () => { try { sessionStorage.setItem('mode', 'animated'); } catch (_) {} });

  // section links scroll without adding anything to the URL
  document.addEventListener('click', (ev) => {
    const a = ev.target.closest('[data-go]');
    if (!a || ev.metaKey || ev.ctrlKey || ev.shiftKey) return;
    ev.preventDefault();
    const el = a.dataset.go === 'home' ? null : document.getElementById(a.dataset.go);
    window.scrollTo({ top: el ? el.getBoundingClientRect().top + scrollY - 64 : 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  });

  // reveal on scroll
  const els = document.querySelectorAll('.rv');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) els.forEach((el) => el.classList.add('in'));
  else {
    const io = new IntersectionObserver((es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { rootMargin: '0px 0px -8% 0px' });
    els.forEach((el) => io.observe(el));
  }
  // nav hides on scroll down, returns on scroll up
  const nav = document.getElementById('nav');
  let last = scrollY;
  addEventListener('scroll', () => { const y = scrollY; nav.classList.toggle('hide', y > last && y > 120); nav.classList.toggle('solid', y > 20); last = y; }, { passive: true });
})();
