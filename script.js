/**
 * NEXORATEKH LLP - Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Change icon
            const icon = navToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks && navLinks.classList.contains('active') && !e.target.closest('.nav-container')) {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Sticky Header Scroll Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observer to elements with .animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // Add staggered animation delays for grids
    const staggerGrids = document.querySelectorAll('.services-grid, .features-grid, .process-grid, .partners-grid');
    staggerGrids.forEach(grid => {
        const children = grid.querySelectorAll('.service-card, .feature-card, .process-card, .partner-category');
        children.forEach((child, index) => {
            child.classList.add('animate-on-scroll');
            // Adding a dynamic inline delay based on index for staggered effect
            child.style.transitionDelay = `${index * 0.1}s`;
            scrollObserver.observe(child);
        });
    });

    // Set active link based on current page completely independent of query params
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Preparing Email...';
            btn.disabled = true;
            
            // Collect form data
            const name = document.getElementById('name').value.trim() || '';
            const email = document.getElementById('email').value.trim() || '';
            const phone = document.getElementById('phone').value.trim() || '';
            const message = document.getElementById('message').value.trim() || '';
            
            // Validation
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            const phoneRegex = /^\\+?[\\d\\s\\-]{10,}$/;

            if (!emailRegex.test(email)) {
                alert("Please enter a valid email address.");
                btn.textContent = originalText;
                btn.disabled = false;
                return;
            }

            if (!phoneRegex.test(phone)) {
                alert("Please enter a valid phone number (at least 10 digits).");
                btn.textContent = originalText;
                btn.disabled = false;
                return;
            }
            
            // Construct mailto link
            const subject = encodeURIComponent(`New Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);
            const mailtoLink = `mailto:Info.nexoratekh@gmail.com?subject=${subject}&body=${body}`;
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-envelope"></i> Opening Email Client...';
                btn.style.backgroundColor = '#28a745'; // Success green
                
                // Redirect to email client
                window.location.href = mailtoLink;
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.disabled = false;
                    btn.style.backgroundColor = ''; // Reset to default CSS
                    contactForm.reset();
                }, 3000);
            }, 800);
        });
    }
});
