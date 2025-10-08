/**
 * Aliceta Studios - Performance Optimizations
 * This file contains JavaScript functions to improve website performance
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance optimizations
    initPerformanceOptimizations();
});

/**
 * Initialize all performance optimizations
 */
function initPerformanceOptimizations() {
    lazyLoadImages();
    deferNonCriticalCSS();
    optimizeEventListeners();
    prefetchCriticalPages();
}

/**
 * Lazy load images to improve initial page load
 */
function lazyLoadImages() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    
                    observer.unobserve(img);
                }
            });
        });
        
        // Target all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Convert regular images to lazy-loaded format
 * This function can be called to retroactively apply lazy loading
 */
function convertToLazyImages() {
    document.querySelectorAll('img:not([data-src])').forEach(img => {
        // Skip images that are already lazy or don't have a src
        if (!img.src || img.hasAttribute('data-src') || img.hasAttribute('loading')) {
            return;
        }
        
        // Skip small images that are likely icons or logos
        if (img.width < 50 || img.height < 50) {
            return;
        }
        
        const src = img.src;
        img.setAttribute('data-src', src);
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        img.classList.add('lazy');
    });
    
    // Initialize lazy loading for the newly converted images
    lazyLoadImages();
}

/**
 * Defer loading of non-critical CSS
 */
function deferNonCriticalCSS() {
    const nonCriticalCSS = document.querySelectorAll('link[rel="stylesheet"][data-defer="true"]');
    
    nonCriticalCSS.forEach(link => {
        link.setAttribute('media', 'print');
        link.setAttribute('onload', "this.media='all'");
    });
}

/**
 * Optimize event listeners to reduce performance impact
 */
function optimizeEventListeners() {
    // Debounce function to limit how often a function is called
    function debounce(func, wait) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }
    
    // Throttle function to limit how often a function is called
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const context = this;
            const args = arguments;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Apply throttling to scroll events
    const scrollHandlers = document.querySelectorAll('[data-scroll-handler]');
    scrollHandlers.forEach(element => {
        const handlerName = element.getAttribute('data-scroll-handler');
        if (window[handlerName] && typeof window[handlerName] === 'function') {
            window.addEventListener('scroll', throttle(window[handlerName], 100));
        }
    });
    
    // Apply debouncing to resize events
    const resizeHandlers = document.querySelectorAll('[data-resize-handler]');
    resizeHandlers.forEach(element => {
        const handlerName = element.getAttribute('data-resize-handler');
        if (window[handlerName] && typeof window[handlerName] === 'function') {
            window.addEventListener('resize', debounce(window[handlerName], 250));
        }
    });
}

/**
 * Prefetch critical pages for faster navigation
 */
function prefetchCriticalPages() {
    const pagesToPrefetch = [
        'booking.html',
        'portfolio.html'
    ];
    
    // Only prefetch if the user has a fast connection
    if (navigator.connection && (navigator.connection.saveData || 
        (navigator.connection.effectiveType && navigator.connection.effectiveType.includes('2g')))) {
        return;
    }
    
    // Add prefetch links
    const head = document.head;
    pagesToPrefetch.forEach(page => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = page;
        head.appendChild(link);
    });
}

/**
 * Optimize images on the page by converting them to WebP format
 * This is a placeholder function - actual implementation would require server-side processing
 */
function optimizeImages() {
    // Check if browser supports WebP
    const supportsWebP = localStorage.getItem('supportsWebP');
    
    if (supportsWebP === null) {
        const testWebP = new Image();
        testWebP.onload = function() {
            localStorage.setItem('supportsWebP', testWebP.width === 1);
        };
        testWebP.onerror = function() {
            localStorage.setItem('supportsWebP', false);
        };
        testWebP.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
    }
    
    // If WebP is supported, we could replace image sources with WebP versions
    // This would typically be handled server-side or during build
}

/**
 * Minify inline CSS and JavaScript
 * This is a development helper function and should be used during build process
 */
function minifyInline() {
    // This is a placeholder - actual minification should be done during build
    console.log('Minification should be performed during build process');
}

// Export functions for potential reuse
window.performanceHelpers = {
    lazyLoadImages,
    convertToLazyImages,
    deferNonCriticalCSS,
    prefetchCriticalPages
};