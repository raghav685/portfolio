/* Renders window.SITE into the animated page. Runs before the swarm snapshots the DOM. */
(() => {
  const S = window.SITE;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const chips = (a, hot) => `<div class="chips${hot ? ' hot' : ''}">${a.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`;
  let scene = 1;
  const head = (label, title) => `<div class="s-head"><span class="mono"><b>Scene ${pad(++scene)}</b> — ${esc(label)}</span><h2 class="s-title">${esc(title)} <span class="sl">/</span></h2></div>`;
  const ext = (u) => (u ? ` href="${esc(u)}" target="_blank" rel="noopener"` : '');
  const fullName = `${S.first} ${S.last}`;
  const works = S.works.filter((w) => !w.pending);

  document.getElementById('logo').textContent = S.handle;

  const hero = `
  <section id="home">
    <div class="hero">
      <figure class="hero-video" id="heroVideo">
        <video id="heroVid" autoplay muted loop playsinline preload="auto" poster="assets/img/hero-poster.jpg"></video>
        <button class="snd mono" id="heroSound" type="button" aria-pressed="false">Sound off</button>
        <span class="rec mono"><i></i>Showreel — EVERYTHING*</span>
      </figure>
      <div class="hero-shade"></div>
      <p class="hero-tag mono">${esc(S.tagline)}</p>
      <p class="hero-pref mono">Call me <b>${esc(S.preferred)}</b></p>
      <h1 class="hero-name" aria-label="${esc(fullName)}, known as ${esc(S.preferred)}"><span class="ln">${esc(S.first)}</span><span class="ln">${esc(S.last)}</span></h1>
      <div class="hero-bottom">
        <p class="desc">${esc(S.intro)}</p>
        <div class="ctas">
          <a class="btn solid" href="${esc(S.cv)}" target="_blank" rel="noopener">Get CV →</a>
          ${S.socials.map((s) => `<a class="btn"${ext(s.url)}>${esc(s.name)}</a>`).join('')}
        </div>
      </div>
      <span class="hero-side l mono">Scene 01 — Origin</span>
      <span class="hero-side r mono">${esc(S.origin)} - ${esc(S.coords)}</span>
    </div>
  </section>`;

  const about = `
  <section id="about" class="scene">
    <div class="ghost" aria-hidden="true">RAG</div>
    <div class="wrap">
      ${head('About', 'Who am I')}
      <div class="about">
        <div>
          <figure class="media"><img src="assets/img/me.jpg" alt="${esc(S.preferred)} on the Thames at night, London"></figure>
          <div class="cap mono"><span>Fig. 01</span><span>${esc(S.origin)} — Southbank</span></div>
        </div>
        <div class="bio">${S.about.map(([k, t]) => `<p><span class="k">${esc(k)}</span>${esc(t)}</p>`).join('')}</div>
      </div>
      <div class="cols2">
        <div>
          <h3 class="h3m mono">/ Education</h3>
          ${S.education.map((e) => `<div class="uni"><div class="crest mono">QM</div><div><span class="mono">${esc(e.tag)}</span><div class="t">${esc(e.school)}</div><div class="s">${esc(e.course)}</div></div></div>`).join('')}
        </div>
        <div>
          <h3 class="h3m mono">/ Awards &amp; recognition</h3>
          ${S.awards.map(([k, v], i) => `<div class="row aw"><span>${esc(v)}</span><span class="mono"><b>${pad(i + 1)}</b>${esc(k)}</span></div>`).join('')}
        </div>
      </div>
    </div>
  </section>
  <div class="ticker" aria-hidden="true"><div class="trk">${[...S.ticker, ...S.ticker].map((t) => `<span>${esc(t)}</span><i>✦</i>`).join('')}</div></div>`;

  const skills = `
  <section id="skills" class="scene">
    <div class="ghost" aria-hidden="true">DO</div>
    <div class="wrap">
      ${head('What I do', 'Skills')}
      <div class="sk-grid">
        ${S.skills.map((s, i) => `<article class="sk"><div class="mono sk-n"><b>${pad(i + 1)}</b> / ${pad(S.skills.length)}</div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p>${chips(s.tags)}</article>`).join('')}
      </div>
    </div>
  </section>`;

  const work = `
  <section id="work" class="scene">
    <div class="ghost" aria-hidden="true">WORK</div>
    <div class="wrap">
      ${head('Selected works', 'Work')}
      <div class="pj-grid">
        ${works.map((w, i) => `
        <article class="pj${i === 0 ? ' wide' : ''}">
          <a class="pj-media"${ext(w.url)}><img src="${esc(w.img)}" alt="${esc(w.t)}"></a>
          <div class="pj-meta mono"><span>${pad(i + 1)} — ${esc(w.k)}</span>${w.url ? `<a${ext(w.url)}>Visit ↗</a>` : '<span>Case study</span>'}</div>
          <h3>${esc(w.t)}</h3>
          <p>${esc(w.d)}</p>
          ${chips(w.tags)}
        </article>`).join('')}
      </div>
    </div>
  </section>`;

  const reels = `
  <section id="reels" class="scene">
    <div class="ghost" aria-hidden="true">REEL</div>
    <div class="wrap">
      ${head('Motion work', 'Reels')}
      <div class="reels">
        ${S.reels.map((r, i) => `
        <article class="reel">
          <figure class="reel-v"><video src="${esc(r.src)}" muted loop playsinline autoplay preload="metadata"></video><button class="snd mono" type="button" aria-pressed="false">Sound off</button></figure>
          <div class="pj-meta mono"><span>${pad(i + 1)} — ${esc(r.k)}</span><span>9:16</span></div>
          <h3>${esc(r.t)}</h3>
          <p>${esc(r.d)}</p>
        </article>`).join('')}
      </div>
    </div>
  </section>`;

  const phil = `
  <section id="philosophy" class="scene">
    <div class="ghost light" aria-hidden="true">BOLD</div>
    <div class="wrap">
      <div class="s-head" style="margin-bottom:28px"><span class="mono"><b>Scene ${pad(++scene)}</b> — Today and tomorrow</span></div>
      <h2 class="quote">${S.quote.map((q, i) => `<span class="${i === 1 ? 'q2' : ''}">${esc(q)}</span>`).join(' ')}</h2>
      <p class="phil-p">${esc(S.manifesto)}</p>
      <div class="now"><div class="mono">Currently working on</div>${chips(S.now, true)}</div>
    </div>
  </section>`;

  const exp = `
  <section id="experience" class="scene">
    <div class="ghost" aria-hidden="true">TRY</div>
    <div class="wrap">
      ${head('Track record', 'Experience')}
      <div class="exp">
        <div>
          <h3 class="h3m mono">/ Work</h3>
          ${S.jobs.map((j) => `<div class="job"><div><div class="mono when">${esc(j.when)}</div><div class="r">${esc(j.r)}</div><div class="o">${esc(j.o)}</div><p class="jd">${esc(j.d)}</p></div><span class="mono">${esc(j.tag)}</span></div>`).join('')}
        </div>
        <div class="side">
          <div><h3 class="h3m mono">/ Freelance</h3>${S.freelance.map((f) => `<div class="row"><span>${esc(f.o)}</span><span class="mono">${esc(f.r)}</span></div>`).join('')}</div>
          <div><h3 class="h3m mono">/ Certifications</h3>${chips(S.certs, true)}</div>
          <div><h3 class="h3m mono">/ Soft skills</h3>${chips(S.soft)}</div>
        </div>
      </div>
    </div>
  </section>`;

  const W = S.writing;
  const writing = `
  <section id="writing" class="scene">
    <div class="ghost" aria-hidden="true">PDF</div>
    <div class="wrap">
      ${head('Script writing', 'Writing')}
      <article class="book">
        <a class="stack" href="${esc(W.pdf)}" target="_blank" rel="noopener" aria-label="Open the ${esc(W.k)} script PDF">
          ${W.pages.slice(1).reverse().map((p, i) => `<img class="p${3 - i}" src="${esc(p)}" alt="">`).join('')}
          <img class="cv" src="${esc(W.pages[0])}" alt="${esc(W.k)} title page">
        </a>
        <div>
          <div class="mono bk-meta"><span>${esc(W.k)}</span><span>${esc(W.ver)}</span></div>
          <h3>${esc(W.t)}</h3>
          <p>${esc(W.d)}</p>
          ${chips(W.tags)}
          <a class="btn" href="${esc(W.pdf)}" target="_blank" rel="noopener">Read the script (PDF) ↗</a>
        </div>
      </article>
    </div>
  </section>`;

  const L = S.life;
  const life = `
  <section id="life" class="scene">
    <div class="ghost" aria-hidden="true">LIFT</div>
    <div class="wrap">
      ${head('Discipline, outside of work', 'My life')}
      <div class="life">
        <figure class="media clip"><video src="${esc(L.clip)}" poster="${esc(L.poster)}" muted loop playsinline autoplay preload="metadata"></video><span class="rec mono"><i></i>Deadlift — graded</span></figure>
        <div class="life-col">
          <div class="life-copy">
            <h3 class="big">${esc(L.title)}</h3>
            <p>${esc(L.text)}</p>
          </div>
          <div class="life-ph">${L.photos.map((p) => `<figure class="media"><img src="${esc(p)}" alt="Training at the gym"></figure>`).join('')}</div>
        </div>
      </div>
    </div>
  </section>`;

  const contact = `
  <section id="contact" class="scene">
    <div class="ghost" aria-hidden="true">HI</div>
    <div class="wrap">
      ${head('Open to new opportunities', "Let's connect")}
      <a class="big-mail" href="mailto:${esc(S.email)}">${esc(S.email)}</a>
      <div class="links">
        <div>
          ${S.socials.map((s) => `<a class="lnk"${ext(s.url)}><span>${esc(s.name)}</span><span class="mono">${esc(s.handle)} ↗</span></a>`).join('')}
          <a class="lnk" href="${esc(S.cv)}" target="_blank" rel="noopener"><span>CV</span><span class="mono">PDF ↗</span></a>
        </div>
        <div><h3 class="h3m mono">/ Hobbies</h3>${chips(S.hobbies)}</div>
      </div>
    </div>
  </section>
  <footer class="credits">
    <p class="mono acc" style="margin-bottom:20px">● Build complete</p>
    <p class="mono" style="margin-bottom:50px">Swarm engine: <a class="acc" href="https://github.com/DhvanilPatel/swarm-cursors" target="_blank" rel="noopener">swarm-cursors</a> by Dhvanil Patel, after <a class="acc" href="https://califa.github.io/swarm-site/" target="_blank" rel="noopener">Swarm</a> by Joel Califa</p>
    <div class="the-end" aria-label="The End"><span class="ln">The</span> <span class="ln o">End</span></div>
    <dl>
      <div><dt>Directed &amp; built by</dt><dd>${esc(fullName)} (${esc(S.preferred)})</dd></div>
      <div><dt>Built live by</dt><dd>a swarm of cursors</dd></div>
      <div><dt>Shot on location</dt><dd>${esc(S.origin)}</dd></div>
      <div><dt>Prefer it quiet?</dt><dd><a href="paper/" data-mode="paper" class="acc">Paper mode ↗</a></dd></div>
    </dl>
    <div class="wrap"><div class="copy mono"><span>© ${new Date().getFullYear()} ${esc(fullName)}</span><span>${esc(S.origin)}</span></div></div>
  </footer>`;

  document.getElementById('app').innerHTML = hero + about + skills + work + reels + phil + exp + writing + life + contact;

  // per-video sound toggles (reels)
  document.querySelectorAll('.reel-v').forEach((f) => {
    const v = f.querySelector('video'), b = f.querySelector('.snd');
    b.addEventListener('click', () => {
      document.querySelectorAll('video').forEach((o) => { if (o !== v) o.muted = true; });
      document.querySelectorAll('.snd').forEach((o) => { if (o !== b) { o.setAttribute('aria-pressed', 'false'); o.textContent = 'Sound off'; } });
      v.muted = !v.muted; if (!v.muted) v.play().catch(() => {});
      b.setAttribute('aria-pressed', String(!v.muted)); b.textContent = v.muted ? 'Sound off' : 'Sound on';
    });
  });
})();
