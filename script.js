// Intersection Observer for scroll animations
document.addEventListener("DOMContentLoaded", () => {
    // 1. Fade-in sections on scroll
    const sections = document.querySelectorAll('.fade-in-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // If it's the skills section, trigger the progress bars
                if (entry.target.id === 'skills') {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        bar.style.width = bar.getAttribute('style').split(':')[1].replace(';', '').trim();
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Form submission interaction prevent default
    const form = document.getElementById('contact-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.style.pointerEvents = 'none';

            // Simulate form submission
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                btn.classList.replace('btn-primary', 'btn-outline');
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.classList.replace('btn-outline', 'btn-primary');
                    btn.style.opacity = '1';
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }

    // 4. Parallax effect for shapes to enhance the "smooth motion graphics" feel
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.blob');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const moveX = (window.innerWidth / 2 - e.clientX) / speed;
            const moveY = (window.innerHeight / 2 - e.clientY) / speed;
            
            // Adjust to not conflict with CSS animations, only augment slowly via transforms or margins
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});
