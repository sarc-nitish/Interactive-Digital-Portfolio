
// Preloader
window.addEventListener('load', function () {
    setTimeout(() => {
        document.querySelector('.preloader').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.preloader').style.display = 'none';
        }, 500);
    }, 1000);
});

// Typing Effect
const typingText = document.getElementById('typing-text');
const texts = [ 'Python Developer','Backend Developer','Generative AI Enthusiast','AI & ML Engineer'];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(type, 1500);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
    }

    const speed = isDeleting ? 50 : 150;
    setTimeout(type, speed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 500);
});

// Background Particles
function createParticles() {
    const container = document.getElementById('particles');
    const numberOfParticles = 20;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        // Random properties
        const size = Math.random() * 100 + 50;
        const opacity = Math.random() * 0.3 + 0.1;
        const delay = Math.random() * 15;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        particle.style.left = `${startX}%`;
        particle.style.top = `${startY}%`;

        container.appendChild(particle);
    }
}

createParticles();

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Navbar Sticky
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});
const hamburger = document.getElementById("hamburger");
const sideDrawer = document.getElementById("sideDrawer");
const closeBtn = document.getElementById("closeBtn");
const overlay = document.getElementById("overlay");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    sideDrawer.classList.toggle("active");
    overlay.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sideDrawer.classList.remove("active");
    overlay.classList.remove("active");
});

overlay.addEventListener("click", () => {
    hamburger.classList.remove("active");
    sideDrawer.classList.remove("active");
    overlay.classList.remove("active");
});

// Close side drawer when any item is clicked
sideDrawer.querySelectorAll("a").forEach(item => {
    item.addEventListener("click", () => {
        hamburger.classList.remove("active");
        sideDrawer.classList.remove("active");
        overlay.classList.remove("active");
    });
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// VanillaTilt for 3D effects
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.3
});

VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    'max-glare': 0.3
});

// Animate skill bars when in view

const skillBars = document.querySelectorAll('.skill-bar');

const animateSkills = () => {
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
};

// Intersection Observer for skill animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            observer.unobserve(entry.target.parentElement.parentElement);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skills-container').forEach(container => {
    observer.observe(container);
});

// Form submission
const contactForm = document.getElementById('contactForm');
const successMsg = document.getElementById('successMsg');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        }).then(() => {
            contactForm.reset();

            // ✅ Show success message with fade-in
            successMsg.classList.add("show");

            // ⏳ Hide after 4s
            setTimeout(() => {
                successMsg.classList.remove("show");
            }, 4000);
        }).catch(() => {
            console.error("Message send failed.");
        });
    });
}


// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    timelineObserver.observe(item);
});
