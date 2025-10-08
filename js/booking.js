// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
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
}

// Booking Form State
const bookingState = {
    currentStep: 1,
    service: null,
    date: null,
    time: null,
    location: null,
    addons: [],
    promoCode: null,
    discount: 0
};

// Service Pricing
const servicePrices = {
    portrait: 50000,
    wedding: 250000,
    fashion: 80000,
    makeup: 25000,
    training: 150000,
    custom: 0
};

const serviceNames = {
    portrait: 'Portrait Photography',
    wedding: 'Wedding Photography',
    fashion: 'Fashion Photography',
    makeup: 'Makeup Services',
    training: 'Makeup Training',
    custom: 'Custom Package'
};

const addonPrices = {
    hair: 15000,
    'extra-looks': 10000,
    prints: 25000,
    album: 50000,
    rush: 20000
};

const addonNames = {
    hair: 'Professional Hair Styling',
    'extra-looks': 'Extra Outfit/Look Changes',
    prints: 'Printed Photo Package',
    album: 'Premium Photo Album',
    rush: 'Rush Delivery (48 hours)'
};

// Valid promo codes
const promoCodes = {
    'FIRST10': 10,
    'SUMMER15': 15,
    'WEDDING20': 20
};

// Step Navigation
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');

function goToStep(stepNumber) {
    formSteps.forEach(step => step.classList.remove('active'));
    progressSteps.forEach(step => {
        step.classList.remove('active');
        const stepNum = parseInt(step.dataset.step);
        if (stepNum < stepNumber) {
            step.classList.add('completed');
        } else {
            step.classList.remove('completed');
        }
    });
    
    const targetStep = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    const targetProgress = document.querySelector(`.progress-step[data-step="${stepNumber}"]`);
    
    if (targetStep) targetStep.classList.add('active');
    if (targetProgress) targetProgress.classList.add('active');
    
    bookingState.currentStep = stepNumber;
    
    // Scroll to the progress bar section to keep form in view
    setTimeout(() => {
        const progressSection = document.querySelector('.booking-progress-section');
        if (progressSection) {
            const navbar = document.getElementById('navbar');
            const navHeight = navbar ? navbar.offsetHeight : 70;
            const targetPosition = progressSection.offsetTop - navHeight;
            
            window.scrollTo({ 
                top: targetPosition, 
                behavior: 'smooth' 
            });
        }
    }, 50); // Small delay to ensure DOM is updated
}

nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (validateStep(bookingState.currentStep)) {
            goToStep(bookingState.currentStep + 1);
        }
    });
});

prevButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        goToStep(bookingState.currentStep - 1);
    });
});

function validateStep(step) {
    switch(step) {
        case 1:
            const selectedService = document.querySelector('input[name="service"]:checked');
            if (!selectedService) {
                alert('Please select a service');
                return false;
            }
            bookingState.service = selectedService.value;
            return true;
            
        case 2:
            if (!bookingState.date) {
                alert('Please select a date');
                return false;
            }
            if (!bookingState.time) {
                alert('Please select a time');
                return false;
            }
            const selectedLocation = document.querySelector('input[name="location"]:checked');
            if (!selectedLocation) {
                alert('Please select a location');
                return false;
            }
            bookingState.location = selectedLocation.value;
            return true;
            
        case 3:
            const requiredFields = ['fullName', 'email', 'phone'];
            for (let field of requiredFields) {
                const input = document.getElementById(field);
                if (!input.value.trim()) {
                    alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                    input.focus();
                    return false;
                }
            }
            
            // Collect add-ons
            const selectedAddons = document.querySelectorAll('input[name="addons"]:checked');
            bookingState.addons = Array.from(selectedAddons).map(addon => addon.value);
            
            // Update summary
            updateBookingSummary();
            return true;
            
        default:
            return true;
    }
}

// Service Selection
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
        bookingState.service = radio.value;
    });
});

// Calendar Functionality
let currentDate = new Date();
let selectedDateElement = null;

function generateCalendar(year, month) {
    const calendarBody = document.getElementById('calendarBody');
    const calendarTitle = document.getElementById('calendarTitle');
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayIndex = firstDay.getDay();
    const lastDateOfMonth = lastDay.getDate();
    const prevLastDate = prevLastDay.getDate();
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    
    calendarTitle.textContent = `${months[month]} ${year}`;
    
    let calendarHTML = '';
    
    // Day headers
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayNames.forEach(day => {
        calendarHTML += `<div class="calendar-day-header">${day}</div>`;
    });
    
    // Previous month days
    for (let i = firstDayIndex; i > 0; i--) {
        calendarHTML += `<div class="calendar-day other-month disabled">${prevLastDate - i + 1}</div>`;
    }
    
    // Current month days
    const today = new Date();
    for (let i = 1; i <= lastDateOfMonth; i++) {
        const dayDate = new Date(year, month, i);
        const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const isToday = dayDate.toDateString() === today.toDateString();
        
        let classes = 'calendar-day';
        if (isPast) classes += ' disabled';
        if (isToday) classes += ' today';
        
        calendarHTML += `<div class="${classes}" data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}">${i}</div>`;
    }
    
    // Next month days
    const remainingDays = 42 - (firstDayIndex + lastDateOfMonth);
    for (let i = 1; i <= remainingDays; i++) {
        calendarHTML += `<div class="calendar-day other-month disabled">${i}</div>`;
    }
    
    calendarBody.innerHTML = calendarHTML;
    
    // Add click events to calendar days
    const days = calendarBody.querySelectorAll('.calendar-day:not(.disabled):not(.other-month)');
    days.forEach(day => {
        day.addEventListener('click', () => {
            if (selectedDateElement) {
                selectedDateElement.classList.remove('selected');
            }
            day.classList.add('selected');
            selectedDateElement = day;
            
            const dateStr = day.dataset.date;
            bookingState.date = dateStr;
            document.getElementById('selectedDate').value = dateStr;
            
            // Update display
            const dateObj = new Date(dateStr);
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            document.getElementById('selectedDateDisplay').textContent = 
                dateObj.toLocaleDateString('en-US', options);
            
            // Generate time slots
            generateTimeSlots(dateStr);
        });
    });
}

function generateTimeSlots(date) {
    const timeSlotsContainer = document.getElementById('timeSlots');
    const timeSlots = [
        '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
        '05:00 PM', '06:00 PM'
    ];
    
    // Randomly disable some slots for demo
    const bookedSlots = ['11:00 AM', '02:00 PM', '05:00 PM'];
    
    let slotsHTML = '';
    timeSlots.forEach(slot => {
        const isBooked = bookedSlots.includes(slot);
        const classes = isBooked ? 'time-slot disabled' : 'time-slot';
        slotsHTML += `<div class="${classes}" data-time="${slot}">${slot}</div>`;
    });
    
    timeSlotsContainer.innerHTML = slotsHTML;
    
    // Add click events
    const slots = timeSlotsContainer.querySelectorAll('.time-slot:not(.disabled)');
    slots.forEach(slot => {
        slot.addEventListener('click', () => {
            // Remove previous selection
            timeSlotsContainer.querySelectorAll('.time-slot').forEach(s => {
                s.classList.remove('selected');
            });
            
            slot.classList.add('selected');
            bookingState.time = slot.dataset.time;
            document.getElementById('selectedTime').value = slot.dataset.time;
        });
    });
}

// Calendar navigation
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate.getFullYear(), currentDate.getMonth());
});

// Initialize calendar
generateCalendar(currentDate.getFullYear(), currentDate.getMonth());

// Location Selection
const locationCards = document.querySelectorAll('.location-card');
locationCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

// Promo Code
document.getElementById('applyPromo').addEventListener('click', () => {
    const promoInput = document.getElementById('promoCode');
    const promoMessage = document.getElementById('promoMessage');
    const code = promoInput.value.trim().toUpperCase();
    
    if (promoCodes[code]) {
        bookingState.promoCode = code;
        bookingState.discount = promoCodes[code];
        promoMessage.textContent = `✓ ${promoCodes[code]}% discount applied!`;
        promoMessage.className = 'promo-message success';
    } else if (code === '') {
        promoMessage.textContent = 'Please enter a promo code';
        promoMessage.className = 'promo-message error';
    } else {
        promoMessage.textContent = '✗ Invalid promo code';
        promoMessage.className = 'promo-message error';
        bookingState.promoCode = null;
        bookingState.discount = 0;
    }
});

// Update Booking Summary
function updateBookingSummary() {
    // Service
    document.getElementById('summaryService').textContent = 
        serviceNames[bookingState.service] || '-';
    
    // Date & Time
    if (bookingState.date && bookingState.time) {
        const dateObj = new Date(bookingState.date);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('en-US', options);
        document.getElementById('summaryDateTime').textContent = 
            `${formattedDate} at ${bookingState.time}`;
    } else {
        document.getElementById('summaryDateTime').textContent = '-';
    }
    
    // Location
    const locationMap = {
        studio: 'Studio Session',
        outdoor: 'Outdoor Location',
        client: 'Your Location'
    };
    document.getElementById('summaryLocation').textContent = 
        locationMap[bookingState.location] || '-';
    
    // Contact
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    if (fullName && email && phone) {
        document.getElementById('summaryContact').textContent = 
            `${fullName}\n${email}\n${phone}`;
    } else {
        document.getElementById('summaryContact').textContent = '-';
    }
    
    // Add-ons
    const addonsSection = document.getElementById('addonsSection');
    const addonsListEl = document.getElementById('summaryAddons');
    
    if (bookingState.addons.length > 0) {
        addonsSection.style.display = 'block';
        addonsListEl.innerHTML = '';
        bookingState.addons.forEach(addon => {
            const li = document.createElement('li');
            li.textContent = `${addonNames[addon]} (+₦${addonPrices[addon].toLocaleString()})`;
            addonsListEl.appendChild(li);
        });
    } else {
        addonsSection.style.display = 'none';
    }
    
    // Calculate pricing
    calculatePricing();
}

function calculatePricing() {
    const basePrice = servicePrices[bookingState.service] || 0;
    
    let addonsTotal = 0;
    bookingState.addons.forEach(addon => {
        addonsTotal += addonPrices[addon] || 0;
    });
    
    const subtotal = basePrice + addonsTotal;
    const discountAmount = Math.round(subtotal * (bookingState.discount / 100));
    const total = subtotal - discountAmount;
    
    // Update display
    document.getElementById('basePrice').textContent = `₦${basePrice.toLocaleString()}`;
    
    const addonsPriceRow = document.getElementById('addonsPrice');
    if (addonsTotal > 0) {
        addonsPriceRow.style.display = 'flex';
        document.getElementById('addonsPriceValue').textContent = `₦${addonsTotal.toLocaleString()}`;
    } else {
        addonsPriceRow.style.display = 'none';
    }
    
    const discountRow = document.getElementById('discountRow');
    if (discountAmount > 0) {
        discountRow.style.display = 'flex';
        document.getElementById('discountValue').textContent = `-₦${discountAmount.toLocaleString()}`;
    } else {
        discountRow.style.display = 'none';
    }
    
    document.getElementById('totalPrice').textContent = `₦${total.toLocaleString()}`;
    
    // Update payment amounts
    const depositAmount = Math.round(total * 0.5);
    const fullAmountWithDiscount = Math.round(total * 0.95);
    
    document.getElementById('depositAmount').textContent = `₦${depositAmount.toLocaleString()}`;
    document.getElementById('fullAmount').textContent = `₦${fullAmountWithDiscount.toLocaleString()}`;
}

// Form Submission
const bookingForm = document.getElementById('bookingForm');
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const termsCheckbox = document.getElementById('termsCheckbox');
    if (!termsCheckbox.checked) {
        alert('Please agree to the terms and conditions');
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Collect all form data
    const formData = {
        service: bookingState.service,
        serviceName: serviceNames[bookingState.service],
        date: bookingState.date,
        time: bookingState.time,
        location: bookingState.location,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        numPeople: document.getElementById('numPeople').value,
        occasion: document.getElementById('occasion').value,
        specificLocation: document.getElementById('specificLocation').value,
        specialRequests: document.getElementById('specialRequests').value,
        addons: bookingState.addons,
        promoCode: bookingState.promoCode,
        paymentMethod: paymentMethod
    };
    
    // Show confirmation (in real app, this would redirect to payment)
    showBookingConfirmation(formData);
});

function showBookingConfirmation(data) {
    const confirmationMessage = `
        🎉 Booking Confirmed!
        
        Thank you, ${data.fullName}!
        
        Your ${data.serviceName} session has been booked for:
        ${new Date(data.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${data.time}
        
        A confirmation email has been sent to ${data.email}.
        
        What happens next:
        ✓ You'll receive a confirmation email within 1 hour
        ✓ We'll send a reminder 48 hours before your session
        ✓ Photos will be delivered within 7-14 days
        
        Questions? Call us at +234 800 000 0000
    `;
    
    alert(confirmationMessage);
    
    // In a real application, you would:
    // 1. Send this data to your backend
    // 2. Process payment
    // 3. Send confirmation email
    // 4. Redirect to a thank you page
    
    // For demo, redirect to homepage
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

// Add-on checkboxes styling
const addonCheckboxes = document.querySelectorAll('.addon-checkbox');
addonCheckboxes.forEach(checkbox => {
    const input = checkbox.querySelector('input[type="checkbox"]');
    input.addEventListener('change', () => {
        if (input.checked) {
            checkbox.style.borderColor = 'var(--gold)';
            checkbox.style.backgroundColor = 'rgba(155, 116, 70, 0.05)';
        } else {
            checkbox.style.borderColor = 'var(--light-gray)';
            checkbox.style.backgroundColor = 'var(--white)';
        }
    });
});

// Payment method selection styling
const paymentCards = document.querySelectorAll('.payment-card');
paymentCards.forEach(card => {
    card.addEventListener('click', () => {
        const radio = card.querySelector('input[type="radio"]');
        radio.checked = true;
    });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form field animations
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Real-time email validation
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = 'var(--error)';
            alert('Please enter a valid email address');
        } else {
            emailInput.style.borderColor = 'var(--light-gray)';
        }
    });
}

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);
        e.target.value = value;
    });
}

// Auto-save form data to session (for page refresh recovery)
function saveFormProgress() {
    const formData = {
        service: bookingState.service,
        date: bookingState.date,
        time: bookingState.time,
        location: bookingState.location,
        fullName: document.getElementById('fullName')?.value,
        email: document.getElementById('email')?.value,
        phone: document.getElementById('phone')?.value,
        currentStep: bookingState.currentStep
    };
    
    sessionStorage.setItem('bookingProgress', JSON.stringify(formData));
}

// Load saved progress on page load
window.addEventListener('load', () => {
    const savedData = sessionStorage.getItem('bookingProgress');
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Restore basic state
        if (data.service) {
            bookingState.service = data.service;
            const serviceRadio = document.querySelector(`input[name="service"][value="${data.service}"]`);
            if (serviceRadio) serviceRadio.checked = true;
        }
        
        // Note: Full restoration would require more complex logic
        // This is a simplified version for demonstration
    }
});

// Save progress on form changes
bookingForm.addEventListener('change', saveFormProgress);

// Clear saved data on successful submission
function clearFormProgress() {
    sessionStorage.removeItem('bookingProgress');
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Allow Enter to move to next step on service selection
    if (e.key === 'Enter' && bookingState.currentStep === 1) {
        const selectedService = document.querySelector('input[name="service"]:checked');
        if (selectedService) {
            e.preventDefault();
            if (validateStep(1)) {
                goToStep(2);
            }
        }
    }
});

// Prevent form submission on Enter key (except on submit button)
bookingForm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
        e.preventDefault();
    }
});

// Loading state for submit button
const confirmButton = document.getElementById('confirmBooking');
if (confirmButton) {
    bookingForm.addEventListener('submit', () => {
        confirmButton.disabled = true;
        confirmButton.textContent = 'Processing...';
        
        setTimeout(() => {
            confirmButton.disabled = false;
            confirmButton.textContent = 'Confirm & Pay';
        }, 3000);
    });
}

console.log('%cAliceta Studios - Booking System', 'font-size: 20px; font-weight: bold; color: #9B7446;');
console.log('%cBooking page loaded successfully', 'font-size: 14px; color: #6B7280;');