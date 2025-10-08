// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = menuToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('.about-main, .quick-stats, .expertise-section, .mission-section, .training-section, .behind-scenes');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe individual cards for staggered animation
const cards = document.querySelectorAll('.stat-card, .expertise-card, .training-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Animate stats counter
const statNumbers = document.querySelectorAll('.stat-number');
const hasAnimated = new Set();

const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.has(entry.target)) {
            hasAnimated.add(entry.target);
            animateCounter(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => countObserver.observe(stat));

function animateCounter(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    const duration = 2000;
    const increment = number / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            element.textContent = number + (hasPlus ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }
    }, 16);
}

// Mobile sticky CTA visibility
const mobileCta = document.getElementById('mobileCta');
const pageHero = document.querySelector('.page-hero');

const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (window.innerWidth <= 768) {
            if (!entry.isIntersecting) {
                mobileCta.style.transform = 'translateY(0)';
            } else {
                mobileCta.style.transform = 'translateY(100%)';
            }
        }
    });
}, { threshold: 0.1 });

mobileCta.style.transition = 'transform 0.3s ease';
mobileCta.style.transform = 'translateY(100%)';
ctaObserver.observe(pageHero);

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button');
    
    // Simulate form submission
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Subscribing...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        submitButton.textContent = 'Subscribed!';
        submitButton.style.backgroundColor = '#22c55e';
        emailInput.value = '';
        
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.backgroundColor = '';
        }, 2000);
    }, 1000);
});

// Parallax effect for about image
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const aboutImage = document.querySelector('.about-portrait');
    const imageAccent = document.querySelector('.image-accent');
    
    if (aboutImage && scrolled < window.innerHeight * 2) {
        const speed = 0.15;
        aboutImage.style.transform = `translateY(${scrolled * speed}px)`;
        if (imageAccent) {
            imageAccent.style.transform = `translateY(${scrolled * speed * 0.5}px)`;
        }
    }
});

// Add hover effect to behind-the-scenes images
const btsImages = document.querySelectorAll('.bts-image');
btsImages.forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Expertise cards hover effect
const expertiseCards = document.querySelectorAll('.expertise-card');
expertiseCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.expertise-icon');
        if (icon) {
            icon.style.transform = 'scale(1.1) rotateY(180deg)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.expertise-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotateY(0deg)';
        }
    });
});

// Training cards animation on scroll
const trainingCards = document.querySelectorAll('.training-card');
const trainingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 150);
        }
    });
}, { threshold: 0.2 });

trainingCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    trainingObserver.observe(card);
});

// Signature animation
const signature = document.querySelector('.about-signature');
if (signature) {
    const signatureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const line = signature.querySelector('.signature-line');
                const text = signature.querySelector('.signature-text');
                
                if (line && text) {
                    setTimeout(() => {
                        line.style.width = '60px';
                        line.style.transition = 'width 0.8s ease';
                    }, 100);
                    
                    setTimeout(() => {
                        text.style.opacity = '1';
                        text.style.transform = 'translateX(0)';
                    }, 500);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const line = signature.querySelector('.signature-line');
    const text = signature.querySelector('.signature-text');
    
    if (line) {
        line.style.width = '0';
    }
    
    if (text) {
        text.style.opacity = '0';
        text.style.transform = 'translateX(-20px)';
        text.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    }
    
    signatureObserver.observe(signature);
}

// Loading animation for images (when real images are added)
const imageContainers = document.querySelectorAll('.image-placeholder');
imageContainers.forEach(container => {
    container.style.transition = 'opacity 0.5s ease';
});

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    imageContainers.forEach(img => imageObserver.observe(img));
}

// Add subtle parallax to mission image
const missionImage = document.querySelector('.mission-image');
if (missionImage) {
    window.addEventListener('scroll', () => {
        const rect = missionImage.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const placeholder = missionImage.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        }
    });
}

// Console message
console.log('%cAliceta Studios - About', 'font-size: 24px; font-weight: bold; color: #9B7446;');
console.log('%cLearn more about Taiwo O. Oliyide', 'font-size: 14px; color: #6B7280;');

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Fade in page hero
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
        setTimeout(() => {
            pageHero.style.opacity = '1';
        }, 100);
    }
});