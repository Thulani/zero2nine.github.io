# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static, single-page marketing site for Zero2Nine (a South African software development company), hosted on GitHub Pages at https://www.zero2nine.co.za/ (custom domain set by `CNAME`). Pushing to `main` deploys it. Pages runs its default Jekyll build; `_config.yml` only lists repo-only files (such as this one) to leave off the live site. There is no build step, package manager, linter, or test suite.

`README.md` predates the redesign: its Bootstrap stack, section list and `zero2nine.github.io` URL are out of date. Trust the code and this file over it.

## Running locally

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening `index.html` directly also works, but a local server is closer to how GitHub Pages serves it.

## Architecture

The site is three files: `index.html`, `css/style.css`, and `js/main.js`. There is no CSS framework; the only external resource is Google Fonts (Space Grotesk for headings, Inter for body text, JetBrains Mono for labels). Icons are inline SVGs in `index.html`, not an icon library.

- **Brand colors come from the logo** (`img/zero2nine.png`): `--blue` `#336699` and `--orange` `#ff9933`, defined with the rest of the palette as custom properties on `:root` in `style.css`. Use the tokens rather than hard-coded colors. `#ff9933` fails contrast as text on white; use `--orange-600` for orange text, and put dark text (`--ink`) on orange buttons.
- **The page is one long document of `<section>`s** (`#top` hero, `#services`, `#process`, `#about`, `#contact`) under a fixed `#header`. Nav links are in-page anchors. Smooth scrolling and the header offset come from CSS (`scroll-behavior`, `scroll-padding-top`), not JS. The `--header-h` token sets the header height, the scroll offset, the hero's top padding and the mobile menu's position, so change the token rather than any one of those.
- **The logo mark** (the four squares) is an inline SVG `<symbol id="mark">` at the top of `<body>`. The footer reuses it with `<use href="#mark">`. The header uses the full PNG logo, which only reads on a light background.
- **Scroll-in animation:** `main.js` adds a `js` class to `<html>`, and only then does CSS hide `.reveal` elements until an IntersectionObserver adds `.in`. Content stays visible without JS. Every animation is disabled under `prefers-reduced-motion`.
- **The contact form** (`#contact-form`) posts to Formspree. Its endpoint is the form's `action` attribute. `main.js` submits it with `fetch` and shows the result in the `.form-status` live region. Field `name` attributes are what Formspree receives.
- **`main.js` runs top-level code with no null checks.** It expects `#header` (with `.nav-toggle`), `#current-year`, and `#contact-form` (with `.form-status` and a submit button) to exist. If you remove or rename any of them, update the script too.
- **Never write the contact email address whole in the HTML.** It's protected from scrapers: each `.email-link` carries `data-u` and `data-d`, and `main.js` builds the `mailto:` link and the visible text. Without JS, the link shows an "[at]"/"[dot]" version. Add new email links the same way.
- **Favicons and the web manifest live in `img/`.** Icon paths inside `site.webmanifest` are relative to `img/`.
