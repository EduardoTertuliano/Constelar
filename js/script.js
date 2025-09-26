// Constelar Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeServiceCards();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeLoadingStates();
    
    // Add constellation animation
    createConstellationAnimation();
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
    }
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 46, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                header.style.background = 'rgba(26, 26, 46, 0.95)';
                header.style.boxShadow = 'none';
            }
        });
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger animation for grid items
                const gridItems = entry.target.querySelectorAll('.service-card, .key-item, .benefit-item, .module-item');
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animationDelay = `${index * 0.1}s`;
                        item.classList.add('fade-in-up');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animation
    const animateElements = document.querySelectorAll('.scroll-animate, .service-animate, section');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Hero animations
function initializeHeroAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (heroTitle) {
        setTimeout(() => heroTitle.classList.add('fade-in-up'), 300);
    }
    if (heroDescription) {
        setTimeout(() => heroDescription.classList.add('fade-in-up'), 600);
    }
    if (heroButtons) {
        setTimeout(() => heroButtons.classList.add('fade-in-up'), 900);
    }
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.element');
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 2}s`;
    });
}

// Service cards interactivity
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        // Add hover effect with mouse tracking
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
        
        // Add click animation
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn-purchase') && !e.target.classList.contains('service-link')) {
                card.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    card.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
}

// Contact form functionality (if exists)
function initializeContactForm() {
    const contactLinks = document.querySelectorAll('a[href^="mailto:"], a[href^="tel:"], a[href^="https://wa.me/"]');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Track contact interaction (for analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_click', {
                    'contact_method': this.href.includes('wa.me') ? 'whatsapp' : 
                                   this.href.includes('mailto') ? 'email' : 'phone'
                });
            }
        });
    });
}

// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Loading states for buttons
function initializeLoadingStates() {
    const purchaseButtons = document.querySelectorAll('.btn-purchase');
    
    purchaseButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add loading state
            this.classList.add('loading');
            this.style.pointerEvents = 'none';
            
            // Remove loading state after a short delay (since it's an external link)
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.pointerEvents = 'auto';
            }, 2000);
        });
    });
}

// Constellation animation
function createConstellationAnimation() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    // Create additional stars
    const starsContainer = document.querySelector('.stars');
    if (starsContainer) {
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.position = 'absolute';
            star.style.width = Math.random() * 3 + 'px';
            star.style.height = star.style.width;
            star.style.background = 'white';
            star.style.borderRadius = '50%';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.opacity = Math.random() * 0.8 + 0.2;
            star.style.animation = `twinkle ${Math.random() * 4 + 2}s ease-in-out infinite alternate`;
            star.style.animationDelay = Math.random() * 4 + 's';
            
            starsContainer.appendChild(star);
        }
    }
}

// Parallax effect for hero section
function initializeParallax() {
    const hero = document.querySelector('.hero');
    const heroBackground = document.querySelector('.hero-background');
    
    if (hero && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroBackground.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Initialize parallax after DOM load
document.addEventListener('DOMContentLoaded', initializeParallax);

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based animations or effects can be added here
    const scrollTop = window.pageYOffset;
    
    // Update navigation active state based on scroll position
    updateActiveNavigation(scrollTop);
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

function updateActiveNavigation(scrollTop) {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Performance optimization: Intersection Observer for expensive animations
const expensiveAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Start expensive animations only when element is visible
            entry.target.classList.add('animate-expensive');
        } else {
            // Pause expensive animations when element is not visible
            entry.target.classList.remove('animate-expensive');
        }
    });
}, {
    rootMargin: '50px'
});

// Observe elements that have expensive animations
document.querySelectorAll('.floating-elements, .transformation-visual').forEach(el => {
    expensiveAnimationObserver.observe(el);
});

// Error handling for external links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[target="_blank"]')) {
        try {
            // Track external link clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'external_link_click', {
                    'link_url': e.target.href,
                    'link_text': e.target.textContent
                });
            }
        } catch (error) {
            console.warn('Analytics tracking failed:', error);
        }
    }
});

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus management for mobile menu
function manageFocus() {
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (navMenu && navMenu.classList.contains('active')) {
        // Focus first nav link when menu opens
        if (navLinks.length > 0) {
            navLinks[0].focus();
        }
    }
}

// Add focus management to hamburger click
document.querySelector('.hamburger')?.addEventListener('click', manageFocus);

// Preload critical images
function preloadImages() {
    const criticalImages = [
        'assets/images/logo-constelar.png'
        // Add other critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading
document.addEventListener('DOMContentLoaded', preloadImages);

// Service worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeNavigation,
        initializeScrollAnimations,
        debounce
    };
}



// Smooth scrolling for anchor links
function initializeSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Call smooth scrolling on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeSmoothScrolling);


