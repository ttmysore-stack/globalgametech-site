// ============================================
// GLOBAL GAME TECH - MAIN JAVASCRIPT
// ============================================

(function() {
  'use strict';

  // ============================================
  // SMOOTH SCROLLING WITH PROPER OFFSET
  // ============================================
  
  const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (!target) return;
        
        // Close mobile menu if open
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          resetHamburger();
        }
        
        // Get header height for offset
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        
        // Smooth scroll with proper offset
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavLink(href);
      });
    });
  };

  // ============================================
  // UPDATE ACTIVE NAVIGATION LINK
  // ============================================
  
  const updateActiveNavLink = (activeHref) => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('href') === activeHref) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // ============================================
  // MOBILE MENU TOGGLE
  // ============================================
  
  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    
    if (!menuToggle || !nav) return;
    
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      
      // Animate hamburger
      const hamburgers = this.querySelectorAll('.hamburger');
      if (nav.classList.contains('active')) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(10px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
        resetHamburger();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        if (nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          resetHamburger();
        }
      }
    });
  };

  const resetHamburger = () => {
    const hamburgers = document.querySelectorAll('.hamburger');
    if (hamburgers.length >= 3) {
      hamburgers[0].style.transform = 'none';
      hamburgers[1].style.opacity = '1';
      hamburgers[2].style.transform = 'none';
    }
  };

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    });
  };

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  
  const initScrollToTop = () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 500) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    });
    
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  };

  // ============================================
  // FAQ ACCORDION
  // ============================================
  
  const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current item
        if (isActive) {
          item.classList.remove('active');
          question.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  };

  // ============================================
  // ACTIVE SECTION DETECTION ON SCROLL
  // ============================================
  
  const initActiveSection = () => {
    const sections = document.querySelectorAll('.scroll-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            
            navLinks.forEach(link => {
              const href = link.getAttribute('href');
              if (href === `#${id}`) {
                link.classList.add('active');
              } else {
                link.classList.remove('active');
              }
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
      }
    );
    
    sections.forEach(section => observer.observe(section));
  };

  // ============================================
  // SCROLL ANIMATIONS (AOS Alternative)
  // ============================================
  
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-aos-delay') || 0;
            
            setTimeout(() => {
              entry.target.classList.add('aos-animate');
            }, delay);
            
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    animatedElements.forEach(el => observer.observe(el));
  };

  // ============================================
  // IMAGE SLIDER / CAROUSEL
  // ============================================

  const initImageSlider = () => {
    const slider = document.querySelector('.dashboard-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-btn-prev');
    const nextBtn = slider.querySelector('.slider-btn-next');
    const progressBar = slider.querySelector('.slider-progress-bar');
    
    let currentSlide = 0;
    let autoplayInterval;
    let progressInterval;
    const AUTOPLAY_DELAY = 4000; // 4 seconds per slide
    const PROGRESS_INTERVAL = 10; // Update progress every 10ms

    // Show specific slide
    const showSlide = (index) => {
      // Remove active class from all slides and dots
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      // Add active class to current slide and dot
      slides[index].classList.add('active');
      dots[index].classList.add('active');

      // Reset progress bar
      if (progressBar) {
        progressBar.style.width = '0%';
      }
    };

    // Next slide
    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    // Previous slide
    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    // Go to specific slide
    const goToSlide = (index) => {
      currentSlide = index;
      showSlide(currentSlide);
      resetAutoplay();
    };

    // Progress bar animation
    const animateProgress = () => {
      let progress = 0;
      const increment = 100 / (AUTOPLAY_DELAY / PROGRESS_INTERVAL);
      
      progressInterval = setInterval(() => {
        progress += increment;
        if (progressBar) {
          progressBar.style.width = progress + '%';
        }
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, PROGRESS_INTERVAL);
    };

    // Start autoplay
    const startAutoplay = () => {
      animateProgress();
      autoplayInterval = setInterval(() => {
        nextSlide();
        animateProgress();
      }, AUTOPLAY_DELAY);
    };

    // Stop autoplay
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
    };

    // Reset autoplay
    const resetAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    // Event listeners for buttons
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetAutoplay();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetAutoplay();
      }
    });

    // Touch/Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
        resetAutoplay();
      }
      if (touchEndX > touchStartX + 50) {
        prevSlide();
        resetAutoplay();
      }
    };

    // Initialize slider
    showSlide(currentSlide);
    startAutoplay();
  };

  // ============================================
  // INTERACTIVE CARD HOVER EFFECTS
  // ============================================
  
  const initCardEffects = () => {
    const cards = document.querySelectorAll('.solution-card, .sport-card, .career-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  };

  // ============================================
  // INITIALIZE ALL FUNCTIONS
  // ============================================
  
  const init = () => {
    initSmoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollToTop();
    initFAQ();
    initActiveSection();
    initScrollAnimations();
    initImageSlider();
    initCardEffects();
    
    console.log('🎮 Global Game Tech - Website Loaded Successfully!');
    console.log('📱 All sections aligned with proper scroll offset');
    console.log('🖼️ Image slider initialized with 6 slides');
    console.log('✅ Mobile responsive features enabled');
  };

  // ============================================
  // DOM READY
  // ============================================
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ============================================
  // PERFORMANCE OPTIMIZATION
  // ============================================
  
  // Lazy load images (if you add more images later)
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

})();
