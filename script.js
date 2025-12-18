// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMedicineCards();
    initFAQ();
    initMobileMenu();
    initTabs();
    initSearch();
    initDoctors();
    initCharts();
    initUploadButtons();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }
}

// Medicine Cards Accordion
function initMedicineCards() {
    const medicineCards = document.querySelectorAll('.medicine-card');
    
    medicineCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const details = card.querySelector('.medicine-details');
        
        if (expandBtn && details) {
            expandBtn.addEventListener('click', function() {
                // Close other open cards
                medicineCards.forEach(otherCard => {
                    if (otherCard !== card && otherCard.classList.contains('active')) {
                        otherCard.classList.remove('active');
                        otherCard.querySelector('.medicine-details').style.maxHeight = '0';
                        otherCard.querySelector('.medicine-details').style.padding = '0 20px';
                    }
                });
                
                // Toggle current card
                card.classList.toggle('active');
                
                if (card.classList.contains('active')) {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.padding = '20px';
                } else {
                    details.style.maxHeight = '0';
                    details.style.padding = '0 20px';
                }
            });
        }
    });
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                            otherAnswer.style.padding = '0 20px';
                        }
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                
                if (answer) {
                    if (item.classList.contains('active')) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        answer.style.padding = '20px';
                    } else {
                        answer.style.maxHeight = '0';
                        answer.style.padding = '0 20px';
                    }
                }
            });
        }
    });
}

// Profile Tabs
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button and corresponding pane
                this.classList.add('active');
                const targetPane = document.getElementById(`${tabId}-tab`);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }
}

// Search Functionality
function initSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('medicineSearch');
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function() {
            performSearch();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    
    function performSearch() {
        const query = searchInput ? searchInput.value.trim() : '';
        if (query) {
            // In a real app, this would make an API call
            // For demo, we'll just show an alert and simulate search
            alert(`Searching for: ${query}\n\nIn a real application, this would:\n1. Send the query to our backend\n2. Search our medicine database\n3. Return matching medicines with generic alternatives\n4. Display the results on the page.`);
            
            // You could also simulate loading and show results
            // For now, we'll just log to console
            console.log(`Search query: ${query}`);
            
            // If we're already on the search page, we could simulate updating results
            if (window.location.pathname.includes('search.html')) {
                simulateSearchResults(query);
            }
        } else {
            alert('Please enter a medicine name to search.');
        }
    }
}

function simulateSearchResults(query) {
    // This is a demo function that would be replaced with real API calls
    console.log(`Simulating search for: ${query}`);
    
    // Update the medicine name in the search results
    const medicineName = document.querySelector('.medicine-name');
    if (medicineName) {
        medicineName.textContent = `${query} (Demo Result)`;
    }
    
    // Show a notification
    showNotification(`Found generic alternatives for ${query}`);
}

// Doctor Contact Buttons
function initDoctors() {
    const contactBtns = document.querySelectorAll('.contact-btn');
    
    contactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const doctorName = this.closest('.doctor-card')?.querySelector('h3')?.textContent || 'the doctor';
            alert(`Connecting you to ${doctorName}...\n\nIn a real application, this would:\n1. Open a booking modal\n2. Let you select date/time\n3. Process payment\n4. Connect via video/audio call`);
            
            // Simulate loading
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showNotification('Appointment booked successfully! Check your email for details.');
            }, 2000);
        });
    });
}

// Chart.js for Similarity Graph
function initCharts() {
    const chartCanvas = document.getElementById('similarityChart');
    
    if (chartCanvas) {
        // Destroy existing chart if it exists
        if (window.similarityChartInstance) {
            window.similarityChartInstance.destroy();
        }
        
        const ctx = chartCanvas.getContext('2d');
        window.similarityChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Paracetamol 650', 'Dolo 650', 'P 650', 'Calpol 650'],
                datasets: [
                    {
                        label: 'Active Ingredient Match',
                        data: [85, 85, 100, 85],
                        backgroundColor: '#1AB78C',
                        borderColor: '#1AB78C',
                        borderWidth: 1
                    },
                    {
                        label: 'Additional Ingredients',
                        data: [0, 0, 0, 15],
                        backgroundColor: '#0958D8',
                        borderColor: '#0958D8',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Composition Similarity Index'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Similarity Percentage (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Medicine Alternatives'
                        }
                    }
                }
            }
        });
    }
}

// Upload Buttons
function initUploadButtons() {
    const uploadPicBtn = document.getElementById('uploadPicBtn');
    const uploadPrescriptionBtn = document.getElementById('uploadPrescriptionBtn');
    const addReviewBtn = document.getElementById('addReviewBtn');
    
    if (uploadPicBtn) {
        uploadPicBtn.addEventListener('click', function() {
            alert('Medicine Photo Upload\n\nIn a real application, this would:\n1. Open camera or file picker\n2. Upload image to our servers\n3. Use AI to recognize medicine\n4. Show composition and alternatives');
            
            // Simulate file upload
            simulateFileUpload('medicine photo');
        });
    }
    
    if (uploadPrescriptionBtn) {
        uploadPrescriptionBtn.addEventListener('click', function() {
            alert('Prescription Upload\n\nIn a real application, this would:\n1. Open file picker for image/PDF\n2. Upload to secure servers\n3. Extract medicine names using OCR\n4. Show all medicines with generic alternatives');
            
            // Simulate file upload
            simulateFileUpload('prescription');
        });
    }
    
    if (addReviewBtn) {
        addReviewBtn.addEventListener('click', function() {
            alert('Add Review\n\nIn a real application, this would:\n1. Open a review form\n2. Let you rate the service\n3. Upload before/after savings\n4. Submit to be moderated and published');
        });
    }
}

function simulateFileUpload(fileType) {
    // Show loading simulation
    const buttons = document.querySelectorAll('#uploadPicBtn, #uploadPrescriptionBtn');
    buttons.forEach(btn => {
        if (btn.textContent.includes('Upload')) {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                showNotification(`${fileType.charAt(0).toUpperCase() + fileType.slice(1)} uploaded successfully! Processing...`);
                
                // Simulate processing completion
                setTimeout(() => {
                    showNotification('Analysis complete! Showing results...');
                    // In a real app, this would redirect to results page
                    if (fileType === 'prescription') {
                        setTimeout(() => {
                            window.location.href = 'search.html';
                        }, 1000);
                    }
                }, 2000);
            }, 1500);
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // Add styles for notification
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: #1AB78C;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
        }
        .notification-info { background: #1AB78C; }
        .notification-success { background: #4CAF50; }
        .notification-warning { background: #FF9800; }
        .notification-error { background: #F44336; }
        .notification-close {
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: 15px;
            font-size: 16px;
        }
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    
    // Add to document
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add slideOut animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(slideOutStyle);

// Form Submission Handling
const settingsForm = document.querySelector('.settings-form');
if (settingsForm) {
    settingsForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Simulate API call
        console.log('Saving settings:', data);
        
        // Show success message
        showNotification('Profile updated successfully!', 'success');
        
        // In a real app, this would be an API call
        return false;
    });
}

// Blood Group Selection
const bloodGroupSelect = document.getElementById('bloodGroup');
if (bloodGroupSelect) {
    // Set default value
    bloodGroupSelect.value = 'B+';
}

// Edit Profile Button
const editProfileBtn = document.getElementById('editProfileBtn');
if (editProfileBtn) {
    editProfileBtn.addEventListener('click', function() {
        // Scroll to settings tab and activate it
        const settingsTab = document.querySelector('[data-tab="settings"]');
        if (settingsTab) {
            settingsTab.click();
            document.querySelector('.tab-content').scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Initialize Charts on Search Page Load
if (window.location.pathname.includes('search.html')) {
    // Wait a bit for DOM to fully load Chart.js
    setTimeout(initCharts, 500);
}

// Add some sample data for demo purposes
console.log('GenMed prototype initialized successfully!');
console.log('Features implemented:');
console.log('- Responsive design with mobile menu');
console.log('- Medicine cards with expandable details');
console.log('- FAQ accordion');
console.log('- Profile tabs system');
console.log('- Search functionality (demo)');
console.log('- Doctor consultation simulation');
console.log('- Chart.js integration for similarity graph');
console.log('- File upload simulation');
console.log('- Notification system');
// Updated Medicine Cards (Problem Cards) Accordion
function initMedicineCards() {
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        const expandBtn = card.querySelector('.expand-btn');
        const problemHeader = card.querySelector('.problem-header');
        const details = card.querySelector('.medicine-details');
        
        if (expandBtn && details) {
            // Make both button and header clickable
            expandBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleCard(card, details);
            });
            
            problemHeader.addEventListener('click', function(e) {
                if (e.target !== expandBtn && !e.target.classList.contains('buy-now-btn')) {
                    toggleCard(card, details);
                }
            });
        }
    });
    
    function toggleCard(card, details) {
        // Close other open cards first
        const allCards = document.querySelectorAll('.problem-card');
        allCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('active')) {
                otherCard.classList.remove('active');
                const otherDetails = otherCard.querySelector('.medicine-details');
                if (otherDetails) {
                    // Reset other card details
                    setTimeout(() => {
                        otherDetails.style.maxHeight = '0';
                        otherDetails.style.padding = '0';
                    }, 10);
                }
            }
        });
        
        // Toggle current card
        const isActive = card.classList.contains('active');
        card.classList.toggle('active');
        
        if (!isActive) {
            // Opening the card
            setTimeout(() => {
                details.style.maxHeight = '400px'; // Fixed height
                details.style.padding = '20px';
                // Smooth scroll to make card visible if needed
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }, 10);
        } else {
            // Closing the card
            details.style.maxHeight = '0';
            details.style.padding = '0';
        }
    }
    
    // Close all cards when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.problem-card')) {
            const allCards = document.querySelectorAll('.problem-card');
            allCards.forEach(card => {
                if (card.classList.contains('active')) {
                    card.classList.remove('active');
                    const details = card.querySelector('.medicine-details');
                    if (details) {
                        details.style.maxHeight = '0';
                        details.style.padding = '0';
                    }
                }
            });
        }
    });
}