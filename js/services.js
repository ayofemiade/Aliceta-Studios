// Services Page JavaScript

// FAQ Accordion Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Keyboard accessibility for FAQ
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Smooth scroll to specific service from URL hash
window.addEventListener('load', () => {
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const targetElement = document.querySelector(`[data-service="${targetId}"]`);
        
        if (targetElement) {
            setTimeout(() => {
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
});

// Intersection Observer for service cards animation
const serviceObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            serviceObserver.unobserve(entry.target);
        }
    });
}, serviceObserverOptions);

// Observe service cards for animation
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.15}s, transform 0.8s ease ${index * 0.15}s`;
    serviceObserver.observe(card);
});

// Observe addon cards for staggered animation
const addonCards = document.querySelectorAll('.addon-card');
const addonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            addonObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

addonCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    addonObserver.observe(card);
});

// Service card hover effect enhancement
serviceCards.forEach(card => {
    const serviceImage = card.querySelector('.service-image');
    
    card.addEventListener('mouseenter', () => {
        if (serviceImage) {
            serviceImage.style.transform = 'scale(1.05)';
            serviceImage.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (serviceImage) {
            serviceImage.style.transform = 'scale(1)';
        }
    });
});

// Track which service button was clicked for analytics
const bookButtons = document.querySelectorAll('a[href*="booking.html"]');
bookButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const serviceCard = button.closest('.service-card');
        if (serviceCard) {
            const serviceName = serviceCard.getAttribute('data-service');
            console.log(`User clicked to book: ${serviceName}`);
            // This is where you would send analytics data
        }
    });
});

// Price animation on scroll
const priceAmounts = document.querySelectorAll('.price-amount');
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'pricePopIn 0.6s ease forwards';
            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

priceAmounts.forEach(price => {
    priceObserver.observe(price);
});

// Add CSS animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pricePopIn {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Handle service badge visibility on mobile
function handleServiceBadges() {
    const badges = document.querySelectorAll('.service-badge');
    
    if (window.innerWidth <= 768) {
        badges.forEach(badge => {
            badge.style.fontSize = '0.75rem';
            badge.style.padding = '0.4rem 1rem';
        });
    } else {
        badges.forEach(badge => {
            badge.style.fontSize = '';
            badge.style.padding = '';
        });
    }
}

// Call on load and resize
handleServiceBadges();
window.addEventListener('resize', handleServiceBadges);

// Create a subtle parallax effect for service images
window.addEventListener('scroll', () => {
         const rect = serviceImage.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            const placeholder = missionImage.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        }
    });







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