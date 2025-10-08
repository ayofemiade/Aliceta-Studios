/**
 * Aliceta Studios - Portfolio Page JavaScript
 * Handles gallery filtering, lightbox, and testimonial slider
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lightGallery
    const galleryElement = document.getElementById('gallery');
    if (galleryElement) {
        lightGallery(galleryElement, {
            selector: '.gallery-item',
            plugins: [lgZoom, lgThumbnail],
            speed: 500,
            download: false,
            counter: false,
            thumbnail: true,
            animateThumb: true,
            zoomFromOrigin: true,
            allowMediaOverlap: true
        });
    }

    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hidden');
                    // Add fade-in animation
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    let currentSlide = 0;
    
    // Show first slide initially
    if (testimonialSlides.length > 0) {
        testimonialSlides[0].classList.add('active');
    }
    
    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        testimonialSlides[index].classList.add('active');
    }
    
    // Next button click handler
    if (nextButton) {
        nextButton.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Previous button click handler
    if (prevButton) {
        prevButton.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = testimonialSlides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(function() {
        if (document.visibilityState === 'visible') {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
    }, 5000);

    // Create placeholder SVG images for portfolio items
    // This is a temporary solution until real images are added
    function createPlaceholderImages() {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const category = Array.from(item.classList)
                .find(cls => ['portrait', 'wedding', 'fashion', 'makeup'].includes(cls));
            
            // If image src is not set or doesn't exist
            if (!img.getAttribute('src') || img.getAttribute('src').includes('portfolio/')) {
                // Create SVG placeholder with category-specific color
                const colors = {
                    'portrait': '#9B7446',
                    'wedding': '#EFD6C7',
                    'fashion': '#031722',
                    'makeup': '#F7F6F4'
                };
                
                const color = colors[category] || '#9B7446';
                const textColor = ['wedding', 'makeup'].includes(category) ? '#031722' : '#F7F6F4';
                
                const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
                    <rect width="800" height="800" fill="${color}" />
                    <text x="400" y="400" font-family="Arial" font-size="32" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
                        ${category.charAt(0).toUpperCase() + category.slice(1)} ${index % 3 + 1}
                    </text>
                    <text x="400" y="450" font-family="Arial" font-size="24" fill="${textColor}" text-anchor="middle" dominant-baseline="middle">
                        Aliceta Studios
                    </text>
                </svg>
                `;
                
                const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});
                const svgUrl = URL.createObjectURL(svgBlob);
                
                // Set the SVG as the image source
                img.src = svgUrl;
                item.setAttribute('data-src', svgUrl);
            }
        });
    }
    
    // Call the function to create placeholder images
    createPlaceholderImages();
    
    // Create placeholder SVG images for partner logos
    function createPartnerLogos() {
        const partnerLogos = document.querySelectorAll('.partner-logo img');
        
        partnerLogos.forEach((img, index) => {
            // If image src is not set or doesn't exist
            if (!img.getAttribute('src') || img.getAttribute('src').includes('partners/')) {
                const partnerNames = ['Daystar Skill Acquisition', 'House of Tara International'];
                const name = partnerNames[index % partnerNames.length];
                
                const svgContent = `
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="150" viewBox="0 0 300 150">
                    <rect width="300" height="150" fill="#F7F6F4" />
                    <text x="150" y="75" font-family="Arial" font-size="16" fill="#031722" text-anchor="middle" dominant-baseline="middle">
                        ${name}
                    </text>
                </svg>
                `;
                
                const svgBlob = new Blob([svgContent], {type: 'image/svg+xml'});
                const svgUrl = URL.createObjectURL(svgBlob);
                
                // Set the SVG as the image source
                img.src = svgUrl;
            }
        });
    }
    
    // Call the function to create partner logos
    createPartnerLogos();
});