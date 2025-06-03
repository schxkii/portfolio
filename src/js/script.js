document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor
    const cursorFlare = document.querySelector('.cursor-flare');
    
    // Make sure cursor exists before adding event listeners
    if (cursorFlare) {
        document.addEventListener('mousemove', (e) => {
            cursorFlare.style.left = e.clientX + 'px';
            cursorFlare.style.top = e.clientY + 'px';
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorFlare.style.opacity = '0';
        });
        
        // Show cursor when entering window
        document.addEventListener('mouseenter', () => {
            cursorFlare.style.opacity = '1';
        });
        
        // Enlarge cursor on hover over interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .profile-image, .project');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFlare.style.transform = 'translate(-50%, -50%) scale(2)'; /* Increased scale */
                cursorFlare.style.background = 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.6) 30%, transparent 70%)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorFlare.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFlare.style.background = 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 30%, transparent 70%)';
            });
        });
    }
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all project elements
    const projectElements = document.querySelectorAll('.project');
    projectElements.forEach((project, index) => {
        project.style.animationDelay = `${index * 0.2}s`;
        observer.observe(project);
    });

    // Smooth scrolling for any internal links
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
});