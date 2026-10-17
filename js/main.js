// Lets CSS hide .reveal elements only when this script is running
document.documentElement.classList.add('js');

const header = document.getElementById('header');
const navToggle = header.querySelector('.nav-toggle');

// Header background once the page scrolls
function updateHeader() {
    header.classList.toggle('scrolled', window.scrollY > 16);
}
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

// Mobile menu
function setMenu(open) {
    header.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
navToggle.addEventListener('click', () => setMenu(!header.classList.contains('open')));
header.querySelectorAll('.nav-menu a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') setMenu(false);
});

// Fade sections in as they scroll into view
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealEls.forEach(el => observer.observe(el));
} else {
    revealEls.forEach(el => el.classList.add('in'));
}

// Email links: the address is assembled here so it never appears whole in the HTML (spam protection)
document.querySelectorAll('.email-link').forEach(link => {
    const address = `${link.dataset.u}@${link.dataset.d}`;
    link.href = `mailto:${address}`;
    link.textContent = address;
});

// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Contact form: submit to Formspree without leaving the page
const form = document.getElementById('contact-form');
const status = form.querySelector('.form-status');
const submitBtn = form.querySelector('button[type="submit"]');

form.addEventListener('submit', async e => {
    e.preventDefault();
    submitBtn.disabled = true;
    status.className = 'form-status';
    status.textContent = 'Sending…';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
        form.reset();
        status.classList.add('success');
        status.textContent = 'Thanks! Your message is on its way. We’ll be in touch soon.';
    } catch (error) {
        console.error('Error:', error);
        status.classList.add('error');
        status.textContent = 'Something went wrong. Please try again in a moment.';
    } finally {
        submitBtn.disabled = false;
    }
});
