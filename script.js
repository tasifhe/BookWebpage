// Shopping Cart functionality
let cart = JSON.parse(localStorage.getItem('bookCart')) || [];

// Update cart count display
function updateCartCount() {
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Add book to cart
function addToCart(bookId, title, price, image) {
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: bookId,
            title: title,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('bookCart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${title} added to cart!`);
}

// Show notification
function showNotification(message) {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
}

function performSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm) {
        // In a real application, this would filter the books
        console.log('Searching for:', searchTerm);
        showNotification(`Searching for "${searchTerm}"...`);
        // You can implement actual search filtering here
    }
}

// Filter functionality
function initializeFilters() {
    const sortSelect = document.querySelector('select[name="sort"]');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortType = this.value;
            console.log('Sorting by:', sortType);
            showNotification(`Sorted by ${sortType}`);
            // Implement actual sorting logic here
        });
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            console.log('Contact form data:', data);
            showNotification('Thank you! Your message has been sent successfully.');
            contactForm.reset();
        });
    }
}

// Newsletter subscription
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                console.log('Newsletter subscription:', email);
                showNotification('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    });
}

// Mobile menu toggle
function initializeMobileMenu() {
    // Add mobile menu button if it doesn't exist
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    if (header && nav && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        menuToggle.setAttribute('aria-label', 'Toggle mobile menu');
        
        header.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-menu-open');
            const icon = menuToggle.querySelector('i');
            icon.className = nav.classList.contains('mobile-menu-open') 
                ? 'fas fa-times' 
                : 'fas fa-bars';
        });
    }
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize rating system
function initializeRatings() {
    const ratingElements = document.querySelectorAll('.rating');
    ratingElements.forEach(rating => {
        const stars = rating.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                const ratingValue = index + 1;
                console.log('Rated:', ratingValue, 'stars');
                showNotification(`Thank you for rating ${ratingValue} stars!`);
                
                // Update visual rating
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i < ratingValue);
                });
            });
        });
    });
}

// Book detail page functionality
function initializeBookDetails() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get book details from the page
            const bookTitle = document.querySelector('h2')?.textContent || 'Unknown Book';
            const bookPrice = document.querySelector('.price')?.textContent || '৳0';
            const bookImage = document.querySelector('.book-cover img')?.src || '';
            const bookId = bookTitle.toLowerCase().replace(/\s+/g, '-');
            
            addToCart(bookId, bookTitle, bookPrice, bookImage);
        });
    });
}

// Book Detail Page Tab Functionality
function initBookDetailTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Add active class to clicked button and corresponding panel
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Wishlist functionality
function addToWishlist(bookId, title, price, image) {
    let wishlist = JSON.parse(localStorage.getItem('bookWishlist')) || [];
    
    const existingItem = wishlist.find(item => item.id === bookId);
    
    if (!existingItem) {
        wishlist.push({
            id: bookId,
            title: title,
            price: price,
            image: image
        });
        
        localStorage.setItem('bookWishlist', JSON.stringify(wishlist));
        showNotification(`${title} added to wishlist!`);
        
        // Update wishlist button
        const wishlistBtn = document.querySelector('.add-to-wishlist');
        if (wishlistBtn) {
            wishlistBtn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Added to Wishlist';
            wishlistBtn.disabled = true;
        }
    } else {
        showNotification(`${title} is already in your wishlist!`);
    }
}

// Share book functionality
function shareBook() {
    const bookTitle = document.querySelector('.book-title').textContent;
    const currentUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: bookTitle,
            text: `Check out this amazing book: ${bookTitle}`,
            url: currentUrl
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(currentUrl).then(() => {
            showNotification('Book link copied to clipboard!');
        });
    }
}

// Initialize book detail page functionality
function initBookDetailPage() {
    // Initialize tabs
    initBookDetailTabs();
    
    // Add wishlist functionality
    const wishlistBtn = document.querySelector('.add-to-wishlist');
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', () => {
            // Get book data from the page
            const bookTitle = document.querySelector('.book-title').textContent;
            const bookPrice = document.querySelector('.current-price').textContent;
            const bookImage = document.querySelector('.book-cover img').src;
            const bookId = 'book1'; // This should be dynamic based on the page
            
            addToWishlist(bookId, bookTitle, bookPrice, bookImage);
        });
    }
    
    // Add share functionality
    const shareBtn = document.querySelector('.share-book');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareBook);
    }
    
    // Check if book is already in wishlist and update button accordingly
    const wishlist = JSON.parse(localStorage.getItem('bookWishlist')) || [];
    const currentBookId = 'book1'; // This should be dynamic
    const isInWishlist = wishlist.some(item => item.id === currentBookId);
    
    if (isInWishlist && wishlistBtn) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> In Wishlist';
        wishlistBtn.disabled = true;
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize theme toggle
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// Initialize back to top button
function initializeBackToTop() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializeSearch();
    initializeFilters();
    initializeContactForm();
    initializeNewsletter();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeRatings();
    initializeBookDetails();
    initializeLazyLoading();
    initializeThemeToggle();
    initializeBackToTop();
    
    // Add loading animation removal
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('fade-out');
            setTimeout(() => loader.remove(), 300);
        }, 1000);
    }
    
    // Initialize book detail page if we're on a book detail page
    if (document.querySelector('.book-detail-container')) {
        initBookDetailPage();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        updateCartCount();
    }
});
