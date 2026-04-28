// ==================== ENHANCED CURSOR ==================== 
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;

// Only show cursor on devices with mouse
const hasMouseSupport = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (hasMouseSupport) {
  cursor.style.opacity = '1';
  cursor.style.display = 'block';

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';
    cursor.style.display = 'block';
  });

  // Smooth cursor follow animation
  function animateCursor() {
    const speed = 0.15;
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Pulse animation every 3 seconds
  setInterval(() => {
    cursor.style.transition = 'transform 0.3s ease';
    cursor.style.transform = 'scale(1.5)';
    setTimeout(() => {
      cursor.style.transform = 'scale(1)';
      setTimeout(() => {
        cursor.style.transition = 'transform 0.2s ease, width 0.3s ease, height 0.3s ease';
      }, 300);
    }, 150);
  }, 3000);

  // Cursor hover effects
  const hoverElements = document.querySelectorAll('a, button, .card, .project-card, .skill-card, .testimonial-card, .timeline-content');

  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('hover');
      cursor.style.transition = 'width 0.3s ease, height 0.3s ease';
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('hover');
    });
  });
} else {
  cursor.style.display = 'none';
}

// ==================== ULTRA-AGGRESSIVE MOBILE MENU ==================== 
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;

  if (!menuToggle || !navLinks) {
    console.error('Menu elements not found!');
    return;
  }

  console.log('Mobile menu initialized');

  // Force initial state
  navLinks.style.display = 'flex';
  navLinks.style.left = '-100%';

  let isToggling = false; // Prevent rapid toggles

  // ULTRA AGGRESSIVE: Multiple event listeners
  const toggleMenu = (e) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
      e.stopImmediatePropagation();
    }
    
    if (isToggling) return; // Prevent rapid clicks
    isToggling = true;
    
    console.log('Menu toggle clicked!');
    
    const isActive = menuToggle.classList.contains('active');
    
    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
    
    setTimeout(() => { isToggling = false; }, 300); // Reset after animation
  };

  // Add MULTIPLE event types for maximum compatibility
  menuToggle.addEventListener('click', toggleMenu, { capture: true });
  menuToggle.addEventListener('touchend', (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu(e);
  }, { passive: false, capture: true });

  // Make the button area even MORE clickable
  menuToggle.style.cursor = 'pointer';
  menuToggle.style.userSelect = 'none';
  menuToggle.style.webkitUserSelect = 'none';
  menuToggle.style.touchAction = 'manipulation';

  function openMenu() {
    console.log('Opening menu...');
    
    // Force visibility IMMEDIATELY
    navLinks.style.display = 'flex';
    navLinks.style.visibility = 'visible';
    navLinks.style.opacity = '1';
    
    // Use requestAnimationFrame for instant visual feedback
    requestAnimationFrame(() => {
      menuToggle.classList.add('active');
      navLinks.classList.add('active');
      body.style.overflow = 'hidden';
      
      // Double-check visibility
      navLinks.style.left = '0';
    });
  }

  function closeMenu() {
    console.log('Closing menu...');
    menuToggle.classList.remove('active');
    navLinks.classList.remove('active');
    body.style.overflow = '';
    
    // Delay hiding to allow animation
    setTimeout(() => {
      if (!navLinks.classList.contains('active')) {
        navLinks.style.left = '-100%';
      }
    }, 250);
  }

  // Close menu when clicking any link
  const navLinkItems = document.querySelectorAll('.nav-links a');
  navLinkItems.forEach(link => {
    link.addEventListener('click', (e) => {
      console.log('Nav link clicked, closing menu');
      closeMenu();
    });
  });

  // Close menu when clicking outside - with proper event handling
  document.addEventListener('click', (e) => {
    // Only check if menu is active and click is not during toggle
    if (!isToggling && 
        navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      console.log('Clicked outside, closing menu');
      closeMenu();
    }
  }, { capture: false }); // Use bubbling phase, not capturing

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      console.log('Escape pressed, closing menu');
      closeMenu();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 900 && navLinks.classList.contains('active')) {
        console.log('Window resized, closing menu');
        closeMenu();
      }
    }, 250);
  });
}

// ==================== FORCE GRID RESPONSIVENESS ==================== 
function forceGridResponsiveness() {
  if (window.innerWidth <= 768) {
    // Force ALL grids to single column on mobile
    const gridElements = document.querySelectorAll('[style*="grid-template-columns"]');
    gridElements.forEach(el => {
      el.style.gridTemplateColumns = '1fr';
      el.style.gap = '2rem';
    });

    // Also target elements with inline styles that might have 2 columns
    const twoColElements = document.querySelectorAll('[style*="1fr 1fr"]');
    twoColElements.forEach(el => {
      el.style.gridTemplateColumns = '1fr';
    });
  }
}

// ==================== ACTIVE NAV LINK ==================== 
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) {
    link.classList.add('active');
  }
});

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all animated elements
window.addEventListener('load', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .timeline-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
});

// ==================== SMOOTH SCROLL ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ==================== PARALLAX EFFECT ==================== 
let scrollY = 0;
let ticking = false;

window.addEventListener('scroll', () => {
  scrollY = window.scrollY;
  
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});

function updateParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');
  parallaxElements.forEach(el => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = `translateY(${scrollY * speed}px)`;
  });
}

// ==================== TYPING EFFECT ==================== 
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// ==================== TILT EFFECT FOR CARDS ==================== 
function addTiltEffect() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return;
  }

  const cards = document.querySelectorAll('.card, .project-card, .skill-card, .timeline-content');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });
}

// ==================== COUNTER ANIMATION ==================== 
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ==================== SKILLS PROGRESS ANIMATION ==================== 
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const percentage = bar.dataset.percentage;
        bar.style.width = percentage + '%';
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    bar.style.width = '0%';
    skillObserver.observe(bar);
  });
}

// ==================== FORM VALIDATION ==================== 
function initContactForm() {
  const form = document.querySelector('#contact-form');
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('#name')?.value.trim();
    const email = form.querySelector('#email')?.value.trim();
    const message = form.querySelector('#message')?.value.trim();
    
    if (!name || !email || !message) {
      showNotification('Please fill in all fields', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email', 'error');
      return;
    }
    
    showNotification('Message sent successfully!', 'success');
    form.reset();
  });
}

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    padding: 1rem 2rem;
    background: ${type === 'success' ? '#10b981' : '#ef4444'};
    color: white;
    border-radius: 10px;
    z-index: 1000000;
    animation: slideInRight 0.3s ease;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ==================== PAGE TRANSITION ==================== 
function initPageTransition() {
  const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
        e.preventDefault();
        
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
}

// ==================== NAVBAR SCROLL EFFECT ==================== 
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 50) {
    navbar.style.background = 'rgba(10, 10, 10, 0.95)';
  } else {
    navbar.style.background = 'rgba(10, 10, 10, 0.8)';
  }
  
  lastScrollTop = scrollTop;
});

// ==================== TOUCH SUPPORT FOR MOBILE ==================== 
if ('ontouchstart' in window) {
  const cards = document.querySelectorAll('.card, .project-card, .skill-card');
  
  cards.forEach(card => {
    card.addEventListener('touchstart', function() {
      this.classList.add('touch-active');
    });
    
    card.addEventListener('touchend', function() {
      setTimeout(() => {
        this.classList.remove('touch-active');
      }, 300);
    });
  });
}

// ==================== PREVENT DOUBLE-TAP ZOOM ==================== 
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);

// ==================== INITIALIZE EVERYTHING ==================== 
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing...');
  
  // Initialize mobile menu FIRST and AGGRESSIVELY
  initMobileMenu();
  
  // Force grid responsiveness
  forceGridResponsiveness();
  
  // Other initializations
  addTiltEffect();
  animateSkillBars();
  initContactForm();
  initPageTransition();
  
  // Page load animation
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
  }, 100);

  // Initialize counters if they exist
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.dataset.target);
          animateCounter(entry.target, target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // Re-apply grid fixes on resize
  window.addEventListener('resize', () => {
    forceGridResponsiveness();
  });
});

// ==================== UTILITY FUNCTIONS ==================== 
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

function throttle(func, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return func(...args);
  };
}

// Export for use in other files
window.portfolioUtils = {
  typeWriter,
  animateCounter,
  showNotification,
  debounce,
  throttle
};

console.log('Portfolio JS loaded successfully!');