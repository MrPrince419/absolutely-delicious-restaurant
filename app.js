// Absolutely Delicious - Redesigned Restaurant Website
// Modern gallery-style menu with enhanced user experience

document.addEventListener('DOMContentLoaded', function() {
    console.log('Absolutely Delicious - Redesigned website loaded');

    // Initialize all functionality
    initializeMobileMenu();
    initializeNavigation();
    initializePhoneFunctionality();
    initializeMenuInteractions();
    initializeMenuTabs(); // Add menu tab functionality
    initializePerformanceOptimizations();
    initializeAccessibility();

    // Mark body as loaded for CSS transitions
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (!mobileToggle || !mainNav) return;
    
    mobileToggle.addEventListener('click', function() {
        const isOpen = mainNav.classList.contains('mobile-open');
        
        if (isOpen) {
            mainNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mainNav.classList.add('mobile-open');
            mobileToggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        console.log('Mobile menu toggled:', !isOpen);
    });
    
    // Close mobile menu when clicking on nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close mobile menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Enhanced Navigation with smooth scrolling
function initializeNavigation() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just a hash or empty
            if (!href || href === '#') return;
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate scroll position accounting for sticky header
                const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
                const offset = 20;
                const targetPosition = targetElement.offsetTop - headerHeight - offset;
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
                
                // Update URL without triggering scroll
                history.pushState(null, null, href);
                
                console.log(`Navigated to: ${targetId}`);
                trackUserAction('navigation', { section: targetId });
            }
        });
    });
    
    // Highlight active nav section on scroll
    const sections = document.querySelectorAll('[id]');
    const navLinksArray = Array.from(navLinks);
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// Enhanced Phone Functionality
function initializePhoneFunctionality() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const phoneNumber = this.href.replace('tel:', '');
            console.log('Phone call initiated:', phoneNumber);
            
            // Track phone call attempts
            trackUserAction('phone_call_attempt', {
                phone: phoneNumber,
                source: this.className || 'unknown',
                text: this.textContent.trim()
            });
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Enhanced hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Menu Gallery Interactions
function initializeMenuInteractions() {
    const menuCategories = document.querySelectorAll('.menu-category');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Add hover effects to menu categories
    menuCategories.forEach((category, index) => {
        category.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
            trackUserAction('menu_category_hover', { 
                category: this.querySelector('h3')?.textContent || `Category ${index + 1}` 
            });
        });
        
        category.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add click interactions to menu items for better mobile experience
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            const itemName = this.querySelector('h4, h5')?.textContent || 'Unknown item';
            console.log('Menu item clicked:', itemName);
            trackUserAction('menu_item_click', { item: itemName });
            
            // Add a subtle animation
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Lazy loading for menu images (if any are added later)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        menuCategories.forEach(category => {
            observer.observe(category);
        });
    }
}

// Menu Tabs Functionality
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (!menuTabs.length || !menuSections.length) return;
    
    // Add click event listeners to tabs
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and sections
            menuTabs.forEach(t => t.classList.remove('active'));
            menuSections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding section
            const targetSection = document.getElementById(targetTab);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Track tab change
            console.log('Menu tab changed to:', targetTab);
            trackUserAction('menu_tab_change', { tab: targetTab });
        });
    });
    
    // Keyboard navigation for tabs
    menuTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let newIndex = index;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    newIndex = index > 0 ? index - 1 : menuTabs.length - 1;
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    newIndex = index < menuTabs.length - 1 ? index + 1 : 0;
                    break;
                case 'Home':
                    e.preventDefault();
                    newIndex = 0;
                    break;
                case 'End':
                    e.preventDefault();
                    newIndex = menuTabs.length - 1;
                    break;
                default:
                    return;
            }
            
            menuTabs[newIndex].focus();
            menuTabs[newIndex].click();
        });
        
        // Make tabs focusable
        tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    });
    
    // Set up ARIA attributes for sections
    menuSections.forEach((section, index) => {
        section.setAttribute('role', 'tabpanel');
        section.setAttribute('aria-labelledby', menuTabs[index]?.id || `tab-${index}`);
    });
}

// Performance Optimizations
function initializePerformanceOptimizations() {
    // Optimize scroll performance
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        if (header) {
            if (scrollY > 100) {
                header.style.boxShadow = 'var(--shadow-md)';
                header.style.backgroundColor = 'rgba(var(--color-surface-rgb, 255, 255, 253), 0.95)';
                header.style.backdropFilter = 'blur(10px)';
            } else {
                header.style.boxShadow = 'var(--shadow-sm)';
                header.style.backgroundColor = '';
                header.style.backdropFilter = '';
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
    
    // Preload critical resources
    const criticalPhoneButtons = document.querySelectorAll('.btn[href^="tel:"]');
    criticalPhoneButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            console.log('Phone button hovered - ready for call');
        });
    });
    
    // Image optimization for hero background
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        const img = new Image();
        img.onload = function() {
            heroBackground.style.backgroundImage = `url(${this.src})`;
            heroBackground.classList.add('loaded');
        };
        // The URL is already set in CSS, this is for preloading
        img.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80';
    }
}

// Enhanced Accessibility
function initializeAccessibility() {
    // Keyboard navigation enhancement
    document.addEventListener('keydown', function(e) {
        // Quick actions with keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'k': // Ctrl/Cmd + K for quick call
                    e.preventDefault();
                    callRestaurant();
                    break;
                case 'm': // Ctrl/Cmd + M for menu
                    e.preventDefault();
                    scrollToMenu();
                    break;
                case 'h': // Ctrl/Cmd + H for hours
                    e.preventDefault();
                    scrollToHours();
                    break;
            }
        }
        
        // Enhanced Tab navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
        
        // Escape key to close mobile menu
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.main-nav.mobile-open');
            if (mobileMenu) {
                const toggle = document.querySelector('.mobile-menu-toggle');
                mobileMenu.classList.remove('mobile-open');
                toggle?.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce dynamic content changes to screen readers
    function announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        
        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
    
    // Focus management for mobile menu
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const firstNavLink = document.querySelector('.nav-link');
    
    if (mobileToggle && firstNavLink) {
        mobileToggle.addEventListener('click', function() {
            const isOpen = document.querySelector('.main-nav.mobile-open');
            if (isOpen) {
                setTimeout(() => {
                    firstNavLink.focus();
                }, 100);
            }
        });
    }
}

// Utility Functions
const RestaurantUtils = {
    // Direct call function
    callRestaurant: function() {
        const phoneNumber = '(705) 256-8804';
        try {
            window.open('tel:+17052568804', '_self');
            console.log(`Calling ${phoneNumber}`);
            trackUserAction('direct_call', { method: 'javascript' });
        } catch (error) {
            console.error('Error initiating call:', error);
            this.showPhoneNumber(phoneNumber);
        }
    },
    
    // Show phone number as fallback
    showPhoneNumber: function(phoneNumber) {
        const message = `Please call us at ${phoneNumber}`;
        if ('navigator' in window && 'clipboard' in navigator) {
            navigator.clipboard.writeText(phoneNumber).then(() => {
                alert(`${message}\n\nPhone number copied to clipboard!`);
            }).catch(() => {
                alert(message);
            });
        } else {
            alert(message);
        }
    },
    
    // Scroll to menu
    scrollToMenu: function() {
        const menuSection = document.getElementById('menu');
        if (menuSection) {
            this.smoothScrollTo(menuSection);
            trackUserAction('scroll_to_menu', { method: 'javascript' });
        }
    },
    
    // Scroll to hours
    scrollToHours: function() {
        const hoursSection = document.getElementById('hours');
        if (hoursSection) {
            this.smoothScrollTo(hoursSection);
            trackUserAction('scroll_to_hours', { method: 'javascript' });
        }
    },
    
    // Generic smooth scroll function
    smoothScrollTo: function(element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    },
    
    // Get current business status
    getCurrentStatus: function() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const currentTime = now.getHours() * 100 + now.getMinutes(); // Format: HHMM

        const hours = {
            0: { open: 900, close: 1400, name: 'Sunday' },    // Sunday 9:00 AM - 2:00 PM
            1: { open: null, close: null, name: 'Monday' },   // Monday: CLOSED
            2: { open: 900, close: 1600, name: 'Tuesday' },   // Tuesday-Saturday 9:00 AM - 4:00 PM
            3: { open: 900, close: 1600, name: 'Wednesday' },
            4: { open: 900, close: 1600, name: 'Thursday' },
            5: { open: 900, close: 1600, name: 'Friday' },
            6: { open: 900, close: 1600, name: 'Saturday' }
        };

        const todayHours = hours[currentDay];
        
        if (todayHours.open === null) {
            return { status: 'closed', message: 'Closed Today (Monday)' };
        } else if (currentTime >= todayHours.open && currentTime < todayHours.close) {
            const closeTime = this.formatTime(todayHours.close);
            return { status: 'open', message: `Open until ${closeTime}` };
        } else if (currentTime < todayHours.open) {
            const openTime = this.formatTime(todayHours.open);
            return { status: 'opening', message: `Opens at ${openTime}` };
        } else {
            return { status: 'closed', message: 'Closed for Today' };
        }
    },
    
    // Format time helper
    formatTime: function(time) {
        const hours = Math.floor(time / 100);
        const minutes = time % 100;
        const period = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
    }
};

// Make utilities available globally
window.RestaurantUtils = RestaurantUtils;
window.callRestaurant = RestaurantUtils.callRestaurant;
window.scrollToMenu = RestaurantUtils.scrollToMenu;
window.scrollToHours = RestaurantUtils.scrollToHours;

// Simple analytics tracking function
function trackUserAction(action, data = {}) {
    try {
        const timestamp = new Date().toISOString();
        const userAgent = navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop';
        
        console.log(`User action: ${action}`, {
            ...data,
            timestamp,
            userAgent,
            url: window.location.href
        });
        
        // This is where you would integrate with analytics services
        // Example: Google Analytics, Facebook Pixel, etc.
        
    } catch (error) {
        console.error('Analytics tracking error:', error);
    }
}

// Connection status monitoring for mobile users
if ('navigator' in window && 'onLine' in navigator) {
    function updateConnectionStatus() {
        const isOnline = navigator.onLine;
        console.log(`Connection status: ${isOnline ? 'online' : 'offline'}`);
        
        if (!isOnline) {
            showNotification('You appear to be offline. Phone calling may not work.', 'warning');
        }
        
        trackUserAction('connection_status', { online: isOnline });
    }
    
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
}

// Notification system
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification notification--${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--color-${type === 'warning' ? 'warning' : 'primary'});
        color: var(--color-btn-primary-text);
        padding: var(--space-12) var(--space-20);
        border-radius: var(--radius-base);
        font-size: var(--font-size-sm);
        font-weight: var(--font-weight-medium);
        z-index: 2000;
        box-shadow: var(--shadow-lg);
        max-width: 90vw;
        text-align: center;
        opacity: 0;
        transition: opacity var(--duration-normal) var(--ease-standard);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 10);
    
    // Remove after duration
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 250);
    }, duration);
}

// Touch gestures for mobile enhancement
if ('ontouchstart' in window) {
    let touchStartY = 0;
    let touchEndY = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', function(e) {
        touchStartY = e.changedTouches[0].screenY;
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', function(e) {
        touchEndY = e.changedTouches[0].screenY;
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeDistanceY = touchStartY - touchEndY;
        const swipeDistanceX = touchStartX - touchEndX;
        const minSwipeDistance = 100;
        
        // Quick swipe up from bottom to call (emergency feature)
        if (swipeDistanceY > minSwipeDistance && touchStartY > (window.innerHeight * 0.8)) {
            console.log('Quick swipe up detected - highlighting call options');
            const phoneButtons = document.querySelectorAll('a[href^="tel:"]');
            phoneButtons.forEach(button => {
                button.style.transform = 'scale(1.1)';
                button.style.boxShadow = '0 0 20px rgba(33, 128, 141, 0.5)';
                
                setTimeout(() => {
                    button.style.transform = '';
                    button.style.boxShadow = '';
                }, 1500);
            });
            
            trackUserAction('quick_swipe_call', { direction: 'up' });
        }
        
        // Swipe right to open menu (if on mobile)
        if (Math.abs(swipeDistanceX) > minSwipeDistance && Math.abs(swipeDistanceY) < 50) {
            if (swipeDistanceX < 0 && window.innerWidth <= 768) {
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                const mainNav = document.querySelector('.main-nav');
                
                if (mobileToggle && mainNav && !mainNav.classList.contains('mobile-open')) {
                    mobileToggle.click();
                    trackUserAction('swipe_menu_open', { direction: 'right' });
                }
            }
        }
    }
}

// Handle visibility changes (for mobile apps switching)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('App hidden');
        trackUserAction('app_hidden');
    } else {
        console.log('App visible');
        trackUserAction('app_visible');
        
        // Refresh any time-sensitive content
        const status = RestaurantUtils.getCurrentStatus();
        console.log('Current restaurant status:', status);
    }
});

// Performance monitoring
window.addEventListener('load', function() {
    const loadTime = performance.now();
    console.log(`Website loaded in ${Math.round(loadTime)}ms`);
    
    trackUserAction('page_load_complete', {
        load_time: Math.round(loadTime),
        user_agent: navigator.userAgent.includes('Mobile') ? 'mobile' : 'desktop',
        screen_size: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // Show current business status
    const status = RestaurantUtils.getCurrentStatus();
    console.log('Restaurant status on load:', status);
});

// Error handling - graceful degradation
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    trackUserAction('javascript_error', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno
    });
    
    // Don't show alerts to users - just log for debugging
});

// Initialize service worker for offline functionality (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Service worker registration would go here
        console.log('Service worker support detected');
    });
}

console.log('🍽️ Absolutely Delicious - Redesigned website ready! 🍽️');
console.log('Features: Gallery-style menu, enhanced mobile experience, accessible navigation');
console.log('Call (705) 256-8804 for pickup • Curbside available • Cash preferred');
console.log('Keyboard shortcuts: Ctrl+K (call), Ctrl+M (menu), Ctrl+H (hours)');