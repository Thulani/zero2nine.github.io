// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Form submission handling
const form = document.getElementById('contact-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Message sent successfully!');
            form.reset();
        } else {
            throw new Error('Network response was not ok');
        }
    })
    .catch(error => {
        alert('There was a problem with your submission. Please try again.');
        console.error('Error:', error);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    header.classList.toggle('scrolled', window.scrollY > 100);
});
