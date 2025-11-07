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

// See More button for Experience section
const experienceSeeMoreBtn = document.getElementById('experienceSeeMore');
const hiddenExperiences = document.querySelectorAll('.hidden-experience');

if (experienceSeeMoreBtn && hiddenExperiences.length > 0) {
    experienceSeeMoreBtn.addEventListener('click', function() {
        const isExpanded = this.textContent === 'See Less';
        
        hiddenExperiences.forEach(item => {
            item.style.display = isExpanded ? 'none' : 'flex';
        });
        
        this.textContent = isExpanded ? 'See More' : 'See Less';
    });
}

// Certifications carousel
const certTrack = document.getElementById('certTrack');
const certPrevBtn = document.getElementById('certPrev');
const certNextBtn = document.getElementById('certNext');

if (certTrack && certPrevBtn && certNextBtn) {
    let currentPosition = 0;
    const itemWidth = 280; // card width
    const gap = 32; // gap between cards
    const scrollAmount = itemWidth + gap;
    
    const visibleCards = () => {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    };

    const updateCarousel = () => {
        certTrack.style.transform = `translateX(-${currentPosition * scrollAmount}px)`;
        
        // Update button states
        certPrevBtn.disabled = currentPosition === 0;
        const totalCards = certTrack.children.length;
        const maxPosition = Math.max(0, totalCards - visibleCards());
        certNextBtn.disabled = currentPosition >= maxPosition;
        
        // Visual feedback for disabled buttons
        certPrevBtn.style.opacity = certPrevBtn.disabled ? '0.3' : '1';
        certPrevBtn.style.cursor = certPrevBtn.disabled ? 'not-allowed' : 'pointer';
        certNextBtn.style.opacity = certNextBtn.disabled ? '0.3' : '1';
        certNextBtn.style.cursor = certNextBtn.disabled ? 'not-allowed' : 'pointer';
    };

    certNextBtn.addEventListener('click', () => {
        const totalCards = certTrack.children.length;
        const maxPosition = Math.max(0, totalCards - visibleCards());
        if (currentPosition < maxPosition) {
            currentPosition++;
            updateCarousel();
        }
    });

    certPrevBtn.addEventListener('click', () => {
        if (currentPosition > 0) {
            currentPosition--;
            updateCarousel();
        }
    });

    // Reset position on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            currentPosition = 0;
            updateCarousel();
        }, 250);
    });
    
    // Initialize
    updateCarousel();
}

// Add scroll animation to sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all major sections
document.querySelectorAll('.experience-item, .education-item, .cert-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Highlight active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active class style dynamically
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-color);
        position: relative;
    }
    .nav-menu a.active::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);
