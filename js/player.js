/* "Now playing" card driven by Spotify's official iFrame API.
   Logged-in Spotify listeners hear the full track; everyone else gets Spotify's 30-second preview. */
(() => {
  const M = (window.SITE || {}).music;
  const root = document.querySelector('[data-player]');
  if (!M || !root) return;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = {
    prev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5v14M18 6l-9 6 9 6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 5v14M6 6l9 6-9 6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
    play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5l11 6.5-11 6.5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>',
    pause: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };
  const fmt = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

  root.innerHTML = `
    <img class="np-art" src="${esc(M.art)}" alt="${esc(M.album)} cover art" width="300" height="300" loading="lazy">
    <div class="np-body">
      <div class="np-k mono">Now playing</div>
      <h3 class="np-t">${esc(M.title)}</h3>
      <div class="np-a">${esc(M.artist)}</div>
      <div class="np-bar"><span class="mono np-cur">0:00</span><div class="np-track" role="slider" aria-label="Seek" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><i></i><b></b></div><span class="mono np-dur">${esc(M.length)}</span></div>
      <div class="np-link mono">Connect with music — <a href="${esc(M.url)}" target="_blank" rel="noopener">Spotify ${icon.ext}</a></div>
      <div class="np-ctl">
        <button type="button" class="np-b" data-a="prev" aria-label="Restart">${icon.prev}</button>
        <button type="button" class="np-b np-play" data-a="play" aria-label="Play">${icon.play}</button>
        <button type="button" class="np-b" data-a="next" aria-label="Forward 15 seconds">${icon.next}</button>
        <span class="np-note mono">Preview via Spotify</span>
      </div>
    </div>
    <div class="np-embed" data-swarm-skip aria-hidden="true"><div id="npEmbed"></div></div>`;

  const $ = (s) => root.querySelector(s);
  const playBtn = $('.np-play'), cur = $('.np-cur'), dur = $('.np-dur'), track = $('.np-track'), fill = $('.np-track i'), knob = $('.np-track b');
  let ctrl = null, state = { position: 0, duration: 0, isPaused: true }, pending = false;

  const paint = () => {
    const p = state.duration ? Math.min(1, state.position / state.duration) : 0;
    fill.style.transform = `scaleX(${p})`;
    knob.style.left = `${p * 100}%`;
    cur.textContent = fmt(state.position);
    if (state.duration) dur.textContent = fmt(state.duration);
    track.setAttribute('aria-valuenow', String(Math.round(p * 100)));
    playBtn.innerHTML = state.isPaused ? icon.play : icon.pause;
    playBtn.setAttribute('aria-label', state.isPaused ? 'Play' : 'Pause');
    root.classList.toggle('is-playing', !state.isPaused);
  };

  const boot = () => {
    if (window.__npApi) return;
    window.__npApi = true;
    window.onSpotifyIframeApiReady = (API) => {
      API.createController(document.getElementById('npEmbed'), { uri: M.uri, width: 300, height: 80 }, (c) => {
        ctrl = c;
        c.addListener('playback_update', (e) => { state = e.data; paint(); });
        c.addListener('ready', () => { if (pending) { pending = false; c.togglePlay(); } });
      });
    };
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    document.body.appendChild(s);
  };
  // load Spotify only when the card gets close to the viewport
  new IntersectionObserver((es, o) => { if (es.some((e) => e.isIntersecting)) { boot(); o.disconnect(); } }, { rootMargin: '400px' }).observe(root);

  root.addEventListener('click', (e) => {
    const b = e.target.closest('.np-b');
    if (!b) return;
    boot();
    if (!ctrl) { pending = b.dataset.a === 'play'; return; }
    if (b.dataset.a === 'play') ctrl.togglePlay();
    else if (b.dataset.a === 'prev') ctrl.seek(0);
    else if (b.dataset.a === 'next' && state.duration) ctrl.seek(Math.min(state.duration - 1000, state.position + 15000) / 1000);
  });
  const seekTo = (x) => {
    if (!ctrl || !state.duration) return;
    const r = track.getBoundingClientRect();
    ctrl.seek((Math.max(0, Math.min(1, (x - r.left) / r.width)) * state.duration) / 1000);
  };
  track.addEventListener('click', (e) => seekTo(e.clientX));
  track.addEventListener('keydown', (e) => {
    if (!ctrl || !state.duration) return;
    const step = e.key === 'ArrowRight' ? 5000 : e.key === 'ArrowLeft' ? -5000 : 0;
    if (step) { e.preventDefault(); ctrl.seek(Math.max(0, state.position + step) / 1000); }
  });
  paint();
})();
