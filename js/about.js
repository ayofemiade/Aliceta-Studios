/**
 * About Page JavaScript
 * Enhances the About page with interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    initAboutPage();
});

/**
 * Initialize About page functionality
 */
function initAboutPage() {
    initTeamMemberInteractions();
    initStudioGallery();
    animateOnScroll();
}

/**
 * Add interactive features to team member cards
 */
function initTeamMemberInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

/**
 * Initialize studio gallery interactions
 */
function initStudioGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            // In a real implementation, this could open a lightbox
            // or a modal with more details about the studio area
            console.log('Gallery item clicked:', this.querySelector('.gallery-caption').textContent);
        });
    });
}

/**
 * Add scroll-based animations to page elements
 */
function animateOnScroll() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        section.style.transform = 'translateY(20px)';
        sectionObserver.observe(section);
    });
}

// Add a CSS class for the fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .fade-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
});