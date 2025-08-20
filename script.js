// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const ctaButton = document.getElementById('cta-button');
const contactForm = document.getElementById('contact-form');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const translateX = (mouseX - 0.5) * 30;
        const translateY = (mouseY - 0.5) * 30;
        
        heroContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
});

// CTA button click effect
ctaButton.addEventListener('click', () => {
    // Add ripple effect
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = ctaButton.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    ctaButton.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
    
    // Scroll to contact section
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Add ripple animation CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = [
        { selector: '.section-title', class: 'fade-in' },
        { selector: '.about-description', class: 'fade-in' },
        { selector: '.stat-item', class: 'fade-in' },
        { selector: '.service-card', class: 'fade-in' },
        { selector: '.portfolio-item', class: 'fade-in' },
        { selector: '.team-member', class: 'fade-in' },
        { selector: '.contact-item', class: 'slide-in-left' },
        { selector: '.contact-form', class: 'slide-in-right' }
    ];
    
    animateElements.forEach(({ selector, class: className }) => {
        document.querySelectorAll(selector).forEach((el, index) => {
            el.classList.add(className);
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
});

// Service cards 3D tilt effect
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
});

// Contact form validation and submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(error => {
        error.classList.remove('show');
    });
    
    let isValid = true;
    
    // Validate name
    if (name.length < 2) {
        showError('name-error', 'Name must be at least 2 characters long');
        isValid = false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate message
    if (message.length < 10) {
        showError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate form submission
        const submitButton = contactForm.querySelector('.send-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(45deg, #10b981, #059669)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = 'linear-gradient(45deg, #dc2626, #ef4444)';
                contactForm.reset();
            }, 2000);
        }, 1500);
    }
});

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

// Floating elements animation with mouse interaction
document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelectorAll('.floating-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * 50 * speed;
        const y = (mouseY - 0.5) * 50 * speed;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.5}deg)`;
    });
});

// Team member cards enhanced interaction
document.querySelectorAll('.team-member').forEach(member => {
    const card = member.querySelector('.member-card');
    
    member.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(180deg)';
    });
    
    member.addEventListener('mouseleave', () => {
        setTimeout(() => {
            card.style.transform = 'rotateY(0deg)';
        }, 1000);
    });
});

// Portfolio cards enhanced interaction
document.querySelectorAll('.portfolio-item').forEach(item => {
    const card = item.querySelector('.portfolio-card');
    
    item.addEventListener('mouseenter', () => {
        card.style.transform = 'rotateY(180deg)';
    });
    
    item.addEventListener('mouseleave', () => {
        setTimeout(() => {
            card.style.transform = 'rotateY(0deg)';
        }, 1500);
    });
});

// Dynamic typing effect for hero title
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '1';
        typeWriter(heroTitle, 'AURAAILYF', 150);
    }
});

// Social icons 3D rotation effect
document.querySelectorAll('.social-icon, .social-links a').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) rotateY(360deg) scale(1.2)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) rotateY(0deg) scale(1)';
    });
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll-heavy operations
const debouncedParallax = debounce((e) => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent && hero.getBoundingClientRect().bottom > 0) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const translateX = (mouseX - 0.5) * 30;
        const translateY = (mouseY - 0.5) * 30;
        
        heroContent.style.transform = `translate(${translateX}px, ${translateY}px)`;
    }
}, 16); // ~60fps

document.addEventListener('mousemove', debouncedParallax);

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});