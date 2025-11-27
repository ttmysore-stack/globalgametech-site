// ============================================
// GLOBAL GAME TECH - OPTIMIZED JAVASCRIPT
// ============================================

(function() {
  'use strict';

  // ============================================
  // CONFIGURATION
  // ============================================
  
  const CONFIG = {
    headerHeight: 72,
    mobileHeaderHeight: 68,
    sliderAutoplayDelay: 4000,
    sliderProgressInterval: 10,
    scrollOffset: 0  // Zero offset for tight alignment
  };

  // ============================================
  // SMOOTH SCROLLING WITH ZERO GAP
  // ============================================
  
  const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (!target) return;
        
        // Close mobile menu
        closeMobileMenu();
        
        // Get header height dynamically
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : CONFIG.headerHeight;
        
        // Calculate position with zero gap
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll
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
  // UPDATE ACTIVE NAVIGATION
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
  // MOBILE MENU
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
        document.body.style.overflow = 'hidden';
      } else {
        resetHamburger();
        document.body.style.overflow = '';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        if (nav.classList.contains('active')) {
          closeMobileMenu();
        }
      }
    });
  };

  const closeMobileMenu = () => {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (nav && nav.classList.contains('active')) {
      nav.classList.remove('active');
      if (menuToggle) {
        menuToggle.setAttribute('aria-expanded', 'false');
      }
      resetHamburger();
      document.body.style.overflow = '';
    }
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
    
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    };
    
    // Use passive listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
  };

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  
  const initScrollToTop = () => {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    const handleScroll = () => {
      if (window.pageYOffset > 400) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
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
        
        // Close all FAQ items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
          question.setAttribute('aria-expanded', 'true');
        }
      });
    });
  };

  // ============================================
  // ACTIVE SECTION DETECTION
  // ============================================
  
  const initActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!('IntersectionObserver' in window)) return;
    
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
        threshold: 0.2,
        rootMargin: '-100px 0px -60% 0px'
      }
    );
    
    sections.forEach(section => observer.observe(section));
  };

  // ============================================
  // SCROLL ANIMATIONS
  // ============================================
  
  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback: show all elements immediately
      animatedElements.forEach(el => el.classList.add('aos-animate'));
      return;
    }
    
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
  // IMAGE SLIDER - OPTIMIZED
  // ============================================

  const initImageSlider = () => {
    const slider = document.querySelector('.dashboard-slider');
    if (!slider) return;

    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    const prevBtn = slider.querySelector('.slider-btn-prev');
    const nextBtn = slider.querySelector('.slider-btn-next');
    const progressBar = slider.querySelector('.slider-progress-bar');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let autoplayInterval;
    let progressInterval;
    let isHovered = false;

    // Show specific slide
    const showSlide = (index) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));

      if (slides[index]) slides[index].classList.add('active');
      if (dots[index]) dots[index].classList.add('active');

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
      if (!progressBar) return;
      
      let progress = 0;
      const increment = 100 / (CONFIG.sliderAutoplayDelay / CONFIG.sliderProgressInterval);
      
      clearInterval(progressInterval);
      
      progressInterval = setInterval(() => {
        if (isHovered) {
          clearInterval(progressInterval);
          return;
        }
        
        progress += increment;
        progressBar.style.width = Math.min(progress, 100) + '%';
        
        if (progress >= 100) {
          clearInterval(progressInterval);
        }
      }, CONFIG.sliderProgressInterval);
    };

    // Start autoplay
    const startAutoplay = () => {
      if (isHovered) return;
      
      animateProgress();
      
      clearInterval(autoplayInterval);
      
      autoplayInterval = setInterval(() => {
        if (!isHovered) {
          nextSlide();
          animateProgress();
        }
      }, CONFIG.sliderAutoplayDelay);
    };

    // Stop autoplay
    const stopAutoplay = () => {
      clearInterval(autoplayInterval);
      clearInterval(progressInterval);
    };

    // Reset autoplay
    const resetAutoplay = () => {
      stopAutoplay();
      if (!isHovered) {
        startAutoplay();
      }
    };

    // Button event listeners
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
      });
    }

    // Dot event listeners
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
      });
    });

    // Pause on hover
    slider.addEventListener('mouseenter', () => {
      isHovered = true;
      stopAutoplay();
    });

    slider.addEventListener('mouseleave', () => {
      isHovered = false;
      startAutoplay();
    });

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

    // Touch/Swipe support
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
      const swipeThreshold = 50;
      
      if (touchEndX < touchStartX - swipeThreshold) {
        nextSlide();
        resetAutoplay();
      } else if (touchEndX > touchStartX + swipeThreshold) {
        prevSlide();
        resetAutoplay();
      }
    };

    // Pause autoplay when page is hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopAutoplay();
      } else if (!isHovered) {
        startAutoplay();
      }
    });

    // Initialize
    showSlide(currentSlide);
    startAutoplay();
  };

  // ============================================
  // CARD HOVER EFFECTS
  // ============================================
  
  const initCardEffects = () => {
    const cards = document.querySelectorAll('.solution-card, .sport-card, .career-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transition = '';
      });
    });
  };

  // ============================================
  // PERFORMANCE OPTIMIZATIONS
  // ============================================
  
  const initPerformanceOptimizations = () => {
    // Lazy load images
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

    // Preload critical images
    const heroImage = document.querySelector('.hero .slide.active img');
    if (heroImage && heroImage.src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = heroImage.src;
      document.head.appendChild(link);
    }
  };

  // ============================================
  // INITIALIZE ALL
  // ============================================
  
  const init = () => {
    // Core functionality
    initSmoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollToTop();
    initFAQ();
    initActiveSection();
    initScrollAnimations();
    initImageSlider();
    initCardEffects();
    initPerformanceOptimizations();
    
    // Log success
    console.log('%c🎮 Global Game Tech - Website Loaded Successfully!', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
    console.log('%c✅ Zero-gap scroll alignment enabled', 'color: #4CAF50;');
    console.log('%c🖼️ Full-size image slider initialized', 'color: #4CAF50;');
    console.log('%c📱 Mobile responsive features active', 'color: #4CAF50;');
    console.log('%c⚡ Performance optimizations applied', 'color: #4CAF50;');
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
  // PREVENT SCROLL RESTORATION ON RELOAD
  // ============================================
  
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

})();
