(function() {
  'use strict';

  const initSmoothScroll = () => {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;
        const nav = document.querySelector('.nav');
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (nav && nav.classList.contains('active')) {
          nav.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          resetHamburger();
        }
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = target.offsetTop - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        updateActiveNavLink(href);
      });
    });
  };

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

  const initMobileMenu = () => {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    if (!menuToggle || !nav) return;
    menuToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      nav.classList.toggle('active');
      const hamburgers = this.querySelectorAll('.hamburger');
      if (nav.classList.contains('active')) {
        hamburgers[0].style.transform = 'rotate(45deg) translateY(10px)';
        hamburgers[1].style.opacity = '0';
        hamburgers[2].style.transform = 'rotate(-45deg) translateY(-10px)';
      } else {
        resetHamburger();
      }
    });
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
    hamburgers[0].style.transform = 'none';
    hamburgers[1].style.opacity = '1';
    hamburgers[2].style.transform = 'none';
  };

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
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
          }
        });
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

  const initActiveSection = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
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
    }, { threshold: 0.3, rootMargin: '-100px 0px -50% 0px' });
    sections.forEach(section => observer.observe(section));
  };

  const initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll('[data-aos]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = entry.target.getAttribute('data-aos-delay') || 0;
          setTimeout(() => {
            entry.target.classList.add('aos-animate');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    animatedElements.forEach(el => observer.observe(el));
  };

  const initContactForm = () => {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      setTimeout(() => {
        alert('Thank you for your message! We will get back to you soon.');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }, 1500);
    });
  };

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

  const initPlayButton = () => {
    const playButton = document.querySelector('.play-button');
    if (!playButton) return;
    playButton.addEventListener('click', function() {
      this.style.animation = 'pulse 0.5s ease';
      setTimeout(() => {
        this.style.animation = '';
        alert('Video demo feature - Connect to your video player here!');
      }, 500);
    });
  };

  const init = () => {
    initSmoothScroll();
    initMobileMenu();
    initHeaderScroll();
    initScrollToTop();
    initFAQ();
    initActiveSection();
    initScrollAnimations();
    initContactForm();
    initCardEffects();
    initPlayButton();
    console.log('🎮 Global Game Tech - Website Loaded Successfully!');
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

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
