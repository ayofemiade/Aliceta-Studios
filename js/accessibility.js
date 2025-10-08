/**
 * Aliceta Studios - Accessibility Enhancements
 * This file contains JavaScript functions to improve website accessibility
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all accessibility features
    initAccessibilityFeatures();
});

/**
 * Initialize all accessibility features
 */
function initAccessibilityFeatures() {
    setupSkipLink();
    enhanceKeyboardNavigation();
    improveFormAccessibility();
    setupARIAUpdates();
    addImageDescriptions();
}

/**
 * Setup skip link functionality
 */
function setupSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.setAttribute('tabindex', '-1');
                targetElement.focus();
                
                // Remove tabindex after focus to avoid interfering with normal tab order
                setTimeout(() => {
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        });
    }
}

/**
 * Enhance keyboard navigation
 */
function enhanceKeyboardNavigation() {
    // Add focus indicator for keyboard users
    document.body.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-user');
        }
    });
    
    document.body.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-user');
    });
    
    // Make dropdown menus accessible via keyboard
    const navItems = document.querySelectorAll('.nav-menu > li');
    
    navItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.dropdown');
        
        if (link && dropdown) {
            link.setAttribute('aria-expanded', 'false');
            link.setAttribute('aria-haspopup', 'true');
            
            link.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const expanded = this.getAttribute('aria-expanded') === 'true';
                    this.setAttribute('aria-expanded', !expanded);
                    dropdown.classList.toggle('show');
                }
            });
        }
    });
}

/**
 * Improve form accessibility
 */
function improveFormAccessibility() {
    // Add required field notifications
    const requiredFields = document.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        const label = document.querySelector(`label[for="${field.id}"]`);
        
        if (label) {
            if (!label.querySelector('.required-indicator')) {
                const requiredSpan = document.createElement('span');
                requiredSpan.className = 'required-indicator';
                requiredSpan.setAttribute('aria-hidden', 'true');
                requiredSpan.textContent = ' *';
                
                const srText = document.createElement('span');
                srText.className = 'sr-only';
                srText.textContent = ' (required)';
                
                label.appendChild(requiredSpan);
                label.appendChild(srText);
            }
        }
    });
    
    // Add error message handling for forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const invalidFields = form.querySelectorAll(':invalid');
            
            if (invalidFields.length > 0) {
                e.preventDefault();
                
                // Remove existing error messages
                const existingErrors = form.querySelectorAll('.error-message');
                existingErrors.forEach(error => error.remove());
                
                // Add new error messages
                invalidFields.forEach(field => {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.id = `${field.id}-error`;
                    errorMessage.textContent = field.validationMessage || 'This field is invalid';
                    
                    field.setAttribute('aria-invalid', 'true');
                    field.setAttribute('aria-describedby', errorMessage.id);
                    
                    field.parentNode.insertBefore(errorMessage, field.nextSibling);
                });
                
                // Focus the first invalid field
                invalidFields[0].focus();
                
                // Announce error count to screen readers
                const errorCount = invalidFields.length;
                const errorAnnouncement = document.createElement('div');
                errorAnnouncement.className = 'sr-only';
                errorAnnouncement.setAttribute('aria-live', 'assertive');
                errorAnnouncement.textContent = `${errorCount} form ${errorCount === 1 ? 'error' : 'errors'} found. Please correct and resubmit.`;
                
                form.appendChild(errorAnnouncement);
                
                // Remove the announcement after it's been read
                setTimeout(() => {
                    errorAnnouncement.remove();
                }, 3000);
            }
        });
    });
}

/**
 * Setup ARIA live regions and dynamic content updates
 */
function setupARIAUpdates() {
    // Create a global announcement area for screen readers
    const announcer = document.createElement('div');
    announcer.className = 'sr-only';
    announcer.id = 'aria-announcer';
    announcer.setAttribute('aria-live', 'polite');
    document.body.appendChild(announcer);
    
    // Update ARIA attributes for mobile menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu, .nav-list');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            
            if (!expanded) {
                announcer.textContent = 'Main menu opened';
            } else {
                announcer.textContent = 'Main menu closed';
            }
        });
    }
    
    // Handle tab panels in booking form if they exist
    const tabButtons = document.querySelectorAll('[role="tab"]');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const controls = this.getAttribute('aria-controls');
            const panel = document.getElementById(controls);
            
            if (panel) {
                // Update ARIA states
                document.querySelectorAll('[role="tab"]').forEach(tab => {
                    tab.setAttribute('aria-selected', 'false');
                    tab.tabIndex = -1;
                });
                
                document.querySelectorAll('[role="tabpanel"]').forEach(tabPanel => {
                    tabPanel.setAttribute('aria-hidden', 'true');
                });
                
                this.setAttribute('aria-selected', 'true');
                this.tabIndex = 0;
                panel.setAttribute('aria-hidden', 'false');
                
                // Announce tab change
                announcer.textContent = `${this.textContent} tab selected`;
            }
        });
        
        button.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                
                const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
                const currentIndex = tabs.indexOf(this);
                let newIndex;
                
                if (e.key === 'ArrowRight') {
                    newIndex = (currentIndex + 1) % tabs.length;
                } else {
                    newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                }
                
                tabs[newIndex].click();
                tabs[newIndex].focus();
            }
        });
    });
}

/**
 * Add descriptions to images that are missing alt text
 */
function addImageDescriptions() {
    const images = document.querySelectorAll('img:not([alt])');
    
    images.forEach(img => {
        // Set empty alt for decorative images
        if (img.classList.contains('decorative')) {
            img.alt = '';
        } else {
            // Try to generate alt text from context
            let altText = '';
            
            // Check if image is in a figure with figcaption
            const figure = img.closest('figure');
            if (figure) {
                const figcaption = figure.querySelector('figcaption');
                if (figcaption) {
                    altText = figcaption.textContent.trim();
                }
            }
            
            // If no figcaption, try to use nearby headings or text
            if (!altText) {
                const parent = img.parentElement;
                const heading = parent.querySelector('h1, h2, h3, h4, h5, h6');
                
                if (heading) {
                    altText = heading.textContent.trim();
                } else if (parent.textContent.trim()) {
                    // Use first 50 characters of parent text if available
                    altText = parent.textContent.trim().substring(0, 50);
                    if (parent.textContent.length > 50) {
                        altText += '...';
                    }
                }
            }
            
            // If still no alt text, use filename as last resort
            if (!altText) {
                const src = img.getAttribute('src');
                if (src) {
                    const filename = src.split('/').pop().split('?')[0];
                    altText = `Image: ${filename}`;
                } else {
                    altText = 'Image without description';
                }
            }
            
            img.alt = altText;
        }
    });
}

// Export functions for potential reuse
window.accessibilityHelpers = {
    announceToScreenReader: function(message, priority = 'polite') {
        const announcer = document.getElementById('aria-announcer');
        if (announcer) {
            announcer.setAttribute('aria-live', priority);
            announcer.textContent = message;
        }
    }
};