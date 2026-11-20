/* Article detail page: content, share buttons, comments, related posts */
(function () {
  const id = parseInt(new URLSearchParams(location.search).get('id'), 10);
  const post = POSTS.find((p) => p.id === id);
  const $article = document.getElementById('article');

  if (!post) {
    $article.innerHTML = '<h1>Article not found</h1><p>The article you are looking for does not exist. <a href="index.html" style="color:var(--primary)">Back to home</a></p>';
    document.querySelectorAll('.share, .comments, .related').forEach((el) => (el.hidden = true));
    return;
  }

  document.title = post.title + ' – Inkwell';

  $article.innerHTML = `
    <header class="article-head">
      <span class="badge">${escapeHTML(post.category)}</span>
      <h1>${escapeHTML(post.title)}</h1>
      <div class="meta">By ${escapeHTML(post.author)} · <time datetime="${post.date}">${formatDate(post.date)}</time> · ${readTime(post.content)}</div>
    </header>
    <div class="article-cover"><img src="${post.image}" alt="${escapeHTML(post.title)}"></div>
    <div class="article-body">${post.content}</div>
    <div class="article-tags">${post.tags.map((t) => `<a href="index.html?tag=${encodeURIComponent(t)}#posts">#${escapeHTML(t)}</a>`).join('')}</div>`;

  // Reading progress
  const bar = document.getElementById('progress');
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = Math.min(100, Math.max(0, pct)) + '%';
  }, { passive: true });

  // Social sharing
  const url = encodeURIComponent(location.href);
  const text = encodeURIComponent(post.title);
  document.getElementById('share-x').href = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
  document.getElementById('share-fb').href = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  document.getElementById('share-li').href = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  const copyBtn = document.getElementById('share-copy');
  copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(location.href); copyBtn.textContent = 'Copied!'; }
    catch (e) { prompt('Copy this link:', location.href); }
    setTimeout(() => (copyBtn.textContent = 'Copy link'), 1800);
  });

  // Comments (stored in localStorage – demo only)
  const KEY = 'comments-' + post.id;
  const $list = document.getElementById('comment-list');
  const $count = document.getElementById('comment-count');
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) { return []; } };
  const save = (list) => { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} };

  function renderComments() {
    const list = load();
    $count.textContent = '(' + list.length + ')';
    $list.innerHTML = list.length
      ? list.map((c) => `<li><span class="who">${escapeHTML(c.name)}</span><time>${new Date(c.at).toLocaleString()}</time><p>${escapeHTML(c.text)}</p></li>`).join('')
      : '<li><p>No comments yet. Be the first to share your thoughts!</p></li>';
  }

  document.getElementById('comment-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const text = document.getElementById('c-text').value.trim();
    if (!name || !text) return;
    const list = load();
    list.unshift({ name, text, at: Date.now() });
    save(list);
    e.target.reset();
    renderComments();
  });
  renderComments();

  // Related articles: score by shared tags + same category
  const related = POSTS
    .filter((p) => p.id !== post.id)
    .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length * 2 + (p.category === post.category ? 1 : 0) }))
    .sort((a, b) => b.score - a.score || b.p.date.localeCompare(a.p.date))
    .slice(0, 3)
    .map((x) => x.p);
  document.getElementById('related').innerHTML = related.map((p) => cardHTML(p)).join('');
})();
