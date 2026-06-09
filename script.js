// Navbar scroll effect
window.addEventListener('scroll', function () {
    var nav = document.getElementById('navbar');
    if (window.scrollY > 50) { nav.classList.add('scrolled') } else { nav.classList.remove('scrolled') }
});

// Hamburger menu
document.getElementById('hamburger').addEventListener('click', function () {
    var menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
});
function closeMobile() {
    document.getElementById('mobileMenu').classList.remove('open');
}

// Scroll animations
var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('visible') } });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(function (el) { observer.observe(el) });

// Waitlist toggle
var selectedRole = 'creator'; // Track the selected role

function setToggle(type, btn) {
    selectedRole = type;
    document.querySelectorAll('.toggle-btn').forEach(function (b) { b.classList.remove('active') });
    btn.classList.add('active');
    var inp = document.getElementById('emailInput');
    if (type === 'creator') { inp.placeholder = 'Creator email — let brands find you' }
    else { inp.placeholder = 'Brand email — discover your perfect creators' }
}

// Waitlist submit
function handleJoin() {
    var email = document.getElementById('emailInput').value;
    if (!email || !email.includes('@')) {
        var inp = document.getElementById('emailInput');
        inp.style.borderColor = 'rgba(236,72,153,0.8)';
        inp.placeholder = 'Please enter a valid email ↑';
        setTimeout(function () { inp.style.borderColor = ''; inp.placeholder = 'Enter your email address' }, 2500);
        return;
    }

    // Call our secure backend instead of Telegram directly
    fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, role: selectedRole })
    }).catch(function(error) {
        console.error('Error sending message:', error);
    });

    document.getElementById('waitlistForm').style.display = 'none';
    document.querySelector('.waitlist-note').style.display = 'none';
    document.querySelector('.toggle-group').style.display = 'none';
    document.getElementById('successMsg').style.display = 'block';
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
        var target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }) }
    });
});