/* Shared helpers: theme, mobile menu, formatting, card rendering */
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (toggle) toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
  let saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(saved || (prefersDark ? 'dark' : 'light'));

  if (toggle) toggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  const menuBtn = document.getElementById('menu-toggle');
  const menu = document.getElementById('nav-menu');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
    menu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') { menu.classList.remove('open'); menuBtn.setAttribute('aria-expanded', false); }
    });
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();

function formatDate(iso) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function readTime(html) {
  const words = html.replace(/<[^>]+>/g, ' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200)) + ' min read';
}

function cardHTML(p, query) {
  const hl = (t) => {
    if (!query) return escapeHTML(t);
    const safe = escapeHTML(t);
    const q = escapeHTML(query).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return safe.replace(new RegExp('(' + q + ')', 'gi'), '<mark>$1</mark>');
  };
  return `
    <article class="card">
      <a class="card-img" href="post.html?id=${p.id}" aria-label="${escapeHTML(p.title)}">
        <img src="${p.image}" alt="${escapeHTML(p.title)}" loading="lazy">
      </a>
      <div class="card-body">
        <span class="badge">${escapeHTML(p.category)}</span>
        <h3><a href="post.html?id=${p.id}">${hl(p.title)}</a></h3>
        <p>${hl(p.excerpt)}</p>
        <div class="meta"><time datetime="${p.date}">${formatDate(p.date)}</time> · <span>${readTime(p.content)}</span></div>
      </div>
    </article>`;
}
