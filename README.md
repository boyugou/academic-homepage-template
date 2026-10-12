# Academic Homepage Template

A clean, single-page academic homepage built with [Astro](https://astro.build).
All content lives in YAML files; there is no backend and no CMS. Light and dark
themes, responsive layout, and automatic deployment to GitHub Pages.

Sections: About · News · Selected Publications · Projects · Academic Services ·
Education · Teaching.

## Quick start

1. Click **Use this template** (or fork) and name the repo `YOUR-USERNAME.github.io`.
2. In the repo, go to **Settings → Pages → Source: GitHub Actions**.
3. Edit the files in `src/data/` (see below), set `site` in `astro.config.mjs`
   and `url` in `src/data/site.yml` to your URL.
4. Replace `public/assets/img/avatar.svg` with your photo (update `avatar` in `site.yml`).
5. Push to `main`; the workflow builds and deploys the site.

Local preview:

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # production build into ./dist
```

## Content files (`src/data/`)

| File | Section |
|---|---|
| `site.yml` | Sidebar, `<head>`, social links |
| `bio.yml` | About (HTML allowed) |
| `news.yml` | News, newest first; optional `tags` (`tone: accept` green, `oral` red) |
| `publications.yml` | Selected publications, newest first |
| `projects.yml` | Projects; optional `repo: owner/name` adds a live GitHub ★ count |
| `services.yml` | Academic services |
| `education.yml` | Education |
| `teaching.yml` | Teaching |

A publication entry:

```yaml
- title: "Paper title"
  authors: <strong>Your Name</strong>, Coauthor
  venue: Conference 2026
  collab: Industry Partner         # optional
  image: /assets/img/paper.png     # file in public/assets/img/
  paper: https://arxiv.org/abs/xxxx.xxxxx
  homepage: https://...            # optional: homepage / code / data / model
  code: https://github.com/...
  highlights:                      # optional chips
    - Spotlight
    - hf_collection: owner/slug    # live Hugging Face download count
      label: "{n} HF downloads"
      fallback: 10K+
```

Styling is plain CSS in `src/styles/global.css`; colors and spacing are CSS
variables at the top of the file.

## Credits

The visual layout (sidebar profile + single scrolling column, light/dark themes)
was originally inspired by the Jekyll theme
[Minimal Light](https://github.com/yaoyao-liu/minimal-light) by Yaoyao Liu, which is
itself based on [minimal](https://github.com/orderedlist/minimal) by Steve Smith
(orderedlist). This template is a from-scratch rewrite in Astro and shares no code
with them, but we're grateful for the inspiration. Icons: [Font Awesome](https://fontawesome.com)
and [Academicons](https://jpswalsh.github.io/academicons/); fonts: Inter, JetBrains Mono, Newsreader.

## License

[MIT](LICENSE)
