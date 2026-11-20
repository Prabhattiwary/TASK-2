# Inkwell – Responsive Blog Website

A clean, modern, fully responsive blog built with plain HTML, CSS and JavaScript (no build step, no dependencies).

## Run it
Open `index.html` in any modern browser. For best results, serve it locally:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Features
- Homepage with featured posts hero
- Responsive blog cards (image, title, excerpt, publish date, read time)
- Categories and tags filtering
- Live search with highlighted matches
- "Load more" pagination
- Individual article pages (`post.html?id=1`)
- Responsive navbar (hamburger on mobile) and footer
- Bonus: dark mode (remembers choice), comments (saved in localStorage), social share buttons, related articles, reading progress bar

## Structure
```
index.html        Homepage
post.html         Article detail page
css/style.css     Styles (light + dark themes, responsive)
js/data.js        Sample posts – edit/add your own here
js/common.js      Theme toggle, mobile menu, helpers
js/app.js         Homepage logic
js/post.js        Article page logic
```

## Add a post
Add an object to the `POSTS` array in `js/data.js` with a unique `id`, `title`, `category`, `tags`, `date` (YYYY-MM-DD), `author`, `image`, `excerpt`, `content` (HTML) and optional `featured: true`.

Sample images load from picsum.photos, so an internet connection is needed to see them.
