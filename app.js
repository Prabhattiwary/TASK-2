/* Homepage logic: featured posts, filters, search, load more */
(function () {
  const PAGE_SIZE = 6;
  let visible = PAGE_SIZE;
  const state = { category: 'All', tag: null, query: '' };

  const $grid = document.getElementById('grid');
  const $featured = document.getElementById('featured');
  const $cats = document.getElementById('categories');
  const $tags = document.getElementById('tags');
  const $search = document.getElementById('search');
  const $count = document.getElementById('result-count');
  const $empty = document.getElementById('empty');
  const $more = document.getElementById('load-more');

  const sorted = POSTS.slice().sort((a, b) => b.date.localeCompare(a.date));

  // Featured
  $featured.innerHTML = sorted.filter((p) => p.featured).slice(0, 3).map((p) => `
    <a class="featured-card" href="post.html?id=${p.id}">
      <img src="${p.image}" alt="${escapeHTML(p.title)}">
      <div class="featured-body">
        <span class="badge">${escapeHTML(p.category)}</span>
        <h3>${escapeHTML(p.title)}</h3>
        <div class="meta">${formatDate(p.date)} · ${escapeHTML(p.author)}</div>
      </div>
    </a>`).join('');

  // Category chips
  const categories = ['All', ...new Set(POSTS.map((p) => p.category))];
  $cats.innerHTML = categories.map((c) =>
    `<button class="chip${c === 'All' ? ' active' : ''}" data-cat="${c}" role="tab">${c}</button>`).join('');

  // Tag chips
  const allTags = [...new Set(POSTS.flatMap((p) => p.tags))].sort();
  $tags.innerHTML = allTags.map((t) => `<button class="chip" data-tag="${t}">#${t}</button>`).join('');

  function filtered() {
    const q = state.query.trim().toLowerCase();
    return sorted.filter((p) => {
      if (state.category !== 'All' && p.category !== state.category) return false;
      if (state.tag && !p.tags.includes(state.tag)) return false;
      if (!q) return true;
      return [p.title, p.excerpt, p.category, p.author, p.tags.join(' ')].join(' ').toLowerCase().includes(q);
    });
  }

  function render() {
    const list = filtered();
    const shown = list.slice(0, visible);
    $grid.innerHTML = shown.map((p) => cardHTML(p, state.query.trim())).join('');
    $empty.hidden = list.length > 0;
    $more.parentElement.hidden = visible >= list.length;
    $count.textContent = list.length + (list.length === 1 ? ' article' : ' articles');
  }

  function reset() { visible = PAGE_SIZE; render(); }

  $cats.addEventListener('click', (e) => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    state.category = b.dataset.cat;
    $cats.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c === b));
    reset();
  });

  $tags.addEventListener('click', (e) => {
    const b = e.target.closest('[data-tag]'); if (!b) return;
    state.tag = state.tag === b.dataset.tag ? null : b.dataset.tag;
    $tags.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c.dataset.tag === state.tag));
    reset();
  });

  let timer;
  $search.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => { state.query = $search.value; reset(); }, 200);
  });

  $more.addEventListener('click', () => { visible += PAGE_SIZE; render(); });

  // Preselect tag from URL (?tag=css)
  const urlTag = new URLSearchParams(location.search).get('tag');
  if (urlTag && allTags.includes(urlTag)) {
    state.tag = urlTag;
    $tags.querySelectorAll('.chip').forEach((c) => c.classList.toggle('active', c.dataset.tag === urlTag));
  }

  // Newsletter (demo only)
  document.getElementById('newsletter').addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('newsletter-msg').textContent = 'Thanks for subscribing!';
    e.target.reset();
  });

  render();
})();
