/**
 * Aliceta Studios - Main JavaScript
 * Handles navigation, animations, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.main-nav') && navList.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navList.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navList.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset error states
            [name, email, message].forEach(field => {
                field.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                name.classList.add('error');
                valid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) {
                email.classList.add('error');
                valid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                message.classList.add('error');
                valid = false;
            }
            
            if (valid) {
                // In a real application, you would send the form data to a server
                // For now, we'll just show a success message
                const formContainer = contactForm.parentElement;
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<p>Thank you for your message! We will get back to you soon.</p>';
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
            }
        });
    }
    
    // Portfolio items (sample data - would be loaded from a CMS in production)
    const portfolioItems = [
        {
            id: 1,
            title: 'Wedding Photography',
            category: 'wedding',
            image: 'images/portfolio-1.jpg',
            alt: 'Elegant wedding photography by Aliceta Studios'
        },
        {
            id: 2,
            title: 'Portrait Session',
            category: 'portrait',
            image: 'images/portfolio-2.jpg',
            alt: 'Professional portrait photography'
        },
        {
            id: 3,
            title: 'Fashion Editorial',
            category: 'fashion',
            image: 'images/portfolio-3.jpg',
            alt: 'High-end fashion photography'
        }
    ];
    
    // Populate portfolio grid
    const portfolioGrid = document.querySelector('.portfolio-grid');
    if (portfolioGrid) {
        portfolioItems.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = 'portfolio-item';
            portfolioItem.setAttribute('data-category', item.category);
            
            portfolioItem.innerHTML = `
                <a href="portfolio.html#${item.id}">
                    <div class="portfolio-image">
                        <img src="${item.image}" alt="${item.alt}">
                    </div>
                    <div class="portfolio-info">
                        <h3>${item.title}</h3>
                        <p>${item.category}</p>
                    </div>
                </a>
            `;
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Scroll animations
    const animateElements = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});