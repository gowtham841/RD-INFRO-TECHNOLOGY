// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const nav = document.querySelector('#main-nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const heroContent = document.querySelector('.hero-content');
    const sections = document.querySelectorAll('.section');

    // Add initial animations for hero section
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(20px)';
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 500);
    }

    // Animate sections on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-animate');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        sectionObserver.observe(section);
    });

    // Animate service cards
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('card-animate');
                }, index * 200); // Stagger effect
                cardObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        cardObserver.observe(card);
    });

    // Animate equalizer bars
    const equalizerBars = document.querySelectorAll('.equalizer .bar');
    function animateEqualizer() {
        equalizerBars.forEach(bar => {
            const randomHeight = Math.random() * 70 + 30;
            bar.style.height = `${randomHeight}%`;
        });
    }

    if (equalizerBars.length > 0) {
        setInterval(animateEqualizer, 200);
    }

    // Portfolio hover animations
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            const info = item.querySelector('.portfolio-info');
            if (overlay && info) {
                overlay.style.opacity = '1';
                info.style.transform = 'translateY(0)';
            }
        });

        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            const info = item.querySelector('.portfolio-info');
            if (overlay && info) {
                overlay.style.opacity = '0';
                info.style.transform = 'translateY(20px)';
            }
        });
    });

    // Initialize mobile navigation
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            hamburger.classList.toggle('toggle');
        });
    }

    // Smooth scroll functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks && hamburger) {
                    navLinks.classList.remove('nav-active');
                    hamburger.classList.remove('toggle');
                }
            }
        });
    });

    // Scroll event handler
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                service: this.querySelector('#service').value,
                message: this.querySelector('#message').value
            };
            console.log('Form submitted:', formData);
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Dark mode functionality
    const darkModeToggle = document.getElementById('darkModeToggle');
    const moonIcon = darkModeToggle.querySelector('i');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateDarkModeIcon(savedTheme === 'dark');

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateDarkModeIcon(newTheme === 'dark');
    });

    // Update icon based on theme
    function updateDarkModeIcon(isDark) {
        const icon = darkModeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Add animation
        icon.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            icon.style.transform = 'rotate(0)';
        }, 300);
    }
});

// Add necessary styles
const styles = `
    .section {
        transition: all 1s ease;
    }

    .section-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .service-card {
        transition: all 0.6s ease;
    }

    .card-animate {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .portfolio-overlay {
        transition: opacity 0.3s ease;
    }

    .portfolio-info {
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }

    .nav-active {
        transform: translateX(0%) !important;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            right: 0;
            top: 70px;
            background: #333;
            width: 100%;
            flex-direction: column;
            align-items: center;
            padding: 20px 0;
            transform: translateX(100%);
            transition: transform 0.3s ease-in;
            z-index: 1000;
        }

        .nav-links li {
            margin: 15px 0;
        }

        .hamburger.toggle .line1 {
            transform: rotate(-45deg) translate(-5px, 6px);
        }

        .hamburger.toggle .line2 {
            opacity: 0;
        }

        .hamburger.toggle .line3 {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    }

    /* Dark mode transitions */
    body,
    nav,
    .service-card,
    .testimonial-card,
    .contact-form,
    .form-group input,
    .form-group select,
    .form-group textarea,
    .footer {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    }

    .dark-mode-toggle i {
        transition: transform 0.3s ease;
    }

    /* Dark mode specific styles */
    [data-theme="dark"] .dark-mode-toggle {
        border-color: var(--primary-color);
    }

    [data-theme="dark"] .dark-mode-toggle:hover {
        background: var(--primary-color);
        color: #fff;
    }
`;

// Add styles to document
const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});
