// Tech Background Animation
function createTechBackground() {
    const techIcons = ['💻', '📱', '⌨️', '🖥️', '🔌', '🌐', '📡', '🛰️', '🔋', '💾', '📀', '⚡', '🤖', '🎮', '📶', '🔍'];
    const existingBg = document.querySelector('.tech-background');
    if (existingBg) existingBg.remove();

    const techBackground = document.createElement('div');
    techBackground.className = 'tech-background';
    document.body.appendChild(techBackground);

    // Create items for each direction
    const directions = ['from-top', 'from-bottom', 'from-left', 'from-right'];
    
    // Create more tech items for better coverage (10 items per direction)
    directions.forEach(direction => {
        for (let i = 0; i < 10; i++) {
            const techItem = document.createElement('div');
            techItem.className = `tech-item ${direction}`;
            techItem.textContent = techIcons[Math.floor(Math.random() * techIcons.length)];
            
            // Random positioning along the edge based on direction
            if (direction === 'from-top' || direction === 'from-bottom') {
                techItem.style.left = `${Math.random() * 100}%`;
            } else {
                techItem.style.top = `${Math.random() * 100}%`;
            }
            
            // Random sizes and timing
            techItem.style.fontSize = `${Math.random() * 2 + 1.5}rem`;
            techItem.style.animationDelay = `${Math.random() * 40}s`; // Longer delay range for more variation
            techItem.style.animationDuration = `${Math.random() * 15 + 20}s`; // Longer duration range
            
            techBackground.appendChild(techItem);
        }
    });
}

// Section Headers with Icons
function addSectionIcons() {
    const sectionIcons = {
        'about': { icon: '👋', gradient: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)' },
        'skills': { icon: '🚀', gradient: 'linear-gradient(45deg, #6C5CE7, #A8E6CF)' },
        'projects': { icon: '💼', gradient: 'linear-gradient(45deg, #FF8C00, #FF2E63)' },
        'interests': { icon: '🎯', gradient: 'linear-gradient(45deg, #00B4DB, #0083B0)' },
        'education': { icon: '🎓', gradient: 'linear-gradient(45deg, #A8E6CF, #DCEDC1)' },
        'contact': { icon: '📫', gradient: 'linear-gradient(45deg, #FF61D2, #FE9090)' }
    };

    document.querySelectorAll('section').forEach(section => {
        const id = section.id;
        if (!id || !sectionIcons[id]) return;

        // Remove existing header if present
        const existingHeader = section.querySelector('.section-header');
        if (existingHeader) existingHeader.remove();

        const header = document.createElement('div');
        header.className = 'section-header animate-in';
        
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'section-icon-wrapper';
        iconWrapper.style.background = sectionIcons[id].gradient;
        
        const icon = document.createElement('div');
        icon.className = 'section-icon';
        icon.textContent = sectionIcons[id].icon;
        
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = id.charAt(0).toUpperCase() + id.slice(1);
        
        iconWrapper.appendChild(icon);
        header.appendChild(iconWrapper);
        header.appendChild(title);
        
        section.insertBefore(header, section.firstChild);
    });
}

// Add section logos to the circular icon wrappers
function addSectionLogos() {
    // Define logos for each section
    const sectionLogos = {
        'about': {
            src: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
            alt: 'About Me Logo'
        },
        'skills': {
            src: 'https://cdn-icons-png.flaticon.com/512/2721/2721304.png',
            alt: 'Skills Logo'
        },
        'projects': {
            src: 'https://cdn-icons-png.flaticon.com/512/1087/1087927.png',
            alt: 'Projects Logo'
        },
        'education': {
            src: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
            alt: 'Education Logo'
        },
        'interests': {
            src: 'https://cdn-icons-png.flaticon.com/512/1598/1598431.png',
            alt: 'Interests Logo'
        },
        'contact': {
            src: 'https://cdn-icons-png.flaticon.com/512/3059/3059502.png',
            alt: 'Contact Logo'
        }
    };

    // Find all section headers
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    // Add logos to each section header
    sectionHeaders.forEach(header => {
        // Get the parent section to determine which logo to use
        const parentSection = header.closest('section');
        if (!parentSection || !parentSection.id) return;
        
        const sectionId = parentSection.id;
        const iconWrapper = header.querySelector('.section-icon-wrapper');
        
        if (iconWrapper && sectionLogos[sectionId]) {
            // Create the logo image
            const logoImg = document.createElement('img');
            logoImg.src = sectionLogos[sectionId].src;
            logoImg.alt = sectionLogos[sectionId].alt;
            logoImg.className = 'section-icon-logo';
            
            // Add the logo to the icon wrapper
            iconWrapper.appendChild(logoImg);
            
            // Add the specific gradient class
            iconWrapper.classList.add(`${sectionId}-icon`);
        }
    });
}

// Initialize animations
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-category')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    // Observe all animated elements
    document.querySelectorAll('.animate-in, .section-header, .skill-category, .project-card, .interest-item, .edu-card').forEach(el => {
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createTechBackground();
    addSectionIcons();
    addSectionLogos();
    initAnimations();
});

// Refresh tech background on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        createTechBackground();
    }, 250);
}); 