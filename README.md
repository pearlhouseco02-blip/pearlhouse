# Pearlhouse — studio website

Plain static site: HTML, CSS and a little JavaScript. No build step, no dependencies.

## Structure

```
index.html              Homepage (all content lives here)
404.html                "Page not found" page (Vercel serves it automatically)
vercel.json             Vercel settings: clean URLs + security headers
robots.txt, sitemap.xml For search engines
assets/
  css/tokens.css        Colours, fonts, sizes, light/dark themes  ← restyle here
  css/base.css          Reset, buttons, nav, footer, stickers, animations
  css/sections.css      One block per section (hero, work, pricing, process, faq, cta, 404)
  js/config.js          WhatsApp number, email, messages, currency rules  ← settings here
  js/main.js            Features: theme toggle, reveal, currency, WhatsApp/email links
  img/                  Favicon and any images (e.g. project screenshots)
```

## Common edits

| I want to…                         | Edit                                                                 |
|-----------------------------------|----------------------------------------------------------------------|
| Change WhatsApp number or email    | `assets/js/config.js` (also update the fallback `https://wa.me/…` hrefs in `index.html` if you like) |
| Change colours or fonts            | `assets/css/tokens.css`                                              |
| Add a project                      | Copy one `<article class="project">` block in `index.html`           |
| Show a real screenshot on a TV     | Put the image in `assets/img/`, then use `<div class="screen screen--shot" style="--shot:url(assets/img/name.jpg)">` |
| Change a price                     | Edit `data-usd` / `data-inr` on the `.price` element                  |
| Add a plan                         | Copy one `<article class="plan">`; add `plan--featured` to highlight  |
| Add an FAQ                         | Copy one `<details>` block                                            |
| Add a new page (e.g. `/about`)     | Create `about.html` using `404.html` as a template (absolute `/assets/...` paths). With `cleanUrls` it is served at `/about` |
| Add a new section                  | Add a `<section>` in `index.html` and a matching block in `sections.css` |

## Preview locally

Opening `index.html` directly works. For an exact Vercel-like preview:

```
npx serve .
# or
python3 -m http.server 8000
```

## Deploy on Vercel

1. Push this folder to a GitHub repo (private is fine).
2. Vercel → Add New → Project → import the repo.
3. Framework preset: **Other**. Leave build command and output directory empty. Deploy.
4. Project → Settings → Domains → add `pearlhouse.io` and `www.pearlhouse.io`, then add the DNS records Vercel shows at your domain registrar.

Every push to the main branch redeploys automatically.

## Moving to a framework later

If the site grows (blog, contact form API, many pages), the sections map 1:1 to components:
copy each `<section>` into a Next.js/Astro component and move `tokens.css` into global styles.
