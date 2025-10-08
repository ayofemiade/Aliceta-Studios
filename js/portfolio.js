// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
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

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Portfolio Filter System
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');
        
        // Filter portfolio items
        portfolioItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.style.animation = `fadeIn 0.5s ease forwards ${index * 0.05}s`;
                }, 10);
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Lightbox Gallery System
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxCategory = document.getElementById('lightboxCategory');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const viewButtons = document.querySelectorAll('.view-btn');

// Gallery data structure
const galleries = {
    portraits: [
        {
            title: 'Executive Portrait',
            category: 'Portrait Photography',
            caption: 'Professional headshot for corporate client. Studio lighting with seamless background.',
            placeholder: 'Professional Portrait'
        },
        {
            title: 'Family Moment',
            category: 'Portrait Photography',
            caption: 'Capturing the warmth and love of a beautiful family. Natural outdoor setting.',
            placeholder: 'Family Portrait'
        },
        {
            title: 'Creative Expression',
            category: 'Portrait Photography',
            caption: 'Artistic portrait exploring creative lighting and composition techniques.',
            placeholder: 'Creative Portrait'
        }
    ],
    weddings: [
        {
            title: 'The Vows',
            category: 'Wedding Photography',
            caption: 'Intimate moment during the wedding ceremony. Lagos, Nigeria.',
            placeholder: 'Wedding Ceremony'
        },
        {
            title: 'The Celebration',
            category: 'Wedding Photography',
            caption: 'Joy and celebration at the reception. Traditional Nigerian wedding.',
            placeholder: 'Wedding Reception'
        },
        {
            title: 'Bridal Beauty',
            category: 'Wedding Photography',
            caption: 'Stunning bridal portrait showcasing elegance and grace.',
            placeholder: 'Bride Portrait'
        }
    ],
    fashion: [
        {
            title: 'Editorial Shoot',
            category: 'Fashion Photography',
            caption: 'High-fashion editorial for local fashion magazine. Modern minimalist aesthetic.',
            placeholder: 'Fashion Editorial'
        },
        {
            title: 'Lookbook Series',
            category: 'Fashion Photography',
            caption: 'Spring/Summer collection lookbook for emerging designer.',
            placeholder: 'Fashion Lookbook'
        },
        {
            title: 'Style Statement',
            category: 'Fashion Photography',
            caption: 'Bold fashion portrait emphasizing color and composition.',
            placeholder: 'Fashion Portrait'
        }
    ],
    makeup: [
        {
            title: 'Bridal Glam',
            category: 'Makeup Artistry',
            caption: 'Classic bridal makeup with flawless finish. Before and after transformation.',
            placeholder: 'Bridal Makeup'
        },
        {
            title: 'Bold & Beautiful',
            category: 'Makeup Artistry',
            caption: 'Editorial makeup look featuring dramatic eyes and sculpted features.',
            placeholder: 'Editorial Makeup'
        },
        {
            title: 'Natural Beauty',
            category: 'Makeup Artistry',
            caption: 'Soft, natural makeup enhancing the client\'s features.',
            placeholder: 'Natural Makeup'
        }
    ]
};

let currentGallery = [];
let currentIndex = 0;

// Open lightbox
viewButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation();
        const galleryName = button.getAttribute('data-gallery');
        const index = parseInt(button.getAttribute('data-index'));
        
        openLightbox(galleryName, index);
    });
});

function openLightbox(galleryName, index) {
    currentGallery = galleries[galleryName];
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateLightbox() {
    const item = currentGallery[currentIndex];
    
    // Update lightbox content
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightboxCaption.textContent = item.caption;
    
    // Update placeholder image
    const placeholderText = lightboxImage.querySelector('.placeholder-text');
    if (placeholderText) {
        placeholderText.textContent = item.placeholder;
    }
    
    // Update navigation buttons
    lightboxPrev.disabled = currentIndex === 0;
    lightboxNext.disabled = currentIndex === currentGallery.length - 1;
}

function navigateLightbox(direction) {
    if (direction === 'prev' && currentIndex > 0) {
        currentIndex--;
        updateLightbox();
    } else if (direction === 'next' && currentIndex < currentGallery.length - 1) {
        currentIndex++;
        updateLightbox();
    }
}

// Lightbox event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox('prev'));
lightboxNext.addEventListener('click', () => navigateLightbox('next'));

// Close lightbox on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeLightbox();
            break;
        case 'ArrowLeft':
            navigateLightbox('prev');
            break;
        case 'ArrowRight':
            navigateLightbox('next');
            break;
    }
});

// Gallery Login Form
const galleryLoginForm = document.getElementById('galleryLoginForm');

galleryLoginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const inputs = galleryLoginForm.querySelectorAll('input');
    const submitButton = galleryLoginForm.querySelector('button');
    const originalText = submitButton.textContent;
    
    // Simulate authentication
    submitButton.textContent = 'Authenticating...';
    submitButton.disabled = true;
    
    setTimeout(() => {
        // In a real application, this would verify credentials
        // For now, show a demo message
        alert('Gallery access feature coming soon! In production, this would authenticate and redirect to your private gallery.');
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        inputs.forEach(input => input.value = '');
    }, 1500);
});

// Newsletter form submission
const newsletterForm = document.querySelector('.newsletter-form');

newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const submitButton = newsletterForm.querySelector('button');
    
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

// Scroll animations
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

// Observe sections
const sections = document.querySelectorAll('.portfolio-section, .client-galleries, .cta-section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Lazy loading for portfolio items
const itemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            itemObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

portfolioItems.forEach(item => {
    itemObserver.observe(item);
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

// Touch swipe support for lightbox
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    if (e.target.closest('.lightbox-info')) return;
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

lightbox.addEventListener('touchend', (e) => {
    if (e.target.closest('.lightbox-info')) return;
    touchEndX = e.changedTouches[0].screenX;
    handleLightboxSwipe();
}, { passive: true });

function handleLightboxSwipe() {
    const swipeThreshold = 50;
    
    if (touchEndX < touchStartX - swipeThreshold) {
        navigateLightbox('next');
    }
    
    if (touchEndX > touchStartX + swipeThreshold) {
        navigateLightbox('prev');
    }
}


// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const handleScroll = debounce(() => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
}, 10);

window.addEventListener('scroll', handleScroll, { passive: true });

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio page loaded successfully');
    
    // Add initial fade-in animation to portfolio items
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.animation = `fadeIn 0.6s ease forwards`;
        }, index * 50);
    });
});

// Preload lightbox images for better UX
function preloadGalleryImages() {
    // In a production environment, this would preload actual images
    // For now, it's a placeholder for future implementation
    console.log('Gallery images ready');
}

preloadGalleryImages();

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
