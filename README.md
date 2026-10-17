# Zero2Nine - Company Website

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit-brightgreen)](https://www.zero2nine.co.za/)

The source for the website of Zero2Nine, a software studio in Johannesburg, South Africa. It's a single page covering the company's services, how it works, who it is, and a contact form.

The site is hosted on GitHub Pages at [https://www.zero2nine.co.za/](https://www.zero2nine.co.za/).

## Sections

*   **Hero** (`#top`): what Zero2Nine does, with links to start a project or see services.
*   **Services** (`#services`): web, mobile, cloud, design and consulting work.
*   **Process** (`#process`): how a project runs: discover, design, build, then launch and scale.
*   **About** (`#about`): the studio, its founders and why to work with it.
*   **Contact** (`#contact`): contact details and a message form.

## Technology

*   Plain HTML, CSS and JavaScript: `index.html`, `css/style.css` and `js/main.js`. There is no framework, build step or package manager.
*   Fonts from [Google Fonts](https://fonts.google.com/) (Space Grotesk, Inter and JetBrains Mono). Icons are inline SVGs.
*   The contact form posts to [Formspree](https://formspree.io/).
*   Hosted on [GitHub Pages](https://pages.github.com/), with the custom domain set in `CNAME`.

## Running locally

```sh
git clone https://github.com/Thulani/zero2nine.github.io.git
cd zero2nine.github.io
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly in a browser also works, but a local server is closer to how GitHub Pages serves the site.

## Contact form

The form (`#contact-form` in `index.html`) sends messages to Formspree. The Formspree endpoint is the form's `action` attribute, and `js/main.js` submits it in the background and shows whether it worked.

## Deployment

GitHub Pages publishes the site automatically whenever changes are pushed to `main`.

## Contributing

This repository is for the official company website, so contributions aren't generally expected. If you spot a bug or have a suggestion, feel free to open an issue.

## License

Copyright © 2025 Zero2Nine. All Rights Reserved.
