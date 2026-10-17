# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, single-page marketing site for Zero2Nine (a South African software development company), hosted on GitHub Pages at https://zero2nine.github.io/. Pushing to `main` deploys it. There is no build step, package manager, linter, or test suite.

## Running locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening `index.html` directly also works, but a local server is closer to how GitHub Pages serves it (and is needed for the root-relative paths in `img/site.webmanifest`).

## Architecture

The site is three files: `index.html`, `css/style.css`, and `js/main.js`.

- **Bootstrap 5.3 and Bootstrap Icons come from the jsDelivr CDN**, not vendored copies. Layout uses Bootstrap grid/utility classes in the markup. `css/style.css` loads after Bootstrap and overrides parts of it: `.container` max-widths, plus a custom `.py-6` spacing utility that Bootstrap doesn't have.
- **Theme colors are CSS custom properties** on `:root` in `style.css` (`--primary` navy `#1a2238`, `--accent` orange `#ff6a3d`, etc.). Use these instead of hard-coded colors.
- **The page is one long document of `<section>`s** (`#hero`, `#about`, `#services`, `#why-us`, `#contact`) under a sticky `#header` navbar. Nav links are in-page anchors. `main.js` intercepts every `a[href^="#"]` for smooth scrolling, so any new `#` link must point to an element that exists.
- **The contact form** (`#contact-form`) posts to Formspree. Its endpoint is the form's `action` attribute. `main.js` submits it with `fetch` and an `Accept: application/json` header, then reports the result with `alert()`. Field `name` attributes are what Formspree receives.
- **`main.js` runs top-level code with no null checks.** It expects `#current-year` (footer year), `#contact-form`, and `#header` to exist. If you remove or rename any of them, update the script too.
- **Favicons and the web manifest live in `img/`.** `index.html` references them directly.
