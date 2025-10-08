/**
 * Aliceta Studios - Booking Page JavaScript
 * Handles booking form steps, validation, and submission
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize date picker
    flatpickr("#booking-date", {
        minDate: "today",
        dateFormat: "Y-m-d",
        disable: [
            function(date) {
                // Disable Sundays
                return date.getDay() === 0;
            }
        ]
    });

    // Service prices for calculation
    const servicePrices = {
        'portrait': 250,
        'wedding': 1500,
        'fashion': 500,
        'makeup': 150,
        'training': 300
    };

    // Addon prices for calculation
    const addonPrices = {
        'hair': 75,
        'extra-looks': 50,
        'prints': 100
    };

    // Form steps navigation
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.progress-step');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');
    
    // Next button click handler
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNum = parseInt(currentStep.dataset.step);
            
            if (validateStep(currentStepNum)) {
                // Update progress indicator
                progressSteps.forEach(step => {
                    const stepNum = parseInt(step.dataset.step);
                    if (stepNum === currentStepNum) {
                        step.classList.add('completed');
                    } else if (stepNum === currentStepNum + 1) {
                        step.classList.add('active');
                    }
                });
                
                // Hide current step
                currentStep.classList.remove('active');
                
                // Show next step
                const nextStep = document.querySelector(`.form-step[data-step="${currentStepNum + 1}"]`);
                nextStep.classList.add('active');
                
                // If moving to confirmation step, populate summary
                if (currentStepNum + 1 === 4) {
                    populateSummary();
                }
                
                // Scroll to top of form
                document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Previous button click handler
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentStep = this.closest('.form-step');
            const currentStepNum = parseInt(currentStep.dataset.step);
            
            // Update progress indicator
            progressSteps.forEach(step => {
                const stepNum = parseInt(step.dataset.step);
                if (stepNum === currentStepNum) {
                    step.classList.remove('active');
                } else if (stepNum === currentStepNum - 1) {
                    step.classList.remove('completed');
                    step.classList.add('active');
                }
            });
            
            // Hide current step
            currentStep.classList.remove('active');
            
            // Show previous step
            const prevStep = document.querySelector(`.form-step[data-step="${currentStepNum - 1}"]`);
            prevStep.classList.add('active');
            
            // Scroll to top of form
            document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Location change handler
    const locationSelect = document.getElementById('location');
    const locationDetails = document.querySelector('.location-details');
    
    if (locationSelect && locationDetails) {
        locationSelect.addEventListener('change', function() {
            if (this.value === 'onsite') {
                locationDetails.style.display = 'block';
                document.getElementById('address').setAttribute('required', true);
            } else {
                locationDetails.style.display = 'none';
                document.getElementById('address').removeAttribute('required');
            }
        });
    }
    
    // Form submission handler
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, you would send the form data to a server
            // For now, we'll just show the success message
            
            // Hide confirmation step
            document.querySelector('.form-step[data-step="4"]').classList.remove('active');
            
            // Show success message
            document.querySelector('.success-step').classList.add('active');
            
            // Generate calendar links
            generateCalendarLinks();
            
            // Scroll to top of form
            document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Validate each step
    function validateStep(stepNumber) {
        let isValid = true;
        
        switch(stepNumber) {
            case 1:
                // Validate service selection
                const serviceSelected = document.querySelector('input[name="service"]:checked');
                if (!serviceSelected) {
                    alert('Please select a service to continue.');
                    isValid = false;
                }
                break;
                
            case 2:
                // Validate date and time
                const date = document.getElementById('booking-date').value;
                const time = document.getElementById('booking-time').value;
                
                if (!date) {
                    alert('Please select a date to continue.');
                    isValid = false;
                } else if (!time) {
                    alert('Please select a time to continue.');
                    isValid = false;
                }
                break;
                
            case 3:
                // Validate client details
                const requiredFields = ['name', 'email', 'phone', 'location', 'people'];
                
                for (const field of requiredFields) {
                    const input = document.getElementById(field);
                    if (!input.value.trim()) {
                        alert(`Please fill in the ${field.replace('-', ' ')} field to continue.`);
                        input.focus();
                        isValid = false;
                        break;
                    }
                }
                
                // Validate email format
                const email = document.getElementById('email').value;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (email && !emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    document.getElementById('email').focus();
                    isValid = false;
                }
                
                // Validate terms checkbox
                const termsChecked = document.getElementById('terms').checked;
                if (!termsChecked) {
                    alert('Please agree to the terms and conditions to continue.');
                    isValid = false;
                }
                
                // Validate address if on-site location is selected
                if (document.getElementById('location').value === 'onsite') {
                    const address = document.getElementById('address').value;
                    if (!address.trim()) {
                        alert('Please provide the address for on-site service.');
                        document.getElementById('address').focus();
                        isValid = false;
                    }
                }
                break;
        }
        
        return isValid;
    }
    
    // Populate booking summary
    function populateSummary() {
        // Get selected service
        const serviceElement = document.querySelector('input[name="service"]:checked');
        if (!serviceElement) return;
        
        const serviceValue = serviceElement.value;
        const serviceLabel = serviceElement.nextElementSibling.querySelector('h3').textContent;
        
        // Get date and time
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        const formattedDate = new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get client details
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const locationValue = document.getElementById('location').value;
        const locationLabel = locationValue === 'studio' ? 'Studio Session' : 'On-site (Client Location)';
        const people = document.getElementById('people').value;
        const notes = document.getElementById('notes').value;
        
        // Get selected addons
        const selectedAddons = [];
        document.querySelectorAll('input[name="addons[]"]:checked').forEach(addon => {
            selectedAddons.push(addon.nextElementSibling.textContent);
        });
        
        // Populate summary fields
        document.getElementById('summary-service').textContent = serviceLabel;
        document.getElementById('summary-datetime').textContent = `${formattedDate} at ${formatTime(time)}`;
        document.getElementById('summary-name').textContent = name;
        document.getElementById('summary-email').textContent = email;
        document.getElementById('summary-phone').textContent = phone;
        document.getElementById('summary-location').textContent = locationLabel;
        document.getElementById('summary-people').textContent = people;
        
        if (selectedAddons.length > 0) {
            document.getElementById('summary-addons').textContent = selectedAddons.join(', ');
            document.getElementById('summary-addons-container').style.display = 'flex';
        } else {
            document.getElementById('summary-addons-container').style.display = 'none';
        }
        
        if (notes.trim()) {
            document.getElementById('summary-notes').textContent = notes;
        } else {
            document.getElementById('summary-notes').textContent = 'None';
        }
        
        // Calculate prices
        calculatePrices(serviceValue, selectedAddons);
    }
    
    // Calculate prices
    function calculatePrices(service, addons) {
        // Base price from selected service
        const basePrice = servicePrices[service] || 0;
        document.getElementById('base-price').textContent = `$${basePrice}`;
        
        // Addons price
        let addonsTotal = 0;
        if (addons.length > 0) {
            addons.forEach(addon => {
                const addonId = addon.id;
                if (addonPrices[addonId]) {
                    addonsTotal += addonPrices[addonId];
                }
            });
            document.getElementById('addons-price').textContent = `$${addonsTotal}`;
            document.getElementById('addons-price-container').style.display = 'flex';
        } else {
            document.getElementById('addons-price-container').style.display = 'none';
        }
        
        // Total price
        const totalPrice = basePrice + addonsTotal;
        document.getElementById('total-price').textContent = `$${totalPrice}`;
        
        // Deposit price (50% of total)
        const depositPrice = Math.round(totalPrice * 0.5);
        document.getElementById('deposit-price').textContent = `$${depositPrice}`;
    }
    
    // Format time from 24h to 12h format
    function formatTime(time24) {
        const [hours, minutes] = time24.split(':');
        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12 || 12;
        return `${hours12}:${minutes} ${period}`;
    }
    
    // Generate calendar links
    function generateCalendarLinks() {
        const service = document.querySelector('input[name="service"]:checked').nextElementSibling.querySelector('h3').textContent;
        const date = document.getElementById('booking-date').value;
        const time = document.getElementById('booking-time').value;
        
        // Format date and time for calendar links
        const startDate = new Date(`${date}T${time}`);
        const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // Add 2 hours
        
        const startFormatted = startDate.toISOString().replace(/-|:|\.\d+/g, '');
        const endFormatted = endDate.toISOString().replace(/-|:|\.\d+/g, '');
        
        const eventTitle = encodeURIComponent(`Aliceta Studios - ${service}`);
        const eventLocation = encodeURIComponent('Aliceta Studios');
        const eventDetails = encodeURIComponent('Your photography session with Aliceta Studios. Please arrive 15 minutes early.');
        
        // Google Calendar link
        const googleCalLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startFormatted}/${endFormatted}&details=${eventDetails}&location=${eventLocation}`;
        document.getElementById('add-to-google').href = googleCalLink;
        
        // Apple Calendar link (iCal)
        const icalLink = `data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ADTSTART:${startFormatted}%0ADTEND:${endFormatted}%0ASUMMARY:${eventTitle}%0ADESCRIPTION:${eventDetails}%0ALOCATION:${eventLocation}%0AEND:VEVENT%0AEND:VCALENDAR`;
        document.getElementById('add-to-ical').href = icalLink;
    }
});