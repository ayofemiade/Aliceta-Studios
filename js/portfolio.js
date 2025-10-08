/**
 * Portfolio Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all portfolio functionality
    initGalleryFilter();
    initPortfolioModal();
    initTestimonialSlider();
    initAnimations();
});

// Gallery filtering functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            const filterValue = this.getAttribute('data-filter');
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('visible'), 100);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('visible');
                }
            });
        });
    });
}

// Portfolio modal functionality
function initPortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    const viewButtons = document.querySelectorAll('.btn-view');
    const closeButton = document.querySelector('.modal-close');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    
    // Sample portfolio data
    const portfolioItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Open modal
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            currentIndex = index;
            updateModalContent(currentIndex);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close modal
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Close when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) closeModal();
    });
    
    // Navigation
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + portfolioItems.length) % portfolioItems.length;
            updateModalContent(currentIndex);
        });
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % portfolioItems.length;
            updateModalContent(currentIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display !== 'block') return;
        
        if (event.key === 'Escape') closeModal();
        else if (event.key === 'ArrowLeft') prevButton.click();
        else if (event.key === 'ArrowRight') nextButton.click();
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    
    function updateModalContent(index) {
        const item = portfolioItems[index];
        if (!item) return;
        
        const img = item.querySelector('img');
        const title = item.getAttribute('data-title') || 'Portfolio Item';
        const category = item.getAttribute('data-category') || '';
        const description = item.getAttribute('data-description') || '';
        
        modal.querySelector('.modal-image img').src = img.src;
        modal.querySelector('.modal-title').textContent = title;
        modal.querySelector('.modal-category').textContent = category;
        modal.querySelector('.modal-description').textContent = description;
    }
}

// Testimonial slider
function initTestimonialSlider() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    const dots = document.querySelector('.testimonial-dots');
    
    if (!slides.length) return;
    
    let currentSlide = 0;
    
    // Create dots
    if (dots) {
        slides.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dots.appendChild(dot);
        });
    }
    
    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
        
        document.querySelectorAll('.dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentSlide = index;
    }
    
    // Initialize
    goToSlide(0);
    
    // Navigation
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide((currentSlide - 1 + slides.length) % slides.length);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide((currentSlide + 1) % slides.length);
        });
    }
    
    // Auto-advance
    setInterval(() => {
        goToSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

// Animations
function initAnimations() {
    const elements = document.querySelectorAll('.fade-in, .gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
}