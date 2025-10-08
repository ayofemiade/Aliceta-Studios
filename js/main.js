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

// Portfolio Carousel
const carousel = document.getElementById('portfolioCarousel');
const track = carousel.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = carousel.querySelector('.carousel-next');
const prevButton = carousel.querySelector('.carousel-prev');
const dotsContainer = document.getElementById('carouselDots');

let currentIndex = 0;

// Create dots
slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

const dots = Array.from(dotsContainer.children);

function updateCarousel() {
    const slideWidth = slides[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
    
    // Update button states
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === slides.length - 1;
    
    prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
    nextButton.style.opacity = currentIndex === slides.length - 1 ? '0.5' : '1';
}

function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
}

function nextSlide() {
    if (currentIndex < slides.length - 1) {
        currentIndex++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Auto-play carousel
let autoplayInterval = setInterval(nextSlide, 5000);

// Pause autoplay on hover
carousel.addEventListener('mouseenter', () => {
    clearInterval(autoplayInterval);
});

carousel.addEventListener('mouseleave', () => {
    autoplayInterval = setInterval(nextSlide, 5000);
});

// Reset to first slide when reaching the end
track.addEventListener('transitionend', () => {
    if (currentIndex === slides.length - 1) {
        setTimeout(() => {
            currentIndex = 0;
            updateCarousel();
        }, 3000);
    }
});

// Handle window resize for carousel
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateCarousel();
    }, 250);
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
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('.highlights, .portfolio-preview, .testimonials, .partners, .cta-section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Observe individual cards for staggered animation
const cards = document.querySelectorAll('.highlight-item, .testimonial-card');
cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Mobile sticky CTA visibility
const mobileCta = document.getElementById('mobileCta');
const heroSection = document.querySelector('.hero');

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
ctaObserver.observe(heroSection);

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

// Keyboard navigation for carousel
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Loading animation for images (when real images are added)
const imageContainers = document.querySelectorAll('.image-placeholder');
imageContainers.forEach(container => {
    container.style.transition = 'opacity 0.5s ease';
});

// Add touch swipe support for carousel on mobile
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        nextSlide();
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        prevSlide();
    }
}

// Performance optimization: Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // When real images are added, replace placeholder with actual image
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    imageContainers.forEach(img => imageObserver.observe(img));
}

// Console message
console.log('%cAliceta Studios', 'font-size: 24px; font-weight: bold; color: #9B7446;');
console.log('%cWebsite by Professional Web Development', 'font-size: 14px; color: #6B7280;');

// Initialize carousel on page load
updateCarousel();