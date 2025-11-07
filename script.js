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
    const itemWidth = 280 + 32; // card width + gap
    const visibleCards = () => {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    };

    const updateCarousel = () => {
        certTrack.style.transform = `translateX(-${currentPosition * itemWidth}px)`;
    };

    certNextBtn.addEventListener('click', () => {
        const totalCards = certTrack.children.length;
        const maxPosition = totalCards - visibleCards();
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
    window.addEventListener('resize', () => {
        currentPosition = 0;
        updateCarousel();
    });
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
